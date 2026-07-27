from dotenv import load_dotenv
load_dotenv()

from flask import Flask, app, abort, flash, jsonify, render_template, request, redirect, url_for
from sqlalchemy import String, and_, cast, func, not_, or_, text
from config import Config
from extensions import db
from datetime import datetime, timedelta
import io
import uuid
import pandas as pd
from decimal import Decimal, InvalidOperation
from flask import send_file
from models import Programa, Acao
from models import ProdutoAcao  # certifique-se de importar no topo com os outros modelos
from models import SubacaoEntrega  # certifique-se de importar no topo com os outros modelos
from models import MunicipioEntrega
from models import Etapa
from models import MemoriaCalculo
from models import Momp
from models import PoliticaTeto
from flask import session


app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
usuarios_online = {}
ORCAMENTO_DISABLED_PATHS = (
    "/teto_orcamentario",
    "/dashboard-teto",
    "/cadastrar_momp",
    "/inserir_momp",
    "/excluir_momp",
    "/filtrar_momp",
    "/politicateto",
    "/inserir_politicateto",
    "/excluir_politicateto",
    "/visualizar_qomp",
    "/baixar_excel_qomp",
    "/carregar_teto",
)

def _pta_exercicio_atual():
    return str(app.config.get("PTA_EXERCICIO_ATUAL") or "2026").strip()

def _programa_do_exercicio_or_404(programa_id):
    programa = Programa.query.filter_by(
        id=programa_id,
        ativo=True,
        exercicio=_pta_exercicio_atual()
    ).first()
    if not programa:
        abort(404)
    return programa

def _is_municipio_estado(municipio):
    if not municipio:
        return False
    codigo = str(getattr(municipio, "codigo_municipio", "") or "").strip()
    nome = str(getattr(municipio, "nome_municipio", "") or "").strip().lower()
    return codigo.startswith("5100000") or nome in {"estado", "estado mato grosso"}

def _nome_etapa_com_municipio(etapa_nome, municipio):
    nome = str(etapa_nome or "").strip()
    if not municipio or _is_municipio_estado(municipio):
        return nome

    municipio_nome = str(municipio.nome_municipio or "").strip()
    prefixo = f"{municipio_nome} * " if municipio_nome else ""
    if prefixo and not nome.startswith(prefixo):
        return f"{prefixo}{nome}"
    return nome

def _municipio_join_condition_for_report():
    return or_(
        and_(
            Etapa.municipio_entrega_id.isnot(None),
            MunicipioEntrega.id == Etapa.municipio_entrega_id
        ),
        and_(
            Etapa.id.is_(None),
            MunicipioEntrega.subacao_entrega_id == SubacaoEntrega.id
        )
    )

@app.context_processor
def _inject_pta_context():
    return {"pta_exercicio_atual": _pta_exercicio_atual()}

# Mantem a conexao valida em hospedagem compartilhada (retry simples no 1o acesso).
@app.before_request
def _ping_db():
    try:
        # Consome o resultado para evitar "Command out of Sync".
        db.session.execute(text("SELECT 1")).scalar()
    except Exception:
        # Recria a sessao e tenta mais uma vez.
        db.session.remove()
        db.session.execute(text("SELECT 1")).scalar()

if app.config.get("ORCAMENTO_MODULE_ENABLED", False):
    from dash_apps.teto_por_fonte import criar_dash_teto_por_fonte
    from aut_excel.teto_qomp import teto_excel_bp

    # Cria o Dash e registra o processamento de teto apenas quando o modulo estiver ativo.
    criar_dash_teto_por_fonte(app)
    app.register_blueprint(teto_excel_bp)

@app.before_request
def _bloquear_modulo_orcamentario():
    if app.config.get("ORCAMENTO_MODULE_ENABLED", False):
        return None
    if not request.path.startswith(ORCAMENTO_DISABLED_PATHS):
        return None
    if request.path.startswith("/dashboard-teto") or request.method != "GET":
        return jsonify({"success": False, "message": "Modulo orcamentario desativado nesta aplicacao."}), 404
    flash("Modulo orcamentario desativado nesta aplicacao.", "warning")
    return redirect(url_for("home"))

with app.app_context():
        from models import Programa, Acao  # ✅ Importamos também o modelo Acao
        db.create_all()

        @app.route('/')
        def home():
            return render_template('home.html')

        @app.route('/cadastrar')
        def cadastrar_pta():
            programas = Programa.query.filter_by(
                ativo=True,
                exercicio=_pta_exercicio_atual()
            ).all()
            return render_template('cadastrar_programa.html', programas=programas)

        @app.route('/excluir_programa/<int:id>', methods=['POST'])
        def excluir_programa(id):
            programa = Programa.query.filter_by(
                id=id,
                exercicio=_pta_exercicio_atual()
            ).first()

            if not programa:
                flash('Programa não encontrado.', 'danger')
                return redirect(url_for('cadastrar_pta'))

            # Verificar se há ações ativas vinculadas a este programa
            acoes_vinculadas = Acao.query.filter_by(programa_id=id, ativo=True).first()
            if acoes_vinculadas:
                flash('Não é possível excluir o programa. Existem ações ativas vinculadas a ele.', 'warning')
                return redirect(url_for('cadastrar_pta'))

            # Exclusão lógica do programa
            programa.ativo = False
            programa.excluido_em = datetime.now()
            db.session.commit()
            
            flash('Programa excluído com sucesso.', 'success')
            return redirect(url_for('cadastrar_pta'))

        @app.route('/inserir_programa', methods=['POST'])
        def inserir_programa():
            programa_id = request.form.get('programa_id')

            nome = request.form['nome']
            funcao = request.form['funcao']
            responsavel = request.form['responsavel']
            cpf = request.form['cpf']
            email = request.form['email']

            if programa_id:
                # Atualização com duplicação (herança)
                programa_antigo = Programa.query.filter_by(
                    id=int(programa_id),
                    exercicio=_pta_exercicio_atual()
                ).first()
                if programa_antigo:
                    # Desativar o programa antigo
                    programa_antigo.ativo = False
                    programa_antigo.excluido_em = datetime.now()

                    # Criar novo programa com os novos dados
                    novo_programa = Programa(
                        exercicio=_pta_exercicio_atual(),
                        nome=nome,
                        funcao=funcao,
                        responsavel=responsavel,
                        cpf=cpf,
                        email=email,
                        ativo=True
                    )
                    db.session.add(novo_programa)
                    db.session.flush()  # Garantir que novo_programa.id esteja disponível

                    # Atualizar as ações vinculadas ao programa antigo
                    acoes = Acao.query.filter_by(programa_id=programa_antigo.id, ativo=True).all()
                    for acao in acoes:
                        acao.programa_id = novo_programa.id
                        acao.alterado_em = datetime.now()
            else:
                # Novo cadastro simples
                novo_programa = Programa(
                    exercicio=_pta_exercicio_atual(),
                    nome=nome,
                    funcao=funcao,
                    responsavel=responsavel,
                    cpf=cpf,
                    email=email,
                    ativo=True
                )
                db.session.add(novo_programa)

            db.session.commit()
            flash('Programa salvo com sucesso.', 'success')
            return redirect(url_for('cadastrar_pta'))

        @app.route('/acoes/<int:programa_id>')
        def acoes_por_programa(programa_id):
            programa = _programa_do_exercicio_or_404(programa_id)
            acoes = Acao.query.filter_by(programa_id=programa_id, ativo=True).all()
            return render_template('cadastrar_acao.html', programa=programa, acoes=acoes)

        @app.route('/inserir_acao', methods=['POST'])
        def inserir_acao():
            programa_id = request.form.get('programa_id')
            acao_id = request.form.get('acao_id')
            programa = _programa_do_exercicio_or_404(int(programa_id))

            subfuncao = request.form['subfuncao']
            acao_paoe = request.form['acao_paoe']
            responsavel = request.form['responsavel']
            cpf = request.form['cpf']
            email = request.form['email']

            if acao_id:
                acao_antiga = Acao.query.get(int(acao_id))
                if acao_antiga:
                    # Desativar a ação antiga
                    acao_antiga.ativo = False
                    acao_antiga.excluido_em = datetime.now()

                    # Criar nova ação com os dados atualizados
                    nova_acao = Acao(
                        programa_id=programa.id,
                        subfuncao=subfuncao,
                        acao_paoe=acao_paoe,
                        responsavel=responsavel,
                        cpf=cpf,
                        email=email,
                        ativo=True
                    )
                    db.session.add(nova_acao)
                    db.session.flush()  # Garante que nova_acao.id esteja disponível

                    # Atualizar os produtos vinculados à ação antiga
                    produtos = ProdutoAcao.query.filter_by(acao_id=acao_antiga.id, ativo=True).all()
                    for produto in produtos:
                        produto.acao_id = nova_acao.id
                        produto.alterado_em = datetime.now()
            else:
                nova_acao = Acao(
                    programa_id=programa.id,
                    subfuncao=subfuncao,
                    acao_paoe=acao_paoe,
                    responsavel=responsavel,
                    cpf=cpf,
                    email=email,
                    ativo=True
                )
                db.session.add(nova_acao)

            db.session.commit()
            flash('Ação salva com sucesso.', 'success')
            return redirect(url_for('acoes_por_programa', programa_id=programa.id))

        @app.route('/excluir_acao/<int:id>', methods=['POST'])
        def excluir_acao(id):
            acao = Acao.query.get(id)

            if not acao:
                flash('Ação não encontrada.', 'danger')
                return redirect(url_for('cadastrar_pta'))

            # Verifica se existem produtos vinculados e ativos
            produtos_vinculados = ProdutoAcao.query.filter_by(acao_id=id, ativo=True).first()
            if produtos_vinculados:
                flash('Não é possível excluir a ação. Existem produtos ativos vinculados a ela.', 'warning')
                return redirect(url_for('acoes_por_programa', programa_id=acao.programa_id))

            # Exclusão lógica
            acao.ativo = False
            acao.excluido_em = datetime.now()
            db.session.commit()

            flash('Ação excluída com sucesso.', 'success')
            return redirect(url_for('acoes_por_programa', programa_id=acao.programa_id))
        
        # === ETAPA 5: Visualizar Produtos da Ação ===
        @app.route('/produtos_acao/<int:programa_id>/<int:acao_id>')
        def cadastrar_produto_acao(programa_id, acao_id):
            programa = _programa_do_exercicio_or_404(programa_id)
            acao = Acao.query.get_or_404(acao_id)
            if acao.programa_id != programa.id:
                abort(404)
            produtos = ProdutoAcao.query.filter_by(acao_id=acao_id, ativo=True).all()
            return render_template(
                'cadastrar_produto_acao.html',
                programa=programa,
                acao=acao,
                produtos=produtos
            )


        # === ETAPA 6: Inserir ou Editar Produto da Ação ===
        @app.route('/inserir_produto_acao', methods=['POST'])
        def inserir_produto_acao():
            produto_id = request.form.get('produto_id')
            nome = request.form.get('nome')
            acao_id = request.form.get('acao_id')
            un_medida = request.form.get('un_medida')
            quantidade_str = request.form.get('quantidade_real')

            # Função para tratar número com separador brasileiro
            def parse_float(valor_str):
                if not valor_str:
                    return 0.0
                valor_str = valor_str.strip()
                if ',' in valor_str and '.' in valor_str:
                    valor_str = valor_str.replace('.', '').replace(',', '.')
                elif ',' in valor_str:
                    valor_str = valor_str.replace(',', '.')
                try:
                    return float(valor_str)
                except ValueError:
                    return 0.0

            quantidade = parse_float(quantidade_str)

            if not nome or not acao_id or not un_medida or not quantidade:
                return "Dados incompletos", 400

            if produto_id:
                produto_antigo = ProdutoAcao.query.get(int(produto_id))
                if produto_antigo:
                    # Desativa o antigo
                    produto_antigo.ativo = False
                    produto_antigo.excluido_em = datetime.now()

                    # Cria novo com os dados atualizados
                    novo_produto = ProdutoAcao(
                        nome=nome,
                        acao_id=produto_antigo.acao_id,
                        un_medida=un_medida,
                        quantidade=quantidade,
                        ativo=True
                    )
                    db.session.add(novo_produto)
                    db.session.flush()

                    # Atualizar subações vinculadas
                    subacoes = SubacaoEntrega.query.filter_by(produto_id=produto_antigo.id, ativo=True).all()
                    for sub in subacoes:
                        sub.produto_id = novo_produto.id
                        sub.alterado_em = datetime.now()
            else:
                novo_produto = ProdutoAcao(
                    nome=nome,
                    acao_id=acao_id,
                    un_medida=un_medida,
                    quantidade=quantidade,
                    ativo=True
                )
                db.session.add(novo_produto)

            db.session.commit()

            acao = Acao.query.get_or_404(int(acao_id))
            return redirect(url_for('cadastrar_produto_acao', programa_id=acao.programa_id, acao_id=acao.id))


        # === EXCLUIR Produto da Ação (Soft Delete) ===
        @app.route('/excluir_produto_acao/<int:id>', methods=['POST'])
        def excluir_produto_acao(id):
            produto = ProdutoAcao.query.get_or_404(id)

            # Verificar se há subações vinculadas ativas
            subacoes = SubacaoEntrega.query.filter_by(produto_id=id, ativo=True).first()
            if subacoes:
                acao = Acao.query.get_or_404(produto.acao_id)
                flash('Não é possível excluir o produto. Existem subações/entregas ativas vinculadas a ele.', 'warning')
                return redirect(url_for('cadastrar_produto_acao', programa_id=acao.programa_id, acao_id=acao.id))

            # Exclusão lógica
            produto.ativo = False
            produto.excluido_em = datetime.now()
            db.session.commit()

            acao = Acao.query.get_or_404(produto.acao_id)
            flash('Produto da ação excluído com sucesso.', 'success')
            return redirect(url_for('cadastrar_produto_acao', programa_id=acao.programa_id, acao_id=acao.id))

        # === ETAPA 7: Visualização da Subação/Entrega ===
        @app.route('/subacoes_entrega/<int:programa_id>/<int:acao_id>/<int:produto_id>')
        def subacoes_entrega(programa_id, acao_id, produto_id):
            try:
                programa = _programa_do_exercicio_or_404(programa_id)
                acao = Acao.query.get_or_404(acao_id)
                produto = ProdutoAcao.query.get_or_404(produto_id)
                if acao.programa_id != programa.id or produto.acao_id != acao.id:
                    abort(404)
                registros = SubacaoEntrega.query.filter_by(produto_id=produto_id, ativo=True).all()
                subacao_ids = [r.id for r in registros]
                municipios = MunicipioEntrega.query.filter(
                    MunicipioEntrega.subacao_entrega_id.in_(subacao_ids)
                ).all()
                mensagem_popup = session.pop('mensagem_popup', None)
                return render_template(
                    "subacao_entrega.html",
                    programa=programa,
                    acao=acao,
                    produto=produto,
                    registros=registros,
                    municipios=municipios,
                    mensagem_popup=mensagem_popup
                )
            except Exception as e:
                import traceback
                traceback.print_exc()
                return f"<h3>❌ Erro no carregamento:</h3><pre>{e}</pre>", 500


        @app.route('/inserir_subacao_entrega', methods=['POST'])
        def inserir_subacao_entrega():
            try:
                subacao_id = request.form.get('subacao_id')
                produto_id = request.form.get('produto_id')

                quantidade_str = request.form.get("quantidade", "").replace(",", ".")
                try:
                    quantidade = float(quantidade_str) if quantidade_str else 0.0
                except ValueError:
                    return jsonify(sucesso=False, mensagem="Quantidade inválida."), 400

                regiao = request.form.get('regiao')
                subfuncao_ug = request.form.get('subfuncao_ug')
                adj = request.form.get('adj')
                macropolitica = request.form.get('macropolitica')
                pilar = request.form.get('pilar')
                eixo = request.form.get('eixo')
                politica_decreto = request.form.get('politica_decreto')
                publico_ods = request.form.get('publico_ods')
                subacao_entrega_raw = request.form.get('subacao_entrega')

                subacao_entrega_completo = (
                    f"* {regiao} * {subfuncao_ug} * {adj} * {macropolitica} * "
                    f"{pilar} * {eixo} * {politica_decreto} * {publico_ods} * {subacao_entrega_raw}"
                )

                dados = {
                    'subacao_entrega': subacao_entrega_completo,
                    'produto_subacao': request.form.get('produto_subacao'),
                    'unidade_gestora': request.form.get('unidade_gestora'),
                    'unidade_setorial': request.form.get('unidade_setorial'),
                    'unidade_medida': request.form.get('unidade_medida'),
                    'quantidade': quantidade,
                    'detalhamento': request.form.get('detalhamento'),
                    'responsavel': request.form.get('responsavel'),
                    'cpf': request.form.get('cpf'),
                    'email': request.form.get('email'),
                    'regiao': regiao,
                    'subfuncao_ug': subfuncao_ug,
                    'adj': adj,
                    'macropolitica': macropolitica,
                    'pilar': pilar,
                    'eixo': eixo,
                    'politica_decreto': politica_decreto,
                    'publico_ods': publico_ods,
                }

                municipios_json = request.form.get('municipios_json')
                if not municipios_json or municipios_json == "[]":
                    return jsonify(sucesso=False, mensagem="É obrigatório cadastrar ao menos um município antes de salvar a subação."), 400

                # Guardar id antigo (se for edição) para migrar etapas depois
                old_id = None

                if subacao_id:
                    registro_antigo = SubacaoEntrega.query.get_or_404(int(subacao_id))
                    old_id = registro_antigo.id
                    # inativa subação antiga
                    registro_antigo.ativo = False
                    registro_antigo.alterado_em = datetime.now()
                    # inativa municípios antigos
                    MunicipioEntrega.query.filter_by(
                        subacao_entrega_id=registro_antigo.id, ativo=True
                    ).update({
                        'ativo': False,
                        'alterado_em': datetime.now()
                    })
                else:
                    # verificação de duplicidade (apenas para novo)
                    subacao_existente = SubacaoEntrega.query.filter_by(
                        produto_id=produto_id,
                        regiao=regiao,
                        subfuncao_ug=subfuncao_ug,
                        adj=adj,
                        macropolitica=macropolitica,
                        pilar=pilar,
                        eixo=eixo,
                        politica_decreto=politica_decreto,
                        publico_ods=publico_ods,
                        subacao_entrega=subacao_entrega_completo,
                        ativo=True
                    ).first()
                    if subacao_existente:
                        return jsonify(sucesso=False, mensagem="❌ Já existe uma subação com a mesma chave de planejamento e nome."), 409

                # cria a nova subação
                novo_registro = SubacaoEntrega(**dados, produto_id=produto_id, ativo=True)
                db.session.add(novo_registro)
                db.session.commit()  # garante novo_registro.id

                # 🔁 Se era edição, MIGRAR ETAPAS ATIVAS para a nova subação
                if old_id:
                    etapas_antigas = Etapa.query.filter_by(subacao_entrega_id=old_id, ativo=True).all()
                    for e in etapas_antigas:
                        e.subacao_entrega_id = novo_registro.id
                        e.alterado_em = datetime.now()
                    db.session.commit()

                # recria municípios para a nova subação
                import json
                municipios = json.loads(municipios_json)
                for m in municipios:
                    novo_municipio = MunicipioEntrega(
                        subacao_entrega_id=novo_registro.id,
                        codigo_municipio=m.get('codigo') or m.get('codigo_municipio'),
                        nome_municipio=m.get('nome') or m.get('nome_municipio'),
                        un_medida=m.get('un_medida') or m.get('unidade_medida'),
                        quantidade=float(str(m.get('quantidade')).replace(",", ".")),
                        ativo=True,
                        alterado_em=datetime.now()
                    )
                    db.session.add(novo_municipio)
                db.session.commit()

                return jsonify(sucesso=True)

            except Exception as e:
                db.session.rollback()
                return jsonify(sucesso=False, mensagem=f"Erro ao salvar a Subação: {str(e)}"), 500


        @app.route('/subacao_entrega_json/<int:id>')
        def subacao_entrega_json(id):
            try:
                registro = SubacaoEntrega.query.get_or_404(id)
                municipios = MunicipioEntrega.query.filter_by(subacao_entrega_id=id).all()
                lista_municipios = [
                    {
                        "id": m.id,
                        "codigo": m.codigo_municipio,
                        "nome": m.nome_municipio,
                        "un_medida": m.un_medida,
                        "quantidade": str(m.quantidade).replace('.', ',')
                    }
                    for m in municipios
                ]

                produto = ProdutoAcao.query.get_or_404(registro.produto_id)
                acao = produto.acao
                programa = acao.programa

                dados = {
                    "id": registro.id,
                    "produto_subacao": registro.produto_subacao,
                    "unidade_gestora": registro.unidade_gestora,
                    "unidade_setorial": registro.unidade_setorial,
                    "un_medida": registro.unidade_medida,
                    "quantidade": str(registro.quantidade).replace('.', ','),
                    "detalhamento": registro.detalhamento,
                    "responsavel": registro.responsavel,
                    "cpf": registro.cpf,
                    "email": registro.email,
                    "regiao": registro.regiao,
                    "subfuncao_ug": registro.subfuncao_ug,
                    "adj": registro.adj,
                    "macropolitica": registro.macropolitica,
                    "pilar": registro.pilar,
                    "eixo": registro.eixo,
                    "politica_decreto": registro.politica_decreto,
                    "publico_ods": registro.publico_ods,
                    "subacao_entrega_raw": registro.subacao_entrega.split("*").pop().strip(),
                    "municipios": lista_municipios,
                    "produto": produto.nome,
                    "programa": f"{programa.id} - {programa.nome}",
                    "subfuncao": acao.subfuncao,
                    "paoe": acao.acao_paoe
                }

                return jsonify(dados)
            except Exception as e:
                import traceback
                traceback.print_exc()
                return jsonify({"erro": f"Erro ao carregar subação: {str(e)}"}), 500


        @app.route('/excluir_subacao_entrega/<int:id>', methods=['POST'])
        def excluir_subacao_entrega(id):
            try:
                registro = SubacaoEntrega.query.get_or_404(id)
                produto = ProdutoAcao.query.get_or_404(registro.produto_id)

                # 🚫 Bloquear exclusão se houver ETAPAS vinculadas ativas
                etapas_ativas = Etapa.query.filter_by(subacao_entrega_id=registro.id, ativo=True).count()
                if etapas_ativas > 0:
                    session['mensagem_popup'] = (
                        "❌ Não é possível excluir a Subação/Entrega: há Etapa(s) vinculadas. "
                        "Remova ou mova as Etapas antes de excluir."
                    )
                    return redirect(url_for(
                        'subacoes_entrega',
                        programa_id=produto.acao.programa.id,
                        acao_id=produto.acao.id,
                        produto_id=produto.id
                    ))

                # Caso não haja etapas ativas, permitir a exclusão (inativação)
                registro.ativo = False
                registro.excluido_em = datetime.now()

                # desativa municípios vinculados
                MunicipioEntrega.query.filter_by(
                    subacao_entrega_id=registro.id, ativo=True
                ).update({
                    'ativo': False,
                    'excluido_em': datetime.now()
                })

                db.session.commit()

                return redirect(url_for(
                    'subacoes_entrega',
                    programa_id=produto.acao.programa.id,
                    acao_id=produto.acao.id,
                    produto_id=produto.id
                ))
            except Exception as e:
                db.session.rollback()
                return f"<h3>❌ Erro ao excluir subação:</h3><pre>{str(e)}</pre>", 500
                        
        # Pagina Etapa 
        @app.route('/etapas/<int:programa_id>/<int:acao_id>/<int:produto_id>/<int:subacao_id>')
        def etapas(programa_id, acao_id, produto_id, subacao_id):
            try:
                programa = _programa_do_exercicio_or_404(programa_id)
                acao = Acao.query.get_or_404(acao_id)
                produto = ProdutoAcao.query.get_or_404(produto_id)
                subacao = SubacaoEntrega.query.get_or_404(subacao_id)
                if (
                    acao.programa_id != programa.id
                    or produto.acao_id != acao.id
                    or subacao.produto_id != produto.id
                ):
                    abort(404)
                etapas = (
                    Etapa.query
                    .filter_by(subacao_entrega_id=subacao.id, ativo=True)
                    .order_by(Etapa.id.asc())
                    .all()
                )
                municipios = (
                    MunicipioEntrega.query
                    .filter_by(subacao_entrega_id=subacao.id, ativo=True)
                    .filter(MunicipioEntrega.excluido_em.is_(None))
                    .order_by(MunicipioEntrega.codigo_municipio.asc(), MunicipioEntrega.nome_municipio.asc())
                    .all()
                )

                mensagem = session.pop('mensagem_popup', None)

                return render_template(
                    "etapa.html",
                    programa=programa,
                    acao=acao,
                    produto=produto,
                    subacao_entrega=subacao,
                    etapas=etapas,
                    municipios=municipios,
                    mensagem_popup=mensagem
                )

            except Exception as e:
                import traceback
                traceback.print_exc()
                return f"<h3>❌ Erro ao carregar a tela de Etapas:</h3><pre>{e}</pre>", 500


        @app.route('/inserir_etapa', methods=['POST'])
        def inserir_etapa():
            try:
                etapa_id = request.form.get("etapa_id")
                subacao_id = request.form.get("subacao_entrega_id")
                municipio_entrega_id = request.form.get("municipio_entrega_id")
                subacao = SubacaoEntrega.query.get_or_404(subacao_id)
                municipio = (
                    MunicipioEntrega.query
                    .filter_by(id=municipio_entrega_id, subacao_entrega_id=subacao.id, ativo=True)
                    .filter(MunicipioEntrega.excluido_em.is_(None))
                    .first()
                )
                if not municipio:
                    session['mensagem_popup'] = "Selecione um município válido para a etapa."
                    produto = ProdutoAcao.query.get_or_404(subacao.produto_id)
                    acao = Acao.query.get_or_404(produto.acao_id)
                    programa = _programa_do_exercicio_or_404(acao.programa_id)
                    return redirect(url_for(
                        'etapas',
                        programa_id=programa.id,
                        acao_id=acao.id,
                        produto_id=produto.id,
                        subacao_id=subacao.id
                    ))

                etapa_id_int = int(etapa_id) if etapa_id else None
                etapa_duplicada_query = Etapa.query.filter(
                    Etapa.subacao_entrega_id == subacao.id,
                    Etapa.municipio_entrega_id == municipio.id,
                    Etapa.ativo == True,
                    Etapa.excluido_em.is_(None)
                )
                if etapa_id_int:
                    etapa_duplicada_query = etapa_duplicada_query.filter(Etapa.id != etapa_id_int)
                if etapa_duplicada_query.first():
                    session['mensagem_popup'] = "Já existe uma etapa ativa vinculada a este município."
                    produto = ProdutoAcao.query.get_or_404(subacao.produto_id)
                    acao = Acao.query.get_or_404(produto.acao_id)
                    programa = _programa_do_exercicio_or_404(acao.programa_id)
                    return redirect(url_for(
                        'etapas',
                        programa_id=programa.id,
                        acao_id=acao.id,
                        produto_id=produto.id,
                        subacao_id=subacao.id
                    ))

                etapa_antiga = None
                if etapa_id_int:
                    etapa_antiga = Etapa.query.get_or_404(etapa_id_int)
                    etapa_antiga.ativo = False
                    etapa_antiga.alterado_em = datetime.now()
                    db.session.flush()

                nova_etapa = Etapa(
                    subacao_entrega_id=subacao.id,
                    municipio_entrega_id=municipio.id,
                    etapa_nome=_nome_etapa_com_municipio(request.form.get("etapa_nome"), municipio),
                    data_inicio=request.form.get("data_inicio"),
                    data_fim=request.form.get("data_fim"),
                    responsavel=request.form.get("responsavel"),
                    cpf=request.form.get("cpf"),
                    email=request.form.get("email"),
                    ativo=True,
                    alterado_em=datetime.now()
                )
                db.session.add(nova_etapa)
                db.session.flush()

                # Atualizar as memórias de cálculo da etapa antiga para a nova
                if etapa_antiga:
                    memorias = MemoriaCalculo.query.filter_by(etapa_id=etapa_antiga.id, ativo=True).all()
                    for memoria in memorias:
                        memoria.etapa_id = nova_etapa.id
                        memoria.alterado_em = datetime.now()

                db.session.commit()
                session['mensagem_popup'] = "Etapa salva com sucesso."

                produto = ProdutoAcao.query.get_or_404(subacao.produto_id)
                acao = Acao.query.get_or_404(produto.acao_id)
                programa = _programa_do_exercicio_or_404(acao.programa_id)

                return redirect(url_for('etapas',
                                        programa_id=programa.id,
                                        acao_id=acao.id,
                                        produto_id=produto.id,
                                        subacao_id=subacao.id))
            except Exception as e:
                db.session.rollback()
                import traceback
                traceback.print_exc()
                return f"<h3>❌ Erro ao salvar a etapa:</h3><pre>{e}</pre>", 500

        @app.route('/excluir_etapa/<int:id>', methods=['POST'])
        def excluir_etapa(id):
            try:
                etapa = Etapa.query.get_or_404(id)
                etapa.ativo = False
                etapa.excluido_em = datetime.now()
                db.session.commit()

                subacao = SubacaoEntrega.query.get_or_404(etapa.subacao_entrega_id)
                produto = ProdutoAcao.query.get_or_404(subacao.produto_id)
                acao = Acao.query.get_or_404(produto.acao_id)
                programa = _programa_do_exercicio_or_404(acao.programa_id)

                session['mensagem_popup'] = "✅ Etapa excluída com sucesso."

                return redirect(url_for(
                    'etapas',
                    programa_id=programa.id,
                    acao_id=acao.id,
                    produto_id=produto.id,
                    subacao_id=subacao.id
                ))

            except Exception as e:
                db.session.rollback()
                import traceback
                traceback.print_exc()
                return f"<h3>❌ Erro ao excluir a etapa:</h3><pre>{e}</pre>", 500
            
        # Pagina Memória de Cálculo    
        @app.route("/memoria_calculo/<int:programa_id>/<int:acao_id>/<int:produto_id>/<int:subacao_id>/<int:etapa_id>")
        def memoria_calculo(programa_id, acao_id, produto_id, subacao_id, etapa_id):
            try:
                programa = _programa_do_exercicio_or_404(programa_id)
                acao = Acao.query.get(acao_id)
                produto = ProdutoAcao.query.get(produto_id)
                subacao_entrega = SubacaoEntrega.query.get(subacao_id)
                etapa = Etapa.query.get(etapa_id)

                if not all([programa, acao, produto, subacao_entrega, etapa]):
                    raise Exception("Algum dos objetos está ausente no banco de dados.")

                if (
                    acao.programa_id != programa.id
                    or produto.acao_id != acao.id
                    or subacao_entrega.produto_id != produto.id
                    or etapa.subacao_entrega_id != subacao_entrega.id
                ):
                    abort(404)

                memorias = MemoriaCalculo.query.filter_by(etapa_id=etapa_id, ativo=True).all()

                mensagem = session.pop('mensagem_popup', None)

                return render_template(
                    "memoria_calculo.html",
                    programa=programa,
                    acao=acao,
                    produto=produto,
                    subacao_entrega=subacao_entrega,
                    etapa=etapa,
                    memorias=memorias,
                    mensagem_popup=mensagem
                )

            except Exception as e:
                return f"<h3>❌ Erro ao carregar a Memória de Cálculo:</h3><pre>{str(e)}</pre>"

        @app.route("/inserir_memoria", methods=["POST"])
        def inserir_memoria():
            memoria_id = request.form.get("memoria_id")
            etapa_id = request.form.get("etapa_id")

            def parse_float(valor_str):
                if not valor_str:
                    return 0.0
                valor_str = valor_str.strip()
                if ',' in valor_str and '.' in valor_str:
                    valor_str = valor_str.replace('.', '').replace(',', '.')
                elif ',' in valor_str:
                    valor_str = valor_str.replace(',', '.')
                try:
                    return float(valor_str)
                except ValueError:
                    return 0.0

            dados = {
                'itens_despesa': request.form.get("itens_despesa"),
                'unidade_medida': request.form.get("unidade_medida"),
                'quantidade': parse_float(request.form.get("quantidade_real")),
                'valor_unitario': parse_float(request.form.get("valor_unitario_real")),
                'valor_total': parse_float(request.form.get("valor_total_real")),
                'categoria_economica': request.form.get("categoria_economica"),
                'grupo_despesa': request.form.get("grupo_despesa"),
                'modalidade': request.form.get("modalidade"),
                'elemento_despesa': request.form.get("elemento_despesa"),
                'subelemento': request.form.get("subelemento"),
                'fonte_recursos': request.form.get("fonte_recursos"),
                'identificador_uso': request.form.get("identificador_uso"),
                'legislacao': request.form.get("legislacao"),
            }

            if memoria_id:
                memoria = MemoriaCalculo.query.get(memoria_id)
                for campo, valor in dados.items():
                    setattr(memoria, campo, valor)
                memoria.alterado_em = datetime.utcnow()
            else:
                memoria = MemoriaCalculo(etapa_id=etapa_id, **dados)
                memoria.ativo = True
                db.session.add(memoria)

            db.session.commit()
            session['mensagem_popup'] = "Memória de Cálculo salva com sucesso."

            etapa = Etapa.query.get(etapa_id)
            subacao = SubacaoEntrega.query.get(etapa.subacao_entrega_id)
            produto = ProdutoAcao.query.get(subacao.produto_id)
            acao = Acao.query.get(produto.acao_id)
            programa = _programa_do_exercicio_or_404(acao.programa_id)

            return redirect(url_for("memoria_calculo",
                programa_id=programa.id,
                acao_id=acao.id,
                produto_id=produto.id,
                subacao_id=subacao.id,
                etapa_id=etapa.id
            ))

        @app.route("/excluir_memoria/<int:id>", methods=["POST"])
        def excluir_memoria(id):
            memoria = MemoriaCalculo.query.get_or_404(id)
            memoria.ativo = False
            memoria.excluido_em = datetime.utcnow()
            db.session.commit()

            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return '', 204

            etapa = Etapa.query.get(memoria.etapa_id)
            subacao = SubacaoEntrega.query.get(etapa.subacao_entrega_id)
            produto = ProdutoAcao.query.get(subacao.produto_id)
            acao = Acao.query.get(produto.acao_id)
            programa = _programa_do_exercicio_or_404(acao.programa_id)

            return redirect(url_for("memoria_calculo",
                programa_id=programa.id,
                acao_id=acao.id,
                produto_id=produto.id,
                subacao_id=subacao.id,
                etapa_id=etapa.id
            ))
        
        # Pagina Visualizar PTA
        @app.route('/visualizar')
        def visualizar_pta():
            dados = (
                db.session.query(
                    Programa.exercicio.label("exercicio"),
                    Programa.nome.label("programa_nome"),
                    Programa.funcao,
                    Programa.responsavel.label("programa_responsavel"),
                    Programa.cpf.label("programa_cpf"),
                    Programa.email.label("programa_email"),

                    Acao.subfuncao,
                    Acao.acao_paoe,
                    Acao.responsavel.label("acao_responsavel"),
                    Acao.cpf.label("acao_cpf"),
                    Acao.email.label("acao_email"),

                    ProdutoAcao.nome.label("produto_nome"),
                    ProdutoAcao.un_medida,
                    ProdutoAcao.quantidade.label("produto_quantidade"),

                    SubacaoEntrega.subacao_entrega,
                    SubacaoEntrega.produto_subacao,
                    SubacaoEntrega.unidade_gestora,
                    SubacaoEntrega.unidade_setorial,
                    SubacaoEntrega.unidade_medida,
                    SubacaoEntrega.quantidade.label("subacao_quantidade"),
                    SubacaoEntrega.detalhamento,
                    SubacaoEntrega.responsavel.label("subacao_responsavel"),
                    SubacaoEntrega.cpf.label("subacao_cpf"),
                    SubacaoEntrega.email.label("subacao_email"),
                    SubacaoEntrega.regiao,
                    SubacaoEntrega.subfuncao_ug,
                    SubacaoEntrega.adj,
                    SubacaoEntrega.macropolitica,
                    SubacaoEntrega.pilar,
                    SubacaoEntrega.eixo,
                    SubacaoEntrega.politica_decreto,
                    SubacaoEntrega.publico_ods,

                    MunicipioEntrega.codigo_municipio,
                    MunicipioEntrega.nome_municipio,
                    MunicipioEntrega.un_medida.label("municipio_un"),
                    MunicipioEntrega.quantidade.label("municipio_quantidade"),

                    Etapa.etapa_nome,
                    Etapa.data_inicio,
                    Etapa.data_fim,
                    Etapa.responsavel.label("etapa_responsavel"),
                    Etapa.cpf.label("etapa_cpf"),
                    Etapa.email.label("etapa_email"),

                    MemoriaCalculo.itens_despesa,
                    MemoriaCalculo.unidade_medida,
                    MemoriaCalculo.quantidade.label("memoria_quantidade"),
                    MemoriaCalculo.valor_unitario,
                    MemoriaCalculo.valor_total,
                    MemoriaCalculo.categoria_economica,
                    MemoriaCalculo.grupo_despesa,
                    MemoriaCalculo.modalidade,
                    MemoriaCalculo.elemento_despesa,
                    MemoriaCalculo.subelemento,
                    MemoriaCalculo.fonte_recursos,
                    MemoriaCalculo.identificador_uso,
                    MemoriaCalculo.legislacao,
                )
                .outerjoin(Acao, Acao.programa_id == Programa.id)
                .outerjoin(ProdutoAcao, ProdutoAcao.acao_id == Acao.id)
                .outerjoin(SubacaoEntrega, SubacaoEntrega.produto_id == ProdutoAcao.id)
                .outerjoin(Etapa, Etapa.subacao_entrega_id == SubacaoEntrega.id)
                .outerjoin(MunicipioEntrega, _municipio_join_condition_for_report())
                .outerjoin(MemoriaCalculo, MemoriaCalculo.etapa_id == Etapa.id)
                .filter(
                    Programa.ativo == True,
                    Programa.exercicio == _pta_exercicio_atual(),
                    (Acao.ativo == True) | (Acao.id == None),
                    (ProdutoAcao.ativo == True) | (ProdutoAcao.id == None),
                    (SubacaoEntrega.ativo == True) | (SubacaoEntrega.id == None),
                    (MunicipioEntrega.ativo == True) | (MunicipioEntrega.id == None),
                    (Etapa.ativo == True) | (Etapa.id == None),
                    (MemoriaCalculo.ativo == True) | (MemoriaCalculo.id == None)
                )
                .all()
            )

            dados_formatados = []
            for d in dados:
                item = d._asdict()
                if item.get('valor_unitario') is not None:
                    item['valor_unitario'] = f"{item['valor_unitario']:,.2f}".replace(",", "v").replace(".", ",").replace("v", ".")
                if item.get('valor_total') is not None:
                    item['valor_total'] = f"{item['valor_total']:,.2f}".replace(",", "v").replace(".", ",").replace("v", ".")
                dados_formatados.append(item)

            return render_template("visualizar_pta.html", dados=dados_formatados)

        # ========= Colunas com cabeçalho amarelo (quando existirem) =========
        HIGHLIGHT_COLUMNS = {
            "Programa", "Função", "Subfunção", "Ação PAOE", "Subação", "UG",
            "Região", "Subfunção UG", "ADJ", "Macropolítica", "Pilar", "Eixo",
            "Política Decreto", "Público Transversal", "Etapa", "Valor Total",
            "Categoria Econômica", "Grupo de Despesa", "Modalidade",
            "Elemento Despesa", "Subelemento", "Fonte de Recursos"
        }

        # ========= Helpers de consulta (montam DataFrame) =========
        def _df_municipios():
            dados = (
                db.session.query(
                    Programa.exercicio.label("Exercicio"),
                    Programa.nome.label("Programa"),
                    Programa.funcao.label("Função"),
                    Programa.responsavel.label("Responsável Programa"),
                    Programa.cpf.label("CPF Programa"),
                    Programa.email.label("E-mail Programa"),

                    Acao.subfuncao.label("Subfunção"),
                    Acao.acao_paoe.label("Ação PAOE"),
                    Acao.responsavel.label("Responsável Ação"),
                    Acao.cpf.label("CPF Ação"),
                    Acao.email.label("E-mail Ação"),

                    ProdutoAcao.nome.label("Produto da Ação"),
                    ProdutoAcao.un_medida.label("Un. Medida Produto"),
                    ProdutoAcao.quantidade.label("Qtd. Produto"),

                    SubacaoEntrega.subacao_entrega.label("Subação"),
                    SubacaoEntrega.produto_subacao.label("Produto Subação"),
                    SubacaoEntrega.unidade_gestora.label("UG"),
                    SubacaoEntrega.unidade_setorial.label("US"),
                    SubacaoEntrega.unidade_medida.label("Un. Medida Sub."),
                    SubacaoEntrega.quantidade.label("Qtd. Subação"),
                    SubacaoEntrega.detalhamento.label("Detalhamento"),
                    SubacaoEntrega.responsavel.label("Responsável Subação"),
                    SubacaoEntrega.cpf.label("CPF Subação"),
                    SubacaoEntrega.email.label("E-mail Subação"),
                    SubacaoEntrega.regiao.label("Região"),
                    SubacaoEntrega.subfuncao_ug.label("Subfunção UG"),
                    SubacaoEntrega.adj.label("ADJ"),
                    SubacaoEntrega.macropolitica.label("Macropolítica"),
                    SubacaoEntrega.pilar.label("Pilar"),
                    SubacaoEntrega.eixo.label("Eixo"),
                    SubacaoEntrega.politica_decreto.label("Política Decreto"),
                    SubacaoEntrega.publico_ods.label("Público Transversal"),

                    MunicipioEntrega.codigo_municipio.label("Código Município"),
                    MunicipioEntrega.nome_municipio.label("Nome Município"),
                    MunicipioEntrega.un_medida.label("Un. Medida Município"),
                    MunicipioEntrega.quantidade.label("Qtd. Município"),
                )
                .outerjoin(Acao, Acao.programa_id == Programa.id)
                .outerjoin(ProdutoAcao, ProdutoAcao.acao_id == Acao.id)
                .outerjoin(SubacaoEntrega, SubacaoEntrega.produto_id == ProdutoAcao.id)
                .outerjoin(MunicipioEntrega, MunicipioEntrega.subacao_entrega_id == SubacaoEntrega.id)
                .filter(
                    Programa.ativo == True,
                    Programa.exercicio == _pta_exercicio_atual(),
                    (Acao.ativo == True) | (Acao.id == None),
                    (ProdutoAcao.ativo == True) | (ProdutoAcao.id == None),
                    (SubacaoEntrega.ativo == True) | (SubacaoEntrega.id == None),
                    (MunicipioEntrega.ativo == True) | (MunicipioEntrega.id == None),
                )
                .all()
            )
            return pd.DataFrame([d._asdict() for d in dados])

        def _df_etapas_memoria():
            dados = (
                db.session.query(
                    Programa.exercicio.label("Exercicio"),
                    Programa.nome.label("Programa"),
                    Programa.funcao.label("Função"),
                    Programa.responsavel.label("Responsável Programa"),
                    Programa.cpf.label("CPF Programa"),
                    Programa.email.label("E-mail Programa"),

                    Acao.subfuncao.label("Subfunção"),
                    Acao.acao_paoe.label("Ação PAOE"),
                    Acao.responsavel.label("Responsável Ação"),
                    Acao.cpf.label("CPF Ação"),
                    Acao.email.label("E-mail Ação"),

                    ProdutoAcao.nome.label("Produto da Ação"),
                    ProdutoAcao.un_medida.label("Un. Medida Produto"),
                    ProdutoAcao.quantidade.label("Qtd. Produto"),

                    SubacaoEntrega.subacao_entrega.label("Subação"),
                    SubacaoEntrega.produto_subacao.label("Produto Subação"),
                    SubacaoEntrega.unidade_gestora.label("UG"),
                    SubacaoEntrega.unidade_setorial.label("US"),
                    SubacaoEntrega.unidade_medida.label("Un. Medida Sub."),
                    SubacaoEntrega.quantidade.label("Qtd. Subação"),
                    SubacaoEntrega.detalhamento.label("Detalhamento"),
                    SubacaoEntrega.responsavel.label("Responsável Subação"),
                    SubacaoEntrega.cpf.label("CPF Subação"),
                    SubacaoEntrega.email.label("E-mail Subação"),
                    SubacaoEntrega.regiao.label("Região"),
                    SubacaoEntrega.subfuncao_ug.label("Subfunção UG"),
                    SubacaoEntrega.adj.label("ADJ"),
                    SubacaoEntrega.macropolitica.label("Macropolítica"),
                    SubacaoEntrega.pilar.label("Pilar"),
                    SubacaoEntrega.eixo.label("Eixo"),
                    SubacaoEntrega.politica_decreto.label("Política Decreto"),
                    SubacaoEntrega.publico_ods.label("Público Transversal"),

                    MunicipioEntrega.codigo_municipio.label("Código Município"),
                    MunicipioEntrega.nome_municipio.label("Nome Município"),
                    MunicipioEntrega.un_medida.label("Un. Medida Município"),
                    MunicipioEntrega.quantidade.label("Qtd. Município"),

                    Etapa.etapa_nome.label("Etapa"),
                    Etapa.data_inicio.label("Data Início"),
                    Etapa.data_fim.label("Data Fim"),
                    Etapa.responsavel.label("Responsável Etapa"),
                    Etapa.cpf.label("CPF Etapa"),
                    Etapa.email.label("E-mail Etapa"),

                    MemoriaCalculo.itens_despesa.label("Item Despesa"),
                    MemoriaCalculo.unidade_medida.label("Un. Medida Memória"),
                    MemoriaCalculo.quantidade.label("Qtd. Memória"),
                    MemoriaCalculo.valor_unitario.label("Valor Unitário"),
                    MemoriaCalculo.valor_total.label("Valor Total"),
                    MemoriaCalculo.categoria_economica.label("Categoria Econômica"),
                    MemoriaCalculo.grupo_despesa.label("Grupo de Despesa"),
                    MemoriaCalculo.modalidade.label("Modalidade"),
                    MemoriaCalculo.elemento_despesa.label("Elemento Despesa"),
                    MemoriaCalculo.subelemento.label("Subelemento"),
                    MemoriaCalculo.fonte_recursos.label("Fonte de Recursos"),
                    MemoriaCalculo.identificador_uso.label("ID Uso"),
                    MemoriaCalculo.legislacao.label("Legislação"),
                )
                .outerjoin(Acao, Acao.programa_id == Programa.id)
                .outerjoin(ProdutoAcao, ProdutoAcao.acao_id == Acao.id)
                .outerjoin(SubacaoEntrega, SubacaoEntrega.produto_id == ProdutoAcao.id)
                .outerjoin(Etapa, Etapa.subacao_entrega_id == SubacaoEntrega.id)
                .outerjoin(MunicipioEntrega, _municipio_join_condition_for_report())
                .outerjoin(MemoriaCalculo, MemoriaCalculo.etapa_id == Etapa.id)
                .filter(
                    Programa.ativo == True,
                    Programa.exercicio == _pta_exercicio_atual(),
                    (Acao.ativo == True) | (Acao.id == None),
                    (ProdutoAcao.ativo == True) | (ProdutoAcao.id == None),
                    (SubacaoEntrega.ativo == True) | (SubacaoEntrega.id == None),
                    (MunicipioEntrega.ativo == True) | (MunicipioEntrega.id == None),
                    (Etapa.ativo == True) | (Etapa.id == None),
                    (MemoriaCalculo.ativo == True) | (MemoriaCalculo.id == None)
                )
                .all()
            )
            return pd.DataFrame([d._asdict() for d in dados])

        # ========= Helper: escreve UMA planilha estilizada dentro de um writer aberto =========
        def _write_sheet_styled(writer: pd.ExcelWriter, df: pd.DataFrame, sheet_name: str):
            # 1) Normaliza números para permitir formatação no Excel (sem "R$")
            for money_col in ["Valor Unitário", "Valor Total"]:
                if money_col in df.columns:
                    df[money_col] = pd.to_numeric(df[money_col], errors="coerce")

            # 2) Datas só com dia/mês/ano (como texto "dd/mm/yyyy" para garantir sem hora)
            for date_col in ["Data Início", "Data Fim"]:
                if date_col in df.columns:
                    ser = pd.to_datetime(df[date_col], errors="coerce")
                    df[date_col] = ser.dt.strftime("%d/%m/%Y").fillna("")

            # --- escreve a planilha ---
            df.to_excel(writer, sheet_name=sheet_name, index=False)

            wb = writer.book
            ws = writer.sheets[sheet_name]

            base_fmt = wb.add_format({"font_name": "Helvetica", "font_size": 8})
            header_fmt = wb.add_format({
                "font_name": "Helvetica", "font_size": 8, "bold": True,
                "align": "center", "valign": "vcenter", "text_wrap": True, "border": 1
            })
            yellow_header_fmt = wb.add_format({
                "font_name": "Helvetica", "font_size": 8, "bold": True,
                "align": "center", "valign": "vcenter", "text_wrap": True,
                "bg_color": "#FFD966", "font_color": "#000000", "border": 1
            })
            # >>> sem "R$"
            money_fmt = wb.add_format({"font_name": "Helvetica", "font_size": 8,
                                    "num_format": '#,##0.00'})
            # manteremos o date_fmt caso queira mudar para datas nativas no futuro
            date_fmt = wb.add_format({"font_name": "Helvetica", "font_size": 8,
                                    "num_format": "dd/mm/yyyy"})

            ncols = max(len(df.columns) - 1, 0)
            ws.set_column(0, ncols, 18, base_fmt)

            # Reaplica cabeçalhos estilizados (amarelo para colunas destacadas)
            for c, col in enumerate(df.columns):
                fmt = yellow_header_fmt if col in HIGHLIGHT_COLUMNS else header_fmt
                ws.write(0, c, col, fmt)

            # Formatação por coluna conhecida
            colmap = {c: i for i, c in enumerate(df.columns)}
            for money_col in ["Valor Unitário", "Valor Total"]:
                if money_col in colmap:
                    idx = colmap[money_col]
                    ws.set_column(idx, idx, 14, money_fmt)
            # (datas agora são texto já sem hora; manter largura agradável)
            for date_col in ["Data Início", "Data Fim"]:
                if date_col in colmap:
                    idx = colmap[date_col]
                    ws.set_column(idx, idx, 12)  # sem formato numérico, pois já é string

            ws.autofilter(0, 0, len(df), ncols)
            ws.freeze_panes(1, 0)

        # =============================================================================
        # ROTA LEGACY — mantém o link existente no template (/baixar_excel)
        # Gera UM arquivo com UMA aba consolidada, sem multiplicar memoria por municipio.
        # =============================================================================
        @app.route('/baixar_excel')
        def baixar_excel():
            df = _df_etapas_memoria()

            output = io.BytesIO()
            with pd.ExcelWriter(output, engine="xlsxwriter") as writer:
                _write_sheet_styled(writer, df, "PTA Consolidado")
            output.seek(0)

            return send_file(
                output,
                as_attachment=True,
                download_name="pta.xlsx",
                mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )

        # =============================================================================
        # ROTAS OPCIONAIS — arquivos separados, caso queira botões específicos
        # =============================================================================
        @app.route('/baixar_excel_municipios')
        def baixar_excel_municipios():
            df = _df_municipios()
            output = io.BytesIO()
            with pd.ExcelWriter(output, engine="xlsxwriter") as writer:
                _write_sheet_styled(writer, df, "Subação x Municípios")
            output.seek(0)
            return send_file(
                output,
                as_attachment=True,
                download_name="pta_municipios.xlsx",
                mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )

        @app.route('/baixar_excel_etapas')
        def baixar_excel_etapas():
            df = _df_etapas_memoria()
            output = io.BytesIO()
            with pd.ExcelWriter(output, engine="xlsxwriter") as writer:
                _write_sheet_styled(writer, df, "Etapas x Memória")
            output.seek(0)
            return send_file(
                output,
                as_attachment=True,
                download_name="pta_etapas_memoria.xlsx",
                mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )

        # Usuários online
        @app.before_request
        def registrar_usuario_online():
            session.permanent = True
            if 'usuario_id' not in session:
                session['usuario_id'] = str(uuid.uuid4())
            
            usuarios_online[session['usuario_id']] = datetime.now()

            # Remove inativos há mais de 5 minutos
            limite = datetime.now() - timedelta(minutes=5)
            inativos = [uid for uid, t in usuarios_online.items() if t < limite]
            for uid in inativos:
                usuarios_online.pop(uid, None)

        @app.route('/usuarios_online')
        def get_usuarios_online():
            return {'total_online': len(usuarios_online)}

        # painel de acompanhamento PTA
        @app.route('/dashboard_status')
        def dashboard_status():
            etapa_exists = (
                db.session.query(Etapa.id)
                .filter(
                    Etapa.municipio_entrega_id == MunicipioEntrega.id,
                    Etapa.ativo == True,
                    Etapa.excluido_em.is_(None),
                )
            )

            subacoes_sem_etapa_query = (
                db.session.query(
                    SubacaoEntrega.subacao_entrega.label("subacao"),
                    ProdutoAcao.nome.label("produto"),
                    Acao.acao_paoe.label("acao"),
                    Programa.nome.label("programa"),
                    MunicipioEntrega.codigo_municipio.label("codigo_municipio"),
                    MunicipioEntrega.nome_municipio.label("nome_municipio"),
                )
                .join(MunicipioEntrega, MunicipioEntrega.subacao_entrega_id == SubacaoEntrega.id)
                .join(ProdutoAcao, ProdutoAcao.id == SubacaoEntrega.produto_id)
                .join(Acao, Acao.id == ProdutoAcao.acao_id)
                .join(Programa, Programa.id == Acao.programa_id)
                .filter(
                    SubacaoEntrega.ativo == True,
                    SubacaoEntrega.excluido_em.is_(None),
                    MunicipioEntrega.ativo == True,
                    MunicipioEntrega.excluido_em.is_(None),
                    ProdutoAcao.ativo == True,
                    ProdutoAcao.excluido_em.is_(None),
                    Acao.ativo == True,
                    Acao.excluido_em.is_(None),
                    Programa.ativo == True,
                    Programa.excluido_em.is_(None),
                    Programa.exercicio == _pta_exercicio_atual(),
                    not_(etapa_exists.exists()),
                )
                .all()
            )

            subacoes_sem_etapa_detalhes = [
                {
                    "subacao": r.subacao,
                    "produto": r.produto,
                    "acao": r.acao,
                    "programa": r.programa,
                    "municipio": f"{r.codigo_municipio} - {r.nome_municipio}",
                }
                for r in subacoes_sem_etapa_query
            ]

            return jsonify({
                "exercicio": _pta_exercicio_atual(),
                "programas": db.session.query(Programa).filter(
                    Programa.ativo == True,
                    Programa.excluido_em.is_(None),
                    Programa.exercicio == _pta_exercicio_atual()
                ).count(),
                "acoes": db.session.query(Acao).join(Programa, Programa.id == Acao.programa_id).filter(
                    Acao.ativo == True,
                    Acao.excluido_em.is_(None),
                    Programa.ativo == True,
                    Programa.exercicio == _pta_exercicio_atual()
                ).count(),
                "produtos": db.session.query(ProdutoAcao)
                .join(Acao, Acao.id == ProdutoAcao.acao_id)
                .join(Programa, Programa.id == Acao.programa_id)
                .filter(
                    ProdutoAcao.ativo == True,
                    ProdutoAcao.excluido_em.is_(None),
                    Acao.ativo == True,
                    Programa.ativo == True,
                    Programa.exercicio == _pta_exercicio_atual()
                ).count(),
                "subacoes": db.session.query(SubacaoEntrega)
                .join(ProdutoAcao, ProdutoAcao.id == SubacaoEntrega.produto_id)
                .join(Acao, Acao.id == ProdutoAcao.acao_id)
                .join(Programa, Programa.id == Acao.programa_id)
                .filter(
                    SubacaoEntrega.ativo == True,
                    SubacaoEntrega.excluido_em.is_(None),
                    ProdutoAcao.ativo == True,
                    Acao.ativo == True,
                    Programa.ativo == True,
                    Programa.exercicio == _pta_exercicio_atual()
                ).count(),
                "etapas": db.session.query(Etapa)
                .join(SubacaoEntrega, SubacaoEntrega.id == Etapa.subacao_entrega_id)
                .join(ProdutoAcao, ProdutoAcao.id == SubacaoEntrega.produto_id)
                .join(Acao, Acao.id == ProdutoAcao.acao_id)
                .join(Programa, Programa.id == Acao.programa_id)
                .filter(
                    Etapa.ativo == True,
                    Etapa.excluido_em.is_(None),
                    SubacaoEntrega.ativo == True,
                    ProdutoAcao.ativo == True,
                    Acao.ativo == True,
                    Programa.ativo == True,
                    Programa.exercicio == _pta_exercicio_atual()
                ).count(),
                # alinhei memória ao mesmo critério de exclusão lógica
                "memorias": db.session.query(MemoriaCalculo)
                .join(Etapa, Etapa.id == MemoriaCalculo.etapa_id)
                .join(SubacaoEntrega, SubacaoEntrega.id == Etapa.subacao_entrega_id)
                .join(ProdutoAcao, ProdutoAcao.id == SubacaoEntrega.produto_id)
                .join(Acao, Acao.id == ProdutoAcao.acao_id)
                .join(Programa, Programa.id == Acao.programa_id)
                .filter(
                    MemoriaCalculo.ativo == True,
                    MemoriaCalculo.excluido_em.is_(None),
                    Etapa.ativo == True,
                    SubacaoEntrega.ativo == True,
                    ProdutoAcao.ativo == True,
                    Acao.ativo == True,
                    Programa.ativo == True,
                    Programa.exercicio == _pta_exercicio_atual()
                ).count(),
                "subacoes_sem_etapa": len(subacoes_sem_etapa_detalhes),
                "subacoes_sem_etapa_detalhes": subacoes_sem_etapa_detalhes,
            })

        # Teto Orçamentário
        @app.route("/teto_orcamentario")
        def teto_orcamentario():
            return render_template("teto_orcamentario.html")
        
        # cadastrar momp
        @app.route("/cadastrar_momp")
        def cadastrar_momp():
            momps = Momp.query.filter_by(ativo=True).all()
            mensagem_popup = session.pop("mensagem_popup", None)
            return render_template("cadastrar_momp.html", momps=momps, mensagem_popup=mensagem_popup)

        @app.route("/inserir_momp", methods=["POST"])
        def inserir_momp():
            data = request.form.to_dict(flat=True)

            print("📥 Dados recebidos no formulário:", data)

            # Função para tratar valor numérico
            def parse_decimal(valor_str):
                if not valor_str:
                    return Decimal("0.00")
                valor_str = valor_str.strip()
                try:
                    if ',' in valor_str and '.' in valor_str:
                        valor_str = valor_str.replace('.', '').replace(',', '.')
                    elif ',' in valor_str:
                        valor_str = valor_str.replace(',', '.')
                    return Decimal(valor_str).quantize(Decimal("0.01"))
                except (InvalidOperation, ValueError):
                    return Decimal("0.00")

            antigo = None
            if data.get("id"):
                antigo = Momp.query.get(int(data["id"]))
                if antigo:
                    antigo.ativo = False
                    antigo.alterado_em = datetime.now()

            teto_valor = parse_decimal(data.get("teto_anual_real"))
            print("✅ Valor convertido para teto_anual:", teto_valor)

            novo = Momp(
                exercicio=data.get("exercicio"),
                fonte=data.get("fonte"),
                grupo_despesa=data.get("grupo_despesa"),
                teto_despesa_momp=data.get("teto_despesa_momp"),
                subteto_despesa_momp=data.get("subteto_despesa_momp"),
                teto_anual=teto_valor,
                ativo=True,
                alterado_em=datetime.now()
            )

            db.session.add(novo)
            db.session.flush()  # 🟢 Para obter novo.id antes do commit

            # 🔁 Atualiza vínculos na tabela PoliticaTeto
            if antigo:
                politicas_vinculadas = PoliticaTeto.query.filter_by(momp_id=antigo.id, ativo=True).all()
                for politica in politicas_vinculadas:
                    politica.momp_id = novo.id

            db.session.commit()

            session['mensagem_popup'] = "Registro da Fonte salvo com sucesso."
            return redirect(url_for("cadastrar_momp"))

        @app.route("/excluir_momp/<int:id>", methods=["POST"])
        def excluir_momp(id):
            momp = Momp.query.get(id)
            if momp:
                vinculo = PoliticaTeto.query.filter_by(momp_id=id, ativo=True).first()
                if vinculo:
                    return jsonify({"success": False, "message": "❌ Esta Fonte está vinculada a uma Política de Teto ativa e não pode ser excluído."})
                momp.ativo = False
                momp.excluido_em = datetime.now()
                db.session.commit()
                return jsonify({"success": True, "message": "✅ Registro da Fonte excluída com sucesso."})
            return jsonify({"success": False, "message": "❌ Registro da Fonte não encontrada."})

        @app.route("/filtrar_momp", methods=["POST"])
        def filtrar_momp():
            payload = request.get_json(silent=True) or {}
            criterios = payload.get("criterios", [])

            # precisa ter Exercício quando houver outros campos
            tem_outros = any((c.get("campo") or "").strip().lower() != "exercicio" for c in criterios)
            tem_exercicio = any((c.get("campo") or "").strip().lower() == "exercicio" for c in criterios)
            if tem_outros and not tem_exercicio:
                return jsonify({"success": False, "message": "Para aplicar outros filtros, informe ao menos um critério de Exercício."}), 400

            field_map = {
                "exercicio": Momp.exercicio,
                "fonte": Momp.fonte,
                "grupo de despesa": Momp.grupo_despesa,
                "grupo_despesa": Momp.grupo_despesa,               # aceita os dois
                "teto de despesa momp": Momp.teto_despesa_momp,
                "teto_despesa_momp": Momp.teto_despesa_momp,
                "subteto de despesa momp": Momp.subteto_despesa_momp,
                "subteto_despesa_momp": Momp.subteto_despesa_momp,
            }

            filtros = [Momp.ativo == 1]  # não use is_(True) se a coluna for int

            for c in criterios:
                campo = (c.get("campo") or "").strip().lower()
                operador = (c.get("operador") or "").strip().lower()
                valor = (c.get("valor") or "").strip()

                col = field_map.get(campo)
                if not col or not valor:
                    continue

                # normaliza operador
                if operador in ("=", "==", "igual", "igual a"):
                    op = "igual"
                elif operador in ("contem", "contém", "like", "possui"):
                    op = "contem"
                else:
                    op = "igual"

                if op == "igual":
                    if campo == "exercicio":
                        try:
                            filtros.append(col == int(valor))
                        except ValueError:
                            pass
                    elif campo == "fonte":
                        # permite digitar só o código da fonte
                        filtros.append(func.lower(cast(col, String)).like(f"{valor.lower()}%"))
                    else:
                        filtros.append(col == valor)

                elif op == "contem":
                    filtros.append(func.lower(cast(col, String)).like(f"%{valor.lower()}%"))

            query = (Momp.query
                    .filter(and_(*filtros))
                    .order_by(Momp.exercicio.desc(), Momp.fonte.asc()))
            resultados = query.all()

            def fmt_brl(x):
                try:
                    return ("{:,.2f}".format(float(x)).replace(",", "v").replace(".", ",").replace("v", "."))
                except Exception:
                    return "0,00"

            rows = [{
                "id": m.id,
                "exercicio": str(m.exercicio or ""),
                "fonte": m.fonte or "",
                "grupo_despesa": m.grupo_despesa or "",
                "teto_despesa_momp": m.teto_despesa_momp or "",
                "subteto_despesa_momp": m.subteto_despesa_momp or "",
                "teto_anual_fmt": fmt_brl(m.teto_anual or 0),
            } for m in resultados]

            return jsonify({"success": True, "rows": rows})

        # Cadastrar Politica Teto
        @app.route("/politicateto")
        def politicateto():
            momp_id_selecionado = request.args.get("momp_id", type=int)

            momps = Momp.query.filter_by(ativo=True).all()
            politicas = []

            momp = None

            # Se usuário selecionou explicitamente um momp_id
            if momp_id_selecionado:
                momp = Momp.query.get(momp_id_selecionado)
                politicas = PoliticaTeto.query.filter_by(ativo=True, momp_id=momp_id_selecionado).all()
                print(f"🔍 MOMP selecionado via URL: ID={momp_id_selecionado}")
            elif momps:
                momp = momps[0]
                politicas = PoliticaTeto.query.filter_by(ativo=True, momp_id=momp.id).all()
                print(f"🔍 Nenhum momp_id passado. Usando primeiro MOMP: ID={momp.id}")
            else:
                print("❌ Nenhum MOMP disponível.")

            # Cálculo do saldo anual
            saldo_anual = None
            soma_tetos = 0
            if momp:
                tetos = db.session.query(func.sum(PoliticaTeto.teto_politica_decreto))\
                    .filter(PoliticaTeto.momp_id == momp.id, PoliticaTeto.ativo == True)\
                    .scalar() or 0
                soma_tetos = round(tetos, 2)
                saldo_anual = round(momp.teto_anual - soma_tetos, 2)

                print(f"✅ Dados do MOMP:\n"
                    f" - Fonte: {momp.fonte}\n"
                    f" - Grupo de Despesa: {momp.grupo_despesa}\n"
                    f" - Teto: {momp.teto_despesa_momp}\n"
                    f" - Subteto: {momp.subteto_despesa_momp}\n"
                    f" - Teto Anual: {momp.teto_anual}")
                print(f"💰 Soma dos tetos decretos: {soma_tetos}")
                print(f"📊 Saldo Anual calculado: {saldo_anual}")

            return render_template(
                "politicateto.html",
                politicas=politicas,
                momps=momps,
                momp=momp,
                saldo_anual=saldo_anual
            )

        @app.route("/inserir_politicateto", methods=["POST"])
        def inserir_politicateto():
            data = request.form.to_dict(flat=True)
            print("📥 Dados recebidos no formulário:", data)

            def parse_decimal(valor_str):
                if not valor_str:
                    return 0.0
                valor_str = valor_str.strip()
                if ',' in valor_str and '.' in valor_str:
                    valor_str = valor_str.replace('.', '').replace(',', '.')
                elif ',' in valor_str:
                    valor_str = valor_str.replace(',', '.')
                try:
                    return float(valor_str)
                except ValueError:
                    return 0.0

            if data.get("id"):
                antigo = PoliticaTeto.query.get(int(data["id"]))
                if antigo:
                    antigo.ativo = False
                    antigo.alterado_em = datetime.now()

            try:
                momp_id = int(data.get("momp_id")) if data.get("momp_id") else None
            except ValueError:
                momp_id = None

            novo = PoliticaTeto(
                momp_id=momp_id,
                regiao=data.get("regiao"),
                subfuncao_ug=data.get("subfuncao_ug"),
                adj=data.get("adj"),
                macropolitica=data.get("macropolitica"),
                pilar=data.get("pilar"),
                eixo=data.get("eixo"),
                politica_decreto=data.get("politica_decreto"),
                acao_paoe=data.get("acao_paoe"),
                chave_planejamento=data.get("chave_planejamento"),
                teto_politica_decreto=parse_decimal(data.get("teto_politica_decreto_real")),
                saldo_anual=parse_decimal(data.get("saldo_anual_real")),
                ativo=True,
                alterado_em=datetime.now()
            )

            db.session.add(novo)
            db.session.commit()

            session['mensagem_popup'] = "Registro da Política/Teto salvo com sucesso."
            return redirect(url_for("politicateto", momp_id=momp_id))

        @app.route("/excluir_politicateto/<int:id>/<int:momp_id>")
        def excluir_politicateto(id, momp_id):
            registro = PoliticaTeto.query.get(id)
            if registro:
                registro.ativo = False
                registro.excluido_em = datetime.now()
                db.session.commit()
                session['mensagem_popup'] = "Registro excluído com sucesso."
            return redirect(url_for("politicateto", momp_id=momp_id))

        # Visualizar QOMP
        @app.route('/visualizar_qomp')
        def visualizar_qomp():
            dados = (
                db.session.query(
                    Momp.exercicio.label("Exercício"),
                    Momp.fonte.label("Fonte"),
                    Momp.grupo_despesa.label("Grupo de Despesa"),
                    Momp.teto_despesa_momp.label("Teto de Despesa MOMP"),
                    Momp.subteto_despesa_momp.label("Subteto de Despesa MOMP"),
                    Momp.teto_anual.label("Teto Anual"),

                    PoliticaTeto.acao_paoe.label("Ação/PAOE"),
                    PoliticaTeto.regiao.label("Região Política"),
                    PoliticaTeto.subfuncao_ug.label("Subfunção + UG"),
                    PoliticaTeto.adj.label("ADJ"),
                    PoliticaTeto.macropolitica.label("Macropolítica"),
                    PoliticaTeto.pilar.label("Pilar"),
                    PoliticaTeto.eixo.label("Eixo"),
                    PoliticaTeto.politica_decreto.label("Política do Decreto"),
                    PoliticaTeto.chave_planejamento.label("Chave de Planejamento"),
                    PoliticaTeto.teto_politica_decreto.label("Teto da Política do Decreto")
                )
                .outerjoin(
                    PoliticaTeto,
                    and_(
                        PoliticaTeto.momp_id == Momp.id,
                        PoliticaTeto.ativo == True
                    )
                )
                .filter(Momp.ativo == True)
                .all()
            )

            dados_formatados = []
            for idx, item in enumerate(dados):
                item_dict = item._asdict()

                # Debug: imprime os valores originais antes de formatar
                print(f"[{idx}] Teto Anual (original):", item_dict.get("Teto Anual"))
                print(f"[{idx}] Teto da Política do Decreto (original):", item_dict.get("Teto da Política do Decreto"))

                # Formatação segura
                for campo in ["Teto da Política do Decreto", "Teto Anual"]:
                    valor = item_dict.get(campo)
                    if isinstance(valor, (int, float, Decimal)):
                        item_dict[campo] = f'{valor:,.2f}'.replace(",", "X").replace(".", ",").replace("X", ".")
                    else:
                        print(f"[{idx}] Campo '{campo}' está vazio ou não numérico:", valor)
                        item_dict[campo] = ""

                dados_formatados.append(item_dict)

            return render_template("visualizar_qomp.html", dados=dados_formatados)

        # Baixar QOMP
        @app.route('/baixar_excel_qomp')
        def baixar_excel_qomp():
            dados = (
                db.session.query(
                    Momp.exercicio.label("Exercício"),
                    Momp.fonte.label("Fonte"),
                    Momp.grupo_despesa.label("Grupo de Despesa"),
                    Momp.teto_despesa_momp.label("Teto de Despesa MOMP"),
                    Momp.subteto_despesa_momp.label("Subteto de Despesa MOMP"),
                    Momp.teto_anual.label("Teto Anual"),

                    PoliticaTeto.acao_paoe.label("Ação/PAOE"),
                    PoliticaTeto.regiao.label("Região Política"),
                    PoliticaTeto.subfuncao_ug.label("Subfunção + UG"),
                    PoliticaTeto.adj.label("ADJ"),
                    PoliticaTeto.macropolitica.label("Macropolítica"),
                    PoliticaTeto.pilar.label("Pilar"),
                    PoliticaTeto.eixo.label("Eixo"),
                    PoliticaTeto.politica_decreto.label("Política do Decreto"),
                    PoliticaTeto.chave_planejamento.label("Chave de Planejamento"),
                    PoliticaTeto.teto_politica_decreto.label("Teto da Política do Decreto")
                )
                .outerjoin(
                    PoliticaTeto,
                    and_(
                        PoliticaTeto.momp_id == Momp.id,
                        PoliticaTeto.ativo == True
                    )
                )
                .filter(Momp.ativo == True)
                .all()
            )

            df = pd.DataFrame([d._asdict() for d in dados])

            # Formatar colunas monetárias no padrão brasileiro
            for col in ["Teto da Política do Decreto", "Teto Anual"]:
                if col in df.columns:
                    df[col] = df[col].apply(
                        lambda x: f'{x:,.2f}'.replace(",", "X").replace(".", ",").replace("X", ".") if pd.notnull(x) else ""
                    )

            output = io.BytesIO()
            with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
                df.to_excel(writer, sheet_name='QOMP', index=False)
            output.seek(0)

            return send_file(
                output,
                as_attachment=True,
                download_name="qomp.xlsx",
                mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        
        # Carregar teto
        @app.route("/carregar_teto", methods=["GET"])
        def carregar_teto():
            # Página inicial de importação do Teto; por enquanto espelha a de Teto Orçamentário.
            return render_template("carregar_teto.html")



# Interface WSGI para IIS
# Interface WSGI para IIS
application = app

# Apenas para rodar localmente
if __name__ == '__main__':
    app.run(debug=True)


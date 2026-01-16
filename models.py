from extensions import db
from datetime import datetime
from sqlalchemy import Numeric

class Programa(db.Model):
    __tablename__ = 'programa'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    funcao = db.Column(db.String(100))
    responsavel = db.Column(db.String(255))
    cpf = db.Column(db.String(14))
    email = db.Column(db.String(255))

    # Novos campos:
    ativo = db.Column(db.Boolean, default=True)
    alterado_em = db.Column(db.DateTime, nullable=True)
    excluido_em = db.Column(db.DateTime, nullable=True)

class Acao(db.Model):
    __tablename__ = 'acao'

    id = db.Column(db.Integer, primary_key=True)
    programa_id = db.Column(db.Integer, db.ForeignKey('programa.id'))
    
    subfuncao = db.Column(db.String(100))
    acao_paoe = db.Column(db.String(100))
    responsavel = db.Column(db.String(255))
    cpf = db.Column(db.String(14))
    email = db.Column(db.String(255))

    ativo = db.Column(db.Boolean, default=True)
    alterado_em = db.Column(db.DateTime, nullable=True)
    excluido_em = db.Column(db.DateTime, nullable=True)

    programa = db.relationship('Programa', backref=db.backref('acoes', lazy=True))

class ProdutoAcao(db.Model):
    __tablename__ = 'produto_acao'

    id = db.Column(db.Integer, primary_key=True)
    acao_id = db.Column(db.Integer, db.ForeignKey('acao.id'), nullable=False)
    nome = db.Column(db.String(255), nullable=False)
    un_medida = db.Column(db.String(50))  # <- novo campo
    quantidade = db.Column(db.Float)      # <- novo campo
    ativo = db.Column(db.Boolean, default=True)
    alterado_em = db.Column(db.DateTime)
    excluido_em = db.Column(db.DateTime)

    # Relacionamento com a tabela Acao (opcional, se quiser acessar produto.acao.nome)
    acao = db.relationship('Acao', backref=db.backref('produtos', lazy=True))

    def __repr__(self):
        return f'<ProdutoAcao {self.nome}>'
    
class SubacaoEntrega(db.Model):
    __tablename__ = "subacao_entrega"

    id = db.Column(db.Integer, primary_key=True)
    produto_id = db.Column(db.Integer, db.ForeignKey("produto_acao.id"), nullable=False)
    
    subacao_entrega = db.Column(db.String(500), nullable=True)
    produto_subacao = db.Column(db.String(255), nullable=True)

    unidade_gestora = db.Column(db.String(255), nullable=True)
    unidade_setorial = db.Column(db.String(255), nullable=True)
    unidade_medida = db.Column(db.String(100), nullable=True)
    quantidade = db.Column(db.Float, nullable=False)  # ✅ atualizado para Float
    detalhamento = db.Column(db.String(500), nullable=True)

    responsavel = db.Column(db.String(255), nullable=True)
    cpf = db.Column(db.String(14), nullable=True)
    email = db.Column(db.String(255), nullable=True)

    regiao = db.Column(db.String(100), nullable=True)
    subfuncao_ug = db.Column(db.String(100), nullable=True)
    adj = db.Column(db.String(100), nullable=True)
    macropolitica = db.Column(db.String(100), nullable=True)
    pilar = db.Column(db.String(100), nullable=True)
    eixo = db.Column(db.String(100), nullable=True)
    politica_decreto = db.Column(db.String(100), nullable=True)
    publico_ods = db.Column(db.String(100), nullable=True)

    ativo = db.Column(db.Boolean, default=True)
    alterado_em = db.Column(db.DateTime)
    excluido_em = db.Column(db.DateTime)

    def __repr__(self):
        return f"<SubacaoEntrega {self.id}>"
    
class MunicipioEntrega(db.Model):
    __tablename__ = 'municipio_entrega'

    id = db.Column(db.Integer, primary_key=True)
    subacao_entrega_id = db.Column(db.Integer, db.ForeignKey('subacao_entrega.id'), nullable=False)
    codigo_municipio = db.Column(db.String(50), nullable=False)
    nome_municipio = db.Column(db.String(255), nullable=False)
    un_medida = db.Column(db.String(50), nullable=True)
    quantidade = db.Column(db.Float, nullable=False)  # ✅ atualizado para Float
    ativo = db.Column(db.Boolean, default=True)
    alterado_em = db.Column(db.DateTime)
    excluido_em = db.Column(db.DateTime)

    subacao_entrega = db.relationship("SubacaoEntrega", backref="municipios")

class Etapa(db.Model):
    __tablename__ = 'etapa'

    id = db.Column(db.Integer, primary_key=True)
    subacao_entrega_id = db.Column(db.Integer, db.ForeignKey('subacao_entrega.id'), nullable=False)
    etapa_nome = db.Column(db.String(255), nullable=False)
    data_inicio = db.Column(db.Date, nullable=False)
    data_fim = db.Column(db.Date, nullable=False)
    responsavel = db.Column(db.String(255), nullable=False)
    cpf = db.Column(db.String(14), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    ativo = db.Column(db.Boolean, default=True)
    alterado_em = db.Column(db.DateTime, default=datetime.utcnow)
    excluido_em = db.Column(db.DateTime, nullable=True)

    subacao = db.relationship('SubacaoEntrega', backref=db.backref('etapas', lazy=True))


class MemoriaCalculo(db.Model):
    __tablename__ = "memoria_calculo"
    
    id = db.Column(db.Integer, primary_key=True)
    etapa_id = db.Column(db.Integer, db.ForeignKey("etapa.id"), nullable=False)
    
    itens_despesa = db.Column(db.Text)
    unidade_medida = db.Column(db.String(100))
    quantidade = db.Column(db.Float)
    valor_unitario = db.Column(db.Float)
    valor_total = db.Column(db.Float)
    
    categoria_economica = db.Column(db.String(100))
    grupo_despesa = db.Column(db.String(100))
    modalidade = db.Column(db.String(100))
    elemento_despesa = db.Column(db.String(100))
    subelemento = db.Column(db.String(100))
    fonte_recursos = db.Column(db.String(100))
    identificador_uso = db.Column(db.String(100))
    legislacao = db.Column(db.Text)
    
    ativo = db.Column(db.Boolean, default=True)
    alterado_em = db.Column(db.DateTime, default=datetime.utcnow)
    excluido_em = db.Column(db.DateTime, nullable=True)

    etapa = db.relationship("Etapa", backref=db.backref("memorias", lazy=True))

class Momp(db.Model):
    __tablename__ = 'momp'
    id = db.Column(db.Integer, primary_key=True)
    exercicio = db.Column(db.String(4))  # Novo campo adicionado
    fonte = db.Column(db.String(255))
    grupo_despesa = db.Column(db.String(255))
    teto_despesa_momp = db.Column(db.String(255))
    subteto_despesa_momp = db.Column(db.String(100))
    teto_anual = db.Column(Numeric(15, 2))
    ativo = db.Column(db.Boolean, default=True)
    alterado_em = db.Column(db.DateTime)
    excluido_em = db.Column(db.DateTime)

class PoliticaTeto(db.Model):
    __tablename__ = 'politicateto'

    id = db.Column(db.Integer, primary_key=True)
    momp_id = db.Column(db.Integer)
    regiao = db.Column(db.String(20))
    subfuncao_ug = db.Column(db.String(20))
    adj = db.Column(db.String(20))
    macropolitica = db.Column(db.String(100))
    pilar = db.Column(db.String(100))
    eixo = db.Column(db.String(100))
    politica_decreto = db.Column(db.String(100))
    acao_paoe = db.Column(db.String(100))
    teto_politica_decreto = db.Column(db.Numeric(15, 2))
    chave_planejamento = db.Column(db.String(200))
    saldo_anual = db.Column(db.Numeric(15, 2))
    ativo = db.Column(db.Boolean, default=True)
    alterado_em = db.Column(db.DateTime, default=datetime.now)
    excluido_em = db.Column(db.DateTime)

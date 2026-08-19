# Analise do Projeto PTA 2025/2026

Data da analise: 24/07/2026  
Diretorio analisado: `C:\workspace\pta_v2025`

## Resumo executivo

O projeto e uma aplicacao Flask chamada PTA 2026, voltada ao cadastro, acompanhamento e exportacao do Plano de Trabalho Anual da SEDUC-MT. A aplicacao usa MySQL/MariaDB remoto via SQLAlchemy/PyMySQL, templates Jinja2, JavaScript modular, Bootstrap, DataTables, SweetAlert2, pandas/openpyxl/xlsxwriter para Excel e Dash/Plotly para painel orcamentario.

O repositorio esta conectado ao GitHub em `https://github.com/CleberSGuedes/pta2025.git`, na branch local `main`, rastreando `origin/main`, alinhado no commit `c71a883`.

## Git e GitHub

- Repositorio Git: sim.
- Remote `origin`: `https://github.com/CleberSGuedes/pta2025.git`.
- Branch local atual: `main`.
- Branch rastreada: `origin/main`.
- HEAD remoto: `main`.
- Ultimo commit: `c71a883 fix: consume db ping result`.
- Status: `main...origin/main`, sem divergencia identificada.
- Alteracoes locais: dois arquivos `.pyc` modificados:
  - `__pycache__/config.cpython-311.pyc`
  - `__pycache__/models.cpython-311.pyc`
- Observacao: existem arquivos `__pycache__` versionados no Git, apesar de o `.gitignore` declarar `__pycache__/` e `*.py[cod]`.
- Referencia remota antiga: `origin/versao2` aparece como `stale`.

## Banco de dados remoto

- Banco remoto configurado: sim.
- Driver usado pela aplicacao: `mysql+pymysql`.
- Host: `186.209.113.112`.
- Porta: `3306`.
- Database: `proj5954_pta2025`.
- Conectividade TCP: confirmada (`TcpTestSucceeded: True`).
- Login no banco: confirmado com consulta somente leitura.
- Servidor: `10.11.18-MariaDB-cll-lve`.
- Tabelas encontradas:
  - `programa`
  - `acao`
  - `produto_acao`
  - `subacao_entrega`
  - `municipio_entrega`
  - `etapa`
  - `memoria_calculo`
  - `momp`
  - `politicateto`

Contagens no banco remoto:

| Tabela | Total | Ativos |
|---|---:|---:|
| `programa` | 7 | 6 |
| `acao` | 42 | 28 |
| `produto_acao` | 136 | 109 |
| `subacao_entrega` | 1231 | 661 |
| `municipio_entrega` | 1319 | 710 |
| `etapa` | 1445 | 1171 |
| `memoria_calculo` | 831 | 772 |
| `momp` | 119 | 89 |
| `politicateto` | 990 | 638 |

Observacoes:

- O arquivo `.env` existe localmente, esta ignorado pelo Git e contem credenciais/segredos. Nao foram reproduzidos neste relatorio.
- `config.py` monta a URI via variaveis `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` e `DB_NAME`.
- `SQLALCHEMY_ENGINE_OPTIONS` usa `NullPool`, adequado para hospedagem compartilhada porque evita reuso persistente de conexoes.
- Ha uma inconsistencia: `.env` declara `DB_ENGINE=mssql`, mas a aplicacao usa `mysql+pymysql` e o servidor real e MariaDB.
- Risco funcional importante: em `aut_excel/teto_qomp.py`, o fluxo de importacao `momp` usa SQL com `OUTPUT inserted.id`, sintaxe de SQL Server, incompatível com MariaDB/MySQL. Esse trecho tende a falhar ao carregar Plan 23 para `momp`.

## Arquitetura

- Entrada principal: `app.py`.
- Configuracao: `config.py`.
- Extensao de banco: `extensions.py`.
- Models SQLAlchemy: `models.py`.
- Templates HTML/Jinja2: `templates/`.
- CSS: `static/css/`.
- JavaScript modular: `static/js/`.
- Dashboard Dash/Plotly: `dash_apps/teto_por_fonte.py`.
- Importacao/tratamento Excel:
  - `aut_excel/teto_qomp.py`
  - `aut_excel/plan23.py`
  - `aut_excel/qompxpta.py`
- Uploads temporarios: `uploads/tmp`, criado em runtime.
- Deploy cPanel: `.cpanel.yml`, copia o projeto para `/home/proj5954/pta2025` e remove `.git`.
- Interface WSGI: `application = app` em `app.py`.

## Modelo de dados

- `Programa`
  - Entidade raiz do PTA.
  - Relaciona-se com varias `Acao`.
- `Acao`
  - PAOE/subfuncao vinculada a `Programa`.
  - Relaciona-se com varios `ProdutoAcao`.
- `ProdutoAcao`
  - Produto vinculado a uma acao.
  - Possui unidade de medida e quantidade.
- `SubacaoEntrega`
  - Subacao/entrega vinculada a produto.
  - Guarda UG, unidade setorial, responsavel, regionalizacao e classificacao por politica publica.
- `MunicipioEntrega`
  - Municipios vinculados a uma subacao/entrega.
- `Etapa`
  - Etapas planejadas de uma subacao/entrega.
- `MemoriaCalculo`
  - Itens de despesa, valores, natureza de despesa, fonte, identificador de uso e legislacao vinculados a etapa.
- `Momp`
  - Fonte/grupo/teto/subteto/teto anual do modulo orcamentario.
- `PoliticaTeto`
  - Distribuicao do teto por politica, vinculada logicamente a `Momp`.

Padrao geral de alteracao:

- A aplicacao usa exclusao logica com `ativo`, `alterado_em` e `excluido_em`.
- Em varias edicoes, o registro antigo e desativado e um novo registro e criado, com migracao de filhos para o novo ID.

## Funcionalidades identificadas

### Home e acompanhamento

- Pagina inicial em `/`.
- Painel de contagem em tempo real via `/dashboard_status`.
- Alerta de subacoes sem etapa vinculada.
- Contador de sessoes ativas via `/usuarios_online`.
- Links externos para PPA, MTPO, LDO, SEPLAG, FIPLAN, legislacoes e Power BI.

### Cadastro PTA

- Cadastro/listagem de programas: `/cadastrar`.
- Insercao/edicao de programa: `/inserir_programa`.
- Exclusao logica de programa: `/excluir_programa/<id>`.
- Cadastro/listagem de acoes por programa: `/acoes/<programa_id>`.
- Insercao/edicao de acao: `/inserir_acao`.
- Exclusao logica de acao: `/excluir_acao/<id>`.
- Cadastro/listagem de produtos por acao: `/produtos_acao/<programa_id>/<acao_id>`.
- Insercao/edicao de produto: `/inserir_produto_acao`.
- Exclusao logica de produto: `/excluir_produto_acao/<id>`.
- Cadastro/listagem de subacoes/entregas: `/subacoes_entrega/<programa_id>/<acao_id>/<produto_id>`.
- Endpoint JSON para edicao de subacao: `/subacao_entrega_json/<id>`.
- Insercao/edicao de subacao e municipios: `/inserir_subacao_entrega`.
- Exclusao logica de subacao: `/excluir_subacao_entrega/<id>`.
- Cadastro/listagem de etapas: `/etapas/<programa_id>/<acao_id>/<produto_id>/<subacao_id>`.
- Insercao/edicao de etapa: `/inserir_etapa`.
- Exclusao logica de etapa: `/excluir_etapa/<id>`.
- Cadastro/listagem de memoria de calculo: `/memoria_calculo/<programa_id>/<acao_id>/<produto_id>/<subacao_id>/<etapa_id>`.
- Insercao/edicao de memoria: `/inserir_memoria`.
- Exclusao logica de memoria: `/excluir_memoria/<id>`.

### Visualizacao e exportacao PTA

- Visualizacao consolidada do PTA: `/visualizar`.
- Download Excel consolidado com duas abas: `/baixar_excel`.
- Download Excel de subacao x municipios: `/baixar_excel_municipios`.
- Download Excel de etapas x memoria: `/baixar_excel_etapas`.

### Teto orcamentario e QOMP

- Hub do teto orcamentario: `/teto_orcamentario`.
- Dashboard Dash embutido em iframe: `/dashboard-teto/`.
- Cadastro/listagem de MOMP: `/cadastrar_momp`.
- Insercao/edicao de MOMP: `/inserir_momp`.
- Exclusao logica de MOMP: `/excluir_momp/<id>`.
- Filtro AJAX de MOMP: `/filtrar_momp`.
- Cadastro/listagem de Politica Teto: `/politicateto`.
- Insercao/edicao de Politica Teto: `/inserir_politicateto`.
- Exclusao logica de Politica Teto: `/excluir_politicateto/<id>/<momp_id>`.
- Visualizacao consolidada QOMP: `/visualizar_qomp`.
- Download Excel QOMP: `/baixar_excel_qomp`.
- Tela de upload/importacao de teto: `GET /carregar_teto`.
- Processamento de upload Excel:
  - `POST /carregar_teto` para `momp` via Plan 23.
  - `POST /carregar_teto` para `politicateto` via Plan 134/PTA detalhado.

### Dashboard Dash

O dashboard em `/dashboard-teto/` usa dados de `momp` e `politicateto` e oferece filtros por exercicio e dimensoes orcamentarias/politicas. Foram identificados componentes para:

- Pizza por grupo.
- Treemap por ADJ.
- Pareto por macropolitica.
- Grafico cascata.
- Grafico combinado por exercicio/grupo.
- Tabelas QOMP e agregacoes por grupo/subgrupo.

## Dependencias e stack

- Backend:
  - Python/Flask.
  - Flask-SQLAlchemy.
  - SQLAlchemy.
  - PyMySQL.
  - pandas, numpy, openpyxl, xlsxwriter.
  - Dash, Plotly, dash-mantine-components.
  - waitress, wfastcgi.
- Frontend:
  - Bootstrap 5.
  - Bootstrap Icons.
  - jQuery.
  - Select2.
  - DataTables.
  - SweetAlert2.
  - AutoNumeric.
- Banco:
  - MariaDB/MySQL remoto.

## Pontos de atencao

- Seguranca:
  - Nao ha autenticacao/autorizacao identificada nas rotas.
  - Rotas de cadastro, exclusao logica, upload e exportacao parecem abertas caso a aplicacao esteja exposta.
  - `.env` local contem senha do banco e `SECRET_KEY`; esta ignorado pelo Git, mas deve ser protegido no servidor.
  - `.cpanel.yml` copia todo o projeto para o deploy e remove apenas `.git`; se `.env` existir no diretorio de deploy, ele sera copiado.
- Banco:
  - `db.create_all()` roda no startup dentro de `app.app_context()`. Em producao, isso pode alterar/criar schema automaticamente.
  - `DB_ENGINE=mssql` no `.env` contradiz o uso real de MariaDB.
  - SQL `OUTPUT inserted.id` em `aut_excel/teto_qomp.py` e incompativel com MariaDB/MySQL.
- Git:
  - `__pycache__` esta versionado. O ideal e remover do versionamento mantendo no `.gitignore`.
  - Existem arquivos `.pyc` modificados localmente, gerando sujeira no status.
- Manutenibilidade:
  - `app.py` concentra muitas rotas e regras de negocio em um unico arquivo grande.
  - Rotas sao declaradas dentro de `with app.app_context()`, padrao incomum para Flask.
  - Ha muitos `print()` de debug em rotas de producao.
  - O README e alguns comentarios aparecem com caracteres corrompidos, indicando problema de encoding historico.
- Frontend:
  - Ha bastante regra de negocio em JS estatico, especialmente `subacao_entrega.js` e `politicateto.js`.
  - Dependencias externas via CDN exigem internet no cliente.

## Mapa mental em Markdown

```text
PTA 2026 - Sistema de Planejamento do Trabalho Anual
|
|-- Infraestrutura
|   |-- Aplicacao Flask
|   |   |-- app.py
|   |   |-- application = app para WSGI/IIS
|   |   |-- debug=True apenas quando executado localmente
|   |
|   |-- Banco remoto
|   |   |-- MariaDB 10.11.18
|   |   |-- Host 186.209.113.112:3306
|   |   |-- Database proj5954_pta2025
|   |   |-- SQLAlchemy + PyMySQL
|   |
|   |-- Git/GitHub
|   |   |-- origin: CleberSGuedes/pta2025
|   |   |-- branch: main
|   |   |-- rastreia: origin/main
|   |   |-- commit atual: c71a883
|   |
|   |-- Deploy
|       |-- .cpanel.yml
|       |-- destino: /home/proj5954/pta2025
|       |-- remove .git no deploy
|
|-- Modulo PTA
|   |-- Programa
|   |   |-- cadastrar
|   |   |-- editar por nova versao
|   |   |-- excluir logicamente
|   |   |-- bloquear exclusao se houver acoes ativas
|   |
|   |-- Acao / PAOE
|   |   |-- vinculada a programa
|   |   |-- cadastrar
|   |   |-- editar por nova versao
|   |   |-- excluir logicamente
|   |   |-- bloquear exclusao se houver produtos ativos
|   |
|   |-- Produto da Acao
|   |   |-- vinculado a acao
|   |   |-- nome
|   |   |-- unidade de medida
|   |   |-- quantidade
|   |   |-- cadastrar / editar / excluir logicamente
|   |
|   |-- Subacao / Entrega
|   |   |-- vinculada a produto
|   |   |-- produto da subacao
|   |   |-- UG e unidade setorial
|   |   |-- unidade de medida e quantidade
|   |   |-- detalhamento
|   |   |-- responsavel, CPF e e-mail
|   |   |-- regiao
|   |   |-- subfuncao UG
|   |   |-- ADJ
|   |   |-- macropolitica
|   |   |-- pilar
|   |   |-- eixo
|   |   |-- politica do decreto
|   |   |-- publico transversal/ODS
|   |
|   |-- Municipio da Entrega
|   |   |-- vinculado a subacao
|   |   |-- codigo do municipio
|   |   |-- nome do municipio
|   |   |-- unidade de medida
|   |   |-- quantidade
|   |
|   |-- Etapa
|   |   |-- vinculada a subacao
|   |   |-- nome da etapa
|   |   |-- data inicio
|   |   |-- data fim
|   |   |-- responsavel, CPF e e-mail
|   |
|   |-- Memoria de Calculo
|       |-- vinculada a etapa
|       |-- item de despesa
|       |-- unidade de medida
|       |-- quantidade
|       |-- valor unitario
|       |-- valor total
|       |-- categoria economica
|       |-- grupo de despesa
|       |-- modalidade
|       |-- elemento de despesa
|       |-- subelemento
|       |-- fonte de recursos
|       |-- identificador de uso
|       |-- legislacao
|
|-- Visualizacao PTA
|   |-- Tela consolidada /visualizar
|   |-- Exportacao Excel /baixar_excel
|   |   |-- aba Subacao x Municipios
|   |   |-- aba Etapas x Memoria
|   |-- Exportacoes separadas
|       |-- /baixar_excel_municipios
|       |-- /baixar_excel_etapas
|
|-- Acompanhamento
|   |-- Home
|   |-- dashboard_status
|   |   |-- total de programas
|   |   |-- total de acoes
|   |   |-- total de produtos
|   |   |-- total de subacoes
|   |   |-- total de etapas
|   |   |-- total de memorias
|   |   |-- subacoes sem etapa
|   |
|   |-- usuarios_online
|       |-- contador de sessoes ativas em memoria
|       |-- timeout de 5 minutos
|
|-- Modulo Teto Orcamentario / QOMP
|   |-- Hub /teto_orcamentario
|   |-- Dashboard /dashboard-teto/
|   |   |-- filtros por exercicio
|   |   |-- filtros por fonte, grupo, subgrupo, ADJ, politica
|   |   |-- pizza por grupo
|   |   |-- treemap por ADJ
|   |   |-- Pareto por macropolitica
|   |   |-- cascata
|   |   |-- grafico combinado
|   |   |-- tabelas consolidadas
|   |
|   |-- MOMP
|   |   |-- cadastrar_momp
|   |   |-- inserir_momp
|   |   |-- excluir_momp
|   |   |-- filtrar_momp
|   |   |-- exercicio
|   |   |-- fonte
|   |   |-- grupo de despesa
|   |   |-- teto de despesa MOMP
|   |   |-- subteto/tipificacao
|   |   |-- teto anual
|   |
|   |-- Politica Teto
|   |   |-- politicateto
|   |   |-- inserir_politicateto
|   |   |-- excluir_politicateto
|   |   |-- regiao
|   |   |-- subfuncao UG
|   |   |-- ADJ
|   |   |-- macropolitica
|   |   |-- pilar
|   |   |-- eixo
|   |   |-- politica decreto
|   |   |-- acao PAOE
|   |   |-- chave de planejamento
|   |   |-- teto politica decreto
|   |   |-- saldo anual
|   |
|   |-- QOMP
|       |-- visualizar_qomp
|       |-- baixar_excel_qomp
|       |-- consolidacao MOMP + PoliticaTeto
|
|-- Importacao Excel
|   |-- Tela /carregar_teto
|   |-- Upload .xlsx
|   |-- Processamento Plan 23
|   |   |-- gerar_plan23_tratado
|   |   |-- abas: plan23_tratado, plan23_final, plan23_bd
|   |   |-- destino: tabela momp
|   |
|   |-- Processamento Plan 134 / PTA detalhado
|       |-- gerar_qompxpta_tratado
|       |-- abas tratadas e plan134_id
|       |-- destino: tabela politicateto
|       |-- vinculo por momp_id
|
|-- Frontend
|   |-- templates Jinja2
|   |-- Bootstrap 5
|   |-- Bootstrap Icons
|   |-- DataTables
|   |-- Select2
|   |-- SweetAlert2
|   |-- AutoNumeric
|   |-- JS modular
|       |-- programa.js
|       |-- acao.js
|       |-- produto_acao.js
|       |-- subacao_entrega.js
|       |-- etapa.js
|       |-- memoria_calculo.js
|       |-- cadastrar_momp.js
|       |-- politicateto.js
|       |-- mapas auxiliares de municipios, metas, subelementos e ID uso
```

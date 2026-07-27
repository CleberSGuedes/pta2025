# Roteiro de Melhorias do PTA

Documento vivo para orientar os ajustes do modulo PTA sem misturar dados de exercicios diferentes. Este roteiro deve ser atualizado a cada etapa concluida, alterada ou repriorizada.

## Diretriz principal

O modulo orcamentario/MOMP nao sera alterado neste ciclo. Ele foi desativado nesta aplicacao porque ja esta sendo utilizado em outra aplicacao. O foco passa a ser exclusivamente o fluxo PTA.

## Objetivo do ciclo

Preparar o PTA para operar por exercicio, mantendo os dados existentes como exercicio 2026 e cadastrando o novo planejamento como exercicio 2027.

## Estado atual conhecido

- O banco remoto possui dados historicos do PTA.
- As tabelas do PTA nao possuem coluna `exercicio`:
  - `programa`
  - `acao`
  - `produto_acao`
  - `subacao_entrega`
  - `municipio_entrega`
  - `etapa`
  - `memoria_calculo`
- O modulo orcamentario possui separacao parcial por exercicio via `momp.exercicio`, mas esta fora do escopo deste ciclo.
- As telas atuais do PTA filtram principalmente por `ativo=True`, sem filtro de exercicio.

## Plano de trabalho

### 1. Separacao por exercicio no PTA

Status: concluido

- Definir a estrategia de modelagem:
  - Opcao recomendada: adicionar `exercicio` em `programa` e filtrar toda a hierarquia a partir de `programa.exercicio`.
  - Opcao alternativa: criar tabela `exercicio_pta` e vincular `programa` a ela por `exercicio_id`.
- Migracao SQL preparada em `db/migrations/2026-07-24_pta_exercicio_programa.sql`.
- Valor inicial definido para dados existentes: `2026`.
- Migracao aplicada no banco remoto em 24/07/2026.
- `models.py` atualizado com `Programa.exercicio`.
- Consultas de cadastro, visualizacao, dashboard e exportacao foram preparadas para filtrar por exercicio atual.
- Novos registros de programa passam a ser criados com `PTA_EXERCICIO_ATUAL`, atualmente `2027`.

### 2. Selecionador de exercicio

Status: em andamento

- Criar uma forma clara de escolher o exercicio ativo do PTA.
- Possiveis alternativas:
  - parametro por URL, exemplo `/cadastrar?exercicio=2027`;
  - valor salvo em sessao;
  - configuracao fixa inicial em `.env`, exemplo `PTA_EXERCICIO_ATUAL=2027`.
- Estrategia inicial implementada: configuracao fixa por `PTA_EXERCICIO_ATUAL`, padrao `2027`.
- Exibir o exercicio atual no topo das telas PTA.
- Impedir cadastro sem exercicio definido.

### 3. Isolamento das telas existentes

Status: concluido

- `/cadastrar` preparado para listar somente programas do exercicio atual.
- Telas filhas preparadas para validar pertencimento ao programa do exercicio atual.
- `/visualizar` preparado para consolidar somente o exercicio atual.
- `/dashboard_status` preparado para contar somente registros do exercicio atual.
- Exportacoes Excel preparadas para usar somente o exercicio atual.

### 4. Tratamento dos dados historicos

Status: concluido

- Confirmado que os dados atuais do modulo PTA representam o planejamento usado em `2026`.
- Script SQL criado em `db/migrations/2026-07-24_pta_exercicio_programa.sql`.
- Migracao aplicada no banco remoto.
- Validacao apos migracao: `programa` possui 7 registros em `2026`, sendo 6 ativos.

### 5. Criacao da base PTA 2027

Status: concluido

- Definido que 2027 inicia com copia da estrutura estavel do PTA 2026.
- Escopo copiado:
  - `programa`
  - `acao`
  - `produto_acao`
- Escopo nao copiado:
  - `subacao_entrega`
  - `municipio_entrega`
  - `etapa`
  - `memoria_calculo`
- Relacoes entre programa, acao e produto foram preservadas com novos IDs para o exercicio 2027.
- Migracao SQL criada em `db/migrations/2026-07-24_clone_pta_base_2026_to_2027.sql`.
- Migracao aplicada no banco remoto em 24/07/2026.
- Validacao apos migracao:
  - `2027`: 6 programas ativos.
  - `2027`: 28 acoes ativas.
  - `2027`: 109 produtos da acao ativos.
  - `2027`: 0 subacoes, 0 etapas e 0 memorias.

### 6. Regras de validacao

Status: em andamento

- Revisar validacoes por exercicio.
- Impedir exclusao/alteracao cruzada entre exercicios.
- Validar datas de etapas conforme exercicio vigente.
- Validar totalizadores e exportacoes.
- Primeiro lote de metas fisicas do exercicio 2027 atualizado no codigo e no banco remoto:
  - Programa `533`
  - Subfuncao `122`
  - PAOE `2936`
  - 16 produtos atualizados
- Segundo lote de metas fisicas do exercicio 2027 atualizado no codigo e no banco remoto:
  - Programa `533`
  - Subfuncao `366`
  - PAOE `2900`
  - 10 produtos atualizados
- Terceiro lote de metas fisicas do exercicio 2027 atualizado no codigo e no banco remoto:
  - Programa `533`
  - Subfuncao `367`
  - PAOE `2957`
  - 11 produtos atualizados
- Quarto lote de metas fisicas do exercicio 2027 atualizado no codigo e no banco remoto:
  - Programa `533`
  - Subfuncao `361`
  - PAOE `4172`
  - 18 produtos atualizados
  - Todos os produtos do lote ficaram com unidade `Percentual`
  - Script de apoio criado: `scripts/update_meta_2027_533_361_4172.py`
- Quinto lote de metas fisicas do exercicio 2027 atualizado no codigo e no banco remoto:
  - Programa `533`
  - Subfuncao `362`
  - PAOE `4174`
  - 15 produtos atualizados
  - Todos os produtos do lote ficaram com unidade `Percentual`
  - Script de apoio criado: `scripts/update_meta_2027_533_362_4174.py`
- Sexto lote de metas fisicas do exercicio 2027 atualizado no codigo e no banco remoto:
  - Programa `534`
  - Subfuncao `367`
  - PAOE `4178`
  - 4 produtos atualizados
  - Todos os produtos do lote ficaram com unidade `Percentual`
  - Script de apoio criado: `scripts/update_meta_2027_534_367_4178.py`
- Setimo lote de metas fisicas do exercicio 2027 atualizado no codigo e no banco remoto:
  - Programa `534`
  - PAOEs de alimentacao escolar `2895`, `2898`, `2899` e `2897`
  - 4 produtos atualizados
  - Todos os produtos do lote ficaram com unidade `Percentual`
  - Script de apoio criado: `scripts/update_meta_2027_534_alimentacao.py`
- Oitavo lote de metas fisicas do exercicio 2027 atualizado no codigo e no banco remoto:
  - Programa `534`
  - PAOEs `4173`, `4175`, `4177`, `4179`, `4180`, `4181`, `4182`, `4524` e `4525`
  - 26 itens processados
  - 23 produtos existentes atualizados
  - 3 produtos novos inseridos no PAOE `4525`
  - Produto existente `Infraestrutura escolar modernizada` preservado no PAOE `4525`
  - Script de apoio criado: `scripts/update_meta_2027_534_infraestrutura_final.py`

### 7. Documentacao e verificacao

Status: em andamento

- Registrar cada alteracao em `ALTERACOES_PROJETO.md`.
- Atualizar este roteiro ao concluir cada etapa.
- Registrar scripts SQL aplicados.
- Validar com consultas no banco remoto.
- Validar fluxos principais no navegador ou por rotas Flask quando aplicavel.
- Checklist de testes funcionais criado em `CHECKLIST_TESTES_PTA_2027.md`.
- Arquivos `__pycache__/*.pyc` removidos do versionamento Git para manter o status limpo apos executar Python.

### 8. Melhorias de usabilidade nas telas PTA

Status: em andamento

- Estrutura de etapa por municipio implementada:
  - `Etapa` passou a ter vinculo com `MunicipioEntrega`;
  - cadastro de etapa exige municipio da entrega;
  - municipio comum prefixa o nome da etapa como `Municipio * Etapa`;
  - `5100000 - Estado` vincula a etapa ao municipio Estado sem prefixar o nome;
  - download principal do PTA passou para aba unica `PTA Consolidado`;
  - painel da home passou a alertar municipios da entrega sem etapa vinculada;
  - pendencia operacional: revisar 1 etapa antiga sem municipio vinculado automaticamente.
- Home ajustada:
  - `Painel de Acompanhamento do PTA` modernizado com cards de indicadores;
  - pendencias de subacoes sem etapa organizadas em bloco proprio;
  - lista de pendencias com busca e rolagem vertical para suportar muitos alertas;
  - badge do painel passa a exibir o exercicio retornado pelo backend.
- Tela `Cadastrar Subacao/Entrega(s)` ajustada:
  - card/lista do lado esquerdo sincronizado com a altura do formulario direito em desktop;
  - rolagem vertical da tabela acionada somente apos o painel esquerdo alcancar a altura do formulario direito;
  - tabela com rolagem vertical quando houver muitos registros;
  - cabecalho da tabela fixo durante a rolagem;
  - campo de consulta por palavra-chave filtrando `Subacao/Entrega` e `Produto da Entrega`;
  - selecao de linha oculta pelo filtro e desmarcada automaticamente.
- Campo `CPF` do formulario `Cadastrar Subacao/Entrega(s)` corrigido:
  - mascara `000.000.000-00` aplicada durante a digitacao;
  - preenchimento em modo alteracao passa a formatar o CPF retornado pelo backend.
- Formulario `Chave de Planejamento` recebeu controlador V2 reversivel:
  - arquivo novo: `static/js/chave_planejamento_v2.js`;
  - flag de ativacao: `window.USAR_CHAVE_PLANEJAMENTO_V2 = true`;
  - rollback: alterar a flag para `false` em `templates/subacao_entrega.html`;
  - mapas atuais foram preservados sem alteracao;
  - objetivo: reduzir travamentos do encadeamento `Subfuncao + UG -> ADJ -> Macropolitica -> Pilar -> Eixo -> Politica Decreto`.

### 9. Limpeza controlada dos testes do PTA 2027

Status: aguardando solicitacao do usuario

- Quando o usuario informar que os testes podem ser removidos, executar uma limpeza controlada no banco.
- Preservar integralmente a base fixa do planejamento:
  - `Programa`;
  - `Acao/PAOE`;
  - `Produto da Acao`.
- Remover ou resetar somente os dados operacionais cadastrados da subacao para frente:
  - `Subacao/Entrega`;
  - `Municipio(s) da Entrega`;
  - `Etapa`;
  - `Memoria de Calculo`.
- Ordem obrigatoria para evitar erro de vinculo entre tabelas:
  - 1. `Memoria de Calculo`;
  - 2. `Etapa`;
  - 3. `Municipio(s) da Entrega`;
  - 4. `Subacao/Entrega`.
- Antes da limpeza definitiva:
  - gerar relatorio de conferencia com totais por tabela;
  - confirmar que o filtro esta restrito ao exercicio atual do PTA;
  - validar que `Programa`, `Acao/PAOE` e `Produto da Acao` nao entram no escopo.
- Apos a limpeza:
  - resetar os IDs/autoincrement somente das tabelas limpas, quando tecnicamente seguro;
  - validar que a tela `/visualizar` ficou sem registros operacionais;
  - validar que a arvore fixa `Programa -> Acao/PAOE -> Produto da Acao` continua disponivel para novos cadastros.

## Proxima decisao necessaria

Para evoluir o ciclo anual, confirmar:

- O exercicio atual deve continuar configurado fixo por `.env` ou deve ser selecionavel na interface por usuario/admin?

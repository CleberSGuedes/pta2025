# Alteracoes do Projeto PTA

## 2026-07-24

- Encerramento da sessao:
  - Criado o arquivo `PONTO_DE_PARADA_2026-07-24.md`.
  - Registrado onde paramos, o que foi validado e o proximo ponto recomendado para continuidade.

- Ajustado layout da tela `Cadastrar Subacao/Entrega(s)`:
  - Adicionado limite de altura ao card/lista do lado esquerdo.
  - A tabela de subacoes passa a ter rolagem vertical quando ultrapassar o tamanho maximo.
  - Cabecalho da tabela permanece fixo durante a rolagem.
  - Adicionado campo de consulta por palavra-chave para filtrar por `Subacao/Entrega` e `Produto da Entrega`.
  - Ao filtrar uma linha selecionada que deixa de aparecer, a selecao e desmarcada para evitar alteracao/exclusao de item oculto.
  - Arquivos alterados: `templates/subacao_entrega.html`, `static/css/style.css`, `static/js/subacao_entrega.js`.

- Atualizado lote final de metas fisicas de infraestrutura/transporte/FMTE do Programa `534`, exercicio `2027`:
  - Atualizado `static/js/metaMap.js`.
  - Criado e executado o script `scripts/update_meta_2027_534_infraestrutura_final.py` para aplicar o lote no banco remoto.
  - Processados 26 itens do lote.
  - Atualizados 23 registros ativos existentes no banco remoto em `produto_acao`.
  - Inseridos 3 produtos novos no PAOE `4525`:
    - `Unidade reformada Total de ampliação de salas com banheiro`
    - `Unidade construida salas Total de Escola a Construir`
    - `Unidade reformada`
  - Mantido o produto existente `Infraestrutura escolar modernizada` no PAOE `4525`, pois nao houve solicitacao de exclusao.
  - Metas inteiras foram normalizadas no codigo como `5,00`, `10,00`, `17,00`, `20,00`, `21,00`, `23,00` e `100,00`.
  - Validado com `node --check static\js\metaMap.js`.

- Atualizado lote de metas fisicas de alimentacao escolar do Programa `534`, exercicio `2027`:
  - Atualizado `static/js/metaMap.js`.
  - Criado e executado o script `scripts/update_meta_2027_534_alimentacao.py` para aplicar o lote no banco remoto.
  - Atualizados 4 registros ativos no banco remoto em `produto_acao`.
  - PAOEs atualizados: `2895`, `2898`, `2899` e `2897`.
  - Todos os produtos do lote ficaram com `un_medida = Percentual`.
  - Produtos que estavam como `Unidade` passaram para `Percentual`, conforme lote enviado.
  - Validado com `node --check static\js\metaMap.js`.

- Atualizado lote de metas fisicas do Programa `534`, Subfuncao `367`, PAOE `4178`, exercicio `2027`:
  - Atualizado `static/js/metaMap.js`.
  - Criado e executado o script `scripts/update_meta_2027_534_367_4178.py` para aplicar o lote no banco remoto.
  - Atualizados 4 registros ativos no banco remoto em `produto_acao`.
  - Todos os produtos do lote ficaram com `un_medida = Percentual`.
  - Validado com `node --check static\js\metaMap.js`.

- Atualizado lote de metas fisicas do Programa `533`, Subfuncao `362`, PAOE `4174`, exercicio `2027`:
  - Atualizado `static/js/metaMap.js`.
  - Criado e executado o script `scripts/update_meta_2027_533_362_4174.py` para aplicar o lote no banco remoto.
  - Atualizados 15 registros ativos no banco remoto em `produto_acao`.
  - Todos os produtos do lote ficaram com `un_medida = Percentual`.
  - Produtos que estavam como `Unidade` neste PAOE passaram para `Percentual`, conforme lote enviado.
  - A meta `Percentual = 100` foi normalizada no codigo como `Percentual = 100,00`.
  - Validado com `node --check static\js\metaMap.js`.

- Atualizado lote de metas fisicas do Programa `533`, Subfuncao `361`, PAOE `4172`, exercicio `2027`:
  - Atualizado `static/js/metaMap.js`.
  - Criado e executado o script `scripts/update_meta_2027_533_361_4172.py` para aplicar o lote no banco remoto.
  - Atualizados 18 registros ativos no banco remoto em `produto_acao`.
  - Todos os produtos do lote ficaram com `un_medida = Percentual`.
  - Produtos que estavam como `Unidade` neste PAOE passaram para `Percentual`, conforme lote enviado.
  - Metas inteiras foram normalizadas no codigo como `70,00`, `30,00`, `100,00` e `54,00`.
  - Validado com `node --check static\js\metaMap.js`.

- Atualizado lote de metas fisicas do Programa `533`, Subfuncao `122`, PAOE `2936`, exercicio `2027`:
  - Atualizado `static/js/metaMap.js`.
  - Atualizados 16 registros ativos no banco remoto em `produto_acao`.
  - Todos os produtos do lote ficaram com `un_medida = Percentual`.
  - Validado com `node --check static\js\metaMap.js`.

- Atualizado lote de metas fisicas do Programa `533`, Subfuncao `366`, PAOE `2900`, exercicio `2027`:
  - Atualizado `static/js/metaMap.js`.
  - Atualizados 10 registros ativos no banco remoto em `produto_acao`.
  - Todos os produtos do lote ficaram com `un_medida = Percentual`.
  - A meta `Percentual = 80` foi normalizada no codigo como `Percentual = 80,00`.
  - Validado com `node --check static\js\metaMap.js`.

- Atualizado lote de metas fisicas do Programa `533`, Subfuncao `367`, PAOE `2957`, exercicio `2027`:
  - Atualizado `static/js/metaMap.js`.
  - Atualizados 11 registros ativos no banco remoto em `produto_acao`.
  - Todos os produtos do lote ficaram com `un_medida = Percentual`.
  - A meta `Percentual = 80` foi normalizada no codigo como `Percentual = 80,00`.
  - Validado com `node --check static\js\metaMap.js`.

- Preparacao para testes funcionais:
  - Removidos arquivos `__pycache__/*.pyc` do versionamento Git com `git rm --cached`, mantendo os arquivos locais.
  - Criado checklist de testes `CHECKLIST_TESTES_PTA_2027.md`.

- Preparado suporte a exercicio no modulo PTA:
  - Adicionada configuracao `PTA_EXERCICIO_ATUAL`, com padrao `2027`.
  - Incluida a variavel `PTA_EXERCICIO_ATUAL=2027` no `.env` local.
  - Adicionado campo `exercicio` ao model `Programa`.
  - Novos programas passam a ser gravados no exercicio atual configurado.
  - Cadastros, visualizacao consolidada, exportacoes e painel da home passaram a filtrar pelo exercicio atual.
  - Telas principais exibem o exercicio em uso.
  - Criada migracao SQL `db/migrations/2026-07-24_pta_exercicio_programa.sql`.
  - Migracao aplicada no banco remoto: dados existentes marcados como exercicio `2026`; novos cadastros passam a usar `2027`.
  - Validado no banco remoto: tabela `programa` possui 7 registros no exercicio `2026`, sendo 6 ativos.

- Criada a base estrutural do PTA 2027 a partir do PTA 2026:
  - Clonados somente registros ativos de `programa`, `acao` e `produto_acao`.
  - Nao foram clonados `subacao_entrega`, `municipio_entrega`, `etapa` ou `memoria_calculo`.
  - Criada migracao SQL `db/migrations/2026-07-24_clone_pta_base_2026_to_2027.sql`.
  - Migracao aplicada no banco remoto.
  - Validacao apos migracao:
    - `2027`: 6 programas ativos.
    - `2027`: 28 acoes ativas.
    - `2027`: 109 produtos da acao ativos.
    - `2027`: 0 subacoes, 0 etapas e 0 memorias.

- Desativado o acesso ao modulo orcamentario/MOMP nesta aplicacao:
  - Removido o link `Teto Orcamentario` do menu principal.
  - Adicionada flag `ORCAMENTO_MODULE_ENABLED`, com padrao desativado.
  - Bloqueadas rotas de MOMP, QOMP, upload de teto e dashboard orcamentario quando a flag estiver desativada.
  - Dash e blueprint de importacao de teto passaram a ser carregados somente quando o modulo orcamentario estiver ativado.
  - Arquivos alterados: `config.py`, `app.py`, `templates/base.html`.

- Atualizado o card do MTPO na pagina inicial:
  - Texto alterado de `MTPO-2026` para `MTPO-2027`.
  - Link alterado para `https://www.seplag.mt.gov.br/documents/d/asset-library-76706404/manual-tecnico-de-planejamento-e-orcamento-mtpo-2027`.
  - Arquivo alterado: `templates/home.html`.

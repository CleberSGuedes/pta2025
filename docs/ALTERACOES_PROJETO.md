# Alteracoes do Projeto PTA

## 2026-08-19

- Atualizada a regra de cadastro/alteracao de etapa:
  - O mesmo municipio da entrega pode ser vinculado a mais de uma etapa na mesma subacao.
  - A duplicidade passa a ser bloqueada apenas quando existir outra etapa ativa com o mesmo municipio e o mesmo nome final da etapa.
  - Datas de inicio e fim podem se repetir entre etapas.
  - A regra vale tanto para inclusao quanto para alteracao.
  - A mensagem de erro foi ajustada para explicar que o municipio pode ter varias etapas, desde que os nomes sejam diferentes.
  - Arquivos alterados: `app.py` e `static/js/etapa.js`.

## 2026-08-18

- Reorganizada a documentacao do projeto:
  - Criada a pasta `docs/`.
  - Movidos para `docs/` os documentos operacionais de analise, roteiro, checklist, ponto de parada, mapeamento da chave de planejamento, correcao Passenger e alteracoes do projeto.
  - Mantido `README.md` na raiz por convencao do repositorio.

- Atualizada a lista de Identificador de Uso da memoria de calculo:
  - Arquivo alterado: `static/js/idusoMap.js`.
  - Acrescentados os IDs `15 - PADIS CONTRAPARTIDA - PADIS CTRP` e `16 - PADIS DESEMPENHO-PBCs - PADIS PBCs`.
  - PAOEs atualizadas: `4172 - Desenvolvimento do Ensino Fundamental`, `4173 - Infraestrutura do Ensino Fundamental`, `4174 - Desenvolvimento do Ensino Medio`, `4175 - Infraestrutura da Educacao de Jovens e Adultos`, `4177 - Infraestrutura do Ensino Medio` e `4178 - Infraestrutura da Educacao Especial`.

- Corrigido mapeamento da chave de planejamento da PAOE `4525 - FMTE - Educacao Infantil` no programa `544 - Mato Grosso Mais Educacao`:
  - Incluidos os produtos `Unidade reformada Total de ampliacao de salas com banheiro`, `Unidade construida salas Total de Escola a Construir` e `Unidade reformada`.
  - Todos foram mapeados com UG `10`, ADJ `SAAS`, macropolitica `INFRAESTRUTURA`, pilar `P_INFRAESTR_`, eixo `E_INFRAESTRUTURA_ESC` e politica decreto `_INFRAESTRUTURA`.
  - Arquivo alterado: `static/js/subacao_entrega.js`.
  - Validado com `node --check static\js\subacao_entrega.js`.

## 2026-08-04

- Atualizada a lista de `Fonte de Recursos` no formulario `Incluir Memoria de Calculo`:
  - Substituida a lista fixa anterior de 13 fontes pela nova lista ordenada enviada para 2027.
  - A lista continua sendo mantida diretamente no template `templates/memoria_calculo.html`.
  - O campo permanece usando Select2 via `static/js/memoria_calculo.js`, permitindo pesquisa/digitacao.
  - Arquivo alterado: `templates/memoria_calculo.html`.

- Atualizada a lista de subfuncoes e acoes do cadastro de Acao/PAOE para o Programa `533 - Educacao 10 Anos`:
  - Incluida a subfuncao `365 - EDUCACAO INFANTIL`.
  - Vinculada a nova Acao/PAOE `4537 - Desenvolvimento do Regime de Colaboracao - Educacao Infantil`.
  - Incluida a nova Acao/PAOE `4538 - Desenvolvimento do Regime de Colaboracao - Ensino Fundamental` na subfuncao `361 - ENSINO FUNDAMENTAL`.
  - Incluida a nova Acao/PAOE `4541 - Educacao que Protege Meninas` na subfuncao `122 - ADMINISTRACAO GERAL`.
  - Arquivo alterado: `static/js/selects_dependentes.js`.
  - Observacao: nao houve insercao direta no banco nesta etapa porque o cadastro da acao exige responsavel, CPF e e-mail.

- Atualizado lote inicial de produtos da acao para novas PAOEs do Programa `533`, exercicio `2027`:
  - Atualizado `static/js/metaMap.js`.
  - Criado e executado o script `scripts/update_meta_2027_533_novas_paoes.py` para aplicar o lote no banco remoto.
  - Lote recebido com 6 produtos, sem duplicidades.
  - PAOE `4537`, Subfuncao `365`: `Regime de colaboracao desenvolvido` com `Percentual = 10,00`.
  - PAOE `4538`, Subfuncao `361`: `Regime de colaboracao desenvolvido` com `Percentual = 55,00`.
  - PAOE `4541`, Subfuncao `122`: 4 produtos com `Percentual = 2,00`.
  - Primeira execucao no banco remoto inseriu 6 produtos ativos em `produto_acao`.
  - Segunda execucao de validacao atualizou os mesmos 6 registros e nao criou duplicidades.
  - Validado com `node --check static\js\metaMap.js`.
  - Validado com `py -3.11 -m py_compile scripts\update_meta_2027_533_novas_paoes.py`.

- Atualizados os mapas da Chave de Planejamento para a nova PAOE `4541 - Educacao que Protege Meninas`, Programa `533`, Subfuncao `122`, UG `8`:
  - Atualizado `subfuncaoUGMap`: PAOE `4541` vinculada a UG `8`.
  - Atualizado `adjMap` para 4 produtos da acao.
  - Atualizado `macropoliticaMap` para 4 produtos da acao.
  - Atualizado `pilarMap` para 4 produtos da acao.
  - Atualizado `eixoMap` para 4 produtos da acao.
  - Atualizado `politicaMap` para 4 produtos da acao.
  - Arquivo alterado: `static/js/subacao_entrega.js`.
  - Validado com `node --check static\js\subacao_entrega.js`.

- Atualizados os mapas da Chave de Planejamento para a nova PAOE `4537 - Desenvolvimento do Regime de Colaboracao - Educacao Infantil`, Programa `533`, Subfuncao `365`, UG `10`:
  - Atualizado `subfuncaoUGMap`: PAOE `4537` vinculada a UG `10`.
  - Atualizado `adjMap`: `Regime de colaboracao desenvolvido` -> `SARC`.
  - Atualizado `macropoliticaMap`: `SARC` -> `REGIME_COLABORACAO`.
  - Atualizado `pilarMap`: `REGIME_COLABORACAO` -> `P_GESTAO_`.
  - Atualizado `eixoMap`: `P_GESTAO_` -> `E_REGIME_COLABORACAO`.
  - Atualizado `politicaMap`: `E_REGIME_COLABORACAO` -> `_REGIME_COLAB`.
  - Arquivo alterado: `static/js/subacao_entrega.js`.
  - Validado com `node --check static\js\subacao_entrega.js`.

- Atualizados os mapas da Chave de Planejamento para a nova PAOE `4538 - Desenvolvimento do Regime de Colaboracao - Ensino Fundamental`, Programa `533`, Subfuncao `361`, UG `9`:
  - Atualizado `subfuncaoUGMap`: PAOE `4538` vinculada a UG `9`.
  - Atualizado `adjMap`: `Regime de colaboracao desenvolvido` -> `SARC`.
  - Atualizado `macropoliticaMap`: `SARC` -> `REGIME_COLABORACAO`.
  - Atualizado `pilarMap`: `REGIME_COLABORACAO` -> `P_GESTAO_`.
  - Atualizado `eixoMap`: `P_GESTAO_` -> `E_REGIME_COLABORACAO`.
  - Atualizado `politicaMap`: `E_REGIME_COLABORACAO` -> `_REGIME_COLAB`.
  - Arquivo alterado: `static/js/subacao_entrega.js`.
  - Validado com `node --check static\js\subacao_entrega.js`.
  - Corrigido posicionamento dos blocos `macropoliticaMap`, `pilarMap`, `eixoMap` e `politicaMap`: a PAOE `4538` estava sob `362 - ENSINO MEDIO` e foi movida para `361 - ENSINO FUNDAMENTAL`.
  - Validado por leitura automatica dos mapas que o caminho `533 -> 361 -> 4538 -> UG 9 -> Regime de colaboracao desenvolvido` retorna valores em todos os mapas e nao existe mais em `362`.

## 2026-07-27

- Atualizado lote revisado de metas fisicas do Programa `534`, Subfuncao `122`, PAOE `4180`, exercicio `2027`:
  - Atualizado `static/js/metaMap.js`.
  - Criado e executado o script `scripts/update_meta_2027_534_122_4180_revisao.py` para aplicar o ajuste no banco remoto.
  - O lote enviado possuia 13 produtos, sem duplicidades.
  - Apenas 1 registro exigia alteracao:
    - `Valorizacao profissional desenvolvida`: `Percentual = 100,00` para `Percentual = 98,00`.
  - Os demais itens do lote ja estavam iguais no codigo e no banco.
  - Validado com `node --check static\js\metaMap.js`.
  - Validado no banco remoto que o produto ficou com `un_medida = Percentual` e `quantidade = 98,00`.
  - Alteracao mantida localmente para teste do usuario; sem commit/push nesta etapa.

- Atualizado lote revisado de metas fisicas do Programa `533`, Subfuncao `122`, PAOE `2936`, exercicio `2027`:
  - Atualizado `static/js/metaMap.js`.
  - Criado e executado o script `scripts/update_meta_2027_533_122_2936_revisao.py` para aplicar o lote no banco remoto.
  - O lote enviado possuia 26 produtos, sem duplicidades.
  - PAOE `2900` ja estava igual ao lote no codigo e no banco.
  - PAOE `2936` teve 3 registros atualizados de `Percentual = 4,00` para `Percentual = 3,00`:
    - `Bem-estar escolar desenvolvido`;
    - `Projetos pedagogicos integrados implantados`;
    - `Formacao continuada de professores realizada`.
  - Validado com `node --check static\js\metaMap.js`.
  - Validado no banco remoto que os 3 produtos ficaram com `un_medida = Percentual` e `quantidade = 3,00`.
  - Alteracao mantida localmente para teste do usuario; sem commit/push nesta etapa.

- Corrigido localmente erro de download Excel no Passenger/LiteSpeed:
  - Log online indicou `io.UnsupportedOperation: fileno` ao acessar a rota de download.
  - A causa provavel e incompatibilidade do `send_file()` com `BytesIO` no wrapper do Passenger/LiteSpeed.
  - O helper `_send_excel_file` passou a retornar `flask.Response` com os bytes do arquivo e headers de download, sem usar `send_file` para os Excels do PTA.
  - Validado localmente que `/baixar_excel` retorna `200`, `Content-Disposition: attachment; filename="pta.xlsx"` e `Cache-Control: no-cache`.
  - Alteracao mantida localmente para teste do usuario; sem commit/push nesta etapa.

- Ajustada localmente a exportacao Excel do PTA para reduzir erro 500 no ambiente online:
  - As rotas `/baixar_excel`, `/baixar_excel_municipios` e `/baixar_excel_etapas` deixaram de depender de `pandas` para montar o arquivo.
  - A geracao principal passou a usar `xlsxwriter` diretamente, sem carregar `pandas`, `numpy` ou `openpyxl`.
  - `openpyxl` permanece apenas como fallback caso `xlsxwriter` nao esteja disponivel.
  - Validado localmente que `/baixar_excel` retorna `200`, gera `pta.xlsx` e nao carrega `pandas` nem `numpy` no processo da rota.
  - Validado que o arquivo abre como planilha com aba `PTA Consolidado`.
  - Alteracao mantida localmente para teste do usuario; sem commit/push nesta etapa.

- Aplicada localmente a correcao preventiva para erro 503 no Passenger/cPanel:
  - `app.py` passou a limitar threads de bibliotecas numericas antes dos imports da aplicacao.
  - Removido import global de `pandas`; o carregamento passou a ocorrer somente nas rotas/funcoes de planilha.
  - Criado `passenger_wsgi.py` com a mesma limitacao de threads antes de importar o app Flask.
  - Ajustado `.cpanel.yml` para garantir `public`, `tmp`, permissoes `755`, remocao de `.git` no destino e restart do Passenger.
  - Criado `public/.htaccess` com configuracao Passenger do ambiente `pta2025`.
  - Criado documento `CORRECAO_ERRO_503_PASSENGER.md` com causa, testes, validacao no cPanel e rollback.
  - Validado localmente que `pandas` e `numpy` nao carregam no import do app.
  - Alteracao mantida localmente para teste do usuario; sem commit/push nesta etapa.

- Ajustado o `Painel de Acompanhamento do PTA` para direcionar pendencias:
  - O endpoint `/dashboard_status` passou a retornar os IDs de `Programa`, `Acao/PAOE`, `Produto da Acao` e `Subacao/Entrega` em cada pendencia de municipio sem etapa.
  - Cada item de pendencia no painel passou a exibir o link `Abrir etapa`.
  - O link direciona para `/etapas/<programa_id>/<acao_id>/<produto_id>/<subacao_id>`, abrindo diretamente a tela onde a etapa pendente deve ser cadastrada.
  - Validado localmente com a primeira pendencia retornada pelo painel: `/etapas/8/44/138/1236` respondeu `200`.
  - Alteracao mantida localmente para teste do usuario; sem commit/push nesta etapa.

- Corrigida robustez da rota `/baixar_excel` para o ambiente online:
  - Criado helper centralizado para gerar e enviar arquivos Excel do PTA.
  - A exportacao principal tenta usar `xlsxwriter` para manter a planilha estilizada.
  - Se `xlsxwriter` nao estiver disponivel no servidor, a rota passa a gerar o Excel com `openpyxl` sem estilos, evitando erro 500 por dependencia ausente.
  - O envio do arquivo passou a ter compatibilidade entre versoes do Flask que usam `download_name` e versoes antigas que usam `attachment_filename`.
  - Rotas ajustadas: `/baixar_excel`, `/baixar_excel_municipios` e `/baixar_excel_etapas`.

- Registrada regra operacional para limpeza futura de testes no banco:
  - Quando solicitado pelo usuario, a limpeza devera remover/resetar somente dados cadastrados da `Subacao/Entrega` para frente.
  - Cadastros fixos devem ser preservados: `Programa`, `Acao/PAOE` e `Produto da Acao`.
  - Escopo de limpeza: `Subacao/Entrega`, `Municipio(s) da Entrega`, `Etapa` e `Memoria de Calculo`.
  - A limpeza deve respeitar a ordem dos vinculos: primeiro `Memoria de Calculo`, depois `Etapa`, depois `Municipio(s) da Entrega` e por ultimo `Subacao/Entrega`.
  - Antes de executar qualquer exclusao/reset de IDs, deve ser gerado um relatorio de conferencia com a quantidade de registros que serao afetados.
  - O reset de IDs deve ser feito somente para as tabelas do escopo de testes, nunca para as tabelas fixas do planejamento.

- Implementado vinculo entre `Etapa` e `MunicipioEntrega`:
  - Adicionado campo `municipio_entrega_id` ao model `Etapa`.
  - Criada migracao `db/migrations/2026-07-27_etapa_municipio_entrega.sql`.
  - Criado script de aplicacao `scripts/apply_etapa_municipio_migration.py`.
  - Migracao aplicada no banco configurado.
  - Registros antigos foram vinculados automaticamente somente quando havia um unico municipio ativo na subacao.
  - Validacao apos migracao: existe 1 etapa ativa antiga ainda sem municipio vinculado, pois a subacao possui mais de um municipio e exige conferencia manual.

- Ajustada a tela `Cadastrar Etapa na Subacao/Entrega`:
  - Adicionado campo obrigatorio `Municipio`.
  - A lista de etapas passou a exibir o municipio vinculado.
  - Ao cadastrar etapa para municipio comum, o nome recebe prefixo `Municipio * Nome da Etapa`.
  - Ao cadastrar etapa para `5100000 - Estado`, o vinculo e gravado, mas o nome da etapa nao recebe prefixo.
  - O sistema bloqueia mais de uma etapa ativa para o mesmo municipio da mesma subacao.
  - Arquivos alterados: `templates/etapa.html`, `static/js/etapa.js`, `app.py`, `models.py`.

- Ajustada visualizacao e exportacao consolidada do PTA:
  - Consulta da tela `/visualizar` passou a unir municipio por `Etapa.municipio_entrega_id` quando houver etapa.
  - Etapas antigas sem municipio vinculado nao multiplicam memorias por todos os municipios da subacao.
  - O download principal `/baixar_excel` passou a gerar uma unica aba `PTA Consolidado`.
  - O arquivo Excel foi validado com sucesso e gerado com uma unica aba.

- Atualizado o painel da home para nova regra de etapa por municipio:
  - O alerta passou a contar `municipio(s) da entrega sem etapa vinculada`.
  - Os detalhes do alerta passaram a incluir o municipio pendente.

- Modernizado o `Painel de Acompanhamento do PTA` na pagina inicial:
  - Contagens passaram de lista textual para cards de indicadores.
  - Pendencias de subacoes sem etapa passaram para painel dedicado com resumo, busca e lista com rolagem.
  - A lista de alertas ficou preparada para muitos registros sem alongar excessivamente a home.
  - O endpoint `/dashboard_status` passou a retornar o `exercicio` para exibicao no badge do painel.
  - Arquivos alterados: `templates/home.html`, `static/css/style.css`, `app.py`.

- Ajustada a tela `Cadastrar Subacao/Entrega(s)`:
  - Corrigida a mascara do campo `CPF`, que nao era aplicada quando a Chave de Planejamento V2 estava ativa.
  - A mascara passou a ficar em inicializador independente da logica de encadeamento da Chave.
  - O card/lista do lado esquerdo agora cresce ate a altura do formulario `Incluir Subacao/Entrega(s)` em desktop.
  - A rolagem vertical da tabela esquerda passa a aparecer somente depois que o painel alcanca a altura do formulario direito.
  - A sincronizacao usa observacao de redimensionamento para acompanhar mudancas no formulario direito.
  - Arquivos alterados: `templates/subacao_entrega.html`, `static/css/style.css`, `static/js/subacao_entrega.js`.

- Atualizado documento `CHAVE_PLANEJAMENTO_MAPEAMENTO_COMPLETO.md`:
  - Documento passou a conter apenas os blocos de codigo dos mapas que alimentam a secao `Chave de Planejamento`.
  - Mapas incluidos: `regioesPlanejamento`, `subfuncaoUGMap`, `adjMap`, `macropoliticaMap`, `pilarMap`, `eixoMap`, `politicaMap` e `publico_ods`.
  - Objetivo: permitir analise direta do codigo atual para indicar o que deve sair e o que deve entrar na atualizacao 2027.

- Registrada estrutura padrao para atualizacoes futuras da Chave de Planejamento:
  - Estrutura anotada em `CHAVE_PLANEJAMENTO_MAPEAMENTO_COMPLETO.md`.
  - Campos necessarios: `Programa`, `Subfuncao`, `PAOE`, `UG`, `Produto`, `ADJ`, `Macropolitica`, `Pilar`, `Eixo` e `Politica Decreto`.
  - Nenhum mapa foi alterado nesta etapa; aplicacao futura depende de informacoes formais.

- Iniciada melhoria reversivel no formulario `Chave de Planejamento`:
  - Criado controlador `static/js/chave_planejamento_v2.js` para encadear os selects sem `setTimeout`.
  - Adicionada flag `window.USAR_CHAVE_PLANEJAMENTO_V2 = true` em `templates/subacao_entrega.html`.
  - A cadeia antiga em `static/js/subacao_entrega.js` permanece no codigo e e desativada somente quando a flag V2 esta ligada.
  - Para rollback rapido, alterar a flag para `false` no template e a pagina volta a usar a logica anterior.
  - A V2 reaproveita os mapas atuais, sem alterar `subfuncaoUGMap`, `adjMap`, `macropoliticaMap`, `pilarMap`, `eixoMap` ou `politicaMap`.
  - O JSON de edicao de subacao passou a retornar `produto`, garantindo que a Chave use o `Produto da Acao` correto ao alterar registros.

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

- Cadastrada nova PAOE no programa `544 - Mato Grosso Mais Educacao`:
  - Banco remoto: inserida a acao ativa ID `104`.
  - Subfuncao: `362 - ENSINO MEDIO`.
  - PAOE: `4545 - FMTE - Ensino Medio`.
  - Responsavel: `Ane Cristina dos Santos Barros`.
  - CPF: `014.566.901-75`.
  - E-mail: `ane.barros@edu.mt.gov.br`.
  - Atualizado `static/js/selects_dependentes.js` para exibir a PAOE no fluxo de cadastro de acao.
  - Pendentes para quando as equipes encaminharem as informacoes: produtos da acao, metas fisicas, chave de planejamento e ID Uso.

- Movidas PAOEs `4524` e `4525` do programa `534` para o programa `544` no PTA 2027:
  - Banco remoto: as acoes ativas `92` e `93` tiveram `programa_id` alterado de `15` para `20`.
  - PAOE `4524 - FMTE - Ensino Fundamental` passou para `544 - Mato Grosso Mais Educacao`.
  - PAOE `4525 - FMTE - Educacao Infantil` passou para `544 - Mato Grosso Mais Educacao`.
  - Produtos e metas ativas foram preservados:
    - `4524`: `Regime de colaboracao desenvolvido`, `Percentual = 10,00`.
    - `4525`: `Regime de colaboracao desenvolvido`, `Percentual = 20,00`.
    - `4525`: `Unidade reformada Total de ampliacao de salas com banheiro`, `Unidade = 17,00`.
    - `4525`: `Unidade construida salas Total de Escola a Construir`, `Unidade = 23,00`.
    - `4525`: `Unidade reformada`, `Unidade = 21,00`.
  - Atualizado `static/js/selects_dependentes.js`: PAOEs removidas do bloco `534` e inseridas no bloco `544`.
  - Atualizado `static/js/metaMap.js`: metas das PAOEs movidas para o programa `544`.
  - Atualizado `static/js/subacao_entrega.js`: mapas da chave de planejamento das PAOEs movidos para o programa `544`.
  - Atualizado `static/js/produto_acao.js`: lista da PAOE `4525` alinhada aos produtos com metas.
  - Mantidos sem alteracao `static/js/idusoMap.js`, pois a regra de ID Uso e vinculada diretamente a PAOE.
  - Mantidos sem alteracao os arquivos do modulo orcamentario/MOMP, pois esse modulo esta desativado nesta aplicacao.

- Cadastrado novo programa do PTA 2027:
  - Programa: `544 - Mato Grosso Mais Educacao`.
  - Funcao: `12 - EDUCACAO`.
  - Responsavel: `Flavia Emanuelle de Souza Soares`.
  - CPF: `956.746.241-00`.
  - E-mail: `flavia.soares@edu.mt.gov.br`.
  - Inserido no banco remoto na tabela `programa`, exercicio `2027`, como registro ativo.
  - ID gerado no banco: `20`.
  - Atualizada a lista fixa do formulario em `templates/cadastrar_programa.html`.
  - Atualizado o mapa de funcao do programa em `static/js/programa.js`.
  - Incluido o programa em `static/js/selects_dependentes.js` com bloco vazio para futuras subfuncoes e PAOEs.

- Atualizada a lista de Identificador de Uso da memoria de calculo para novas PAOEs:
  - Arquivo alterado: `static/js/idusoMap.js`.
  - Incluida a PAOE `4537 - Desenvolvimento do Regime de Colaboracao - Educacao Infantil` com IDs `01 - OUTRAS DESPESAS - OD` e `04 - CONTRATOS DIVERSOS - CD`.
  - Incluida a PAOE `4538 - Desenvolvimento do Regime de Colaboracao - Ensino Fundamental` com IDs `01 - OUTRAS DESPESAS - OD` e `04 - CONTRATOS DIVERSOS - CD`.
  - Incluida a PAOE `4541 - Educacao que Protege Meninas` com ID `19 - PROGRAMA MULHER - PROG MULHER`.

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

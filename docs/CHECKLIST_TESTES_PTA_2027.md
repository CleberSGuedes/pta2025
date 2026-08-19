# Checklist de Testes PTA 2027

Objetivo: validar que o PTA 2027 funciona sem misturar dados do exercicio 2026.

Configuracao esperada:

- `.env`: `PTA_EXERCICIO_ATUAL=2027`
- Modulo orcamentario/MOMP desativado nesta aplicacao.
- Base estrutural 2027 ja clonada a partir de 2026:
  - 6 programas ativos
  - 28 acoes ativas
  - 109 produtos da acao ativos
  - 0 subacoes
  - 0 etapas
  - 0 memorias

## 1. Validacao inicial

- [ ] Abrir `/`.
- [ ] Confirmar topo exibindo `PTA 2027`.
- [ ] Confirmar que o menu nao exibe `Teto Orcamentario`.
- [ ] Confirmar painel da home:
  - [ ] Programas: 6
  - [ ] Acoes/PAOEs: 28
  - [ ] Produtos da Acao/PAOE: 109
  - [ ] Subacoes/Entregas: 0
  - [ ] Etapas planejadas: 0
  - [ ] Memorias de calculo: 0

## 2. Cadastro de Programa

- [ ] Abrir `/cadastrar`.
- [ ] Confirmar exibicao de `Exercicio 2027`.
- [ ] Confirmar que lista apenas programas do exercicio 2027.
- [ ] Cadastrar um programa ficticio, se necessario.
- [ ] Alterar um programa ficticio.
- [ ] Confirmar que alteracao cria nova versao ativa e desativa a anterior.
- [ ] Excluir programa ficticio sem vinculos.
- [ ] Confirmar bloqueio de exclusao quando houver acao ativa vinculada.

## 3. Cadastro de Acao / PAOE

- [ ] Selecionar um programa 2027.
- [ ] Abrir tela de acoes.
- [ ] Confirmar exibicao de `Exercicio 2027`.
- [ ] Cadastrar uma acao ficticia.
- [ ] Alterar uma acao ficticia.
- [ ] Confirmar que produtos vinculados sao migrados para a nova versao da acao.
- [ ] Excluir acao ficticia sem produtos.
- [ ] Confirmar bloqueio de exclusao quando houver produto ativo vinculado.

## 4. Cadastro de Produto da Acao

- [ ] Selecionar uma acao 2027.
- [ ] Abrir tela de produtos.
- [ ] Cadastrar produto ficticio com unidade de medida e quantidade.
- [ ] Alterar produto ficticio.
- [ ] Confirmar que subacoes vinculadas sao migradas para a nova versao do produto.
- [ ] Excluir produto ficticio sem subacoes.
- [ ] Confirmar bloqueio de exclusao quando houver subacao ativa vinculada.

## 5. Cadastro de Subacao / Entrega

- [ ] Selecionar produto 2027.
- [ ] Abrir tela de subacoes/entregas.
- [ ] Cadastrar subacao ficticia.
- [ ] Informar UG, US, unidade de medida, quantidade e detalhamento.
- [ ] Selecionar regiao, subfuncao UG, ADJ, macropolitica, pilar, eixo e politica do decreto.
- [ ] Cadastrar municipios vinculados.
- [ ] Alterar subacao ficticia.
- [ ] Excluir subacao ficticia sem etapas.
- [ ] Confirmar bloqueio de exclusao quando houver etapa ativa vinculada.

## 6. Cadastro de Etapas

- [ ] Abrir tela de etapas de uma subacao 2027.
- [ ] Cadastrar etapa ficticia.
- [ ] Validar datas de inicio e fim.
- [ ] Alterar etapa ficticia.
- [ ] Confirmar que memorias vinculadas sao migradas para a nova versao da etapa.
- [ ] Excluir etapa ficticia.

## 7. Memoria de Calculo

- [ ] Abrir memoria de calculo de uma etapa 2027.
- [ ] Cadastrar item de despesa ficticio.
- [ ] Validar quantidade, valor unitario e valor total.
- [ ] Validar categoria economica, grupo, modalidade, elemento, subelemento, fonte e ID uso.
- [ ] Alterar memoria ficticia.
- [ ] Excluir memoria ficticia.

## 8. Visualizacao e exportacao

- [ ] Abrir `/visualizar`.
- [ ] Confirmar que a coluna `Exercicio` mostra apenas `2027`.
- [ ] Confirmar que nao aparecem registros de `2026`.
- [ ] Baixar Excel consolidado em `/baixar_excel`.
- [ ] Confirmar que o Excel contem somente dados de `2027`.
- [ ] Validar exportacao de municipios, se usada.
- [ ] Validar exportacao de etapas/memoria, se usada.

## 9. Isolamento entre exercicios

- [ ] Alterar temporariamente `.env` para `PTA_EXERCICIO_ATUAL=2026`.
- [ ] Reiniciar a aplicacao.
- [ ] Confirmar que `/visualizar` mostra a base 2026.
- [ ] Retornar `.env` para `PTA_EXERCICIO_ATUAL=2027`.
- [ ] Reiniciar a aplicacao.
- [ ] Confirmar que `/visualizar` volta a mostrar apenas 2027.

## 10. Modulo orcamentario desativado

- [ ] Confirmar que o menu nao exibe `Teto Orcamentario`.
- [ ] Acessar `/teto_orcamentario` diretamente.
- [ ] Confirmar redirecionamento para `/`.
- [ ] Enviar `POST /carregar_teto`.
- [ ] Confirmar resposta `404` informando modulo desativado.

-- Migracao: clona a base estrutural do PTA 2026 para o PTA 2027.
-- Escopo: somente registros ativos de programa, acao e produto_acao.
-- Fora do escopo: subacao_entrega, municipio_entrega, etapa e memoria_calculo.
-- Banco alvo: MariaDB/MySQL.

START TRANSACTION;

CREATE TEMPORARY TABLE tmp_programa_map (
    old_id INT NOT NULL PRIMARY KEY,
    new_id INT NOT NULL
);

CREATE TEMPORARY TABLE tmp_acao_map (
    old_id INT NOT NULL PRIMARY KEY,
    new_id INT NOT NULL
);

INSERT INTO programa (
    exercicio,
    nome,
    funcao,
    responsavel,
    cpf,
    email,
    ativo,
    alterado_em,
    excluido_em
)
SELECT
    '2027',
    p.nome,
    p.funcao,
    p.responsavel,
    p.cpf,
    p.email,
    1,
    NOW(),
    NULL
FROM programa p
WHERE p.exercicio = '2026'
  AND p.ativo = 1
  AND NOT EXISTS (
      SELECT 1
        FROM programa p27
       WHERE p27.exercicio = '2027'
         AND p27.nome = p.nome
         AND COALESCE(p27.funcao, '') = COALESCE(p.funcao, '')
         AND p27.ativo = 1
  );

INSERT INTO tmp_programa_map (old_id, new_id)
SELECT p26.id, p27.id
  FROM programa p26
  JOIN programa p27
    ON p27.exercicio = '2027'
   AND p27.nome = p26.nome
   AND COALESCE(p27.funcao, '') = COALESCE(p26.funcao, '')
   AND p27.ativo = 1
 WHERE p26.exercicio = '2026'
   AND p26.ativo = 1;

INSERT INTO acao (
    programa_id,
    subfuncao,
    acao_paoe,
    responsavel,
    cpf,
    email,
    ativo,
    alterado_em,
    excluido_em
)
SELECT
    pm.new_id,
    a.subfuncao,
    a.acao_paoe,
    a.responsavel,
    a.cpf,
    a.email,
    1,
    NOW(),
    NULL
FROM acao a
JOIN tmp_programa_map pm ON pm.old_id = a.programa_id
WHERE a.ativo = 1
  AND NOT EXISTS (
      SELECT 1
        FROM acao a27
       WHERE a27.programa_id = pm.new_id
         AND COALESCE(a27.subfuncao, '') = COALESCE(a.subfuncao, '')
         AND COALESCE(a27.acao_paoe, '') = COALESCE(a.acao_paoe, '')
         AND a27.ativo = 1
  );

INSERT INTO tmp_acao_map (old_id, new_id)
SELECT a26.id, a27.id
  FROM acao a26
  JOIN tmp_programa_map pm ON pm.old_id = a26.programa_id
  JOIN acao a27
    ON a27.programa_id = pm.new_id
   AND COALESCE(a27.subfuncao, '') = COALESCE(a26.subfuncao, '')
   AND COALESCE(a27.acao_paoe, '') = COALESCE(a26.acao_paoe, '')
   AND a27.ativo = 1
 WHERE a26.ativo = 1;

INSERT INTO produto_acao (
    acao_id,
    nome,
    un_medida,
    quantidade,
    ativo,
    alterado_em,
    excluido_em
)
SELECT
    am.new_id,
    pr.nome,
    pr.un_medida,
    pr.quantidade,
    1,
    NOW(),
    NULL
FROM produto_acao pr
JOIN tmp_acao_map am ON am.old_id = pr.acao_id
WHERE pr.ativo = 1
  AND NOT EXISTS (
      SELECT 1
        FROM produto_acao pr27
       WHERE pr27.acao_id = am.new_id
         AND COALESCE(pr27.nome, '') = COALESCE(pr.nome, '')
         AND COALESCE(pr27.un_medida, '') = COALESCE(pr.un_medida, '')
         AND COALESCE(pr27.quantidade, -999999999) = COALESCE(pr.quantidade, -999999999)
         AND pr27.ativo = 1
  );

DROP TEMPORARY TABLE IF EXISTS tmp_acao_map;
DROP TEMPORARY TABLE IF EXISTS tmp_programa_map;

COMMIT;

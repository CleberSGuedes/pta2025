-- Migracao: adiciona separacao por exercicio no modulo PTA.
-- Banco alvo: MariaDB/MySQL.
-- Regra definida: dados atuais do PTA serao marcados como exercicio 2026.
-- Novos cadastros deste ciclo devem usar exercicio 2027 via PTA_EXERCICIO_ATUAL.

START TRANSACTION;

ALTER TABLE programa
  ADD COLUMN IF NOT EXISTS exercicio VARCHAR(4) NULL AFTER id;

UPDATE programa
   SET exercicio = '2026'
 WHERE exercicio IS NULL OR exercicio = '';

ALTER TABLE programa
  MODIFY COLUMN exercicio VARCHAR(4) NOT NULL;

CREATE INDEX IF NOT EXISTS idx_programa_exercicio_ativo
    ON programa (exercicio, ativo);

COMMIT;

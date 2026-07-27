-- Migracao: vincula Etapa ao Municipio da Entrega.
-- Banco alvo: MariaDB/MySQL.
-- Objetivo: permitir exportacao PTA em aba unica sem multiplicar memorias por municipio.
-- Observacao: dados antigos so sao vinculados automaticamente quando a subacao possui um unico municipio ativo.

START TRANSACTION;

ALTER TABLE etapa
  ADD COLUMN IF NOT EXISTS municipio_entrega_id INT NULL AFTER subacao_entrega_id;

CREATE INDEX IF NOT EXISTS idx_etapa_municipio_entrega_id
    ON etapa (municipio_entrega_id);

UPDATE etapa e
JOIN (
    SELECT subacao_entrega_id, MIN(id) AS municipio_entrega_id
      FROM municipio_entrega
     WHERE ativo = 1
       AND excluido_em IS NULL
     GROUP BY subacao_entrega_id
    HAVING COUNT(*) = 1
) m ON m.subacao_entrega_id = e.subacao_entrega_id
   SET e.municipio_entrega_id = m.municipio_entrega_id
 WHERE e.municipio_entrega_id IS NULL
   AND e.ativo = 1
   AND e.excluido_em IS NULL;

SET @constraint_exists := (
    SELECT COUNT(*)
      FROM information_schema.TABLE_CONSTRAINTS
     WHERE CONSTRAINT_SCHEMA = DATABASE()
       AND TABLE_NAME = 'etapa'
       AND CONSTRAINT_NAME = 'fk_etapa_municipio_entrega'
);

SET @sql := IF(
    @constraint_exists = 0,
    'ALTER TABLE etapa ADD CONSTRAINT fk_etapa_municipio_entrega FOREIGN KEY (municipio_entrega_id) REFERENCES municipio_entrega(id)',
    'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

COMMIT;

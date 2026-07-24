import os
from decimal import Decimal

import pymysql
from dotenv import load_dotenv


LOTE = [
    ("534", "366", "2895", "Alimentação escolar mantida", "Percentual", Decimal("3.08")),
    ("534", "361", "2898", "Alimentação escolar mantida", "Percentual", Decimal("56.84")),
    ("534", "362", "2899", "Alimentação escolar mantida", "Percentual", Decimal("36.46")),
    ("534", "367", "2897", "Alimentação escolar mantida", "Percentual", Decimal("3.62")),
]


def main() -> None:
    load_dotenv()
    keys = [(programa, subfuncao, paoe, produto) for programa, subfuncao, paoe, produto, _, _ in LOTE]
    duplicates = sorted({key for key in keys if keys.count(key) > 1})
    if duplicates:
        raise SystemExit(f"Itens duplicados no lote: {duplicates}")

    conn = pymysql.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
    )
    try:
        with conn.cursor() as cur:
            updates = []
            missing = []
            for programa, subfuncao, paoe, produto, unidade, quantidade in LOTE:
                cur.execute(
                    """
                    SELECT p.id, p.nome, p.un_medida, p.quantidade
                    FROM produto_acao p
                    JOIN acao a ON a.id = p.acao_id
                    JOIN programa pr ON pr.id = a.programa_id
                    WHERE pr.exercicio = %s
                      AND pr.nome LIKE %s
                      AND a.subfuncao LIKE %s
                      AND a.acao_paoe LIKE %s
                      AND p.nome = %s
                      AND p.ativo = 1
                    """,
                    ("2027", f"{programa}%", f"{subfuncao}%", f"{paoe}%", produto),
                )
                rows = cur.fetchall()
                if len(rows) != 1:
                    missing.append((programa, subfuncao, paoe, produto, len(rows)))
                    continue
                updates.append((unidade, quantidade, rows[0]["id"], programa, subfuncao, paoe, rows[0]["nome"]))

            print(f"Itens no lote: {len(LOTE)}")
            print(f"Itens localizados no banco: {len(updates)}")

            if missing:
                print("Itens com correspondencia diferente de 1:")
                for programa, subfuncao, paoe, produto, count in missing:
                    print(f"- {programa}/{subfuncao}/{paoe} - {produto}: {count}")
                raise SystemExit(1)

            for unidade, quantidade, produto_id, programa, subfuncao, paoe, produto_db in updates:
                cur.execute(
                    """
                    UPDATE produto_acao
                    SET un_medida = %s, quantidade = %s
                    WHERE id = %s
                    """,
                    (unidade, quantidade, produto_id),
                )
                print(f"Atualizado: {programa}/{subfuncao}/{paoe} - {produto_db} -> {unidade} = {quantidade}")

        conn.commit()
        print(f"Total atualizado: {len(updates)}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()

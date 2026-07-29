import os
from decimal import Decimal

import pymysql
from dotenv import load_dotenv


LOTE = [
    ("Valorização profissional desenvolvida", "Percentual", Decimal("98.00")),
]


def canonical(value: str) -> str:
    return value.replace(",", "").replace(".", "").casefold().strip()


def main() -> None:
    load_dotenv()
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
                  AND p.ativo = 1
                ORDER BY p.nome
                """,
                ("2027", "534%", "122%", "4180%"),
            )
            rows = cur.fetchall()
            by_name = {canonical(row["nome"]): row for row in rows}

            print(f"Registros ativos encontrados no banco: {len(rows)}")
            print(f"Produtos no lote: {len(LOTE)}")

            updates = []
            for produto, unidade, quantidade in LOTE:
                row = by_name.get(canonical(produto))
                if not row:
                    raise SystemExit(f"Produto nao encontrado: {produto}")

                atual_quantidade = Decimal(str(row["quantidade"]))
                if row["un_medida"] == unidade and atual_quantidade == quantidade:
                    print(f"Sem alteracao: {row['nome']} ja esta em {unidade} = {quantidade}")
                    continue

                updates.append((unidade, quantidade, row["id"], row["nome"], row["un_medida"], atual_quantidade))

            for unidade, quantidade, produto_id, produto_db, atual_unidade, atual_quantidade in updates:
                cur.execute(
                    """
                    UPDATE produto_acao
                    SET un_medida = %s, quantidade = %s
                    WHERE id = %s
                    """,
                    (unidade, quantidade, produto_id),
                )
                print(
                    f"Atualizado: {produto_db} | "
                    f"{atual_unidade} = {atual_quantidade} -> {unidade} = {quantidade}"
                )

        conn.commit()
        print(f"Total atualizado: {len(updates)}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()

import os
from decimal import Decimal

import pymysql
from dotenv import load_dotenv


LOTE = [
    ("Bem-estar escolar desenvolvido", "Percentual", Decimal("3.00")),
    ("Projetos pedagógicos integrados implantados", "Percentual", Decimal("3.00")),
    ("Formação continuada de professores realizada", "Percentual", Decimal("3.00")),
]


def canonical(value: str) -> str:
    return (
        value.replace(",", "")
        .replace(".", "")
        .casefold()
        .strip()
    )


def main() -> None:
    load_dotenv()
    names = [item[0] for item in LOTE]
    duplicates = sorted({name for name in names if names.count(name) > 1})
    if duplicates:
        raise SystemExit(f"Produtos duplicados no lote: {duplicates}")

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
                ("2027", "533%", "122%", "2936%"),
            )
            rows = cur.fetchall()
            by_name = {canonical(row["nome"]): row for row in rows}

            print(f"Registros ativos encontrados no banco: {len(rows)}")
            print(f"Produtos no lote: {len(LOTE)}")

            missing = []
            updates = []
            unchanged = []
            for produto, unidade, quantidade in LOTE:
                row = by_name.get(canonical(produto))
                if not row:
                    missing.append(produto)
                    continue

                atual_unidade = row["un_medida"]
                atual_quantidade = Decimal(str(row["quantidade"]))
                if atual_unidade == unidade and atual_quantidade == quantidade:
                    unchanged.append(row["nome"])
                else:
                    updates.append((unidade, quantidade, row["id"], row["nome"], atual_unidade, atual_quantidade))

            if missing:
                print("Produtos nao encontrados:")
                for produto in missing:
                    print(f"- {produto}")
                raise SystemExit(1)

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
        print(f"Sem alteracao: {len(unchanged)}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()

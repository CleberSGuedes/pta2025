import os
from decimal import Decimal

import pymysql
from dotenv import load_dotenv


LOTE = [
    ("Remuneração professores e profissionais da educação, FUNDEB 70%, Art. 26, § 1º, II, Lei 14.113/20", "Percentual", Decimal("70.00")),
    ("Remuneração professores e profissionais da educação, FUNDEB 30%, Arts. 26-A, 14.113/20 e 70, 9394/96", "Percentual", Decimal("30.00")),
    ("Remuneração professores e profissionais da educação com recursos do MDE, Art. 70, Lei 9394/1996", "Percentual", Decimal("100.00")),
    ("Avaliação (Avalia MT) desenvolvida", "Percentual", Decimal("54.00")),
    ("Línguas estrangeiras desenvolvidas", "Percentual", Decimal("54.00")),
    ("Escolas militares desenvolvidas", "Percentual", Decimal("57.18")),
    ("Educação escolar indígena desenvolvida", "Percentual", Decimal("49.68")),
    ("Educação escolar quilombola desenvolvida", "Percentual", Decimal("57.18")),
    ("Educação escolar do campo desenvolvida", "Percentual", Decimal("57.18")),
    ("Acesso e permanência desenvolvido", "Percentual", Decimal("54.00")),
    ("Bem-estar escolar desenvolvido", "Percentual", Decimal("54.00")),
    ("Uniformes escolares disponibilizados", "Percentual", Decimal("56.84")),
    ("Materiais escolares disponibilizados", "Percentual", Decimal("56.84")),
    ("Projetos pedagógicos integrados implantados", "Percentual", Decimal("54.00")),
    ("Formação continuada de professores realizada", "Percentual", Decimal("54.00")),
    ("Sistema estruturado de ensino implantado", "Percentual", Decimal("54.00")),
    ("Educação em tempo integral desenvolvida", "Percentual", Decimal("57.18")),
    ("Alfabetização desenvolvida", "Percentual", Decimal("26.56")),
]


def canonical(value: str) -> str:
    return (
        value.replace("Art. ", "Art ")
        .replace("Arts. ", "Arts ")
        .replace(",", "")
        .replace(".", "")
        .casefold()
    )


def main() -> None:
    load_dotenv()
    duplicates = sorted({item[0] for item in LOTE if [x[0] for x in LOTE].count(item[0]) > 1})
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
                ("2027", "533%", "361%", "4172%"),
            )
            rows = cur.fetchall()
            by_name = {canonical(row["nome"]): row for row in rows}

            print(f"Registros ativos encontrados no banco: {len(rows)}")
            print(f"Produtos no lote: {len(LOTE)}")

            missing = []
            updates = []
            for produto, unidade, quantidade in LOTE:
                row = by_name.get(canonical(produto))
                if not row:
                    missing.append(produto)
                    continue
                updates.append((unidade, quantidade, row["id"], row["nome"]))

            if missing:
                print("Produtos nao encontrados:")
                for produto in missing:
                    print(f"- {produto}")
                raise SystemExit(1)

            for unidade, quantidade, produto_id, produto_db in updates:
                cur.execute(
                    """
                    UPDATE produto_acao
                    SET un_medida = %s, quantidade = %s
                    WHERE id = %s
                    """,
                    (unidade, quantidade, produto_id),
                )
                print(f"Atualizado: {produto_db} -> {unidade} = {quantidade}")

        conn.commit()
        print(f"Total atualizado: {len(updates)}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()

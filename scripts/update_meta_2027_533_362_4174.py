import os
from decimal import Decimal

import pymysql
from dotenv import load_dotenv


LOTE = [
    ("Avaliação (Avalia MT) desenvolvida", "Percentual", Decimal("34.63")),
    ("Línguas estrangeiras desenvolvidas", "Percentual", Decimal("34.63")),
    ("Escolas militares desenvolvidas", "Percentual", Decimal("37.82")),
    ("Educação escolar indígena desenvolvida", "Percentual", Decimal("30.32")),
    ("Educação escolar quilombola desenvolvida", "Percentual", Decimal("37.82")),
    ("Educação escolar do campo desenvolvida", "Percentual", Decimal("37.82")),
    ("Acesso e permanência desenvolvido", "Percentual", Decimal("34.63")),
    ("Bem-estar escolar desenvolvido", "Percentual", Decimal("34.63")),
    ("Uniformes escolares disponibilizados", "Percentual", Decimal("36.46")),
    ("Materiais escolares disponibilizados", "Percentual", Decimal("36.46")),
    ("Projetos pedagógicos integrados implantados", "Percentual", Decimal("34.63")),
    ("Formação continuada de professores realizada", "Percentual", Decimal("34.63")),
    ("Sistema estruturado de ensino implantado", "Percentual", Decimal("34.63")),
    ("Educação em tempo integral desenvolvida", "Percentual", Decimal("37.82")),
    ("Novo ensino médio e ensino técnico profissionalizante desenvolvido", "Percentual", Decimal("100.00")),
]


def canonical(value: str) -> str:
    return value.replace(",", "").replace(".", "").casefold()


def main() -> None:
    load_dotenv()
    nomes = [item[0] for item in LOTE]
    duplicates = sorted({nome for nome in nomes if nomes.count(nome) > 1})
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
                ("2027", "533%", "362%", "4174%"),
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

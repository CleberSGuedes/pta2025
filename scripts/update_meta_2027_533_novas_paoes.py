import os
from decimal import Decimal

import pymysql
from dotenv import load_dotenv


LOTE = [
    ("533", "365", "4537", "Regime de colaboração desenvolvido", "Percentual", Decimal("10.00")),
    ("533", "361", "4538", "Regime de colaboração desenvolvido", "Percentual", Decimal("55.00")),
    ("533", "122", "4541", "Bem-estar escolar desenvolvido", "Percentual", Decimal("2.00")),
    ("533", "122", "4541", "Projetos pedagógicos integrados implantados", "Percentual", Decimal("2.00")),
    ("533", "122", "4541", "Formação continuada de professores realizada", "Percentual", Decimal("2.00")),
    ("533", "122", "4541", "Valorização profissional desenvolvida", "Percentual", Decimal("2.00")),
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
        updated = []
        inserted = []
        with conn.cursor() as cur:
            for programa, subfuncao, paoe, produto, unidade, quantidade in LOTE:
                cur.execute(
                    """
                    SELECT a.id
                    FROM acao a
                    JOIN programa pr ON pr.id = a.programa_id
                    WHERE pr.exercicio = %s
                      AND pr.nome LIKE %s
                      AND a.subfuncao LIKE %s
                      AND a.acao_paoe LIKE %s
                      AND pr.ativo = 1
                      AND a.ativo = 1
                    """,
                    ("2027", f"{programa}%", f"{subfuncao}%", f"{paoe}%"),
                )
                acoes = cur.fetchall()
                if len(acoes) != 1:
                    raise SystemExit(f"Acao nao localizada de forma unica: {programa}/{subfuncao}/{paoe}: {len(acoes)}")

                acao_id = acoes[0]["id"]
                cur.execute(
                    """
                    SELECT id, nome, un_medida, quantidade
                    FROM produto_acao
                    WHERE acao_id = %s
                      AND nome = %s
                      AND ativo = 1
                    """,
                    (acao_id, produto),
                )
                produtos = cur.fetchall()
                if len(produtos) > 1:
                    raise SystemExit(f"Produto ativo duplicado no banco: {programa}/{subfuncao}/{paoe} - {produto}")

                if produtos:
                    cur.execute(
                        """
                        UPDATE produto_acao
                        SET un_medida = %s, quantidade = %s
                        WHERE id = %s
                        """,
                        (unidade, quantidade, produtos[0]["id"]),
                    )
                    updated.append((programa, subfuncao, paoe, produto, unidade, quantidade))
                else:
                    cur.execute(
                        """
                        INSERT INTO produto_acao (acao_id, nome, un_medida, quantidade, ativo)
                        VALUES (%s, %s, %s, %s, 1)
                        """,
                        (acao_id, produto, unidade, quantidade),
                    )
                    inserted.append((programa, subfuncao, paoe, produto, unidade, quantidade))

        conn.commit()

        print(f"Itens no lote: {len(LOTE)}")
        print(f"Atualizados: {len(updated)}")
        for item in updated:
            print(f"Atualizado: {item[0]}/{item[1]}/{item[2]} - {item[3]} -> {item[4]} = {item[5]}")
        print(f"Inseridos: {len(inserted)}")
        for item in inserted:
            print(f"Inserido: {item[0]}/{item[1]}/{item[2]} - {item[3]} -> {item[4]} = {item[5]}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()

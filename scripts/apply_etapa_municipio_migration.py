from pathlib import Path

from sqlalchemy import create_engine

from config import Config


MIGRATION_PATH = Path("db/migrations/2026-07-27_etapa_municipio_entrega.sql")


def _strip_comments(sql: str) -> str:
    lines = []
    for line in sql.splitlines():
        stripped = line.strip()
        if stripped.startswith("--"):
            continue
        lines.append(line)
    return "\n".join(lines)


def _split_statements(sql: str) -> list[str]:
    statements = []
    current = []
    in_quote = False
    quote_char = ""

    for char in sql:
        if char in {"'", '"'}:
            if in_quote and char == quote_char:
                in_quote = False
                quote_char = ""
            elif not in_quote:
                in_quote = True
                quote_char = char

        if char == ";" and not in_quote:
            statement = "".join(current).strip()
            if statement:
                statements.append(statement)
            current = []
            continue

        current.append(char)

    statement = "".join(current).strip()
    if statement:
        statements.append(statement)
    return statements


def main() -> None:
    sql = _strip_comments(MIGRATION_PATH.read_text(encoding="utf-8"))
    statements = _split_statements(sql)
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

    connection = engine.raw_connection()
    try:
        cursor = connection.cursor()
        try:
            for statement in statements:
                cursor.execute(statement)
        finally:
            cursor.close()
        connection.commit()
    finally:
        connection.close()

    print("Migração aplicada: etapa.municipio_entrega_id")


if __name__ == "__main__":
    main()

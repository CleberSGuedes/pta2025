# pta/config.py

import os
from dotenv import load_dotenv
from sqlalchemy.pool import NullPool

load_dotenv()

def _env_bool(name, default=False):
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}

class Config:
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
        f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
        f"?charset=utf8mb4"
    )
    SQLALCHEMY_ENGINE_OPTIONS = {
        "poolclass": NullPool,  # evita reuse de conexoes em hospedagem compartilhada
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    ORCAMENTO_MODULE_ENABLED = _env_bool('ORCAMENTO_MODULE_ENABLED', False)
    PTA_EXERCICIO_ATUAL = os.getenv('PTA_EXERCICIO_ATUAL', '2027')

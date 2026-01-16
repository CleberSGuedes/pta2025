# pta/config.py

import os
from dotenv import load_dotenv
from sqlalchemy.pool import NullPool

load_dotenv()

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

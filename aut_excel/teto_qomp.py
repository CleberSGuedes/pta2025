# aut_excel/teto_qomp.py
# -*- coding: utf-8 -*-
import os
import re
import uuid
import time
from datetime import datetime
from decimal import Decimal, InvalidOperation

import pandas as pd
from flask import Blueprint, request, redirect, url_for, flash, current_app, jsonify
from werkzeug.utils import secure_filename
from sqlalchemy import create_engine, text

# IMPORTES PESADOS (plan23 / qompxpta) AGORA SÃO FEITOS LOCALMENTE
# dentro de cada fluxo, para evitar quebra do app no startup em produção.

teto_excel_bp = Blueprint("teto_excel_bp", __name__)

# ----------------------------
# Utilidades de diretório TMP
# ----------------------------
def _tmp_dir():
    base = current_app.root_path
    tmp = os.path.join(base, "uploads", "tmp")
    os.makedirs(tmp, exist_ok=True)
    return tmp

def _cleanup_tmp(tmp_path: str, max_age_seconds: float = 48 * 3600) -> int:
    """
    Remove arquivos antigos em tmp_path. A 'idade' é baseada em mtime (última
    modificação de conteúdo). Em Windows, ctime é criação/metadata e pode ser
    atualizado por antivírus/backup, mantendo arquivos eternamente 'recentes'.
    """
    removed = 0
    if not os.path.isdir(tmp_path):
        return removed

    now = time.time()
    cutoff = now - float(max_age_seconds)
    removed_names = []

    try:
        # Varre só arquivos; evita seguir links e é mais performático
        with os.scandir(tmp_path) as it:
            for entry in it:
                try:
                    if entry.is_file(follow_symlinks=False):
                        st = entry.stat(follow_symlinks=False)
                        # Baseia SOMENTE no mtime
                        mtime = st.st_mtime
                        if mtime < cutoff:
                            os.remove(entry.path)
                            removed += 1
                            removed_names.append(entry.name)
                except PermissionError:
                    # arquivo em uso — ignora silenciosamente
                    continue
                except Exception:
                    try:
                        current_app.logger.debug(f"[cleanup_tmp] Falha ao remover {entry.path}")
                    except Exception:
                        pass
                    continue

        # (Opcional) tenta remover subpastas vazias
        with os.scandir(tmp_path) as it2:
            for entry in it2:
                if entry.is_dir(follow_symlinks=False):
                    try:
                        if not os.listdir(entry.path):
                            os.rmdir(entry.path)
                    except Exception:
                        pass

        try:
            if removed_names:
                current_app.logger.info(
                    f"[cleanup_tmp] Removidos {removed} arquivo(s) antigos de {tmp_path}: {removed_names}"
                )
            else:
                current_app.logger.debug(
                    f"[cleanup_tmp] Nenhum arquivo antigo para remover em {tmp_path}."
                )
        except Exception:
            pass

    except Exception:
        try:
            current_app.logger.warning(f"[cleanup_tmp] Erro ao escanear {tmp_path}")
        except Exception:
            pass

    return removed

# ----------------------------
# Banco de dados
# ----------------------------
def _get_engine():
    uri = (current_app.config.get("SQLALCHEMY_DATABASE_URI")
           or current_app.config.get("DATABASE_URI"))
    if not uri:
        raise RuntimeError("Configuração de banco ausente: defina SQLALCHEMY_DATABASE_URI.")
    return create_engine(uri)

# ----------------------------
# Helpers
# ----------------------------
def _strip_series(s: pd.Series) -> pd.Series:
    return s.astype(str).fillna("").str.strip()

def _fonte_key(val: str) -> str:
    s = (val or "").strip()
    m = re.match(r"^\s*(\d{5,})", s)
    return m.group(1) if m else s

def _to_decimal_us(x):
    if x is None:
        return None
    s = str(x).strip()
    if s == "":
        return None
    s = s.replace(",", "")  # remove milhar US, se houver
    try:
        return Decimal(s)
    except (InvalidOperation, ValueError):
        return None

def _to_decimal_br(x):
    """Converte '39.056.642,00' -> Decimal('39056642.00')."""
    if x is None:
        return None
    s = str(x).strip()
    if s == "":
        return None
    # remove milhares '.', troca vírgula por ponto
    s = s.replace(".", "").replace(",", ".")
    try:
        return Decimal(s)
    except (InvalidOperation, ValueError):
        return None

# ----------------------------
# Rota principal
# ----------------------------
@teto_excel_bp.route("/carregar_teto", methods=["POST"])
def carregar_teto_post():
    exercicio = (request.form.get("exercicio") or "").strip()
    tabela    = (request.form.get("tabela") or "").strip()
    arquivo   = request.files.get("arquivo")

    ajax = request.args.get("ajax") == "1"

    def _respond(status, message):
        if ajax:
            return jsonify({"status": status, "message": message})
        cat = "success" if status == "success" else ("warning" if status == "warning" else "danger")
        flash(message, cat)
        return redirect(url_for("carregar_teto"))

    try:
        if not exercicio or not tabela or not arquivo:
            return _respond("warning", "Preencha <b>Exercício</b>, <b>Tabela</b> e selecione um <b>arquivo .xlsx</b>.")

        if not arquivo.filename.lower().endswith(".xlsx"):
            return _respond("error", "O arquivo precisa ser <b>.xlsx</b>.")

        tmp_dir = _tmp_dir()
        # para testar limpeza em 2 minutos, use 120; depois volte p/ 48*3600
        _cleanup_tmp(tmp_dir, max_age_seconds=120)

        original = secure_filename(arquivo.filename)
        uniq = datetime.now().strftime("%Y%m%d-%H%M%S") + "-" + uuid.uuid4().hex[:8]
        fname = f"{uniq}-{original}"
        fpath = os.path.join(tmp_dir, fname)
        arquivo.save(fpath)

        # valida leitura
        try:
            wb = pd.read_excel(fpath, sheet_name=None, dtype=str)
            first_df = next(iter(wb.values()))
            _ = len(first_df) + len(first_df.columns)
        except Exception as e:
            return _respond("error", f"Arquivo salvo (<b>{fname}</b>), mas houve erro na leitura do Excel:<br><code>{str(e)}</code>")

        # ---------------------- FLUXO dbo.momp ----------------------
        if tabela == "dbo.momp":
            try:
                # import local (lazy) para evitar quebra no startup em produção
                try:
                    from .plan23 import gerar_plan23_tratado  # noqa
                except Exception as e_imp:
                    return _respond(
                        "error",
                        "Falha ao carregar o processador do Plan 23.<br>"
                        "Verifique se as dependências (pandas/openpyxl) estão instaladas no servidor.<br>"
                        f"<code>{e_imp}</code>"
                    )

                # 1) Gerar tratado a partir do arquivo enviado
                tratado_path = gerar_plan23_tratado(input_path=fpath, output_dir=tmp_dir)

                # 2) Ler a aba plan23_bd (pronta p/ banco)
                try:
                    df_bd = pd.read_excel(tratado_path, sheet_name="plan23_bd", dtype=str)
                except Exception as e:
                    return _respond("error", f"Falha ao ler a aba <b>plan23_bd</b>:<br><code>{e}</code>")

                req_cols = [
                    "exercicio",
                    "fonte",
                    "grupo_despesa",
                    "teto_despesa_momp",
                    "subteto_despesa_momp",
                    "teto_anual",
                ]
                miss = [c for c in req_cols if c not in df_bd.columns]
                if miss:
                    return _respond("error", f"Aba <b>plan23_bd</b> não possui as colunas necessárias: <code>{miss}</code>.")

                # normalizações leves
                for c in req_cols:
                    df_bd[c] = _strip_series(df_bd[c])

                # 3) Persistência linha a linha (precisamos migrar vínculos)
                engine = _get_engine()
                with engine.begin() as conn:
                    for _, r in df_bd.iterrows():
                        ex  = r["exercicio"]
                        fon = r["fonte"]
                        grp = r["grupo_despesa"]
                        teto_grp = r["teto_despesa_momp"]
                        subt = r["subteto_despesa_momp"]
                        teto_anual_dec = _to_decimal_br(r["teto_anual"])

                        # Busca registros antigos compatíveis (chave composta)
                        rows_old = conn.execute(
                            text("""
                                SELECT id
                                  FROM dbo.momp
                                 WHERE exercicio = :ex
                                   AND fonte = :fon
                                   AND grupo_despesa = :grp
                                   AND teto_despesa_momp = :teto_grp
                                   AND subteto_despesa_momp = :subt
                            """),
                            {"ex": ex, "fon": fon, "grp": grp, "teto_grp": teto_grp, "subt": subt}
                        ).mappings().all()
                        old_ids = [int(x["id"]) for x in rows_old] if rows_old else []

                        # Insere o novo registro (ativo=1) e captura o novo id
                        new_id_row = conn.execute(
                            text("""
                                INSERT INTO dbo.momp
                                (exercicio, fonte, grupo_despesa, teto_despesa_momp, subteto_despesa_momp, teto_anual, ativo)
                                OUTPUT inserted.id
                                VALUES (:ex, :fon, :grp, :teto_grp, :subt, :teto_anual, 1)
                            """),
                            {
                                "ex": ex,
                                "fon": fon,
                                "grp": grp,
                                "teto_grp": teto_grp,
                                "subt": subt,
                                "teto_anual": teto_anual_dec,
                            }
                        ).first()
                        new_id = int(new_id_row[0])

                        if old_ids:
                            # Move vínculos da filha (politicateto) para o novo registro
                            # e desativa todos os antigos
                            ph = ", ".join([f":oid{i}" for i in range(len(old_ids))])
                            params = {f"oid{i}": old_ids[i] for i in range(len(old_ids))}
                            params["nid"] = new_id

                            conn.execute(
                                text(f"""
                                    UPDATE dbo.politicateto
                                       SET momp_id = :nid
                                     WHERE momp_id IN ({ph})
                                """),
                                params
                            )
                            conn.execute(
                                text(f"""
                                    UPDATE dbo.momp
                                       SET ativo = 0
                                     WHERE id IN ({ph})
                                """),
                                params
                            )

                base = os.path.basename(tratado_path)
                # limpeza pós-processamento (janela padrão 48h)
                _cleanup_tmp(tmp_dir, max_age_seconds=48 * 3600)
                return _respond("success", "Processo concluído. Tabela dbo.momp atualizada.")

            except Exception as e:
                return _respond("error", f"Falha ao processar/atualizar a tabela <code>dbo.momp</code>:<br><code>{e}</code>")

        # ---------------------- FLUXO dbo.politicateto ----------------------
        if tabela == "dbo.politicateto":
            try:
                # import local (lazy)
                try:
                    from .qompxpta import gerar_qompxpta_tratado, autosize_columns, apply_font  # noqa
                except Exception as e_imp:
                    return _respond(
                        "error",
                        "Falha ao carregar o processador do QOMPxPTA.<br>"
                        "Verifique se as dependências (pandas/openpyxl/xlsxwriter) estão instaladas no servidor.<br>"
                        f"<code>{e_imp}</code>"
                    )

                # 1) trata e gera arquivo com planilhas 134
                tratado_path = gerar_qompxpta_tratado(input_path=fpath, output_dir=tmp_dir)

                # 2) lê a aba plan134_final
                try:
                    df_fin = pd.read_excel(tratado_path, sheet_name="plan134_final", dtype=str)
                except Exception as e:
                    return _respond("error", f"Falha ao ler a aba <b>plan134_final</b>:<br><code>{e}</code>")

                needed = ["fonte", "grupo_despesa", "subteto_despesa_momp", "teto_politica_decreto"]
                miss = [c for c in needed if c not in df_fin.columns]
                if miss:
                    return _respond("error", f"Aba <b>plan134_final</b> não possui as colunas necessárias: <code>{miss}</code>.")

                # preserva como TEXTO US para a plan134_id
                df_fin["__teto_us"] = df_fin["teto_politica_decreto"].astype(str)

                # 3) busca MOMP (ativo/exercício)
                engine = _get_engine()
                with engine.begin() as conn:
                    rows = conn.execute(
                        text("""
                            SELECT id, fonte, grupo_despesa, subteto_despesa_momp
                              FROM dbo.momp
                             WHERE exercicio = :ex AND ativo = 1
                        """),
                        {"ex": exercicio}
                    ).mappings().all()
                df_momp = pd.DataFrame(rows) if rows else pd.DataFrame(columns=["id","fonte","grupo_despesa","subteto_despesa_momp"])

                # 4) chaves
                for c in ["fonte", "grupo_despesa", "subteto_despesa_momp"]:
                    df_fin[c] = _strip_series(df_fin[c])

                df_fin["_k_fonte_txt"] = df_fin["fonte"]
                df_fin["_k_grupo"]     = df_fin["grupo_despesa"]
                df_fin["_k_subt"]      = df_fin["subteto_despesa_momp"]
                df_fin["_k_fonte_num"] = df_fin["fonte"].apply(_fonte_key)

                if not df_momp.empty:
                    for c in ["fonte","grupo_despesa","subteto_despesa_momp"]:
                        df_momp[c] = _strip_series(df_momp[c])

                    df_momp["_k_fonte_txt"] = df_momp["fonte"]
                    df_momp["_k_grupo"]     = df_momp["grupo_despesa"]
                    df_momp["_k_subt"]      = df_momp["subteto_despesa_momp"]
                    df_momp["_k_fonte_num"] = df_momp["fonte"].apply(_fonte_key)

                    map_exact = (
                        df_momp.sort_values("id")
                               .groupby(["_k_fonte_txt","_k_grupo","_k_subt"], dropna=False)
                               .agg(momp_id=("id","min"), fonte_canon=("fonte","first"))
                               .reset_index()
                    )
                    map_num = (
                        df_momp.sort_values("id")
                               .groupby(["_k_fonte_num","_k_grupo","_k_subt"], dropna=False)
                               .agg(momp_id=("id","min"), fonte_canon=("fonte","first"))
                               .reset_index()
                    )
                else:
                    map_exact = pd.DataFrame(columns=["_k_fonte_txt","_k_grupo","_k_subt","momp_id","fonte_canon"])
                    map_num   = pd.DataFrame(columns=["_k_fonte_num","_k_grupo","_k_subt","momp_id","fonte_canon"])

                # 5) joins
                df_id = df_fin.merge(map_exact, on=["_k_fonte_txt","_k_grupo","_k_subt"], how="left")
                df_id.rename(columns={"momp_id":"momp_id_exact","fonte_canon":"fonte_canon_exact"}, inplace=True)

                map_num_ren = map_num.rename(columns={"momp_id":"momp_id_fb","fonte_canon":"fonte_canon_fb"})
                df_id = df_id.merge(map_num_ren, on=["_k_fonte_num","_k_grupo","_k_subt"], how="left")

                df_id["momp_id"] = df_id["momp_id_exact"].fillna(df_id["momp_id_fb"])
                cond_rewrite = df_id["momp_id_exact"].isna() & df_id["momp_id_fb"].notna()
                df_id.loc[cond_rewrite, "fonte"] = df_id.loc[cond_rewrite, "fonte_canon_fb"]

                # mantém teto como TEXTO US
                if "__teto_us" in df_id.columns:
                    df_id["teto_politica_decreto"] = df_id["__teto_us"].astype(str)

                # limpa auxiliares e move momp_id para 1ª coluna
                drop_aux = ["__teto_us","_k_fonte_txt","_k_fonte_num","_k_grupo","_k_subt",
                            "momp_id_exact","momp_id_fb","fonte_canon_exact","fonte_canon_fb"]
                df_id = df_id.drop(columns=[c for c in drop_aux if c in df_id.columns])
                cols = df_id.columns.tolist()
                if "momp_id" in cols:
                    cols.remove("momp_id")
                df_id = df_id.reindex(columns=["momp_id"] + cols)

                # 6) grava nova aba plan134_id
                for attempt in range(3):
                    try:
                        with pd.ExcelWriter(tratado_path, engine="openpyxl", mode="a", if_sheet_exists="replace") as writer:
                            df_id.to_excel(writer, sheet_name="plan134_id", index=False)
                            ws = writer.sheets["plan134_id"]
                            autosize_columns(ws, df_id)
                            apply_font(ws, font_name="Helvetica", font_size=8)
                        break
                    except PermissionError:
                        if attempt == 2:
                            raise
                        time.sleep(0.6)

                # 7) gravar no banco
                cols_out = [
                    "momp_id",
                    "regiao",
                    "subfuncao_ug",
                    "adj",
                    "macropolitica",
                    "pilar",
                    "eixo",
                    "politica_decreto",
                    "publico_transversal",
                    "acao_paoe",
                    "teto_politica_decreto",
                ]
                df_out = df_id.copy()
                missing_cols = [c for c in cols_out if c not in df_out.columns]
                if missing_cols:
                    return _respond("error", f"Aba <b>plan134_id</b> não possui colunas para gravação: <code>{missing_cols}</code>.")

                df_out = df_out[df_out["momp_id"].notna()].copy()
                df_out["momp_id"] = pd.to_numeric(df_out["momp_id"], errors="coerce").astype("Int64")
                df_out = df_out[df_out["momp_id"].notna()].copy()
                df_out["teto_politica_decreto"] = df_out["teto_politica_decreto"].apply(_to_decimal_us)
                df_out = df_out[cols_out].copy()

                if not df_out.empty:
                    ids_uni = sorted(set(int(x) for x in df_out["momp_id"].dropna().tolist()))
                    engine = _get_engine()
                    with engine.begin() as conn:
                        if ids_uni:
                            ph = ", ".join([f":id{i}" for i in range(len(ids_uni))])
                            params = {f"id{i}": ids_uni[i] for i in range(len(ids_uni))}
                            conn.execute(
                                text(f"""
                                    UPDATE dbo.politicateto
                                       SET ativo = 0
                                     WHERE ativo = 1
                                       AND momp_id IN ({ph})
                                """),
                                params
                            )
                        insert_sql = text("""
                            INSERT INTO dbo.politicateto
                            (
                                momp_id,
                                regiao,
                                subfuncao_ug,
                                adj,
                                macropolitica,
                                pilar,
                                eixo,
                                politica_decreto,
                                publico_transversal,
                                acao_paoe,
                                teto_politica_decreto,
                                ativo
                            )
                            VALUES
                            (
                                :momp_id,
                                :regiao,
                                :subfuncao_ug,
                                :adj,
                                :macropolitica,
                                :pilar,
                                :eixo,
                                :politica_decreto,
                                :publico_transversal,
                                :acao_paoe,
                                :teto_politica_decreto,
                                1
                            )
                        """)
                        payload = df_out.to_dict(orient="records")
                        if payload:
                            conn.execute(insert_sql, payload)

                # limpeza pós-processamento (janela padrão 48h)
                _cleanup_tmp(tmp_dir, max_age_seconds=48 * 3600)
                return _respond("success", "Processo concluído. Tabela dbo.politicateto atualizada.")

            except Exception as e:
                return _respond("error", f"Falha ao processar/atualizar a tabela <code>dbo.politicateto</code>:<br><code>{e}</code>")

        # outras tabelas: só conclui
        _cleanup_tmp(tmp_dir, max_age_seconds=48 * 3600)
        return _respond("success", "Processo concluído.")

    except Exception as e:
        return _respond("error", f"Erro inesperado: <code>{e}</code>")

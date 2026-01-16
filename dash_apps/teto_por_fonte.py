# dash_apps/teto_por_fonte.py
# ==========================================
# Versão estável + layout em GRID (5 colunas)
# + filtro REGIÃO
# + Gráfico Combinado agora por EXERCÍCIO x GRUPO DE DESPESA
# (linha do Total) com escala Y automática
# ==========================================
import dash
from dash import callback_context, html, dash_table, dcc
from dash.dependencies import Input, Output, State
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from extensions import db
from models import Momp, PoliticaTeto
import traceback

def criar_dash_teto_por_fonte(flask_app):
    dash_app = dash.Dash(
        __name__,
        server=flask_app,
        url_base_pathname='/dashboard-teto/',
        suppress_callback_exceptions=True,
    )

    # ============================
    # Funções auxiliares
    # ============================
    def formatar_reais(valor):
        try:
            return f"R$ {float(valor):,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
        except Exception:
            return "R$ 0,00"

    def normalizar_fonte_valor(texto):
        if isinstance(texto, str) and " - " in texto:
            return texto.split(" - ")[0].strip()
        return texto

    def extrair_codigo(texto):
        if texto is None:
            return ""
        s = str(texto)
        return s.split(" - ")[0].strip() if " - " in s else s.strip()

    def extrair_sub_base(texto):
        if texto is None:
            return ""
        cod = extrair_codigo(str(texto))
        return cod.split(".")[0].strip()

    def ordenar_codigos(lista):
        def key_fn(x):
            s = str(x).strip()
            try:
                return (0, int(s))
            except Exception:
                try:
                    return (0, float(s))
                except Exception:
                    return (1, s)
        return sorted(set(map(lambda v: str(v).strip(), lista)), key=key_fn)

    # ---------- Helpers de formatação para as TABELAS ----------
    def _to_float_safe(x):
        try:
            return float(x)
        except Exception:
            try:
                return float(str(x).replace(".", "").replace(",", "."))
            except Exception:
                return None

    def money_or_dash(valor):
        v = _to_float_safe(valor)
        if v is None:
            return formatar_reais(valor)
        return "-" if abs(v) < 1e-9 else formatar_reais(v)

    def percent_or_dash(num):
        v = _to_float_safe(num)
        if v is None or abs(v) < 1e-9:
            return "-"
        return f"{v:.2f}%"

    def fig_placeholder(titulo="Sem dados para exibir", height=450):
        fig = go.Figure()
        fig.update_layout(
            height=height,
            margin=dict(t=40, b=40, l=40, r=40),
            xaxis=dict(visible=False, automargin=False),
            yaxis=dict(visible=False, automargin=False),
            annotations=[dict(text=titulo, x=0.5, y=0.5, xref="paper", yref="paper",
                              showarrow=False, font=dict(size=14, color="#555"))],
            paper_bgcolor="rgba(0,0,0,0)",
            plot_bgcolor="rgba(0,0,0,0)",
        )
        return fig

    # =====================
    # TABELA 2 – Grupo/Subgrupo
    # =====================
    def gerar_tabela_grupo(df_filtrado, value_col="teto_anual"):
        grupos = []
        if df_filtrado.empty or value_col not in df_filtrado.columns:
            return [{"Descrição":"Total Geral","Teto Anual":"-","Perc. (%)":"100%"}]
        total_geral = df_filtrado[value_col].sum()
        for grupo_nome, grupo_df in df_filtrado.groupby("grupo", sort=False):
            grupo_total = grupo_df[value_col].sum()
            grupo_perc = (grupo_total / total_geral) * 100 if total_geral else 0
            grupos.append({
                "Descrição": grupo_nome,
                "Teto Anual": money_or_dash(grupo_total),
                "Perc. (%)": percent_or_dash(grupo_perc)
            })
            for subgrupo_nome, sub_df in grupo_df.groupby("subgrupo", sort=False):
                sub_total = sub_df[value_col].sum()
                perc = (sub_total / total_geral) * 100 if total_geral else 0
                grupos.append({
                    "Descrição": f"↳ {subgrupo_nome}",
                    "Teto Anual": money_or_dash(sub_total),
                    "Perc. (%)": percent_or_dash(perc)
                })
        grupos.append({"Descrição":"Total Geral","Teto Anual":money_or_dash(total_geral),"Perc. (%)":"100%"})
        return grupos

    # =====================
    # GRÁFICO 1 – Pizza por Grupo
    # =====================
    def gerar_grafico_pizza(df_filtrado, value_col="teto_anual"):
        if df_filtrado.empty or value_col not in df_filtrado.columns or df_filtrado[value_col].sum() == 0:
            return fig_placeholder("Sem dados para o gráfico de pizza", height=400)
        df_grafico_grupo = (
            df_filtrado.groupby("grupo", as_index=False)[value_col].sum()
            .sort_values(by=value_col, ascending=False)
        )
        df_grafico_grupo["teto_br"] = df_grafico_grupo[value_col].apply(formatar_reais)
        explode = [0.1 if i == 0 else 0.05 for i in range(len(df_grafico_grupo))]
        cores = ["#345feb","#048075","#f8cb2e","#f58220","#ea1d2c","#6a1b9a",
                 "#008FFB","#9C27B0","#FF4560","#00E396","#FEB019","#775DD0"]
        fig = px.pie(df_grafico_grupo, names="grupo", values=value_col, custom_data=["teto_br"])
        fig.update_traces(
            texttemplate="%{percent}",
            textposition="outside",
            pull=explode,
            marker=dict(colors=cores[:len(df_grafico_grupo)], line=dict(color="#fff", width=1)),
            hovertemplate="<b>%{label}</b><br>%{customdata[0]}<br>%{percent}<extra></extra>"
        )
        fig.update_layout(
            margin=dict(t=20,b=130,l=20,r=20),
            showlegend=True,
            legend=dict(orientation="h", yanchor="bottom", y=-0.45, xanchor="center", x=0.5, font=dict(size=10)),
            height=400, separators=',.', clickmode="event+select"
        )
        return fig

    # =====================
    # GRÁFICO 2 – Treemap por ADJ
    # =====================
    def gerar_grafico_treemap(df_filtrado, df_treemap):
        if df_treemap is None or df_treemap.empty:
            return fig_placeholder("Sem dados para o treemap", height=400)
        df_t = df_treemap.copy()
        if "ativo" in df_t.columns:
            df_t = df_t[df_t["ativo"] == 1]
        if df_filtrado is not None and not df_filtrado.empty:
            fontes_sel = df_filtrado["fonte"].dropna().unique()
            chaves_sel = {normalizar_fonte_valor(v) for v in fontes_sel}
            df_t = df_t[df_t["fonte"].apply(normalizar_fonte_valor).isin(chaves_sel)]
        df_t = df_t.dropna(subset=["adj", "teto_politica_decreto"])
        if df_t.empty:
            return fig_placeholder("Sem dados para o treemap", height=400)
        df_agg = (df_t.groupby("adj", as_index=False)["teto_politica_decreto"]
                  .sum().sort_values("teto_politica_decreto", ascending=False))
        df_agg["valor_br"] = df_agg["teto_politica_decreto"].apply(formatar_reais)
        paleta = ["#f8cb2e","#048075","#345feb","#f58220","#ea1d2c","#6a1b9a",
                  "#008FFB","#9C27B0","#FF4560","#00E396","#FEB019","#775DD0"]
        fig = px.treemap(
            df_agg, path=["adj"], values="teto_politica_decreto",
            color="adj", color_discrete_sequence=paleta, custom_data=["valor_br"]
        )
        fig.update_traces(
            textinfo="label",
            hovertemplate="<b>%{label}</b><br>%{customdata[0]}<extra></extra>",
            root_color="rgba(0,0,0,0)", branchvalues="total"
        )
        fig.update_layout(margin=dict(t=10,b=40,l=10,r=10), height=400, separators=',.', clickmode="event+select")
        return fig

    # =====================
    # GRÁFICO 3 – Pareto por Macropolítica
    # =====================
    def gerar_grafico_pareto(df_politica, adj_filtrada=None):
        if df_politica is None or df_politica.empty:
            return fig_placeholder("Sem dados para o Pareto")
        df = df_politica.copy()
        if adj_filtrada:
            df = df[df["adj"] == adj_filtrada]
        if df.empty:
            return fig_placeholder("Sem dados para o Pareto")

        df = (
            df.groupby("macropolitica", as_index=False)["teto_politica_decreto"]
              .sum()
              .sort_values("teto_politica_decreto", ascending=False)
        )
        total = df["teto_politica_decreto"].sum()
        if total == 0:
            return fig_placeholder("Sem dados para o Pareto")

        df["cumsum"] = df["teto_politica_decreto"].cumsum()
        df["cumperc"] = df["cumsum"] / total
        df["teto_br"] = df["teto_politica_decreto"].apply(formatar_reais)

        try:
            corte_idx = df["cumperc"].ge(0.80).idxmax()
            corte_cat = df.loc[corte_idx, "macropolitica"]
        except Exception:
            corte_cat = None

        fig = go.Figure()
        fig.add_bar(
            x=df["macropolitica"], y=df["teto_politica_decreto"], name="Teto (R$)",
            customdata=df[["teto_br"]],
            hovertemplate="<b>%{x}</b><br>%{customdata[0]}<extra></extra>",
        )
        fig.add_scatter(
            x=df["macropolitica"], y=df["cumperc"], name="Acumulado (%)",
            mode="lines+markers", yaxis="y2",
            hovertemplate="<b>%{x}</b><br>Acumulado: %{y:.0%}<extra></extra>",
        )

        fig.update_layout(
            title="Pareto de Macropolíticas" + (f" — {adj_filtrada}" if adj_filtrada else ""),
            height=450,
            margin=dict(t=50, b=110, l=40, r=60),
            xaxis=dict(title="", tickangle=-45, automargin=False),
            yaxis=dict(title="Teto (R$)", rangemode="tozero", automargin=False),
            yaxis2=dict(title="Acumulado (%)", overlaying="y", side="right", range=[0, 1], tickformat=".0%"),
            legend=dict(
                orientation="h", x=0.5, xanchor="center", y=-0.55, yanchor="top",
                bgcolor="rgba(255,255,255,0.8)", bordercolor="rgba(0,0,0,0.1)", borderwidth=1,
            ),
            separators=',.', clickmode="event+select", dragmode="select",
            paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
        )
        fig.update_xaxes(showgrid=True, gridcolor="rgba(0,0,0,0.08)", zeroline=False)
        fig.update_yaxes(showgrid=True, gridcolor="rgba(0,0,0,0.08)", zeroline=False)
        fig.update_layout(yaxis2=dict(showgrid=False))
        fig.add_shape(
            type="line", xref="paper", x0=0, x1=1, yref="y2", y0=0.80, y1=0.80,
            line=dict(color="#d62728", width=1, dash="dash"),
        )
        fig.add_annotation(
            x=1.005, xref="paper", y=0.80, yref="y2", text="80%", showarrow=False,
            font=dict(size=10, color="#d62728"), align="left",
        )
        if corte_cat is not None:
            fig.add_shape(
                type="line", xref="x", x0=corte_cat, x1=corte_cat, yref="y2", y0=0, y1=1,
                line=dict(color="#d62728", width=1, dash="dot"),
            )
        return fig

    # =====================
    # GRÁFICO 4 – Cascata por PAOE
    # =====================
    def gerar_grafico_cascata(df_politica):
        if df_politica is None or df_politica.empty:
            return fig_placeholder("Sem dados para o gráfico de cascata")
        df = df_politica.dropna(subset=["acao_paoe", "teto_politica_decreto"]).copy()
        if df.empty:
            return fig_placeholder("Sem dados para o gráfico de cascata")

        df["paoe_cod"] = df["acao_paoe"].astype(str).map(extrair_codigo)
        df_agg = (
            df.groupby("paoe_cod", as_index=False)["teto_politica_decreto"]
              .sum().sort_values("teto_politica_decreto", ascending=False)
        )
        if df_agg.empty:
            return fig_placeholder("Sem dados para o gráfico de cascata")

        total = df_agg["teto_politica_decreto"].sum()
        df_agg["teto_br"] = df_agg["teto_politica_decreto"].apply(formatar_reais)

        x_vals = df_agg["paoe_cod"].tolist() + ["Total"]
        y_vals = df_agg["teto_politica_decreto"].tolist() + [total]
        measures = ["relative"] * len(df_agg) + ["total"]
        custom_text = df_agg["teto_br"].tolist() + [formatar_reais(total)]

        fig = go.Figure(go.Waterfall(
            x=x_vals, measure=measures, y=y_vals, textposition="outside",
            customdata=custom_text,
            hovertemplate="<b>%{x}</b><br>%{customdata}<extra></extra>",
            connector={"line": {"width": 1}},
        ))
        # ↓↓↓ AJUSTE: menos espaço embaixo e automargin para não cortar rótulos
        fig.update_layout(
            title="Gráfico de Orçamento por Ação/PAOE",
            height=450,
            margin=dict(t=40, b=56, l=40, r=40),  # antes: b=110
            xaxis=dict(title="", tickangle=-45, automargin=True),
            yaxis=dict(title="Teto (R$)", rangemode="tozero", automargin=False),
            separators=',.', clickmode="event+select",
            paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
        )
        fig.update_xaxes(showgrid=True, gridcolor="rgba(0,0,0,0.08)", zeroline=False)
        fig.update_yaxes(showgrid=True, gridcolor="rgba(0,0,0,0.08)", zeroline=False)
        return fig

    # =====================
    # GRÁFICO 5 – Combinado (Exercício x GRUPO + linha Total)
    # =====================
    def gerar_grafico_combinado(df_work, df_treemap, modo_politicas):
        """
        Barras agrupadas por Exercício x Grupo de Despesa + linha do Total.
        - Eixo Y com escala automática (R$, milhões, bilhões)
        - Hover sempre em R$ (sem escala)
        - Clique em barra alterna filtro de grupos
        """
        # Base e coluna de valor conforme regra do gráfico de pizza
        if modo_politicas:
            if df_treemap is None or df_treemap.empty:
                return fig_placeholder("Sem dados para o gráfico combinado")
            base = df_treemap.dropna(subset=["teto_politica_decreto"]).copy()
            val_col = "teto_politica_decreto"
        else:
            base = df_work.copy()
            val_col = "teto_anual"

        if base is None or base.empty or val_col not in base.columns:
            return fig_placeholder("Sem dados para o gráfico combinado")

        # Coerção numérica e colunas essenciais
        base[val_col] = pd.to_numeric(base[val_col], errors="coerce").fillna(0.0)
        base = base.dropna(subset=["exercicio", "grupo"])
        if base.empty:
            return fig_placeholder("Sem dados para o gráfico combinado")

        base["exercicio"] = pd.to_numeric(base["exercicio"], errors="coerce")
        base = base.dropna(subset=["exercicio"])
        base["exercicio"] = base["exercicio"].astype(int)

        # Grupo: código (para legenda/controle) + rótulo (para hover bonito)
        base["grupo_cod"] = base["grupo"].astype(str).map(extrair_codigo)
        base["grupo_label"] = base["grupo"].astype(str)

        # Mapeia código -> 1º rótulo encontrado
        label_por_cod = (
            base.dropna(subset=["grupo_cod"])
                .groupby("grupo_cod", as_index=False)["grupo_label"]
                .first().set_index("grupo_cod")["grupo_label"].to_dict()
        )

        df_agg = base.groupby(["exercicio", "grupo_cod"], as_index=False)[val_col].sum()
        if df_agg.empty:
            return fig_placeholder("Sem dados para o gráfico combinado")

        anos = sorted(df_agg["exercicio"].unique().tolist())
        grupos = ordenar_codigos(df_agg["grupo_cod"].unique().tolist())

        # Totais por ano
        totals_series = df_agg.groupby("exercicio")[val_col].sum().reindex(anos).fillna(0.0)
        total_por_ano = {int(k): float(v) for k, v in totals_series.to_dict().items()}
        total_por_ano_br = {a: formatar_reais(total_por_ano.get(a, 0.0)) for a in anos}

        # ===== Escala automática do eixo Y =====
        max_bar_raw = float(df_agg[val_col].max()) if not df_agg.empty else 0.0
        max_y_raw = max(max(total_por_ano.values() or [0.0]), max_bar_raw)
        if max_y_raw >= 1e9:
            ESCALA, unidade, tickfmt = 1e9, "bilhões", ",.1f"
        elif max_y_raw >= 1e6:
            ESCALA, unidade, tickfmt = 1e6, "milhões", ",.1f"
        else:
            ESCALA, unidade, tickfmt = 1.0, "", ",.0f"

        # ===== Figura =====
        fig = go.Figure()
        paleta = ["#345feb","#048075","#f8cb2e","#f58220","#ea1d2c","#6a1b9a",
                  "#008FFB","#9C27B0","#FF4560","#00E396","#FEB019","#775DD0"]
        SHOW_TEXT = len(grupos) <= 6
        text_pos = "outside" if SHOW_TEXT else "none"

        # Barras por Grupo
        for i, g in enumerate(grupos):
            serie_raw = []
            percs_txt = []
            valores_br = []
            rotulo = label_por_cod.get(g, g)
            for a in anos:
                v = float(df_agg.loc[(df_agg["exercicio"]==a) & (df_agg["grupo_cod"]==g), val_col].sum() or 0.0)
                serie_raw.append(v)
                tot_a = total_por_ano.get(a, 0.0)
                p = (v/tot_a*100) if tot_a else 0.0
                percs_txt.append(f"{p:.2f}%")
                valores_br.append(formatar_reais(v))
            # customdata: [percent, codigo, rotulo, valor_br]
            custom = [[percs_txt[j], g, rotulo, valores_br[j]] for j in range(len(anos))]
            fig.add_bar(
                name=str(g),  # legenda curta pelo código
                x=[str(a) for a in anos],
                y=[v/ESCALA for v in serie_raw],
                customdata=custom,
                text=percs_txt if SHOW_TEXT else None,
                textposition=text_pos,
                marker=dict(color=paleta[i % len(paleta)]),
                hovertemplate=(
                    "<b>Exercício %{x}</b><br>"
                    "Grupo: %{customdata[2]} (%{customdata[1]})<br>"
                    "Valor: %{customdata[3]}<br>"
                    "Participação: %{customdata[0]}<extra></extra>"
                ),
            )

        # Linha do Total Geral (mesmo eixo, escalado)
        totais_raw_list = [total_por_ano[a] for a in anos]
        totais_br_list = [formatar_reais(v) for v in totais_raw_list]
        fig.add_scatter(
            name="Total Geral",
            x=[str(a) for a in anos],
            y=[v/ESCALA for v in totais_raw_list],
            mode="lines+markers",
            line=dict(width=2, color="#B620E0"),
            customdata=[[t] for t in totais_br_list],
            hovertemplate="<b>Total %{x}</b><br>Valor: %{customdata[0]}<extra></extra>",
        )

        y_title = f"Teto (R$ {unidade})" if unidade else "Teto (R$)"
        fig.update_layout(
            # title="Teto por Exercício e Grupo de Despesa (barras) + Total Geral (linha)",
            barmode="group",
            bargap=0.12,
            height=450,
            margin=dict(t=50, b=90, l=40, r=30),
            xaxis_title="Exercício",
            yaxis_title=y_title,
            legend=dict(orientation="h", yanchor="bottom", y=-0.30, xanchor="center", x=0.5, font=dict(size=10)),
            separators=',.', clickmode="event+select",
            paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
        )
        fig.update_xaxes(showgrid=True, gridcolor="rgba(0,0,0,0.08)")
        fig.update_yaxes(showgrid=True, gridcolor="rgba(0,0,0,0.08)", rangemode="tozero", tickformat=tickfmt)
        return fig
    # =====================
    # QOMP – Quadro Orçamentário de Médio Prazo
    # =====================
    def gerar_qomp(df_base: pd.DataFrame, value_col: str = "teto_anual"):
        base_cols_1ano = [
            {"name": "Fonte", "id": "Fonte"},
            {"name": "Grupo de Despesa / Tipificação de Despesa", "id": "Descrição"},
            {"name": "Teto Anual", "id": "Teto Anual"},
            {"name": "Perc. (%)", "id": "Perc. (%)"},
        ]
        if df_base is None or df_base.empty or value_col not in df_base.columns:
            return base_cols_1ano, [{"Fonte":"", "Descrição":"Total Geral", "Teto Anual":"-", "Perc. (%)":"100%"}]

        def to_float(x):
            v = _to_float_safe(x)
            return 0.0 if v is None else v

        dfw = df_base.copy()
        dfw["_valor"] = pd.to_numeric(dfw[value_col], errors="coerce").fillna(0.0).apply(to_float)
        dfw["_fonte_cod"] = dfw["fonte"].astype(str).map(normalizar_fonte_valor)

        anos_all = sorted(dfw["exercicio"].dropna().astype(int).unique().tolist())
        anos_sel = anos_all[:3]

        total_por_ano = {
            a: float(dfw.loc[dfw["exercicio"].astype(int)==a, "_valor"].sum())
            for a in anos_sel
        }

        if len(anos_sel) == 1:
            cols = base_cols_1ano
        else:
            cols = [
                {"name": "Fonte", "id": "Fonte"},
                {"name": "Grupo de Despesa / Tipificação de Despesa", "id": "Descrição"},
            ]
            for a in anos_sel:
                cols.append({"name": f"Teto Anual ({a})", "id": f"Teto Anual ({a})"})
                cols.append({"name": f"Perc. (%) {a}", "id": f"Perc. (%) {a}"})

        fontes_ordenadas = ordenar_codigos(dfw["_fonte_cod"].unique().tolist())
        grp_agg = dfw.groupby(["_fonte_cod","grupo","exercicio"], as_index=False)["_valor"].sum()
        sub_agg = dfw.groupby(["_fonte_cod","grupo","subgrupo","exercicio"], as_index=False)["_valor"].sum()

        linhas = []
        for fcod in fontes_ordenadas:
            df_f = dfw[dfw["_fonte_cod"] == fcod]
            grupos_ord = df_f["grupo"].dropna().astype(str).unique().tolist()
            for g in grupos_ord:
                linha_g = {"Fonte": fcod, "Descrição": g}
                for a in anos_sel:
                    soma_g = grp_agg.loc[
                        (grp_agg["_fonte_cod"]==fcod) & (grp_agg["grupo"]==g) &
                        (grp_agg["exercicio"].astype(int)==a), "_valor"
                    ].sum()
                    perc = (soma_g / total_por_ano[a] * 100) if total_por_ano[a] else 0.0
                    if len(anos_sel) == 1:
                        linha_g["Teto Anual"] = money_or_dash(soma_g)
                        linha_g["Perc. (%)"] = percent_or_dash(perc)
                    else:
                        linha_g[f"Teto Anual ({a})"] = money_or_dash(soma_g)
                        linha_g[f"Perc. (%) {a}"] = percent_or_dash(perc)
                linhas.append(linha_g)

                df_g = df_f[df_f["grupo"] == g]
                subs_ord = df_g["subgrupo"].dropna().astype(str).unique().tolist()
                for s in subs_ord:
                    linha_s = {"Fonte": "", "Descrição": f"↳ {s}"}
                    for a in anos_sel:
                        soma_s = sub_agg.loc[
                            (sub_agg["_fonte_cod"]==fcod) & (sub_agg["grupo"]==g) &
                            (sub_agg["subgrupo"]==s) & (sub_agg["exercicio"].astype(int)==a), "_valor"
                        ].sum()
                        perc = (soma_s / total_por_ano[a] * 100) if total_por_ano[a] else 0.0
                        if len(anos_sel) == 1:
                            linha_s["Teto Anual"] = money_or_dash(soma_s)
                            linha_s["Perc. (%)"] = percent_or_dash(perc)
                        else:
                            linha_s[f"Teto Anual ({a})"] = money_or_dash(soma_s)
                            linha_s[f"Perc. (%) {a}"] = percent_or_dash(perc)
                    linhas.append(linha_s)

        total_row = {"Fonte": "", "Descrição": "Total Geral"}
        for a in anos_sel:
            tot = total_por_ano[a]
            if len(anos_sel) == 1:
                total_row["Teto Anual"] = money_or_dash(tot)
                total_row["Perc. (%)"] = "100%"
            else:
                total_row[f"Teto Anual ({a})"] = money_or_dash(tot)
                total_row[f"Perc. (%) {a}"] = "100%"
        linhas.append(total_row)

        return cols, linhas

    # =====================
    # index_string – CSS/JS do Dash (ajustado)
    # =====================
    dash_app.index_string = """
    <!DOCTYPE html>
    <html>
    <head>
    {%metas%}
    <title>{%title%}</title>
    {%favicon%}
    {%css%}
    <style>
    /* Normaliza a página do app embutido no iframe */
    html, body {
    margin:0 !important;
    padding:0 !important;
    height:auto !important;
    min-height:0 !important;
    overflow:visible !important;
    }

    #dashboard-teto-root, #dashboard-teto-root * {
    font-family: Arial, sans-serif !important;
    }

    /* Raiz: apenas scroll horizontal quando preciso; sem scroll vertical artificial */
    #dashboard-teto-root{
    position: relative !important;
    overflow-x: auto !important;   /* mostra a barra horizontal só se necessário */
    overflow-y: visible !important;/* evita “loop” de crescimento */
    }

    /* Tamanhos de fonte/linhas */
    #dashboard-teto-root .dash-table-container *, #dashboard-teto-root .dash-dropdown,
    #dashboard-teto-root .Select, #dashboard-teto-root .Select *,
    #dashboard-teto-root .dash-graph, #dashboard-teto-root h5 {
    font-size: 12px !important; line-height: 1.25 !important;
    }
    #dashboard-teto-root h5 {
    font-size: 14px !important; font-weight: bold !important;
    margin: 0 0 6px 0 !important;
    }

    /* Cabeçalhos das tabelas */
    #dashboard-teto-root .dash-table-container .dash-spreadsheet-container .dash-spreadsheet-inner table thead th{
    background-color:#007b7f !important; color:#fff !important; font-weight:bold !important; text-align:center !important;
    padding:8px !important; min-height:44px !important; line-height:20px !important;
    }
    #dashboard-teto-root .dash-table-container .dash-spreadsheet-container .dash-spreadsheet-inner table td{
    padding:6px !important; white-space:normal !important; height:auto !important;
    }

    /* === GRADE FIXA (5 colunas) — topo e bottom === */
    #dashboard-teto-root #grid-filtros-top, #dashboard-teto-root #grid-filtros-bottom{
    display:grid !important;
    grid-template-columns:repeat(5, minmax(140px, 1fr)) !important; /* sempre 5 colunas */
    grid-auto-rows:minmax(36px, auto) !important;
    gap:8px !important;
    width:100% !important;
    overflow: visible !important; /* menus podem “escapar” sem serem cortados */
    }
    /* cada item consegue encolher dentro da grade */
    #dashboard-teto-root #grid-filtros-top > *, #dashboard-teto-root #grid-filtros-bottom > *{
    box-sizing:border-box !important;
    min-width:0 !important; /* ESSENCIAL p/ não forçar quebra da grade */
    width:100% !important; max-width:100% !important; flex:0 0 auto !important;
    }
    /* selects ocupam 100% da célula */
    #dashboard-teto-root #grid-filtros-top .dash-dropdown, #dashboard-teto-root #grid-filtros-bottom .dash-dropdown,
    #dashboard-teto-root #grid-filtros-top .Select, #dashboard-teto-root #grid-filtros-bottom .Select{
    min-width:0 !important; width:100% !important; max-width:100% !important; overflow: visible !important;
    }
    #dashboard-teto-root .Select-control{ width:100% !important; }
    #dashboard-teto-root #grid-filtros-top{ margin-bottom:10px !important; }

    /* Tooltip simples via data-tip */
    #dashboard-teto-root [data-tip]{ position:relative; }
    #dashboard-teto-root [data-tip]:hover::after, #dashboard-teto-root [data-tip]:focus::after{
    content:attr(data-tip); position:absolute; left:50%; bottom:calc(100% + 8px); transform:translateX(-50%);
    background:rgba(0,0,0,.85); color:#fff; padding:6px 8px; border-radius:4px; white-space:nowrap; font-size:11px; z-index:9999;
    }
    #dashboard-teto-root [data-tip]:hover::before, #dashboard-teto-root [data-tip]:focus::before{
    content:""; position:absolute; left:50%; bottom:100%; transform:translateX(-50%); border:6px solid transparent;
    border-top-color:rgba(0,0,0,.85);
    }

    /* === MULTISELECT: chips em linha + rolagem interna (apenas nos chips) === */
    #dashboard-teto-root .Select--multi .Select-control{
    display:flex !important; align-items:center !important; min-height:36px !important; height:36px !important;
    overflow:hidden !important; box-sizing:border-box !important; padding-right:28px !important; position:relative;
    }
    #dashboard-teto-root .Select--multi .Select-arrow-zone, #dashboard-teto-root .Select--multi .Select-clear-zone{
    position:absolute !important; right:6px !important; top:50% !important; transform:translateY(-50%) !important; z-index:1;
    }
    #dashboard-teto-root .Select--multi .Select-multi-value-wrapper{
    flex:1 1 auto !important; min-width:0 !important; max-width:100% !important; white-space:nowrap !important;
    overflow-x:auto !important; overflow-y:hidden !important; scrollbar-width: thin;
    }
    #dashboard-teto-root .Select--multi .Select-value{ display:inline-flex !important; margin:2px 6px 2px 0 !important; max-height:24px !important; align-items:center; }
    #dashboard-teto-root .Select--multi .Select-value-label{ line-height:20px !important; }
    #dashboard-teto-root .Select--multi .Select-input{ display:inline-block !important; flex:0 0 auto !important; }

    /* menus SEMPRE por cima de tudo e sem corte */
    #dashboard-teto-root .Select-menu-outer{ z-index: 999999 !important; }

    /* (opcional) scrollbar fininha no WebKit */
    #dashboard-teto-root .Select--multi .Select-multi-value-wrapper::-webkit-scrollbar{ height:6px; }
    #dashboard-teto-root .Select--multi .Select-multi-value-wrapper::-webkit-scrollbar-thumb{ border-radius:10px; background:rgba(0,0,0,.2); }

    /* sem @media: mantemos 5 colunas fixas */
    </style>
    </head>
    <body>
    <div id="dashboard-teto-root">
    {%app_entry%}
    </div>
    <footer>
    {%config%}{%scripts%}{%renderer%}
    <script>
    /* CSS runtime extra (mantém a grade de 5 colunas e garante altura fluida do documento) */
    (function(){
        var css = `
    #dashboard-teto-root{ overflow-x:auto !important; overflow-y:visible !important; position:relative !important; }
    #dashboard-teto-root #grid-filtros-top, #dashboard-teto-root #grid-filtros-bottom{
    display:grid !important;
    grid-template-columns:repeat(5, minmax(140px, 1fr)) !important;
    grid-auto-rows:minmax(36px, auto) !important;
    gap:8px !important;
    width:100% !important;
    overflow:visible !important;
    }
    #dashboard-teto-root #grid-filtros-top > *, #dashboard-teto-root #grid-filtros-bottom > *{
    box-sizing:border-box !important;
    min-width:0 !important;
    width:100% !important;
    max-width:100% !important;
    flex:0 0 auto !important;
    }
    #dashboard-teto-root #grid-filtros-top .dash-dropdown, #dashboard-teto-root #grid-filtros-bottom .dash-dropdown,
    #dashboard-teto-root #grid-filtros-top .Select, #dashboard-teto-root #grid-filtros-bottom .Select{
    min-width:0 !important;
    width:100% !important;
    max-width:100% !important;
    overflow:visible !important;
    }
    #dashboard-teto-root .Select-control{ width:100% !important; }
    #dashboard-teto-root #grid-filtros-top{ margin-bottom:10px !important; }
    #dashboard-teto-root .Select-menu-outer{ z-index:999999 !important; }
    /* garante que o container externo possa crescer corretamente */
    html, body { height:auto !important; min-height:0 !important; margin:0 !important; overflow:visible !important; }
        `;
        var el = document.createElement('style');
        el.id = 'dash-override-grid';
        el.appendChild(document.createTextNode(css));
        document.head.appendChild(el);
    })();

    /* auto-rolar para o fim quando novos chips forem adicionados (qualquer multiselect) */
    (function(){
        const SEL = '#dashboard-teto-root .Select--multi .Select-multi-value-wrapper';
        function attachObserver(el){
        if (el.__obsAttached) return;
        const obs = new MutationObserver((mutList)=>{
            for (const m of mutList){
            if (m.addedNodes && m.addedNodes.length){
                el.scrollLeft = el.scrollWidth;
            }
            }
        });
        obs.observe(el, { childList: true });
        el.__obsAttached = true;
        }
        function scan(){ document.querySelectorAll(SEL).forEach(attachObserver); }
        setInterval(scan, 800);
        window.addEventListener('load', scan);
    })();

    /* === Auto-resize ROBUSTO do container/iframe (anti-loop) ===
        - usa SOMENTE o scroll/offset do #dashboard-teto-root (evita feedback com body/html)
        - threshold de 4px + rate-limit (>=250ms)
        - observa mudanças no DOM, eventos plotly e faz 2 emissões iniciais (imediata + atraso)
    */
    (function(){
        const ROOT_ID = 'dashboard-teto-root';
        const PADDING = 16;        // margem de segurança
        const THRESHOLD = 4;       // ignora variações pequenas
        const MIN_INTERVAL = 250;  // ms entre envios
        let lastH = 0;
        let lastSent = 0;

        function rootEl(){
        return document.getElementById(ROOT_ID) || document.body;
        }

        function measure(){
        const el = rootEl();
        // mede SOMENTE o container raiz para evitar “eco” com o iframe
        const h = Math.max(el.scrollHeight, el.offsetHeight, el.clientHeight);
        return Math.max(0, (h || 0) + PADDING);
        }

        function postHeight(force=false){
        const now = Date.now();
        if (!force && now - lastSent < MIN_INTERVAL) return;

        const h = measure();
        if (!h) return;

        if (force || Math.abs(h - lastH) > THRESHOLD){
            lastH = h;
            lastSent = now;
            try {
            parent.postMessage({ type: 'resizeDashboard',  height: h }, '*');
            parent.postMessage({ type: 'dashboard-height', height: h }, '*'); // compat
            } catch (e) {}
        }
        }

        // inicial: envia já e também após breve atraso (gráficos montando)
        window.addEventListener('load', function(){
        postHeight(true);
        setTimeout(() => postHeight(true), 350);
        });

        window.addEventListener('resize', () => postHeight(false));

        // observa QUALQUER mudança no DOM
        const obs = new MutationObserver(() => {
        // mede na próxima pintura
        window.requestAnimationFrame(() => postHeight(false));
        });
        obs.observe(document.getElementById(ROOT_ID) || document.documentElement, { childList:true, subtree:true, attributes:true });

        // gráficos Plotly
        document.addEventListener('plotly_afterplot', () => postHeight(false));

        // fallback periódico mais espaçado
        setInterval(() => postHeight(false), 2000);
    })();
    </script>
    </footer>
    </body>
    </html>
    """

    # =====================
    # Layout
    # =====================
    btn_style = {
        "fontSize":"10px","cursor":"pointer","padding":"4px 8px",
        "border":"1px solid #ccc","borderRadius":"4px","backgroundColor":"white"
    }

    dash_app.layout = html.Div([
        dcc.Interval(id='interval-atualizacao', interval=600*1000, n_intervals=0),

        dcc.Store(
            id="filtros-globais",
            data={
                "exercicios": None,
                "fontes": [],
                "adjs": [],
                "grupos": [],
                "tipos": [],
                "macros": [],
                "subfuncoes": [],
                "paoes": [],
                "pilares": [],
                "eixos": [],
                "politicas": [],
                "regioes": []
            }
        ),

        # ===== Barra TOP =====
        html.Div([
            # Linha 1
            html.Div([
                html.Span("Exercício(s):", style={"fontFamily":"Arial, sans-serif","fontSize":"12px","marginRight":"6px"}),
                dcc.Dropdown(
                    id="filtro-exercicios", options=[], value=None, multi=True, placeholder="Selecione...",
                    style={
                        "flex":"0 0 300px", "width":"300px", "minWidth":"300px",
                        "fontFamily":"Arial, sans-serif","fontSize":"12px"
                    }
                ),
                dcc.Dropdown(
                    id="filtro-regiao-top", options=[], value=[], multi=True, placeholder="Região...",
                    className="dash-dropdown", style={"flex":"0 0 260px","minWidth":"220px","marginLeft":"12px"}
                ),
                html.Div(style={"flex":"1"}),
                html.Button("🧹 Limpar Seleção", id="botao-limpar", style=btn_style),
            ], style={"display":"flex","alignItems":"center","gap":"8px","marginBottom":"6px"}),

            # LINHAS 2 e 3 em uma GRADE (5 colunas)
            html.Div([
                dcc.Dropdown(id="filtro-subfunc-top", options=[], value=[], multi=True, placeholder="Subfunção...", className="dash-dropdown", style={"minWidth":"0","width":"100%"}),
                dcc.Dropdown(id="filtro-grupo-top", options=[], value=[], multi=True, placeholder="Grupo...", className="dash-dropdown", style={"minWidth":"0","width":"100%"}),
                dcc.Dropdown(id="filtro-tipo-top", options=[], value=[], multi=True, placeholder="Tipificação de Despesa...", className="dash-dropdown", style={"minWidth":"0","width":"100%"}),
                dcc.Dropdown(id="filtro-paoe-top", options=[], value=[], multi=True, placeholder="PAOE...", className="dash-dropdown", style={"minWidth":"0","width":"100%"}),
                dcc.Dropdown(id="filtro-fontes-top", options=[], value=[], multi=True, placeholder="Fontes...", className="dash-dropdown", style={"minWidth":"0","width":"100%"}),
                dcc.Dropdown(id="filtro-adj-top", options=[], value=[], multi=True, placeholder="ADJ...", className="dash-dropdown", style={"minWidth":"0","width":"100%"}),
                dcc.Dropdown(id="filtro-macro-top", options=[], value=[], multi=True, placeholder="Macropolítica...", className="dash-dropdown", style={"minWidth":"0","width":"100%"}),
                dcc.Dropdown(id="filtro-pilar-top", options=[], value=[], multi=True, placeholder="Pilar...", className="dash-dropdown", style={"minWidth":"0","width":"100%"}),
                dcc.Dropdown(id="filtro-eixo-top", options=[], value=[], multi=True, placeholder="Eixo...", className="dash-dropdown", style={"minWidth":"0","width":"100%"}),
                dcc.Dropdown(id="filtro-politica-top", options=[], value=[], multi=True, placeholder="Política do Decreto...", className="dash-dropdown", style={"minWidth":"0","width":"100%"}),
            ], id="grid-filtros-top", style={
                "display":"grid", "gridTemplateColumns":"repeat(5, minmax(180px, 1fr))", "gap":"8px", "width":"100%"
            }),
        ]),

        # ===== Tabelas =====
        html.Div([
            html.Div([
                html.H5("Teto por Fonte de Recurso", style={"textAlign":"left","fontFamily":"Arial, sans-serif","fontSize":"14px","fontWeight":"bold"}),
                dash_table.DataTable(
                    id="tabela-fonte",
                    columns=[{"name":"Fonte","id":"Fonte"},{"name":"Teto Anual","id":"Teto Anual"}],
                    data=[], sort_action="none",
                    style_cell={"textAlign":"center","fontSize":"14px","padding":"6px", "whiteSpace":"normal","height":"auto"},
                    style_cell_conditional=[
                        {"if":{"column_id":"Teto Anual"},"textAlign":"right"},
                        {"if":{"column_id":"Fonte"},"textAlign":"center"}
                    ],
                    style_header={"backgroundColor":"#007b7f","color":"white","fontWeight":"bold",
                                  "textAlign":"center","fontSize":"14px","padding":"8px",
                                  "minHeight":"44px","lineHeight":"20px"},
                    style_header_conditional=[
                        {"if":{"column_id":"Fonte"},"whiteSpace":"normal","height":"auto"},
                        {"if":{"column_id":"Teto Anual"},"whiteSpace":"normal","height":"auto"}
                    ],
                    css=[{"selector":".dash-header","rule":"height: 44px;"},
                         {"selector":".dash-header th","rule":"vertical-align: middle; white-space: normal;"}],
                    style_data_conditional=[
                        {"if":{"filter_query":"{Fonte} = 'Total Geral'"},
                         "backgroundColor":"#f0f0f0","fontWeight":"bold","pointerEvents":"none","cursor":"default"}
                    ],
                    style_table={"overflowX":"auto","width":"100%"}
                )
            ], style={"width":"40%","paddingRight":"10px"}),

            html.Div([
                html.H5("Teto por Grupo e Tipificação da Despesa", style={"textAlign":"left","fontFamily":"Arial, sans-serif","fontSize":"14px","fontWeight":"bold"}),
                dash_table.DataTable(
                    id="tabela-grupo",
                    columns=[
                        {"name":"Grupo de Despesa / Tipificação de Despesa","id":"Descrição"},
                        {"name":"Teto Anual","id":"Teto Anual"},
                        {"name":"Perc. (%)","id":"Perc. (%)"}
                    ],
                    data=[],
                    style_cell={
                        "textAlign":"left","fontSize":"14px","padding":"6px",
                        "whiteSpace":"normal","height":"auto"
                    },
                    style_cell_conditional=[
                        {"if":{"column_id":"Teto Anual"},"textAlign":"right"},
                        {"if":{"column_id":"Perc. (%)"},"textAlign":"center"}
                    ],
                    style_header={
                        "backgroundColor":"#007b7f","color":"white","fontWeight":"bold",
                        "textAlign":"center","fontSize":"14px","padding":"8px",
                        "minHeight":"44px","lineHeight":"20px"
                    },
                    style_header_conditional=[
                        {"if":{"column_id":"Descrição"},"whiteSpace":"normal","height":"auto"}
                    ],
                    css=[
                        {"selector":".dash-header","rule":"height: 44px;"},
                        {"selector":".dash-header th","rule":"vertical-align: middle; white-space: normal;"}
                    ],
                    style_data_conditional=[
                        {"if": {"filter_query": '{Descrição} != "Total Geral"'}, "backgroundColor": "#f0f0f0","fontWeight": "600"},
                        {"if": {"filter_query": '{Descrição} contains "↳ "'}, "backgroundColor": "white","fontWeight": "normal","paddingLeft": "20px"},
                        {"if": {"filter_query": '{Descrição} = "Total Geral"'}, "backgroundColor": "#f0f0f0","fontWeight": "bold"},
                    ],
                    style_table={"overflowX":"auto","width":"100%"}
                )
            ], style={"width":"60%"}),
        ], style={"display":"flex","flexWrap":"nowrap","justifyContent":"space-between",
                  "marginTop":"10px", "marginBottom":"20px"}),

        # ===== Gráficos =====
        html.Div([
            html.Div([
                html.H5("Gráfico de Orçamento por Grupo de Despesa", style={"textAlign":"center","fontFamily":"Arial, sans-serif","fontSize":"14px","fontWeight":"bold","margin":"0 0 6px 0"}),
                dcc.Graph(id="grafico-pizza", figure=go.Figure(), style={"height":"405px","marginBottom":"0"})
            ], style={"width":"50%","paddingRight":"10px"}),
            html.Div([
                html.H5("Gráfico de Orçamento por Adjunta", style={"textAlign":"center","fontFamily":"Arial, sans-serif","fontSize":"14px","fontWeight":"bold","margin":"0 0 6px 0"}),
                dcc.Graph(id="grafico-treemap", figure=go.Figure(), style={"height":"405px","marginBottom":"0"})
            ], style={"width":"50%","paddingLeft":"10px"}),
        ], style={"display":"flex","flexWrap":"nowrap","justifyContent":"space-between","alignItems":"flex-start","marginBottom":"0"}),

        html.Div([
            html.Div([dcc.Graph(id="grafico-pareto", figure=go.Figure(), style={"height":"450px"})], style={"width":"100%"})
        ], style={"display":"flex","flexWrap":"nowrap","justifyContent":"space-between",
                  "alignItems":"flex-start","marginTop":"6px","marginBottom":"12px"}),

        html.Div([
            html.Div([dcc.Graph(id="grafico-cascata", figure=go.Figure(), style={"height":"450px"})], style={"width":"100%"})
        ], style={"display":"flex","flexWrap":"nowrap","justifyContent":"space-between",
                  "alignItems":"flex-start","marginTop":"0","marginBottom":"12px"}),

        # ===== Barra BOTTOM
        html.Div([
            dcc.Dropdown(id="filtro-subfunc-bottom", options=[], value=[], multi=True, placeholder="Subfunção...", className="dash-dropdown"),
            dcc.Dropdown(id="filtro-grupo-bottom", options=[], value=[], multi=True, placeholder="Grupo...", className="dash-dropdown"),
            dcc.Dropdown(id="filtro-tipo-bottom", options=[], value=[], multi=True, placeholder="Tipificação de Despesa...", className="dash-dropdown"),
            dcc.Dropdown(id="filtro-paoe-bottom", options=[], value=[], multi=True, placeholder="PAOE...", className="dash-dropdown"),
            dcc.Dropdown(id="filtro-fontes-bottom", options=[], value=[], multi=True, placeholder="Fontes...", className="dash-dropdown"),
            dcc.Dropdown(id="filtro-adj-bottom", options=[], value=[], multi=True, placeholder="ADJ...", className="dash-dropdown"),
            dcc.Dropdown(id="filtro-macro-bottom", options=[], value=[], multi=True, placeholder="Macropolítica...", className="dash-dropdown"),
            dcc.Dropdown(id="filtro-pilar-bottom", options=[], value=[], multi=True, placeholder="Pilar...", className="dash-dropdown"),
            dcc.Dropdown(id="filtro-eixo-bottom", options=[], value=[], multi=True, placeholder="Eixo...", className="dash-dropdown"),
            dcc.Dropdown(id="filtro-politica-bottom", options=[], value=[], multi=True, placeholder="Política do Decreto...", className="dash-dropdown"),
        ], id="grid-filtros-bottom", style={
            "display": "grid",
            "gridTemplateColumns": "repeat(5, minmax(180px, 1fr))",
            "gap": "8px",
            "width": "100%",
            "margin": "2px 0 14px"  # antes: "6px 0 6px"
        }),

        html.Button(id="botao-limpar-2", style={"display":"none"}),

        # ===== Combinado (por GRUPO) =====
        html.Div([
            html.H5("Gráfico Combinado: Teto por Exercício e Grupo de Despesa",
                    style={"textAlign":"center","fontFamily":"Arial, sans-serif","fontSize":"14px",
                           "fontWeight":"bold","margin":"0 0 6px 0"}),
            dcc.Graph(id="grafico-combinado", figure=go.Figure(), style={"height":"450px"})
        ], style={"width":"100%","margin":"12px 0 16px"}),  # antes: "0 0 16px"

        # ===== QOMP =====
        html.Div([
            html.H5(
                "Quadro Orçamentário de Médio Prazo (QOMP_3_anos)",
                style={
                    "textAlign": "left",
                    "fontFamily": "Arial, sans-serif",
                    "fontSize": "14px",
                    "fontWeight": "bold",
                    "margin": "4px 0 8px"
                }
            ),
            dash_table.DataTable(
                id="tabela-qomp",
                columns=[], data=[],
                style_cell={
                    "textAlign": "right", "fontSize": "14px", "padding": "6px",
                    "whiteSpace": "normal", "height": "auto"
                },
                style_cell_conditional=[
                    {"if": {"column_id": "Fonte"}, "textAlign": "center"},
                    {"if": {"column_id": "Descrição"}, "textAlign": "left"},
                ],
                style_header={
                    "backgroundColor": "#007b7f", "color": "white", "fontWeight": "bold",
                    "textAlign": "center", "fontSize": "14px", "padding": "8px",
                    "minHeight": "44px", "lineHeight": "20px"
                },
                css=[
                    {"selector": ".dash-header", "rule": "height: 44px;"},
                    {"selector": ".dash-header th", "rule": "vertical-align: middle; white-space: normal;"}
                ],
                style_data_conditional=[
                    {"if": {"filter_query": '{Descrição} contains "↳ "'}, "paddingLeft": "20px"},
                    {"if": {"filter_query": '{Fonte} != "" && {Descrição} != "Total Geral"'}, "backgroundColor": "#ffffff", "fontWeight": "600"},
                    {"if": {"filter_query": '{Descrição} = "Total Geral"'}, "backgroundColor": "#f0f0f0", "fontWeight": "bold"},
                ],
                style_table={"overflowX": "auto", "width": "100%"}
            )
        ], style={"margin": "0 0 24px"})
    ])

    # =====================
    # ✅ Exercícios
    # =====================
    @dash_app.callback(
        Output("filtro-exercicios", "options"),
        Output("filtro-exercicios", "value"),
        Input("interval-atualizacao", "n_intervals"),
        State("filtro-exercicios", "value"),
        prevent_initial_call=False
    )
    def carregar_opcoes_exercicio(n_intervals, valor_atual):
        with dash_app.server.app_context():
            anos = db.session.query(Momp.exercicio).filter(Momp.ativo == 1).distinct().all()
            anos = sorted({str(a[0]) for a in anos})
            options = [{"label": a, "value": a} for a in anos]
            return (options, valor_atual) if valor_atual else (options, anos)

    # =========================================
    # 0) CROSS-FILTER – opções (inclui REGIÃO)
    # =========================================
    @dash_app.callback(
        Output("filtro-fontes-top", "options"),
        Output("filtro-fontes-bottom", "options"),
        Output("filtro-adj-top", "options"),
        Output("filtro-adj-bottom", "options"),
        Output("filtro-grupo-top", "options"),
        Output("filtro-grupo-bottom", "options"),
        Output("filtro-tipo-top", "options"),
        Output("filtro-tipo-bottom", "options"),
        Output("filtro-macro-top", "options"),
        Output("filtro-macro-bottom", "options"),
        Output("filtro-subfunc-top", "options"),
        Output("filtro-subfunc-bottom", "options"),
        Output("filtro-paoe-top", "options"),
        Output("filtro-paoe-bottom", "options"),
        Output("filtro-pilar-top", "options"),
        Output("filtro-pilar-bottom", "options"),
        Output("filtro-eixo-top", "options"),
        Output("filtro-eixo-bottom", "options"),
        Output("filtro-politica-top", "options"),
        Output("filtro-politica-bottom", "options"),
        Output("filtro-regiao-top", "options"),
        Input("filtros-globais", "data"),
        Input("interval-atualizacao", "n_intervals"),
        prevent_initial_call=False
    )
    def popular_opcoes_filtros(estado, _):
        estado = estado or {
            "exercicios": None, "fontes": [], "adjs": [], "grupos": [], "tipos": [],
            "macros": [], "subfuncoes": [], "paoes": [], "pilares": [], "eixos": [], "politicas": [], "regioes": []
        }
        with dash_app.server.app_context():
            dados_m = db.session.query(
                Momp.id, Momp.exercicio, Momp.fonte, Momp.grupo_despesa, Momp.subteto_despesa_momp
            ).filter(Momp.ativo == 1).all()
            dados_p = db.session.query(
                PoliticaTeto.momp_id, PoliticaTeto.adj, PoliticaTeto.macropolitica, PoliticaTeto.subfuncao_ug,
                PoliticaTeto.acao_paoe, PoliticaTeto.pilar, PoliticaTeto.eixo, PoliticaTeto.politica_decreto,
                PoliticaTeto.regiao
            ).filter(PoliticaTeto.ativo == 1).all()

            dfm_all = pd.DataFrame(dados_m, columns=["momp_id","exercicio","fonte","grupo","subgrupo"])
            dfp_all = pd.DataFrame(dados_p, columns=[
                "momp_id","adj","macropolitica","subfuncao_ug","acao_paoe",
                "pilar","eixo","politica_decreto","regiao"
            ])

            if estado.get("exercicios"):
                anos = {str(a) for a in estado["exercicios"]}
                dfm_all = dfm_all[dfm_all["exercicio"].astype(str).isin(anos)]

            polit_filters_active = bool(
                estado.get("adjs") or estado.get("macros") or estado.get("subfuncoes") or estado.get("paoes") or
                estado.get("pilares") or estado.get("eixos") or estado.get("politicas") or estado.get("regioes")
            )

            def filtrar(target: str):
                dfm = dfm_all.copy()
                dfp = dfp_all.copy()

                if target != "fonte" and estado.get("fontes"):
                    dfm = dfm[dfm["fonte"].astype(str).map(normalizar_fonte_valor).isin(set(estado["fontes"]))]

                if target != "grupo" and estado.get("grupos"):
                    dfm = dfm[dfm["grupo"].astype(str).map(extrair_codigo).isin(set(estado["grupos"]))]

                if target != "tipo" and estado.get("tipos"):
                    dfm = dfm[dfm["subgrupo"].astype(str).map(extrair_codigo).isin(set(estado["tipos"]))]

                if target != "adj" and estado.get("adjs"):
                    dfp = dfp[dfp["adj"].isin(estado["adjs"])]

                if target != "macro" and estado.get("macros"):
                    dfp = dfp[dfp["macropolitica"].isin(estado["macros"])]

                if target != "subfunc" and estado.get("subfuncoes"):
                    bases = set(estado["subfuncoes"])
                    if "subfuncao_ug" in dfp.columns:
                        dfp = dfp[dfp["subfuncao_ug"].astype(str).map(extrair_sub_base).isin(bases)]

                if target != "paoe" and estado.get("paoes"):
                    dfp = dfp[dfp["acao_paoe"].astype(str).map(extrair_codigo).isin(set(estado["paoes"]))]

                if target != "pilar" and estado.get("pilares") and "pilar" in dfp.columns:
                    dfp = dfp[dfp["pilar"].isin(estado["pilares"])]

                if target != "eixo" and estado.get("eixos") and "eixo" in dfp.columns:
                    dfp = dfp[dfp["eixo"].isin(estado["eixos"])]

                if target != "politica" and estado.get("politicas") and "politica_decreto" in dfp.columns:
                    dfp = dfp[dfp["politica_decreto"].isin(estado["politicas"])]

                if target != "regiao" and estado.get("regioes") and "regiao" in dfp.columns:
                    dfp = dfp[dfp["regiao"].isin(estado["regioes"])]

                if target in ("fonte","grupo","tipo"):
                    if polit_filters_active and not dfp.empty:
                        dfm = dfm[dfm["momp_id"].isin(set(dfp["momp_id"]))]
                else:
                    if not dfm.empty:
                        dfp = dfp[dfp["momp_id"].isin(set(dfm["momp_id"]))]

                return dfm, dfp

            dfm_f, _ = filtrar("fonte")
            fontes_vals = [normalizar_fonte_valor(v) for v in dfm_f["fonte"].dropna().astype(str).unique()]
            fontes_vals = ordenar_codigos(fontes_vals)
            op_fontes_full = [{"label":"Todos","value":"__ALL__"}] + [{"label":v,"value":v} for v in fontes_vals]
            # "Todos" só no topo
            op_fontes_top = op_fontes_full
            op_fontes_bottom = [o for o in op_fontes_full if o["value"] != "__ALL__"]

            dfm_g, _ = filtrar("grupo")
            grupos_vals = [extrair_codigo(g) for g in dfm_g["grupo"].dropna().astype(str).unique()]
            grupos_vals = ordenar_codigos(grupos_vals)
            op_grupos = [{"label":c,"value":c} for c in grupos_vals]

            dfm_ti, _ = filtrar("tipo")
            sub_raw = dfm_ti["subgrupo"].dropna().astype(str).unique().tolist()
            code_to_full = {}
            for s in sub_raw:
                c = extrair_codigo(s)
                if c and c not in code_to_full:
                    code_to_full[c] = s
            tipos_codigos = ordenar_codigos(list(code_to_full.keys()))
            op_tipos = [{"label": code_to_full[c], "value": c} for c in tipos_codigos]

            _, dfp_a = filtrar("adj")
            op_adj = [{"label":a,"value":a} for a in sorted(dfp_a["adj"].dropna().astype(str).unique())]

            _, dfp_m = filtrar("macro")
            op_macro = [{"label":m,"value":m} for m in sorted(dfp_m["macropolitica"].dropna().astype(str).unique())]

            _, dfp_s = filtrar("subfunc")
            if "subfuncao_ug" in dfp_s.columns:
                sub_vals = dfp_s["subfuncao_ug"].dropna().astype(str).map(extrair_sub_base).unique().tolist()
            else:
                sub_vals = []
            sub_vals = ordenar_codigos(sub_vals)
            op_sub = [{"label":c,"value":c} for c in sub_vals]

            _, dfp_p = filtrar("paoe")
            paoe_vals = [extrair_codigo(p) for p in dfp_p["acao_paoe"].dropna().astype(str).unique()] if "acao_paoe" in dfp_p.columns else []
            paoe_vals = ordenar_codigos(paoe_vals)
            op_paoe = [{"label":c,"value":c} for c in paoe_vals]

            _, dfp_pl = filtrar("pilar")
            op_pilar = [{"label":v,"value":v} for v in sorted(dfp_pl["pilar"].dropna().astype(str).unique())] if "pilar" in dfp_pl.columns else []

            _, dfp_ex = filtrar("eixo")
            op_eixo = [{"label":v,"value":v} for v in sorted(dfp_ex["eixo"].dropna().astype(str).unique())] if "eixo" in dfp_ex.columns else []

            _, dfp_po = filtrar("politica")
            op_politica = [{"label":v,"value":v} for v in sorted(dfp_po["politica_decreto"].dropna().astype(str).unique())] if "politica_decreto" in dfp_po.columns else []

            _, dfp_r = filtrar("regiao")
            reg_vals = sorted(dfp_r["regiao"].dropna().astype(str).unique().tolist()) if "regiao" in dfp_r.columns else []
            op_regiao = [{"label":v, "value":v} for v in reg_vals]

            return (op_fontes_top, op_fontes_bottom,
                    op_adj, op_adj,
                    op_grupos, op_grupos,
                    op_tipos, op_tipos,
                    op_macro, op_macro,
                    op_sub, op_sub,
                    op_paoe, op_paoe,
                    op_pilar, op_pilar,
                    op_eixo, op_eixo,
                    op_politica, op_politica,
                    op_regiao)

    # =========================
    # 1) REDUTOR DE ESTADO
    # =========================
    @dash_app.callback(
        Output("filtros-globais", "data"),
        # TOP
        Input("filtro-exercicios", "value"),
        Input("filtro-fontes-top", "value"),
        Input("filtro-adj-top", "value"),
        Input("filtro-grupo-top", "value"),
        Input("filtro-tipo-top", "value"),
        Input("filtro-macro-top", "value"),
        Input("filtro-subfunc-top", "value"),
        Input("filtro-paoe-top", "value"),
        Input("filtro-pilar-top", "value"),
        Input("filtro-eixo-top", "value"),
        Input("filtro-politica-top", "value"),
        Input("filtro-regiao-top", "value"),
        # BOTTOM  **FIX: agora escuta a barra BOTTOM**
        Input("filtro-fontes-bottom", "value"),
        Input("filtro-adj-bottom", "value"),
        Input("filtro-grupo-bottom", "value"),
        Input("filtro-tipo-bottom", "value"),
        Input("filtro-macro-bottom", "value"),
        Input("filtro-subfunc-bottom", "value"),
        Input("filtro-paoe-bottom", "value"),
        Input("filtro-pilar-bottom", "value"),
        Input("filtro-eixo-bottom", "value"),
        Input("filtro-politica-bottom", "value"),
        # Interações dos gráficos
        Input("grafico-treemap", "clickData"),
        Input("grafico-pizza", "clickData"),
        Input("grafico-pareto", "selectedData"),
        Input("grafico-cascata", "clickData"),
        Input("grafico-combinado", "clickData"),
        # Botões limpar
        Input("botao-limpar", "n_clicks"),
        Input("botao-limpar-2", "n_clicks"),
        State("filtros-globais", "data"),
        State("filtro-fontes-top", "options"),
        prevent_initial_call=False
    )
    def atualizar_store_filtros(
        anos_sel, fontes_top, adjs_top, grupos_top, tipos_top, macros_top, subf_top, paoes_top, pilares_top, eixos_top, politicas_top, regioes_top,
        fontes_bottom, adjs_bottom, grupos_bottom, tipos_bottom, macros_bottom, subf_bottom, paoes_bottom, pilares_bottom, eixos_bottom, politicas_bottom,
        treemap_click, pie_click, pareto_sel, cascata_click, combinado_click,
        n_clear1, n_clear2, estado, op_fontes_top
    ):
        ctx = callback_context
        estado = estado or {
            "exercicios": None, "fontes": [], "adjs": [], "grupos": [], "tipos": [],
            "macros": [], "subfuncoes": [], "paoes": [], "pilares": [], "eixos": [], "politicas": [], "regioes": []
        }

        if not ctx.triggered:
            if anos_sel:
                estado["exercicios"] = anos_sel
            return estado

        trigger = ctx.triggered[0]["prop_id"].split(".")[0]

        # ------ TOP ------
        if trigger == "filtro-exercicios":
            estado["exercicios"] = anos_sel or None
            return estado

        if trigger == "filtro-fontes-top":
            raw = fontes_top
            if raw and "__ALL__" in raw:
                opcoes_atuais = op_fontes_top
                todas = [o.get("value") for o in (opcoes_atuais or []) if o.get("value") != "__ALL__"]
                estado["fontes"] = [normalizar_fonte_valor(v) for v in todas]
            else:
                estado["fontes"] = [normalizar_fonte_valor(v) for v in (raw or [])]
            return estado

        if trigger == "filtro-adj-top":
            estado["adjs"] = adjs_top or []
            return estado

        if trigger == "filtro-grupo-top":
            estado["grupos"] = grupos_top or []
            return estado

        if trigger == "filtro-tipo-top":
            estado["tipos"] = tipos_top or []
            return estado

        if trigger == "filtro-macro-top":
            estado["macros"] = macros_top or []
            return estado

        if trigger == "filtro-subfunc-top":
            estado["subfuncoes"] = subf_top or []
            return estado

        if trigger == "filtro-paoe-top":
            estado["paoes"] = paoes_top or []
            return estado

        if trigger == "filtro-pilar-top":
            estado["pilares"] = pilares_top or []
            return estado

        if trigger == "filtro-eixo-top":
            estado["eixos"] = eixos_top or []
            return estado

        if trigger == "filtro-politica-top":
            estado["politicas"] = politicas_top or []
            return estado

        if trigger == "filtro-regiao-top":
            estado["regioes"] = regioes_top or []
            return estado

        # ------ BOTTOM (FIX) ------
        if trigger == "filtro-fontes-bottom":
            estado["fontes"] = [normalizar_fonte_valor(v) for v in (fontes_bottom or [])]
            return estado

        if trigger == "filtro-adj-bottom":
            estado["adjs"] = adjs_bottom or []
            return estado

        if trigger == "filtro-grupo-bottom":
            estado["grupos"] = grupos_bottom or []
            return estado

        if trigger == "filtro-tipo-bottom":
            estado["tipos"] = tipos_bottom or []
            return estado

        if trigger == "filtro-macro-bottom":
            estado["macros"] = macros_bottom or []
            return estado

        if trigger == "filtro-subfunc-bottom":
            estado["subfuncoes"] = subf_bottom or []
            return estado

        if trigger == "filtro-paoe-bottom":
            estado["paoes"] = paoes_bottom or []
            return estado

        if trigger == "filtro-pilar-bottom":
            estado["pilares"] = pilares_bottom or []
            return estado

        if trigger == "filtro-eixo-bottom":
            estado["eixos"] = eixos_bottom or []
            return estado

        if trigger == "filtro-politica-bottom":
            estado["politicas"] = politicas_bottom or []
            return estado

        # ------ Gráficos ------
        if trigger == "grafico-treemap":
            adj = None
            if treemap_click and treemap_click.get("points"):
                p = treemap_click["points"][0]
                adj = p.get("label") or p.get("id") or p.get("x")
            if adj:
                alist = set(estado.get("adjs", []))
                if adj in alist:
                    alist.remove(adj)
                else:
                    alist.add(adj)
                estado["adjs"] = sorted(alist)
            return estado

        if trigger == "grafico-pizza":
            grp = None
            if pie_click and pie_click.get("points"):
                grp_label = pie_click["points"][0].get("label")
                grp = extrair_codigo(grp_label)
            if grp:
                glist = set(estado.get("grupos", []))
                if grp in glist:
                    glist.remove(grp)
                else:
                    glist.add(grp)
                estado["grupos"] = sorted(glist, key=lambda x: (len(x), x))
            return estado

        if trigger == "grafico-pareto":
            macros = []
            if pareto_sel and pareto_sel.get("points"):
                for p in pareto_sel["points"]:
                    x = p.get("x")
                    if x:
                        macros.append(str(x))
            estado["macros"] = sorted(set(macros))
            return estado

        if trigger == "grafico-cascata":
            cod = None
            if cascata_click and cascata_click.get("points"):
                cod = cascata_click["points"][0].get("x")
            if cod and str(cod).strip().lower() != "total":
                clist = set(estado.get("paoes", []))
                if cod in clist:
                    clist.remove(cod)
                else:
                    clist.add(cod)
                estado["paoes"] = sorted(clist, key=lambda x: (len(str(x)), str(x)))
            return estado

        if trigger == "grafico-combinado":
            # Toggle de GRUPO ao clicar numa barra do combinado
            grupo_click = None
            if combinado_click and combinado_click.get("points"):
                pt = combinado_click["points"][0]
                cd = pt.get("customdata")  # customdata = [perc, codigo, rotulo, valor_br]
                if isinstance(cd, (list, tuple)) and len(cd) >= 2:
                    grupo_click = extrair_codigo(cd[1])
            if grupo_click:
                glist = set(estado.get("grupos", []))
                if grupo_click in glist:
                    glist.remove(grupo_click)
                else:
                    glist.add(grupo_click)
                estado["grupos"] = ordenar_codigos(list(glist))
            return estado

        # ------ Limpar ------
        if trigger in {"botao-limpar","botao-limpar-2"}:
            estado.update({
                "fontes": [], "adjs": [], "grupos": [], "tipos": [], "macros": [],
                "subfuncoes": [], "paoes": [], "pilares": [], "eixos": [], "politicas": [], "regioes": []
            })
            return estado

        return estado

    # =========================
    # 1.1) Sincroniza dropdowns (BOTTOM)
    # =========================
    @dash_app.callback(
        Output("filtro-fontes-bottom", "value"),
        Output("filtro-adj-bottom", "value"),
        Output("filtro-grupo-bottom", "value"),
        Output("filtro-tipo-bottom", "value"),
        Output("filtro-macro-bottom", "value"),
        Output("filtro-subfunc-bottom", "value"),
        Output("filtro-paoe-bottom", "value"),
        Output("filtro-pilar-bottom", "value"),
        Output("filtro-eixo-bottom", "value"),
        Output("filtro-politica-bottom", "value"),
        Input("filtros-globais", "data"),
        prevent_initial_call=False
    )
    def sync_dropdown_values_bottom(estado):
        estado = estado or {}
        return (
            estado.get("fontes") or [],
            estado.get("adjs") or [],
            estado.get("grupos") or [],
            estado.get("tipos") or [],
            estado.get("macros") or [],
            estado.get("subfuncoes") or [],
            estado.get("paoes") or [],
            estado.get("pilares") or [],
            estado.get("eixos") or [],
            estado.get("politicas") or [],
        )

    # =========================
    # 1.1b) Sincroniza dropdowns (TOPO)
    # =========================
    @dash_app.callback(
        Output("filtro-fontes-top", "value"),
        Output("filtro-adj-top", "value"),
        Output("filtro-grupo-top", "value"),
        Output("filtro-tipo-top", "value"),
        Output("filtro-macro-top", "value"),
        Output("filtro-subfunc-top", "value"),
        Output("filtro-paoe-top", "value"),
        Output("filtro-pilar-top", "value"),
        Output("filtro-eixo-top", "value"),
        Output("filtro-politica-top", "value"),
        Output("filtro-regiao-top", "value"),
        Input("filtros-globais", "data"),
        prevent_initial_call=False
    )
    def sync_dropdown_values_top(estado):
        estado = estado or {}
        return (
            estado.get("fontes") or [],
            estado.get("adjs") or [],
            estado.get("grupos") or [],
            estado.get("tipos") or [],
            estado.get("macros") or [],
            estado.get("subfuncoes") or [],
            estado.get("paoes") or [],
            estado.get("pilares") or [],
            estado.get("eixos") or [],
            estado.get("politicas") or [],
            estado.get("regioes") or [],
        )

    # =========================
    # 2) Renderização
    # =========================
    @dash_app.callback(
        Output("tabela-grupo", "data"),
        Output("grafico-pizza", "figure"),
        Output("grafico-treemap", "figure"),
        Output("tabela-fonte", "data"),
        Output("grafico-pareto", "figure"),
        Output("grafico-cascata", "figure"),
        Output("grafico-combinado", "figure"),
        Output("tabela-qomp", "columns"),
        Output("tabela-qomp", "data"),
        Output("tabela-qomp", "style_cell_conditional"),
        Output("tabela-qomp", "style_data_conditional"),
        Input("interval-atualizacao", "n_intervals"),
        Input("filtros-globais", "data"),
        prevent_initial_call=False
    )
    def renderizar_dashboard(n_intervals, estado):
        try:
            estado = estado or {
                "exercicios": None, "fontes": [], "adjs": [], "grupos": [], "tipos": [],
                "macros": [], "subfuncoes": [], "paoes": [], "pilares": [], "eixos": [], "politicas": [], "regioes": []
            }
            with dash_app.server.app_context():
                dados = db.session.query(
                    Momp.id, Momp.exercicio, Momp.fonte, Momp.teto_anual, Momp.grupo_despesa, Momp.subteto_despesa_momp
                ).filter(Momp.ativo == 1).all()
                df_momp = pd.DataFrame(dados, columns=["momp_id","exercicio","fonte","teto_anual","grupo","subgrupo"])

                politicas = db.session.query(
                    PoliticaTeto.momp_id, PoliticaTeto.adj, PoliticaTeto.macropolitica, PoliticaTeto.subfuncao_ug,
                    PoliticaTeto.teto_politica_decreto, PoliticaTeto.acao_paoe, PoliticaTeto.ativo,
                    PoliticaTeto.pilar, PoliticaTeto.eixo, PoliticaTeto.politica_decreto, PoliticaTeto.regiao
                ).filter(PoliticaTeto.ativo == 1).all()
                df_politica = pd.DataFrame(
                    politicas,
                    columns=["momp_id","adj","macropolitica","subfuncao_ug","teto_politica_decreto",
                             "acao_paoe","ativo","pilar","eixo","politica_decreto","regiao"]
                )

                if estado.get("exercicios"):
                    anos = {str(a) for a in estado["exercicios"]}
                    df_momp = df_momp[df_momp["exercicio"].astype(str).isin(anos)]

                df_work = df_momp.copy()
                if estado.get("fontes"):
                    df_work = df_work[df_work["fonte"].apply(normalizar_fonte_valor).isin(set(estado["fontes"]))]
                if estado.get("grupos"):
                    df_work = df_work[df_work["grupo"].astype(str).map(extrair_codigo).isin(set(estado["grupos"]))]
                if estado.get("tipos"):
                    df_work = df_work[df_work["subgrupo"].astype(str).map(extrair_codigo).isin(set(estado["tipos"]))]

                if not df_work.empty and not df_politica.empty:
                    ids_validos = set(df_work["momp_id"].tolist())
                    df_politica_work = df_politica[df_politica["momp_id"].isin(ids_validos)]
                else:
                    df_politica_work = df_politica.iloc[0:0]

                if estado.get("adjs"):
                    df_politica_work = df_politica_work[df_politica_work["adj"].isin(estado["adjs"])]
                if estado.get("macros"):
                    df_politica_work = df_politica_work[df_politica_work["macropolitica"].isin(estado["macros"])]
                if "subfuncao_ug" in df_politica_work.columns and estado.get("subfuncoes"):
                    df_politica_work = df_politica_work[
                        df_politica_work["subfuncao_ug"].astype(str).map(extrair_sub_base).isin(set(estado["subfuncoes"]))
                    ]
                if "acao_paoe" in df_politica_work.columns and estado.get("paoes"):
                    df_politica_work = df_politica_work[
                        df_politica_work["acao_paoe"].astype(str).map(extrair_codigo).isin(set(estado["paoes"]))
                    ]
                if "pilar" in df_politica_work.columns and estado.get("pilares"):
                    df_politica_work = df_politica_work[df_politica_work["pilar"].isin(estado["pilares"])]
                if "eixo" in df_politica_work.columns and estado.get("eixos"):
                    df_politica_work = df_politica_work[df_politica_work["eixo"].isin(estado["eixos"])]
                if "politica_decreto" in df_politica_work.columns and estado.get("politicas"):
                    df_politica_work = df_politica_work[df_politica_work["politica_decreto"].isin(estado["politicas"])]
                if "regiao" in df_politica_work.columns and estado.get("regioes"):
                    df_politica_work = df_politica_work[df_politica_work["regiao"].isin(estado["regioes"])]

                if not df_politica_work.empty and any([
                    estado.get("adjs"), estado.get("macros"), estado.get("subfuncoes"), estado.get("paoes"),
                    estado.get("pilares"), estado.get("eixos"), estado.get("politicas"), estado.get("regioes")
                ]):
                    ids = set(df_politica_work["momp_id"].unique().tolist())
                    df_work = df_work[df_work["momp_id"].isin(ids)]

                df_treemap = pd.merge(df_work, df_politica_work, on="momp_id", how="left")

                modo_politicas = any([
                    estado.get("adjs"), estado.get("macros"), estado.get("subfuncoes"), estado.get("paoes"),
                    estado.get("pilares"), estado.get("eixos"), estado.get("politicas"), estado.get("regioes")
                ])

                # ===== Tabela 1 (por Fonte) =====
                if modo_politicas:
                    df_base_fonte = df_treemap.dropna(subset=["teto_politica_decreto"]).copy()
                    if df_base_fonte.empty:
                        tabela_fonte_df = pd.DataFrame([{"Fonte": "Total Geral", "Teto Anual": "-"}])
                    else:
                        df_fonte = df_base_fonte.groupby("fonte", as_index=False)["teto_politica_decreto"].sum()
                        total_geral_fonte = df_fonte["teto_politica_decreto"].sum()
                        df_fonte = pd.concat([df_fonte, pd.DataFrame([{
                            "fonte": "Total Geral", "teto_politica_decreto": total_geral_fonte
                        }])], ignore_index=True)
                        tabela_fonte_df = pd.DataFrame({
                            "Fonte": df_fonte["fonte"].astype(str).map(normalizar_fonte_valor),
                            "Teto Anual": df_fonte["teto_politica_decreto"].apply(money_or_dash)
                        })
                else:
                    if df_work.empty:
                        tabela_fonte_df = pd.DataFrame([{"Fonte": "Total Geral", "Teto Anual": "-"}])
                    else:
                        df_fonte = df_work.groupby("fonte", as_index=False)["teto_anual"].sum()
                        total_geral_fonte = df_fonte["teto_anual"].sum()
                        df_fonte = pd.concat([df_fonte, pd.DataFrame([{
                            "fonte": "Total Geral", "teto_anual": total_geral_fonte
                        }])], ignore_index=True)
                        tabela_fonte_df = pd.DataFrame({
                            "Fonte": df_fonte["fonte"].astype(str).map(normalizar_fonte_valor),
                            "Teto Anual": df_fonte["teto_anual"].apply(money_or_dash)
                        })

                # ===== Tabela 2 + Pizza =====
                if modo_politicas:
                    base_grp = df_treemap.dropna(subset=["teto_politica_decreto"]).copy()
                    tabela2 = gerar_tabela_grupo(base_grp, value_col="teto_politica_decreto")
                    fig_pizza = gerar_grafico_pizza(base_grp, value_col="teto_politica_decreto")
                else:
                    tabela2 = gerar_tabela_grupo(df_work, value_col="teto_anual")
                    fig_pizza = gerar_grafico_pizza(df_work, value_col="teto_anual")

                fig_tree = gerar_grafico_treemap(df_work, df_treemap)

                adj_titulo = estado.get("adjs")[0] if len(estado.get("adjs") or []) == 1 else None
                fig_pareto = gerar_grafico_pareto(df_politica_work, adj_titulo)
                fig_cascata= gerar_grafico_cascata(df_politica_work)

                # ===== Combinado (por GRUPO) =====
                try:
                    fig_combinado = gerar_grafico_combinado(df_work, df_treemap, modo_politicas)
                except Exception as e:
                    print("Erro no gráfico combinado:", e)
                    traceback.print_exc()
                    fig_combinado = fig_placeholder("Erro ao gerar gráfico combinado")

                # ===== QOMP =====
                if modo_politicas:
                    df_base_qomp = df_treemap.dropna(subset=["teto_politica_decreto"]).copy()
                    qomp_cols, qomp_data = gerar_qomp(df_base_qomp, value_col="teto_politica_decreto")
                else:
                    qomp_cols, qomp_data = gerar_qomp(df_work, value_col="teto_anual")

                qomp_teto_cols = [c["id"] for c in (qomp_cols or []) if str(c.get("id","")).startswith("Teto Anual")]
                qomp_style_cols = [
                    {"if": {"column_id": "Fonte"}, "textAlign": "center"},
                    {"if": {"column_id": "Descrição"}, "textAlign": "left"},
                ]
                HIGHLIGHT_BG = "#f0f0f0"
                qomp_style_data = [
                    {"if": {"filter_query": '{Descrição} contains "↳ "'}, "paddingLeft": "20px"},
                    {"if": {"filter_query": '{Fonte} != "" && {Descrição} != "Total Geral"'}, "backgroundColor": "#ffffff", "fontWeight": "600"},
                    {"if": {"filter_query": '{Descrição} = "Total Geral"'}, "backgroundColor": "#f0f0f0", "fontWeight": "bold"},
                ]
                for col_id in qomp_teto_cols:
                    qomp_style_data.append({
                        "if": {"column_id": col_id, "filter_query": '{Descrição} != "Total Geral"'},
                        "backgroundColor": HIGHLIGHT_BG, "fontWeight": "600",
                    })

                return (
                    tabela2, fig_pizza, fig_tree,
                    tabela_fonte_df.to_dict("records"),
                    fig_pareto, fig_cascata, fig_combinado,
                    qomp_cols, qomp_data,
                    qomp_style_cols, qomp_style_data
                )
        except Exception as e:
            print(f"Erro ao renderizar dashboard: {e}")
            traceback.print_exc()
            return (
                dash.no_update,  # tabela-grupo (data)
                dash.no_update,  # grafico-pizza
                dash.no_update,  # grafico-treemap
                dash.no_update,  # tabela-fonte (data)
                dash.no_update,  # grafico-pareto
                dash.no_update,  # grafico-cascata
                dash.no_update,  # grafico-combinado
                dash.no_update,  # qomp columns
                dash.no_update,  # qomp data
                dash.no_update,  # qomp style_cell_conditional
                dash.no_update,  # qomp style_data_conditional
            )

    return dash_app

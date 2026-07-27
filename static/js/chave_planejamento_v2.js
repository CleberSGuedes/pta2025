(function () {
  if (!window.USAR_CHAVE_PLANEJAMENTO_V2) return;

  const SELECTS = {
    regiao: 'select[name="regiao"]',
    subfuncaoUg: 'select[name="subfuncao_ug"]',
    adj: 'select[name="adj"]',
    macropolitica: 'select[name="macropolitica"]',
    pilar: 'select[name="pilar"]',
    eixo: 'select[name="eixo"]',
    politica: 'select[name="politica_decreto"]',
    unidadeGestora: 'select[name="unidade_gestora"]',
  };

  const DEPENDENTES = ["adj", "macropolitica", "pilar", "eixo", "politica"];

  function el(name) {
    return document.querySelector(SELECTS[name]);
  }

  function contexto() {
    return window.DADOS_PLANEJAMENTO || {};
  }

  function normalizar(valor) {
    if (typeof normalizarTexto === "function") return normalizarTexto(valor);
    return String(valor || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .trim();
  }

  function chavePorTexto(obj, chave) {
    if (!obj || typeof obj !== "object") return null;
    if (Object.prototype.hasOwnProperty.call(obj, chave)) return chave;

    const alvo = normalizar(chave);
    return Object.keys(obj).find((item) => normalizar(item) === alvo) || null;
  }

  function valorMapa(obj, chaves) {
    let atual = obj;
    for (const chave of chaves) {
      const chaveReal = chavePorTexto(atual, chave);
      if (!chaveReal) return undefined;
      atual = atual[chaveReal];
    }
    return atual;
  }

  function lista(valor) {
    if (valor === undefined || valor === null || valor === "") return [];
    return Array.isArray(valor) ? valor : [valor];
  }

  function popular(select, opcoes, placeholder = "Selecione", valorSelecionado = "") {
    if (!select) return;
    const valores = [...new Set(lista(opcoes).filter(Boolean))];
    select.innerHTML = "";

    const optPlaceholder = document.createElement("option");
    optPlaceholder.value = "";
    optPlaceholder.textContent = valores.length ? placeholder : "Nenhum mapeamento encontrado";
    select.appendChild(optPlaceholder);

    valores.forEach((valor) => {
      const opt = document.createElement("option");
      opt.value = valor;
      opt.textContent = valor;
      select.appendChild(opt);
    });

    select.disabled = valores.length === 0;
    if (valorSelecionado && valores.includes(valorSelecionado)) {
      select.value = valorSelecionado;
    }
  }

  function limpar(...nomes) {
    nomes.forEach((nome) => popular(el(nome), []));
  }

  function ugSelecionada() {
    const valor = el("subfuncaoUg")?.value || "";
    return valor.split(".")[1]?.trim() || "";
  }

  function caminhoBase() {
    const { programa, subfuncao, paoe, produto } = contexto();
    return { programa, subfuncao, paoe, produto, ug: ugSelecionada() };
  }

  function carregarRegiao() {
    popular(el("regiao"), typeof regioesPlanejamento !== "undefined" ? regioesPlanejamento : []);
  }

  function carregarSubfuncaoUg(valorSelecionado = "") {
    const { programa, subfuncao, paoe } = contexto();
    const paoeCodigo = String(paoe || "").split(" - ")[0].trim();
    const ug = valorMapa(subfuncaoUGMap, [programa, subfuncao, paoeCodigo]);
    const codSubfuncao = String(subfuncao || "").split(" - ")[0].trim();
    const valor = ug && codSubfuncao ? `${codSubfuncao}.${ug}` : "";
    popular(el("subfuncaoUg"), valor ? [valor] : [], "Selecione", valorSelecionado || valor);
    sincronizarUnidadeGestora(valorSelecionado || valor);
  }

  function sincronizarUnidadeGestora(subfuncaoUg) {
    const select = el("unidadeGestora");
    if (!select || typeof subfuncaoUGToUGMap === "undefined") return;
    const unidade = subfuncaoUGToUGMap[subfuncaoUg] || "";
    popular(select, unidade ? [unidade] : [], "Selecione a unidade gestora", unidade);
  }

  function carregarAdj(valorSelecionado = "") {
    const { programa, subfuncao, paoe, produto, ug } = caminhoBase();
    const opcoes = valorMapa(adjMap, [programa, subfuncao, paoe, ug, produto]);
    popular(el("adj"), opcoes, "Selecione", valorSelecionado);
  }

  function carregarMacropolitica(valorSelecionado = "") {
    const { programa, subfuncao, paoe, produto, ug } = caminhoBase();
    const adj = el("adj")?.value || "";
    const opcoes = valorMapa(macropoliticaMap, [programa, subfuncao, paoe, ug, produto, adj]);
    popular(el("macropolitica"), opcoes, "Selecione", valorSelecionado);
  }

  function carregarPilar(valorSelecionado = "") {
    const { programa, subfuncao, paoe, produto, ug } = caminhoBase();
    const adj = el("adj")?.value || "";
    const macro = el("macropolitica")?.value || "";
    const opcoes = valorMapa(pilarMap, [programa, subfuncao, paoe, ug, produto, adj, macro]);
    popular(el("pilar"), opcoes, "Selecione", valorSelecionado);
  }

  function carregarEixo(valorSelecionado = "") {
    const { programa, subfuncao, paoe, produto, ug } = caminhoBase();
    const adj = el("adj")?.value || "";
    const macro = el("macropolitica")?.value || "";
    const pilar = el("pilar")?.value || "";
    const opcoes = valorMapa(eixoMap, [programa, subfuncao, paoe, ug, produto, adj, macro, pilar]);
    popular(el("eixo"), opcoes, "Selecione", valorSelecionado);
  }

  function carregarPolitica(valorSelecionado = "") {
    const { programa, subfuncao, paoe, produto, ug } = caminhoBase();
    const adj = el("adj")?.value || "";
    const macro = el("macropolitica")?.value || "";
    const pilar = el("pilar")?.value || "";
    const eixo = el("eixo")?.value || "";
    const opcoes = valorMapa(politicaMap, [programa, subfuncao, paoe, ug, produto, adj, macro, pilar, eixo]);
    popular(el("politica"), opcoes, "Selecione", valorSelecionado);
  }

  function configurarEventos() {
    el("subfuncaoUg")?.addEventListener("change", () => {
      limpar(...DEPENDENTES);
      sincronizarUnidadeGestora(el("subfuncaoUg")?.value || "");
      carregarAdj();
    });

    el("adj")?.addEventListener("change", () => {
      limpar("macropolitica", "pilar", "eixo", "politica");
      carregarMacropolitica();
    });

    el("macropolitica")?.addEventListener("change", () => {
      limpar("pilar", "eixo", "politica");
      carregarPilar();
    });

    el("pilar")?.addEventListener("change", () => {
      limpar("eixo", "politica");
      carregarEixo();
    });

    el("eixo")?.addEventListener("change", () => {
      limpar("politica");
      carregarPolitica();
    });
  }

  function inicializar() {
    carregarRegiao();
    limpar(...DEPENDENTES);
    carregarSubfuncaoUg();
    carregarAdj();
    configurarEventos();
  }

  window.preencherChavePlanejamentoV2 = function (data) {
    if (!data) return;
    if (data.produto) {
      window.DADOS_PLANEJAMENTO = {
        ...(window.DADOS_PLANEJAMENTO || {}),
        produto: data.produto,
      };
    }

    carregarRegiao();
    if (data.regiao) el("regiao").value = data.regiao;

    carregarSubfuncaoUg(data.subfuncao_ug || "");
    carregarAdj(data.adj || "");
    carregarMacropolitica(data.macropolitica || "");
    carregarPilar(data.pilar || "");
    carregarEixo(data.eixo || "");
    carregarPolitica(data.politica_decreto || "");

    if (data.publico_ods) {
      const publico = document.querySelector('select[name="publico_ods"]');
      if (publico) publico.value = data.publico_ods;
    }
  };

  document.addEventListener("DOMContentLoaded", inicializar);
})();

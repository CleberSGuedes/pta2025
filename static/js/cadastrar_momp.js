// ===================== memorica_calculo.js
const grupoDespesaMap = {
  "15000000 - Recursos não vinculados de Impostos": [
    "1 - Pessoal e Encargos Sociais", "2 - Juros e Encargos da Dívida", "3 - Outras Despesas Corrente",
    "4 - Investimentos", "5 - Inversões Financeiras", "6 - Amortização da Dívida"
  ],
  "15010100 - Outros Recursos não vinculados destinados ao Tesouro": [
    "1 - Pessoal e Encargos Sociais", "2 - Juros e Encargos da Dívida", "3 - Outras Despesas Corrente",
    "4 - Investimentos", "5 - Inversões Financeiras", "6 - Amortização da Dívida"
  ],
  "15001001 - Recursos destinados à Manutenção e Desenvolvimento do Ensino": [
    "1 - Pessoal e Encargos Sociais", "2 - Juros e Encargos da Dívida", "3 - Outras Despesas Corrente",
    "4 - Investimentos", "5 - Inversões Financeiras", "6 - Amortização da Dívida"
  ],
  "15010000 - Outros Recursos não Vinculados": [
    "1 - Pessoal e Encargos Sociais", "2 - Juros e Encargos da Dívida", "3 - Outras Despesas Corrente",
    "4 - Investimentos", "5 - Inversões Financeiras", "6 - Amortização da Dívida"
  ],
  "15400000 - Transferência de recursos do FUNDEB desenvolvimento do Ensino": [
    "1 - Pessoal e Encargos Sociais", "2 - Juros e Encargos da Dívida", "3 - Outras Despesas Corrente",
    "4 - Investimentos", "5 - Inversões Financeiras", "6 - Amortização da Dívida"
  ],
  "15401070 - Transferência de recursos do FUNDEB Remuneração Educação Básica": [
    "1 - Pessoal e Encargos Sociais"
  ],
  "15500000 - Recursos da Contribuição ao Salário Educação": [
    "3 - Outras Despesas Corrente", "4 - Investimentos"
  ],
  "15510000 - Transferências de Recursos do FNDE referente ao Programa Dinheiro": [
    "3 - Outras Despesas Corrente", "4 - Investimentos"
  ],
  "15520000 - Transferências de Recursos do FNDE referente ao Programa Nacional de Alimentação Escolar (PNAE)": [
    "3 - Outras Despesas Corrente", "4 - Investimentos"
  ],
  "15530000 - Transferências de Recursos do FNDE referente ao P. N. de Apoio ao Transporte Escolar (PNATE)": [
    "3 - Outras Despesas Corrente", "4 - Investimentos"
  ],
  "15690000 - Outras Transferências de Recursos do FNDE": [
    "3 - Outras Despesas Corrente", "4 - Investimentos"
  ],
  "15700000 - Transferências do Governo Federal ref. a Convênios e outros Repasses vinculados à Educação": [
    "3 - Outras Despesas Corrente", "4 - Investimentos"
  ],
  "15740000 - Recursos de Operações de Crédito Educação": [
    "4 - Investimentos"
  ]
};

const subtetoMap = {
  "1 - Orçamento Base de Gasto (OBG)": ["A - Despesas Obrigatórias", "B - Essenciais à Manutenção da Unidade", "C - Prioridades Estratégicas LDO", "D - Essenciais Finalísticas"],
  "2 - Orçamento de Novas Iniciativas (ONI)": ["E - Projetos de Investimentos"],
  "3 - Orçamento Discricionário (OD)": ["E - Projetos de Investimentos", "F - Demais Ações e Projetos Finalísticos"],
  "4 - A Classificar": ["A - Despesas Obrigatórias", "B - Essenciais à Manutenção da Unidade", "C - Prioridades Estratégicas LDO", "D - Essenciais Finalísticas", "E - Projetos de Investimentos", "F - Demais Ações e Projetos Finalísticos"]
};

document.addEventListener("DOMContentLoaded", () => {
  const tetoInput = document.getElementById("teto_anual");
  const hiddenTetoInput = document.getElementById("teto_anual_real");
  const form = document.getElementById("form-momp");
  const exercicioInput = document.getElementById("exercicio");

  if (tetoInput && hiddenTetoInput) {
    window.autoTeto = new AutoNumeric(tetoInput, {
      digitGroupSeparator: ".",
      decimalCharacter: ",",
      decimalCharacterAlternative: ".",
      decimalPlaces: 2,
      minimumValue: "0",
      maximumValue: "999999999999.99",
      outputFormat: "number",
      modifyValueOnWheel: false,
      unformatOnSubmit: true
    });

    tetoInput.addEventListener("keypress", function (e) {
      const char = String.fromCharCode(e.which);
      if (!/[0-9.,]/.test(char)) {
        e.preventDefault();
      }
    });

    form.addEventListener("submit", function () {
      if (window.autoTeto && hiddenTetoInput) {
        const valor = window.autoTeto.getNumber();
        if (!isNaN(valor)) {
          hiddenTetoInput.value = valor.toFixed(2);
        }
      }
    });
  }

  if (exercicioInput) {
    exercicioInput.setAttribute("maxlength", "4");

    exercicioInput.addEventListener("keypress", function (e) {
      const char = String.fromCharCode(e.which);
      if (!/[0-9]/.test(char)) {
        e.preventDefault();
      }
    });
  }

  $('#fonte').select2({
    placeholder: "Selecione ou digite...",
    allowClear: true,
    width: '100%',
    language: { noResults: () => "Nenhuma opção encontrada" }
  }).on('change', function () {
    const fonte = $(this).val();
    const $grupo = $("#grupo_despesa");
    $grupo.empty().append('<option value="">Selecione um item</option>');
    if (grupoDespesaMap[fonte]) {
      grupoDespesaMap[fonte].forEach(txt => {
        $grupo.append($('<option>').val(txt).text(txt));
      });
    }
  });

  document.getElementById("teto_despesa_momp").addEventListener("change", function () {
    const valor = this.value;
    const $sub = $("#subteto_despesa_momp");
    $sub.empty().append('<option value="">Selecione</option>');
    if (subtetoMap[valor]) {
      subtetoMap[valor].forEach(txt => {
        $sub.append($('<option>').val(txt).text(txt));
      });
    }
  });

  document.querySelectorAll("#tabela-momp tr").forEach(row => {
    row.addEventListener("click", () => {
      document.querySelectorAll("#tabela-momp tr").forEach(r => r.classList.remove("table-active"));
      row.classList.add("table-active");
      const radio = row.querySelector('input[type=radio]');
      if (radio) radio.checked = true;
    });
  });

  setTimeout(() => fecharFormularioMomp(), 100);
});

window.enviarFormularioMomp = function () {
  const form = document.getElementById("form-momp");
  const exercicioInput = document.getElementById("exercicio");

  const campos = [
    "exercicio", "fonte", "grupo_despesa", "teto_despesa_momp",
    "subteto_despesa_momp", "teto_anual"
  ];

  for (let id of campos) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
  }

  const exercicioVal = exercicioInput.value.trim();
  if (!/^\d{4}$/.test(exercicioVal)) {
    alert("O campo Exercício deve conter exatamente 4 dígitos numéricos.");
    return;
  }

  if (window.autoTeto) {
    const valorFloat = window.autoTeto.getNumber();
    if (!isNaN(valorFloat)) {
      document.getElementById("teto_anual_real").value = valorFloat.toFixed(2);
    } else {
      alert("Valor do campo Teto Anual está inválido.");
      return;
    }
  }

  const hidden = document.getElementById("teto_anual_real");
  if (!hidden || hidden.value.trim() === "" || isNaN(hidden.value.replace(',', '.'))) {
    alert("Erro ao preparar valor do campo Teto Anual.");
    return;
  }

  form.submit();
};

window.abrirFormularioMomp = function (alterar = false) {
  const formEl = document.getElementById("form-momp");
  const container = document.getElementById("formulario-momp");
  const botaoSalvar = document.getElementById("btn-salvar-momp");

  if (!alterar) {
    formEl.reset();
    container.style.display = "block";
    $('#fonte').val(null).trigger("change");

    if (window.autoTeto) window.autoTeto.clear();
    document.getElementById("teto_anual_real").value = "";

    if (botaoSalvar) botaoSalvar.innerText = "Cadastrar";
    return;
  }

  const linha = document.querySelector("#tabela-momp tr.table-active");
  if (!linha) return alert("Selecione uma linha para alterar.");

  const cols = linha.querySelectorAll("td");
  const id = linha.dataset.id;
  const exercicioTexto = cols[1].innerText.trim();
  const fonteTexto = cols[2].innerText.trim();
  const grupoTexto = cols[3].innerText.trim();
  const tetoTexto = cols[4].innerText.trim();
  const subtetoTexto = cols[5].innerText.trim();
  const valorTexto = cols[6].innerText.trim().replace(/\./g, '').replace(',', '.');
  const valorNumerico = parseFloat(valorTexto);

  document.getElementById("id").value = id;
  document.getElementById("exercicio").value = exercicioTexto;
  $('#fonte').val(fonteTexto).trigger("change");

  setTimeout(() => {
    $("#grupo_despesa").val(grupoTexto);
    $("#teto_despesa_momp").val(tetoTexto);
    const $sub = $("#subteto_despesa_momp");
    $sub.empty().append('<option value="">Selecione</option>');
    if (subtetoMap[tetoTexto]) {
      subtetoMap[tetoTexto].forEach(txt => {
        $sub.append($('<option>').val(txt).text(txt));
      });
    }
    $("#subteto_despesa_momp").val(subtetoTexto);
  }, 200);

  if (!isNaN(valorNumerico)) {
    window.autoTeto.set(valorNumerico);
    document.getElementById("teto_anual_real").value = valorNumerico.toFixed(2);
  } else {
    window.autoTeto.clear();
    document.getElementById("teto_anual_real").value = "";
  }

  container.style.display = "block";
  if (botaoSalvar) botaoSalvar.innerText = "Salvar Alterações";
};

window.fecharFormularioMomp = function () {
  document.getElementById("form-momp").reset();
  document.getElementById("formulario-momp").style.display = "none";
  $('#fonte').val(null).trigger("change");
  document.querySelectorAll("#tabela-momp tr").forEach(r => r.classList.remove("table-active"));
  document.querySelectorAll('input[name="selecionar_momp"]').forEach(r => r.checked = false);
  if (window.autoTeto) window.autoTeto.clear();
  document.getElementById("teto_anual_real").value = "";
};

window.excluirMomp = function () {
  const linha = document.querySelector("#tabela-momp tr.table-active");
  if (!linha) return alert("Selecione um registro para excluir.");
  if (!confirm("Deseja realmente excluir?")) return;

  const id = linha.dataset.id;

  fetch(`/excluir_momp/${id}`, {
    method: "POST",
    headers: {
      "Accept": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro HTTP");
      }
      return response.json();
    })
    .then(data => {
      alert(data.message);
      if (data.success) location.reload();
    })
    .catch(error => {
      alert("Erro ao excluir. Tente novamente.");
      console.error("Detalhes do erro:", error);
    });
};

// ======= AUX: ligar clique nas linhas (reutilizado após filtros) =======
function bindTableRowClicks() {
  document.querySelectorAll("#tabela-momp tr").forEach(row => {
    row.addEventListener("click", () => {
      document.querySelectorAll("#tabela-momp tr").forEach(r => r.classList.remove("table-active"));
      row.classList.add("table-active");
      const radio = row.querySelector('input[type=radio]');
      if (radio) radio.checked = true;
    });
  });
}

// Chamada na carga inicial (substitui o trecho antigo que fazia isso)
document.addEventListener("DOMContentLoaded", () => {
  bindTableRowClicks(); // <- garante clique nas linhas
});

// ======= CONSTRUTOR DE FILTROS (UI) =======
let criterios = []; // { campo, operador, valor }

function renderCriterios() {
  const ul = document.getElementById("criterios-list");
  ul.innerHTML = "";
  if (!criterios.length) {
    ul.innerHTML = `<li class="list-group-item text-muted">Nenhum critério adicionado.</li>`;
    return;
  }
  criterios.forEach((c, idx) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center justify-content-between";
    li.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <input type="checkbox" class="form-check-input me-2 criterio-check" data-idx="${idx}">
        <span><strong>${labelCampo(c.campo)}</strong> ${labelOperador(c.operador)} <em>${escapeHtml(c.valor)}</em></span>
      </div>
      <button type="button" class="btn btn-link btn-sm text-danger p-0" data-rm="${idx}">remover</button>
    `;
    ul.appendChild(li);
  });

  // botões "remover" inline
  ul.querySelectorAll("button[data-rm]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = parseInt(e.currentTarget.getAttribute("data-rm"), 10);
      if (!isNaN(i)) {
        criterios.splice(i, 1);
        renderCriterios();
      }
    });
  });
}

function labelCampo(c) {
  return {
    "exercicio": "Exercício",
    "fonte": "Fonte",
    "grupo_despesa": "Grupo de Despesa",
    "teto_despesa_momp": "Teto MOMP",
    "subteto_despesa_momp": "Subteto MOMP",
  }[c] || c;
}
function labelOperador(op) {
  return op === "contem" ? "contém" : "igual a";
}
function escapeHtml(s) {
  return (s || "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

// Botões do construtor
document.getElementById("btn-add-criterio").addEventListener("click", () => {
  const campo = document.getElementById("filtro-campo").value;
  const operador = document.getElementById("filtro-operador").value; // 'igual' | 'contem'
  const valor = document.getElementById("filtro-valor").value.trim();

  if (!valor) {
    alert("Informe um valor para o critério.");
    return;
  }

  // regra: se for adicionar um campo != exercício e ainda não existe exercício na lista,
  // permitimos adicionar, mas vamos alertar na hora do CONSULTAR caso não tenha exercício.
  criterios.push({ campo, operador, valor });
  document.getElementById("filtro-valor").value = "";
  renderCriterios();
});

document.getElementById("btn-remover-criterio").addEventListener("click", () => {
  const checks = document.querySelectorAll("#criterios-list .criterio-check:checked");
  if (!checks.length) return;
  const toRemove = Array.from(checks).map(ch => parseInt(ch.getAttribute("data-idx"), 10)).filter(i => !isNaN(i));
  // remove de trás pra frente para não bagunçar índices
  toRemove.sort((a,b)=>b-a).forEach(i => criterios.splice(i, 1));
  renderCriterios();
});

document.getElementById("btn-limpar-criterios").addEventListener("click", () => {
  criterios = [];
  renderCriterios();

  // Sem critérios -> recarrega tudo
  consultarFiltros(true);
});

document.getElementById("btn-consultar").addEventListener("click", () => {
  consultarFiltros(false);
});

function consultarFiltros(recarregarTudo=false) {
  // regra: se houver pelo menos 1 critério que não seja exercício,
  // deve existir um critério de exercício.
  const temOutros = criterios.some(c => c.campo !== "exercicio");
  const temExercicio = criterios.some(c => c.campo === "exercicio");
  if (!recarregarTudo && temOutros && !temExercicio) {
    alert("Para aplicar outros filtros, informe ao menos um critério de Exercício.");
    return;
  }

  const body = recarregarTudo ? { criterios: [] } : { criterios };

  fetch("/filtrar_momp", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(body)
  })
  .then(async resp => {
    if (!resp.ok) {
      const j = await resp.json().catch(()=>({message:"Erro ao consultar."}));
      throw new Error(j.message || "Erro ao consultar.");
    }
    return resp.json();
  })
  .then(data => {
    if (!data.success) {
      alert(data.message || "Nenhum resultado.");
      return;
    }
    const tbody = document.getElementById("tabela-momp");
    tbody.innerHTML = "";

    if (!data.rows.length) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Nenhum resultado encontrado.</td></tr>`;
      bindTableRowClicks(); // mantém compatibilidade
      return;
    }

    const frag = document.createDocumentFragment();
    data.rows.forEach(r => {
      const tr = document.createElement("tr");
      tr.setAttribute("data-id", r.id);
      tr.innerHTML = `
        <td class="text-center"><input type="radio" name="selecionar_momp" value="${r.id}"></td>
        <td class="text-start">${escapeHtml(r.exercicio)}</td>
        <td class="text-start">${escapeHtml(r.fonte)}</td>
        <td class="text-start">${escapeHtml(r.grupo_despesa)}</td>
        <td class="text-start">${escapeHtml(r.teto_despesa_momp)}</td>
        <td class="text-start">${escapeHtml(r.subteto_despesa_momp)}</td>
        <td class="text-center">${escapeHtml(r.teto_anual_fmt)}</td>
      `;
      frag.appendChild(tr);
    });
    tbody.appendChild(frag);

    // Reaplica o comportamento de clique/seleção na tabela
    bindTableRowClicks();
  })
  .catch(err => {
    alert(err.message || "Erro ao consultar.");
    console.error(err);
  });
}

// render inicial do painel de critérios
renderCriterios();

// --- reset da UI de filtros ao carregar/atualizar a página
function resetFiltroUI() {
  const campo = document.getElementById("filtro-campo");
  const operador = document.getElementById("filtro-operador");
  const valor = document.getElementById("filtro-valor");
  if (campo) campo.value = "exercicio";
  if (operador) operador.value = "igual";
  if (valor) { valor.value = ""; valor.placeholder = "Digite o valor"; }

  // zera a lista mostrada
  const lista = document.getElementById("filtros-lista"); // id do container dos critérios
  if (lista) lista.innerHTML = '<div class="text-muted small px-2 py-1">Nenhum critério adicionado.</div>';

  // se você usa um array global para os filtros, zere-o
  if (window.__filtrosMomp) window.__filtrosMomp.length = 0;
}

// dispara no load normal e quando a página volta do cache do navegador
document.addEventListener("DOMContentLoaded", resetFiltroUI);
window.addEventListener("pageshow", (e) => { if (e.persisted) resetFiltroUI(); });

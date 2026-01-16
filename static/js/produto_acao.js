// === Lista de produtos vinculados às ações ===
const produtosPorAcao = {
    "2900": ["Acesso e permanência desenvolvido", "Avaliação (Avalia MT) desenvolvida", "Bem-estar escolar desenvolvido", "Educação para jovens e adultos (EJA) desenvolvida", "Formação continuada de professores realizada", "Línguas estrangeiras desenvolvidas", "Materiais escolares disponibilizados", "Projetos pedagógicos integrados implantados", "Sistema estruturado de ensino implantado", "Uniformes escolares disponibilizados"],
    "2936": ["Acesso e permanência desenvolvido", "Alfabetização desenvolvida", "Avaliação (Avalia MT) desenvolvida", "Bem-estar escolar desenvolvido", "Educação em tempo integral desenvolvida", "Educação escolar do campo desenvolvida", "Educação escolar indígena desenvolvida", "Educação escolar quilombola desenvolvida", "Educação especial desenvolvida", "Educação para jovens e adultos (EJA) desenvolvida", "Escolas militares desenvolvidas", "Formação continuada de professores realizada", "Línguas estrangeiras desenvolvidas", "Projetos pedagógicos integrados implantados", "Regime de colaboração desenvolvido", "Sistema estruturado de ensino implantado"],
    "2957": ["Acesso e permanência desenvolvido", "Alfabetização desenvolvida", "Avaliação (Avalia MT) desenvolvida", "Bem-estar escolar desenvolvido", "Educação especial desenvolvida", "Formação continuada de professores realizada", "Línguas estrangeiras desenvolvidas", "Materiais escolares disponibilizados", "Projetos pedagógicos integrados implantados", "Sistema estruturado de ensino implantado", "Uniformes escolares disponibilizados"],
    "4172": ["Acesso e permanência desenvolvido", "Alfabetização desenvolvida", "Avaliação (Avalia MT) desenvolvida", "Bem-estar escolar desenvolvido", "Educação em tempo integral desenvolvida", "Educação escolar do campo desenvolvida", "Educação escolar indígena desenvolvida", "Educação escolar quilombola desenvolvida", "Escolas militares desenvolvidas", "Formação continuada de professores realizada", "Línguas estrangeiras desenvolvidas", "Materiais escolares disponibilizados", "Projetos pedagógicos integrados implantados", "Remuneração professores e profissionais da educação com recursos do MDE, Art 70 Lei 9394/1996", "Remuneração professores e profissionais da educação, FUNDEB 30%, Arts 26-A, 14.113/20 e 70, 9394/96", "Remuneração professores e profissionais da educação, FUNDEB 70%, Art 26, § 1º, II, Lei 14.113/20", "Sistema estruturado de ensino implantado", "Uniformes escolares disponibilizados"],
    "4174": ["Acesso e permanência desenvolvido", "Avaliação (Avalia MT) desenvolvida", "Bem-estar escolar desenvolvido", "Educação em tempo integral desenvolvida", "Educação escolar do campo desenvolvida", "Educação escolar indígena desenvolvida", "Educação escolar quilombola desenvolvida", "Escolas militares desenvolvidas", "Formação continuada de professores realizada", "Línguas estrangeiras desenvolvidas", "Materiais escolares disponibilizados", "Novo ensino médio e ensino técnico profissionalizante desenvolvido", "Projetos pedagógicos integrados implantados", "Sistema estruturado de ensino implantado", "Uniformes escolares disponibilizados"],
    "2895": ["Alimentação escolar mantida"],
    "2897": ["Alimentação escolar mantida"],
    "2898": ["Alimentação escolar mantida"],
    "2899": ["Alimentação escolar mantida"],
    "2284": ["Conselho mantido"],
    "4173": ["Gestão do patrimônio realizada", "Gestão escolar desenvolvida", "Infraestrutura escolar modernizada", "Tecnologia no ambiente escolar disponibilizada"],
    "4175": ["Gestão do patrimônio realizada", "Gestão escolar desenvolvida", "Infraestrutura escolar modernizada", "Tecnologia no ambiente escolar disponibilizada"],
    "4177": ["Gestão do patrimônio realizada", "Gestão escolar desenvolvida", "Infraestrutura escolar modernizada", "Tecnologia no ambiente escolar disponibilizada"],
    "4178": ["Gestão do patrimônio realizada", "Gestão escolar desenvolvida", "Infraestrutura escolar modernizada", "Tecnologia no ambiente escolar disponibilizada"],
    "4180": ["Gestão do patrimônio realizada", "Gestão escolar desenvolvida", "Gestão estratégica de pessoas implementada", "Gestão integrada desenvolvida", "Infraestrutura escolar modernizada", "Valorização profissional desenvolvida"],
    "4524": ["Infraestrutura escolar modernizada", "Regime de colaboração desenvolvido"],
    "4525": ["Infraestrutura escolar modernizada", "Regime de colaboração desenvolvido"],
    "4179": ["Transporte escolar mantido"],
    "4181": ["Transporte escolar mantido"],
    "4182": ["Transporte escolar mantido"],
    "2009": ["Produto exclusivo para ação padronizada"],
    "2010": ["Produto exclusivo para ação padronizada"],
    "2014": ["Produto exclusivo para ação padronizada"],
    "4491": ["Produto exclusivo para ação padronizada"],
    "8002": ["Produto exclusivo para ação padronizada"],
    "8026": ["Produto exclusivo para ação padronizada"],
    "8040": ["Produto exclusivo para ação padronizada"],
    "8003": ["Produto exclusivo para ação padronizada"]
};

// === Preenche a lista de produtos com base na ação selecionada ===
function carregarProdutosPorAcao(acaoPaoeCodigo) {
    const select = document.getElementById("produto_acao");
    select.innerHTML = '<option value="">Selecione um produto</option>';

    const codigo = acaoPaoeCodigo?.split(" - ")[0];
    const produtos = produtosPorAcao[codigo] || [];

    produtos.forEach(produto => {
        const opt = document.createElement("option");
        opt.value = produto;
        opt.textContent = produto;
        select.appendChild(opt);
    });
}

// === Abrir formulário para cadastro ou alteração ===
function abrirFormularioProduto(alterando = false) {
    const form = document.getElementById("formularioProduto");
    if (!form) return;

    form.style.display = "block";

    const select = document.getElementById("produto_acao");
    const btn = document.getElementById("btnCadastrarProduto");
    const produtoId = document.getElementById("produto_id");

    const unMedidaInput = document.getElementById("un_medida");
    const quantidadeInput = document.getElementById("quantidade");
    const quantidadeRealInput = document.getElementById("quantidade_real");

    btn.innerText = "Cadastrar";
    produtoId.value = "";
    select.selectedIndex = 0;
    unMedidaInput.value = "";

    const an = AutoNumeric.getAutoNumericElement(quantidadeInput);
    if (an) {
        an.clear();
    } else {
        quantidadeInput.value = "";
    }

    quantidadeRealInput.value = "";

    if (alterando) {
        const selecionado = document.querySelector('input[name="produtoSelecionado"]:checked');
        if (!selecionado) {
            alert("Selecione um produto para alterar.");
            fecharFormularioProduto();
            return;
        }

        const row = selecionado.closest('tr');
        const nome = row.children[1].innerText.trim();
        const unMedida = row.children[2].innerText.trim();
        const quantidade = row.children[3].innerText.trim();

        Array.from(select.options).forEach(opt => {
            if (opt.textContent === nome) opt.selected = true;
        });

        unMedidaInput.value = unMedida;

        const valorNumerico = parseFloat(quantidade.replace(/\./g, '').replace(',', '.'));
        if (!isNaN(valorNumerico) && an) {
            an.set(valorNumerico);
        }

        quantidadeRealInput.value = valorNumerico;
        produtoId.value = selecionado.value;
        btn.innerText = "Salvar Alterações";
    }
}

// === Fechar formulário ===
function fecharFormularioProduto() {
    const form = document.getElementById("formularioProduto");
    if (!form) return;

    form.style.display = "none";
    form.querySelector("form").reset();
    document.getElementById("produto_id").value = "";
    document.getElementById("btnCadastrarProduto").innerText = "Cadastrar";

    const selecionado = document.querySelector('input[name="produtoSelecionado"]:checked');
    if (selecionado) selecionado.checked = false;
}

// === Validar e submeter ===
function validarProduto() {
    const nomeSelect = document.getElementById("produto_acao");
    const unMedidaInput = document.getElementById("un_medida");
    const quantidadeInput = document.getElementById("quantidade");
    const quantidadeRealInput = document.getElementById("quantidade_real");

    const nome = nomeSelect?.value;
    const unMedida = unMedidaInput?.value.trim();

    const an = AutoNumeric.getAutoNumericElement(quantidadeInput);
    const valorBruto = an ? an.getNumber() : quantidadeInput.value;

    const quantidade = parseFloat(valorBruto);

    if (!nome) {
        alert("Selecione um produto da ação.");
        nomeSelect.focus();
        return;
    }

    if (!unMedida) {
        alert("A unidade de medida não foi preenchida.");
        unMedidaInput.focus();
        return;
    }

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade válida (número maior que 0).");
        quantidadeInput.focus();
        return;
    }

    if (unMedida.toLowerCase() === "percentual" && quantidade > 100) {
        alert("Para unidade Percentual, a quantidade não pode ser maior que 100.");
        quantidadeInput.focus();
        return;
    }

    quantidadeRealInput.value = quantidade;
    document.getElementById("formProdutoAcao").submit();
}

// === Excluir produto ===
function excluirProduto() {
    const selecionado = document.querySelector('input[name="produtoSelecionado"]:checked');
    if (!selecionado) {
        alert("Selecione um produto para excluir.");
        return;
    }

    if (confirm("Deseja realmente excluir este produto da ação?")) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = `/excluir_produto_acao/${selecionado.value}`;
        document.body.appendChild(form);
        form.submit();
    }
}

// === Inicialização DOM ===
document.addEventListener("DOMContentLoaded", () => {
    const acaoPaoe = document.getElementById("acao_paoe_info");
    const programa = document.getElementById("programa_nome")?.value;
    const subfuncao = document.getElementById("subfuncao_nome")?.value;
    const produtoSelect = document.getElementById("produto_acao");
    const metaFisicaTexto = document.getElementById("metaFisicaTexto");
    const unidadeInput = document.getElementById("un_medida");
    const quantidadeInput = document.getElementById("quantidade");
    const quantidadeRealInput = document.getElementById("quantidade_real");

    // Instanciar AutoNumeric apenas uma vez
    if (quantidadeInput && quantidadeRealInput && !AutoNumeric.getAutoNumericElement(quantidadeInput)) {
        const an = new AutoNumeric(quantidadeInput, {
            decimalCharacter: ",",
            digitGroupSeparator: ".",
            decimalPlaces: 2,
            minimumValue: "0",
            modifyValueOnWheel: false
        });

        const form = document.getElementById("formProdutoAcao");
        if (form) {
            form.addEventListener("submit", () => {
                quantidadeRealInput.value = an.getNumber();
            });
        }
    }

    // Carregar produtos da ação
    if (acaoPaoe) carregarProdutosPorAcao(acaoPaoe.value);

    // Exibir meta física e unidade de medida ao trocar o produto
    if (produtoSelect && metaFisicaTexto && programa && subfuncao && acaoPaoe) {
        produtoSelect.addEventListener("change", function () {
            const produtoSelecionado = this.value;
            const acao = acaoPaoe.value;

            if (
                metaMap[programa] &&
                metaMap[programa][subfuncao] &&
                metaMap[programa][subfuncao][acao] &&
                metaMap[programa][subfuncao][acao][produtoSelecionado]
            ) {
                const meta = metaMap[programa][subfuncao][acao][produtoSelecionado];
                metaFisicaTexto.textContent = meta;
                metaFisicaTexto.classList.add("text-success");
                metaFisicaTexto.classList.remove("text-danger");

                const match = meta.trim().match(/^([^\=]+)=/);
                unidadeInput.value = match ? match[1].trim() : "";
            } else {
                metaFisicaTexto.textContent = "Meta física não cadastrada para este produto.";
                metaFisicaTexto.classList.remove("text-success");
                metaFisicaTexto.classList.add("text-danger");
                unidadeInput.value = "";
            }
        });
    }

    // Reset de seleção inicial
    const selecionado = document.querySelector('input[name="produtoSelecionado"]:checked');
    if (selecionado) selecionado.checked = false;
});

// === Expor funções globais ===
window.abrirFormularioProduto = abrirFormularioProduto;
window.fecharFormularioProduto = fecharFormularioProduto;
window.validarProduto = validarProduto;
window.excluirProduto = excluirProduto;

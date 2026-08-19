document.addEventListener("DOMContentLoaded", () => {
    const formExcluirHidden = document.getElementById("formExcluirEtapaHidden");
    const formEtapa = document.getElementById("formEtapa");
    const municipioSelect = document.getElementById("municipio_entrega_id");
    const etapaInput = document.getElementById("etapa_nome");
    let ultimoPrefixoMunicipio = "";

    function municipioSelecionadoEstado() {
        const opt = municipioSelect?.selectedOptions?.[0];
        const codigo = (opt?.dataset.codigo || "").trim();
        const nome = (opt?.dataset.nome || opt?.textContent || "").trim().toLowerCase();
        return codigo.startsWith("5100000") || nome === "estado" || nome.includes("estado mato grosso");
    }

    function prefixoMunicipioSelecionado() {
        if (!municipioSelect?.value || municipioSelecionadoEstado()) return "";
        const opt = municipioSelect.selectedOptions?.[0];
        const nome = (opt?.dataset.nome || "").trim();
        return nome ? `${nome} * ` : "";
    }

    function aplicarPrefixoMunicipioNaEtapa() {
        if (!etapaInput) return;

        let valor = etapaInput.value || "";
        if (ultimoPrefixoMunicipio && valor.startsWith(ultimoPrefixoMunicipio)) {
            valor = valor.slice(ultimoPrefixoMunicipio.length).trimStart();
        }

        const novoPrefixo = prefixoMunicipioSelecionado();
        etapaInput.value = novoPrefixo ? `${novoPrefixo}${valor}` : valor;
        ultimoPrefixoMunicipio = novoPrefixo;

        if (typeof atualizarContador === "function") {
            atualizarContador();
        }
    }

    function atualizarOpcoesMunicipio() {
        if (!municipioSelect) return;
        Array.from(municipioSelect.options).forEach((opt) => {
            if (!opt.value) return;
            opt.disabled = false;
        });
    }

    function selecionarMunicipioPadrao() {
        if (!municipioSelect) return;
        const opcoesDisponiveis = Array.from(municipioSelect.options).filter((opt) => opt.value && !opt.disabled);
        if (opcoesDisponiveis.length === 1) {
            municipioSelect.value = opcoesDisponiveis[0].value;
            aplicarPrefixoMunicipioNaEtapa();
        }
    }

    // 👉 Validação de CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf[10]);
    }

    // 👉 Validação de e-mail
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // 👉 Interceptar envio do formulário
    formEtapa.addEventListener("submit", function (e) {
        const nome = document.getElementById("etapa_nome").value.trim();
        const municipioId = municipioSelect?.value || "";
        const inicio = document.getElementById("data_inicio").value.trim();
        const fim = document.getElementById("data_fim").value.trim();
        const responsavel = document.getElementById("responsavel").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!municipioId || !nome || !inicio || !fim || !responsavel || !cpf || !email) {
            Swal.fire("Campos obrigatórios", "Preencha todos os campos do formulário.", "warning");
            e.preventDefault();
            return;
        }

        if (!validarCPF(cpf)) {
            Swal.fire("CPF inválido", "Digite um CPF válido no formato 000.000.000-00", "error");
            e.preventDefault();
            return;
        }

        if (!validarEmail(email)) {
            Swal.fire("E-mail inválido", "Digite um endereço de e-mail válido.", "error");
            e.preventDefault();
            return;
        }

        // Verificar duplicidade
        const linhas = document.querySelectorAll("#formExcluirEtapa tbody tr");
        for (const linha of linhas) {
            const radio = linha.querySelector("input[type=radio]");
            const etapaNome = radio?.dataset.etapa_nome?.trim();
            const municipioEtapa = radio?.dataset.municipio_entrega_id?.trim();
            const etapaId = document.getElementById("etapa_id").value;

            const mesmaEtapa = etapaNome === nome && municipioEtapa === municipioId;

            if (mesmaEtapa) {
                if (!etapaId || etapaId !== radio.value) {
                    Swal.fire(
                        "Etapa duplicada",
                        "Já existe uma etapa ativa com este mesmo nome para o município selecionado. O município pode ter várias etapas, mas cada etapa precisa ter um nome diferente.",
                        "error"
                    );
                    e.preventDefault();
                    return;
                }
            }
        }
    });

    // 👉 Abrir formulário
    window.abrirFormularioEtapa = function (alterar = false) {
        const form = document.getElementById("formularioEtapa");
        form.style.display = "block";

        if (!alterar) {
            limparCamposEtapa();
            atualizarOpcoesMunicipio();
            selecionarMunicipioPadrao();
            return;
        }

        const selecionado = document.querySelector('input[name="etapaSelecionada"]:checked');
        if (!selecionado) {
            Swal.fire("Atenção", "Selecione uma etapa para alterar.", "info");
            return;
        }

        atualizarOpcoesMunicipio();
        document.getElementById("etapa_id").value = selecionado.value;
        document.getElementById("municipio_entrega_id").value = selecionado.dataset.municipio_entrega_id || "";
        document.getElementById("etapa_nome").value = selecionado.dataset.etapa_nome;
        ultimoPrefixoMunicipio = prefixoMunicipioSelecionado();
        document.getElementById("data_inicio").value = selecionado.dataset.data_inicio;
        document.getElementById("data_fim").value = selecionado.dataset.data_fim;
        document.getElementById("responsavel").value = selecionado.dataset.responsavel;
        document.getElementById("cpf").value = selecionado.dataset.cpf;
        document.getElementById("email").value = selecionado.dataset.email;
    };

    // 👉 Excluir etapa
    window.excluirEtapa = function () {
        const selecionado = document.querySelector('input[name="etapaSelecionada"]:checked');
        if (!selecionado) {
            Swal.fire("Atenção", "Selecione uma etapa para excluir.", "info");
            return;
        }

        Swal.fire({
            title: 'Confirmar exclusão',
            text: "Deseja realmente excluir esta etapa?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sim, excluir'
        }).then((result) => {
            if (result.isConfirmed) {
                formExcluirHidden.action = `/excluir_etapa/${selecionado.value}`;
                formExcluirHidden.submit();
            }
        });
    };

    // 👉 Cancelar/Voltar
    window.fecharFormularioEtapa = function () {
        document.getElementById("formularioEtapa").style.display = "none";
        limparCamposEtapa();
    };

    // 👉 Limpar campos ao recarregar a página
    window.addEventListener("pageshow", function () {
        limparCamposEtapa();
    });

    // 👉 Função auxiliar para limpar campos
    function limparCamposEtapa() {
        document.getElementById("etapa_id").value = "";
        if (municipioSelect) municipioSelect.value = "";
        document.getElementById("etapa_nome").value = "";
        ultimoPrefixoMunicipio = "";
        document.getElementById("data_inicio").value = "";
        document.getElementById("data_fim").value = "";
        document.getElementById("responsavel").value = "";
        document.getElementById("cpf").value = "";
        document.getElementById("email").value = "";
    }

    municipioSelect?.addEventListener("change", aplicarPrefixoMunicipioNaEtapa);
    atualizarOpcoesMunicipio();
    selecionarMunicipioPadrao();
});

// 👉 Inicialização após carregar DOM
document.addEventListener("DOMContentLoaded", function () {
    const formExcluirHidden = document.getElementById("formExcluirEtapaHidden");
    const formEtapa = document.getElementById("formEtapa");
    const cpfInput = document.getElementById("cpf");

    if (cpfInput) {
        cpfInput.addEventListener("input", function () {
            let value = cpfInput.value.replace(/\D/g, ''); // remove tudo que não for dígito
            if (value.length > 11) value = value.slice(0, 11);

            // aplica a máscara
            let formatted = '';
            if (value.length > 0) formatted = value.substring(0, 3);
            if (value.length >= 4) formatted += '.' + value.substring(3, 6);
            if (value.length >= 7) formatted += '.' + value.substring(6, 9);
            if (value.length >= 10) formatted += '-' + value.substring(9, 11);

            cpfInput.value = formatted;
        });
    }

// 👉 Inicialização do contador de caracteres do campo etapa_nome
const campo = document.getElementById("etapa_nome");
const contador = document.getElementById("contadorEtapa");
const limite = 250;

function atualizarContador() {
    const usado = campo.value.length;
    contador.textContent = `${usado} / ${limite} caractere${usado !== 1 ? 's' : ''}`;
}

if (campo && contador) {
    campo.addEventListener("input", atualizarContador);
    atualizarContador(); // inicializa ao carregar
}

});

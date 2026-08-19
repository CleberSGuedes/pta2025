// === Mapeamento correto de funções por programa ===
const programaFuncoes = {
    "036 - Apoio administrativo": "12 - EDUCAÇÃO",
    "533 - Educação 10 Anos": "12 - EDUCAÇÃO",
    "534 - Infraestrutura Educacional": "12 - EDUCAÇÃO",
    "544 - Mato Grosso Mais Educação": "12 - EDUCAÇÃO",
    "997 - Previdência de inativos e pensionistas do Estado": "09 - PREVIDÊNCIA SOCIAL",
    "996 - Operações especiais: outras": "28 - ENCARGOS ESPECIAIS",
    "998 - Operações especiais: cumprimento de sentenças judiciais": "28 - ENCARGOS ESPECIAIS"
};

// === Mostrar formulário de programa ===
function mostrarFormulario(alterando = false) {
    console.log('mostrarFormulario() chamado', { alterando });

    document.getElementById("formularioPrograma").style.display = "block";

    const selectPrograma = document.getElementById("selectPrograma");
    const selectFuncao = document.getElementById("selectFuncao");

    if (alterando) {
        const selecionado = document.querySelector('input[name="programaSelecionado"]:checked');
        if (!selecionado) {
            alert("Selecione um programa para alterar.");
            fecharFormulario();
            return;
        }

        const row = selecionado.closest('tr');
        const programaTexto = row.children[1].innerText.trim();
        const funcaoTexto = row.children[2].innerText.trim();
        const responsavelTexto = row.children[3].innerText.trim();

        // Preenche o programa
        selectPrograma.value = programaTexto;

        // Preenche a função corretamente
        preencherFuncaoPorPrograma(programaTexto, funcaoTexto);

        // Preenche os demais campos
        document.getElementById("responsavel").value = responsavelTexto;
        document.getElementById("cpf").value = selecionado.getAttribute('data-cpf') || "";
        document.getElementById("email").value = selecionado.getAttribute('data-email') || "";
        document.getElementById("programa_id").value = selecionado.value;
        document.getElementById("botaoCadastrar").innerText = "Salvar Alterações";
    } else {
        // Reset padrão para novo cadastro
        selectFuncao.innerHTML = '<option value="">Selecione um item</option>';
        selectPrograma.selectedIndex = 0;
        document.getElementById("botaoCadastrar").innerText = "Cadastrar";
    }
}

// === Preencher campo Função com base no programa selecionado ===
function preencherFuncaoPorPrograma(programaNome, funcaoPreSelecionada = "") {
    const selectFuncao = document.getElementById("selectFuncao");
    selectFuncao.innerHTML = '<option value="">Selecione um item</option>';

    const funcao = programaFuncoes[programaNome];
    if (funcao) {
        const opt = document.createElement("option");
        opt.value = funcao;
        opt.textContent = funcao;
        if (funcao === funcaoPreSelecionada) {
            opt.selected = true;
        }
        selectFuncao.appendChild(opt);
    }
}

// === Fechar e resetar formulário ===
function fecharFormulario() {
    document.getElementById("formularioPrograma").style.display = "none";

    ["responsavel", "cpf", "email", "programa_id"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    ["selectPrograma", "selectFuncao"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.selectedIndex = 0;
    });

    document.getElementById("botaoCadastrar").innerText = "Cadastrar";

    const selecionado = document.querySelector('input[name="programaSelecionado"]:checked');
    if (selecionado) selecionado.checked = false;
}

// === Excluir programa com aviso ===
function excluirPrograma() {
    const selecionado = document.querySelector('input[name="programaSelecionado"]:checked');
    if (!selecionado) {
        alert("Selecione um programa para excluir.");
        return;
    }

    const programaId = selecionado.value;

    // Confirmação do usuário
    if (confirm("Deseja realmente excluir este programa?")) {
        // Envia o formulário normalmente, a verificação será feita no backend
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/excluir_programa/${programaId}`;
        document.body.appendChild(form);
        form.submit();
    }
}


// === Redirecionar para Etapa 3 (Ação/PAOE) ===
function mostrarEtapa3() {
    const selecionado = document.querySelector('input[name="programaSelecionado"]:checked');
    if (!selecionado) {
        alert("Selecione um programa para continuar.");
        return;
    }

    const programaId = selecionado.value;
    window.location.href = `/acoes/${programaId}`;
}

// === Validação de formulário ===
function validarFormulario() {
    const programa = document.getElementById("selectPrograma").value;
    const funcao = document.getElementById("selectFuncao").value;
    const responsavel = document.getElementById("responsavel").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!programa || !funcao || !responsavel || !cpf || !email) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    if (!validarCPF(cpf)) {
        alert("CPF inválido.");
        return;
    }

    if (!validarEmail(email)) {
        alert("E-mail inválido.");
        return;
    }

    document.querySelector("#formularioPrograma form").submit();
}

// === Inicialização DOM ===
document.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById("cpf");
    if (cpfInput) {
        cpfInput.addEventListener('input', e => {
            cpfInput.value = formatarCPF(cpfInput.value);
        });
    }

    const selectPrograma = document.getElementById("selectPrograma");
    if (selectPrograma) {
        selectPrograma.addEventListener('change', function () {
            preencherFuncaoPorPrograma(this.value);
        });
    }
});

// === Disponibilizar no escopo global para uso inline ===
window.mostrarFormulario = mostrarFormulario;
window.fecharFormulario = fecharFormulario;
window.excluirPrograma = excluirPrograma;
window.mostrarEtapa3 = mostrarEtapa3;
window.validarFormulario = validarFormulario;

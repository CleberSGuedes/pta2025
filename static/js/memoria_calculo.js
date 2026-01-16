// ===================== memorica_calculo.js
// =====================
// 🔽 DEFINIÇÕES INICIAIS
// =====================

const opcoesGrupo = {
    "3 - DESPESA CORRENTE": [
        "1 - Pessoal e Encargos Sociais",
        "2 - Juros e Encargos da Dívida",
        "3 - Outras Despesas Corrente"
    ],
    "4 - DESPESA CAPITAL": [
        "4 - Investimentos",
        "5 - Inversões Financeiras",
        "6 - Amortização da Dívida",
        // "9 - Reserva de Contingência"
    ]
};

function atualizarGrupoDespesa(grupoSelecionado = "") {
    const categoria = document.getElementById("categoria_economica").value;
    const grupoSelect = document.getElementById("grupo_despesa");
    grupoSelect.innerHTML = '<option value="">Selecione</option>';

    if (opcoesGrupo[categoria]) {
        opcoesGrupo[categoria].forEach(opcao => {
            const option = new Option(opcao, opcao);
            grupoSelect.add(option);
        });
        if (grupoSelecionado) {
            grupoSelect.value = grupoSelecionado;
        }
    }
}

// =====================
// 🔽 AO CARREGAR A PÁGINA
// =====================

document.addEventListener("DOMContentLoaded", () => {
    // Torna os objetos AutoNumeric acessíveis globalmente
    window.autoQuantidade = new AutoNumeric('#quantidade', {
        decimalCharacter: ',',
        digitGroupSeparator: '.',
        decimalPlaces: 2,
        modifyValueOnWheel: false,
        unformatOnSubmit: true
    });

    window.autoValorUnitario = new AutoNumeric('#valor_unitario', {
        decimalCharacter: ',',
        digitGroupSeparator: '.',
        decimalPlaces: 2,
        modifyValueOnWheel: false,
        unformatOnSubmit: true
    });

    window.autoValorTotal = new AutoNumeric('#valor_total', {
        decimalCharacter: ',',
        digitGroupSeparator: '.',
        decimalPlaces: 2,
        readOnly: true,
        watchExternalChanges: true
    });

    function atualizarTotal() {
        const qtd = window.autoQuantidade.getNumber();
        const unit = window.autoValorUnitario.getNumber();
        const total = qtd * unit;
        window.autoValorTotal.set(total || 0);
    }

    document.getElementById("quantidade").addEventListener("input", atualizarTotal);
    document.getElementById("valor_unitario").addEventListener("input", atualizarTotal);

    document.getElementById("categoria_economica").addEventListener("change", () => {
        atualizarGrupoDespesa();
    });

    ['modalidade', 'elemento_despesa', 'subelemento', 'fonte_recursos', 'identificador_uso'].forEach(id => {
        $(`#${id}`).select2({
            placeholder: "Selecione ou digite...",
            allowClear: true,
            width: '100%',
            language: { noResults: () => "Nenhuma opção encontrada" }
        });
    });

    $('#elemento_despesa').on('input', function () {
        const valorElemento = $(this).val().trim();
        const opcoesSub = subelementoMap[valorElemento] || [];
        const $subelemento = $('#subelemento');
        $subelemento.empty();

        if (opcoesSub.length > 0) {
            $subelemento.prop('disabled', false).append(`<option></option>`);
            opcoesSub.forEach(opcao => {
                $subelemento.append(new Option(opcao, opcao));
            });
        } else {
            $subelemento.prop('disabled', true).append(new Option("Sem subelementos", ""));
        }

        $subelemento.trigger("change");
    });

    const idusoSelect = document.getElementById("identificador_uso");
    const acaoPaoeInput = document.getElementById("acao_paoe");
    const acaoPaoe = acaoPaoeInput ? acaoPaoeInput.value.trim() : "";

    if (acaoPaoe && idusoMap[acaoPaoe]) {
        idusoSelect.innerHTML = "";
        idusoMap[acaoPaoe].forEach(opcao => {
            const option = new Option(opcao, opcao);
            idusoSelect.add(option);
        });
    } else {
        idusoSelect.innerHTML = "";
        idusoSelect.add(new Option("Nenhuma opção disponível", "", true, true));
    }

    const campoLegislacao = document.getElementById("campo_legislacao");
    const inputLegislacao = document.getElementById("legislacao");
    const contadorLegislacao = document.getElementById("contador_legislacao");

    $('#identificador_uso').on('change', function () {
        const val = $(this).val();
        if (val === "03 - DESPESAS OBRIGATÓRIAS - DO") {
            campoLegislacao.style.display = "block";
            inputLegislacao.required = true;
        } else {
            campoLegislacao.style.display = "none";
            inputLegislacao.value = "";
            contadorLegislacao.textContent = "(0/250)";
            inputLegislacao.required = false;
        }
    });

    if (inputLegislacao) {
        inputLegislacao.addEventListener("input", function () {
            const length = this.value.length;
            contadorLegislacao.textContent = `(${length}/250)`;
            if (length >= 250) {
                this.value = this.value.substring(0, 250);
            }
        });
    }

    const btnVoltar = document.getElementById("btnVoltarMemoria");
    if (btnVoltar) {
        btnVoltar.addEventListener("click", function () {
            window.fecharFormularioMemoria();
        });
    }

    setTimeout(() => {
        window.fecharFormularioMemoria();
    }, 100);

    const form = document.getElementById("formMemoria");
    if (form) {
        form.addEventListener("submit", function () {
            atualizarTotal(); // garantir valor_total atualizado antes de enviar

            // Obter valores reais e salvar nos campos ocultos
            document.getElementById("quantidade_real").value = window.autoQuantidade.getNumber().toFixed(3);
            document.getElementById("valor_unitario_real").value = window.autoValorUnitario.getNumber().toFixed(3);
            document.getElementById("valor_total_real").value = window.autoValorTotal.getNumber().toFixed(2);
        });
    }

    document.querySelectorAll('input[name="memoriaSelecionada"]').forEach(input => {
        input.checked = false;
    });
});


// =====================
// 🔽 FORMULÁRIO DE MEMÓRIA
// =====================

window.abrirFormularioMemoria = function (alterar = false) {
    const container = document.getElementById("formularioMemoria");
    const form = document.getElementById("formMemoria");
    const campoRegiao = document.getElementById("regiao_planejamento");
    const regiaoPadrao = campoRegiao ? campoRegiao.getAttribute("data-regiao") : "";

    if (!alterar) {
        if (form) form.reset();
        if (container) container.style.display = "block";

        if (campoRegiao && regiaoPadrao) {
            campoRegiao.value = regiaoPadrao;
        }

        ['modalidade', 'elemento_despesa', 'subelemento', 'fonte_recursos', 'identificador_uso'].forEach(id => {
            $(`#${id}`).val(null).trigger("change");
        });

        const campoLegislacao = document.getElementById("campo_legislacao");
        const contadorLegislacao = document.getElementById("contador_legislacao");
        if (campoLegislacao) campoLegislacao.style.display = "none";
        if (contadorLegislacao) contadorLegislacao.textContent = "(0/250)";
        return;
    }

    const selecionado = document.querySelector('input[name="memoriaSelecionada"]:checked');
    if (!selecionado) {
        Swal.fire("Atenção", "Selecione uma memória para alterar.", "info");
        return;
    }

    if (container) container.style.display = "block";

    document.getElementById("memoria_id").value = selecionado.value;
    if (campoRegiao && regiaoPadrao) {
        campoRegiao.value = regiaoPadrao;
    }

    document.getElementById("item_despesa").value = selecionado.dataset.item;
    document.getElementById("unidade_medida").value = selecionado.dataset.unidade;

    // 🟢 Aplicar máscaras formatadas com AutoNumeric
    const qtd = parseFloat(selecionado.dataset.quantidade || 0);
    const unit = parseFloat(selecionado.dataset.valor_unitario || 0);
    const total = parseFloat(selecionado.dataset.total || 0);

    // Limpar campos antes de aplicar AutoNumeric
    document.getElementById("quantidade").value = '';
    document.getElementById("valor_unitario").value = '';
    document.getElementById("valor_total").value = '';

    if (window.autoQuantidade instanceof AutoNumeric) autoQuantidade.set(qtd);
    if (window.autoValorUnitario instanceof AutoNumeric) autoValorUnitario.set(unit);
    if (window.autoValorTotal instanceof AutoNumeric) autoValorTotal.set(total);

    document.getElementById("categoria_economica").value = selecionado.dataset.categoria;
    atualizarGrupoDespesa(selecionado.dataset.grupo);

    $('#modalidade').val(selecionado.dataset.modalidade).trigger("change");

    // ELEMENTO + SUBELEMENTO
    const valorElemento = selecionado.dataset.elemento?.trim();
    const opcoesSub = subelementoMap[valorElemento] || [];
    const $elemento = $('#elemento_despesa');
    const $subelemento = $('#subelemento');

    $elemento.val(valorElemento).trigger("change");
    $subelemento.empty();

    if (opcoesSub.length > 0) {
        $subelemento.prop('disabled', false).append(`<option></option>`);
        opcoesSub.forEach(opcao => {
            $subelemento.append(new Option(opcao, opcao));
        });
    } else {
        $subelemento.prop('disabled', true).append(new Option("Sem subelementos", ""));
    }

    $subelemento.val(selecionado.dataset.subelemento).trigger("change");

    $('#fonte_recursos').val(selecionado.dataset.fonte).trigger("change");

    // IDENTIFICADOR DE USO
    const acaoPaoeInput = document.getElementById("acao_paoe");
    const acaoPaoe = acaoPaoeInput ? acaoPaoeInput.value.trim() : "";
    const $iduso = $('#identificador_uso');
    $iduso.empty();

    if (acaoPaoe && idusoMap[acaoPaoe]) {
        $iduso.append(`<option></option>`);
        idusoMap[acaoPaoe].forEach(opcao => {
            $iduso.append(new Option(opcao, opcao));
        });
    } else {
        $iduso.append(new Option("Nenhuma opção disponível", ""));
    }

    $iduso.val(selecionado.dataset.iduso).trigger("change");

    // LEGISLAÇÃO
    document.getElementById("legislacao").value = selecionado.dataset.legislacao;
    if (selecionado.dataset.iduso === "03 - DESPESAS OBRIGATÓRIAS - DO") {
        const campoLegislacao = document.getElementById("campo_legislacao");
        const contadorLegislacao = document.getElementById("contador_legislacao");
        if (campoLegislacao) campoLegislacao.style.display = "block";
        if (contadorLegislacao) contadorLegislacao.textContent = `(${selecionado.dataset.legislacao.length}/250)`;
        document.getElementById("legislacao").required = true;
    }

    atualizarContadorItem();
};

window.excluirMemoria = function () {
    const selecionado = document.querySelector('input[name="memoriaSelecionada"]:checked');
    if (!selecionado) {
        Swal.fire("Atenção", "Selecione uma memória para excluir.", "info");
        return;
    }

    Swal.fire({
        title: 'Confirmar exclusão',
        text: "Deseja realmente excluir esta memória?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, excluir'
    }).then((result) => {
        if (result.isConfirmed) {
            const memoriaId = selecionado.value;

            fetch(`/excluir_memoria/${memoriaId}`, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Remove a linha da tabela ou recarrega lista, se necessário
                    const linha = selecionado.closest("tr");
                    if (linha) linha.remove();

                    Swal.fire("Excluído!", "A memória foi excluída com sucesso.", "success");

                    // Fecha o formulário, se estiver aberto
                    window.fecharFormularioMemoria();
                } else {
                    return response.text().then(texto => {
                        throw new Error(texto || "Erro ao excluir memória.");
                    });
                }
            })
            .catch(error => {
                Swal.fire("Erro", error.message, "error");
            });
        }
    });
};

window.fecharFormularioMemoria = function () {
    const container = document.getElementById("formularioMemoria");
    const form = document.getElementById("formMemoria");

    if (form) form.reset();
    if (container) container.style.display = "none";

    ['modalidade', 'elemento_despesa', 'subelemento', 'fonte_recursos', 'identificador_uso'].forEach(id => {
        $(`#${id}`).val(null).trigger("change");
    });

    const campoLegislacao = document.getElementById("campo_legislacao");
    const contadorLegislacao = document.getElementById("contador_legislacao");
    if (campoLegislacao) campoLegislacao.style.display = "none";
    if (contadorLegislacao) contadorLegislacao.textContent = "(0/250)";
};

window.atualizarContadorItem = function () {
    const input = document.getElementById("item_despesa");
    const contador = document.getElementById("contador_item");
    contador.textContent = `${input.value.length} / 120 caracteres`;
};

window.addEventListener("beforeunload", function () {
    window.fecharFormularioMemoria();
});

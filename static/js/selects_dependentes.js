// === Mapeamentos ===

const programaFuncoes = {
    "12 - EDUCAÇÃO": ["036 - Apoio administrativo", "533 - Educação 10 Anos", "534 - Infraestrutura Educacional"],
    "28 - ENCARGOS ESPECIAIS": [
        "996 - Operações especiais: outras",
        "998 - Operações especiais: cumprimento de sentenças judiciais"
    ],
    "09 - PREVIDÊNCIA SOCIAL": ["997 - Previdência de inativos e pensionistas do Estado"]
};

const programaSubfuncaoAcoes = {
    "036 - Apoio administrativo": {
        "126 - TECNOLOGIA DA INFORMAÇÃO": ["2009 - Manutenção de ações de informática"],
        "122 - ADMINISTRAÇÃO GERAL": [
            "2010 - Manutenção de órgãos colegiados",
            "2284 - Manutenção do Conselho Estadual de Educação - CEE",
            "4491 - Pagamento de verbas indenizatórias a servidores estaduais"
        ],
        "131 - COMUNICACAO SOCIAL": ["2014 - Publicidade institucional e propaganda"]
    },
    "533 - Educação 10 Anos": {
        "366 - EDUCACAO DE JOVENS E ADULTOS": ["2900 - Desenvolvimento da Educação de Jovens e Adultos"],
        "122 - ADMINISTRAÇÃO GERAL": [
            "2936 - Desenvolvimento das Modalidades de Ensino",
            "4541 - Educação que Protege Meninas"
        ],
        "367 - EDUCACAO ESPECIAL": ["2957 - Desenvolvimento da Educação Especial"],
        "361 - ENSINO FUNDAMENTAL": [
            "4172 - Desenvolvimento do Ensino Fundamental",
            "4538 - Desenvolvimento do Regime de Colaboração - Ensino Fundamental"
        ],
        "362 - ENSINO MEDIO": ["4174 - Desenvolvimento do Ensino Médio"],
        "365 - EDUCACAO INFANTIL": ["4537 - Desenvolvimento do Regime de Colaboração - Educação Infantil"]
    },
    "534 - Infraestrutura Educacional": {
        "366 - EDUCACAO DE JOVENS E ADULTOS": [
            "2895 - Alimentação Escolar da Educação de Jovens e Adultos",
            "4175 - Infraestrutura da Educação de Jovens e Adultos"
        ],
        "367 - EDUCACAO ESPECIAL": [
            "2897 - Alimentação Escolar da Educação Especial",
            "4178 - Infraestrutura da Educação Especial",
            "4179 - Transporte Escolar da Educação Especial"
        ],
        "361 - ENSINO FUNDAMENTAL": [
            "2898 - Alimentação Escolar do Ensino Fundamental",
            "4173 - Infraestrutura do Ensino Fundamental",
            "4181 - Transporte Escolar do Ensino Fundamental",
            "4524 - FMTE - Ensino Fundamental"
        ],
        "362 - ENSINO MEDIO": [
            "2899 - Alimentação Escolar do Ensino Médio",
            "4177 - Infraestrutura do Ensino Médio",
            "4182 - Transporte Escolar do Ensino Médio"
        ],
        "122 - ADMINISTRAÇÃO GERAL": ["4180 - Infraestrutura de Administração e Gestão"],
        "365 - EDUCACAO INFANTIL": ["4525 - FMTE - Educação Infantil"]
    },
    "996 - Operações especiais: outras": {
        "846 - OUTROS ENCARGOS ESPECIAIS": ["8002 - Recolhimento do PIS-PASEP e pagamento do abono"],
        "845 - OUTRAS TRANSFERÊNCIAS": ["8026 - Pagamento de emendas parlamentares impositivas"]
    },
    "997 - Previdência de inativos e pensionistas do Estado": {
        "272 - PREVIDENCIA DO REGIME ESTATUTARIO": [
            "8040 - Recolhimento de encargos e obrigações previdenciárias de inativos e pensionistas do Estado de Mato Grosso"
        ]
    },
    "998 - Operações especiais: cumprimento de sentenças judiciais": {
        "846 - OUTROS ENCARGOS ESPECIAIS": [
            "8003 - Cumprimento de sentenças judiciais transitadas em julgado - Adm. Direta"
        ]
    }
};

// === Funções para preenchimento dinâmico ===

function carregarSubfuncoesPorPrograma(nomePrograma, selectSubfuncao, callback) {
    selectSubfuncao.innerHTML = '<option value="">Selecione uma subfunção</option>';
    const subfuncoes = Object.keys(programaSubfuncaoAcoes[nomePrograma] || {});
    subfuncoes.forEach(subfuncao => {
        const opt = document.createElement("option");
        opt.value = subfuncao;
        opt.textContent = subfuncao;
        selectSubfuncao.appendChild(opt);
    });

    // Executa o callback após o carregamento das opções
    if (typeof callback === "function") {
        callback();
    }
}

function carregarAcoesFiltradas(programaNome, subfuncao, selectAcao, acaoPreSelecionada = "") {
    selectAcao.innerHTML = '<option value="">Selecione uma ação</option>';
    const acoes = programaSubfuncaoAcoes[programaNome]?.[subfuncao] || [];
    acoes.forEach(acao => {
        const opt = document.createElement("option");
        opt.value = acao;
        opt.textContent = acao;
        if (acao === acaoPreSelecionada) {
            opt.selected = true;
        }
        selectAcao.appendChild(opt);
    });
}

// === Expor no escopo global ===
window.carregarSubfuncoesPorPrograma = carregarSubfuncoesPorPrograma;
window.carregarAcoesFiltradas = carregarAcoesFiltradas;
window.programaFuncoes = programaFuncoes;

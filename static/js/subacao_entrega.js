console.log("🟢 JS subacao_entrega.js carregado.");
// alert("✅ JS carregado com sucesso!");

// ✅ Inicializa variável global se ainda não existir
window.municipiosTemp = window.municipiosTemp || [];


// mapeamento da Chave de planejamento
const regioesPlanejamento = [
  "R100", "R200", "R300", "R400", "R500", "R600", "R700",
  "R800", "R900", "R1000", "R1100", "R1200", "R9900"
];
function carregarSelectRegiao() {
  const regiaoSelect = document.querySelector('select[name="regiao"]');
  if (!regiaoSelect) return;
  regiaoSelect.innerHTML = '<option value="">Selecione</option>';
  regioesPlanejamento.forEach(regiao => {
    const opt = document.createElement("option");
    opt.value = regiao;
    opt.textContent = regiao;
    regiaoSelect.appendChild(opt);
  });
}

const subfuncaoUGMap = {
	"036 - Apoio administrativo": {
    "126 - TECNOLOGIA DA INFORMAÇÃO": {"2009": "1"},
    "122 - ADMINISTRAÇÃO GERAL": {
      "2010": "1",
      "2284": "1",
      "4491": "1"
	},
    "131 - COMUNICACAO SOCIAL": {"2014": "1"}
	},
  "533 - Educação 10 Anos": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {"2900": "4"},
    "122 - ADMINISTRAÇÃO GERAL": {
      "2936": "8",
      "4541": "8"
    },
    "367 - EDUCACAO ESPECIAL": {"2957": "5"},
    "361 - ENSINO FUNDAMENTAL":{
      "4172": "2",
      "4538": "9"
    },
    "362 - ENSINO MEDIO": {"4174":"3"},
    "365 - EDUCACAO INFANTIL": {"4537": "10"}
  },
  "534 - Infraestrutura Educacional": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {
		"2895": "4",
	  "4175": "4"
    },
    "367 - EDUCACAO ESPECIAL": {
      "2897": "5",
      "4178": "5",
      "4179":"7"
    },
    "361 - ENSINO FUNDAMENTAL": {
      "2898": "2",
      "4173": "2",
      "4181": "7",	  
      "4524": "9"
    },
    "362 - ENSINO MEDIO": {
      "2899": "3",
      "4177": "3",
      "4182": "7"
    },
    "122 - ADMINISTRAÇÃO GERAL": {"4180": "6"},
    "365 - EDUCACAO INFANTIL": {"4525": "10"}
  },
  "996 - Operações especiais: outras": {
    "846 - OUTROS ENCARGOS ESPECIAIS":{"8002": "1"},
    "845 - OUTRAS TRANSFERÊNCIAS": {"8026": "1"}
  },
  "997 - Previdência de inativos e pensionistas do Estado": {
    "272 - PREVIDENCIA DO REGIME ESTATUTARIO": {"8040": "1"}
  },
  "998 - Operações especiais: cumprimento de sentenças judiciais": {
    "846 - OUTROS ENCARGOS ESPECIAIS": {"8003": "1"}
  }
};

function carregarSubfuncaoUG(programa, subfuncao, paoe) {
  const select = document.querySelector('select[name="subfuncao_ug"]');
  if (!select) return;

  select.innerHTML = '<option value="">Selecione</option>';

  try {
    const paoeCodigo = paoe.split(" - ")[0];
    const ug = subfuncaoUGMap?.[programa]?.[subfuncao]?.[paoeCodigo];
    if (ug) {
      const codSubfuncao = subfuncao.split(" - ")[0].trim();
      const item = `${codSubfuncao}.${ug}`;
      const opt = document.createElement("option");
      opt.value = item;
      opt.textContent = item;
      select.appendChild(opt);
    }
  } catch (e) {
    console.warn("Erro ao carregar Subfunção + UG:", e);
  }
}

const adjMap = {
	"036 - Apoio administrativo": {
    "126 - TECNOLOGIA DA INFORMAÇÃO": {
      "2009 - Manutenção de ações de informática": {
        "1": {
          "Produto exclusivo para ação padronizada": "SAEX"
          }
        }
      },
    "122 - ADMINISTRAÇÃO GERAL": {
      "2010 - Manutenção de órgãos colegiados": {
        "1": {
          "Produto exclusivo para ação padronizada": "GAB"
        }
      },
	      "2284 - Manutenção do Conselho Estadual de Educação - CEE": {
        "1": {
          "Conselho mantido": "GAB"
        }
      },
      "4491 - Pagamento de verbas indenizatórias a servidores estaduais": {
        "1": {
          "Produto exclusivo para ação padronizada": ["SAGP", "SARC"]
        }
      }
    },
    "131 - COMUNICACAO SOCIAL": {
      "2014 - Publicidade institucional e propaganda": {
        "1": {
          "Produto exclusivo para ação padronizada": "GAB"
        }
      }
    }
  },
  "533 - Educação 10 Anos": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {
      "2900 - Desenvolvimento da Educação de Jovens e Adultos": {
        "4": {
          "Avaliação (Avalia MT) desenvolvida": "SAGE",
          "Educação para jovens e adultos (EJA) desenvolvida": ["SAGE", "SARC"],
          "Sistema estruturado de ensino implantado": "SAGE",
          "Línguas estrangeiras desenvolvidas": "SAGE",
          "Projetos pedagógicos integrados implantados": "SAGE",
          "Formação continuada de professores realizada": ["SAGP","SAGE", "SAGR", "SARC"],
          "Acesso e permanência desenvolvido": "SAGR",
          "Materiais escolares disponibilizados": "SAGR",
          "Uniformes escolares disponibilizados": ["SAGR", "SAGE"],
          "Bem-estar escolar desenvolvido": "SAGR"
          }
        }
      },
    "122 - ADMINISTRAÇÃO GERAL": {
      "2936 - Desenvolvimento das Modalidades de Ensino": {
        "8": {
          "Alfabetização desenvolvida": "SARC",
		      "Regime de colaboração desenvolvido": "SARC",  
          "Avaliação (Avalia MT) desenvolvida": ["SAGE", "SARC"],
          "Educação em tempo integral desenvolvida": "SAGE",
          "Educação escolar do campo desenvolvida": "SAGE",
          "Educação escolar indígena desenvolvida": "SAGE",
          "Educação escolar quilombola desenvolvida": "SAGE",
          "Educação especial desenvolvida": "SAGE",
          "Educação para jovens e adultos (EJA) desenvolvida": ["SAGE", "SARC"],
          "Línguas estrangeiras desenvolvidas": "SAGE",
          "Projetos pedagógicos integrados implantados": "SAGE",
          "Sistema estruturado de ensino implantado": "SAGE",
          "Formação continuada de professores realizada": "SAGP",
          "Acesso e permanência desenvolvido": "SAGR",
          "Bem-estar escolar desenvolvido": "SAGR",
          "Escolas militares desenvolvidas": "SAEX"
        }
      },
      "4541 - Educação que Protege Meninas": {
        "8": {
          "Bem-estar escolar desenvolvido": "SAGR",
          "Projetos pedagógicos integrados implantados": "SAGE",
          "Formação continuada de professores realizada": "SAGP",
          "Valorização profissional desenvolvida": "SAGP"
        }
      }
    },
    "367 - EDUCACAO ESPECIAL": {
      "2957 - Desenvolvimento da Educação Especial": {
        "5": {
          "Alfabetização desenvolvida": "SARC",
          "Avaliação (Avalia MT) desenvolvida": "SAGE",
          "Educação especial desenvolvida": "SAGE",
          "Línguas estrangeiras desenvolvidas": "SAGE",
          "Projetos pedagógicos integrados implantados": "SAGE",
          "Sistema estruturado de ensino implantado": "SAGE",
          "Formação continuada de professores realizada": ["SAGP","SAGE", "SAGR", "SARC"],
          "Acesso e permanência desenvolvido": "SAGR",
          "Bem-estar escolar desenvolvido": "SAGR",
          "Materiais escolares disponibilizados": "SAGR",
          "Uniformes escolares disponibilizados": ["SAGR", "SARC"]
        }
      }
    },
    "361 - ENSINO FUNDAMENTAL": {
      "4172 - Desenvolvimento do Ensino Fundamental": {
        "2": {
          "Alfabetização desenvolvida": "SARC",
          "Avaliação (Avalia MT) desenvolvida": "SAGE",
          "Educação em tempo integral desenvolvida": "SAGE",
          "Educação escolar do campo desenvolvida": "SAGE",
          "Educação escolar indígena desenvolvida": "SAGE",
          "Educação escolar quilombola desenvolvida": "SAGE",
          "Línguas estrangeiras desenvolvidas": "SAGE",
          "Projetos pedagógicos integrados implantados": "SAGE",
          "Sistema estruturado de ensino implantado": "SAGE",
          "Formação continuada de professores realizada": ["SAGP","SAGE", "SAGR", "SARC"],
          "Remuneração professores e profissionais da educação com recursos do MDE, Art 70 Lei 9394/1996": "SAGP",
          "Remuneração professores e profissionais da educação, FUNDEB 30%, Arts 26-A, 14.113/20 e 70, 9394/96": "SAGP",
          "Remuneração professores e profissionais da educação, FUNDEB 70%, Art 26, § 1º, II, Lei 14.113/20": "SAGP",
          "Acesso e permanência desenvolvido": "SAGR",
          "Bem-estar escolar desenvolvido": "SAGR",
          "Escolas militares desenvolvidas": "SAEX",
          "Materiais escolares disponibilizados": "SAGR",
          "Uniformes escolares disponibilizados": ["SAGR", "SARC"]
        }
      },
      "4538 - Desenvolvimento do Regime de Colaboração - Ensino Fundamental": {
        "9": {
          "Regime de colaboração desenvolvido": "SARC"
        }
      }
    },
    "362 - ENSINO MEDIO": {
      "4174 - Desenvolvimento do Ensino Médio": {
        "3": {
          "Avaliação (Avalia MT) desenvolvida": "SAGE",
          "Educação em tempo integral desenvolvida": "SAGE",
          "Educação escolar do campo desenvolvida": "SAGE",
          "Educação escolar indígena desenvolvida": "SAGE",
          "Educação escolar quilombola desenvolvida": "SAGE",
          "Línguas estrangeiras desenvolvidas": "SAGE",
          "Novo ensino médio e ensino técnico profissionalizante desenvolvido": "SAGE",
          "Projetos pedagógicos integrados implantados": "SAGE",
          "Sistema estruturado de ensino implantado": "SAGE",
          "Formação continuada de professores realizada": ["SAGP","SAGE", "SAGR", "SARC"],
          "Acesso e permanência desenvolvido": "SAGR",
          "Bem-estar escolar desenvolvido": "SAGR",
          "Escolas militares desenvolvidas": "SAEX",
          "Materiais escolares disponibilizados": "SAGR",
          "Uniformes escolares disponibilizados": ["SAGR", "SARC"]
        }
      }
    },
    "365 - EDUCACAO INFANTIL": {
      "4537 - Desenvolvimento do Regime de Colaboração - Educação Infantil": {
        "10": {
          "Regime de colaboração desenvolvido": "SARC"
        }
      }
    }
  },
  "534 - Infraestrutura Educacional": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {
      "2895 - Alimentação Escolar da Educação de Jovens e Adultos": {
        "4": {
          "Alimentação escolar mantida": ["SAGR", "SARC"],
        }
      },
      "4175 - Infraestrutura da Educação de Jovens e Adultos": {
        "4": {
          "Gestão do patrimônio realizada": ["SAAS", "SAIP"],
          "Tecnologia no ambiente escolar disponibilizada": ["SAGE", "SAEX"],
          "Gestão escolar desenvolvida": "SAGR",
          "Infraestrutura escolar modernizada": "SAIP"
        }
      }
    },
    "367 - EDUCACAO ESPECIAL": {
      "2897 - Alimentação Escolar da Educação Especial": {
        "5": {
          "Alimentação escolar mantida": "SAGR"
        }
      },
      "4178 - Infraestrutura da Educação Especial": {
        "5": {
          "Gestão do patrimônio realizada": ["SAAS", "SAIP"],
          "Tecnologia no ambiente escolar disponibilizada": ["SAGE", "SAEX"],
          "Gestão escolar desenvolvida": "SAGR",
          "Infraestrutura escolar modernizada": "SAIP"
        }
      },
      "4179 - Transporte Escolar da Educação Especial": {
        "7": {
          "Transporte escolar mantido": "SARC"
        }
      }
    },
    "361 - ENSINO FUNDAMENTAL": {
      "2898 - Alimentação Escolar do Ensino Fundamental": {
        "2": {
          "Alimentação escolar mantida": "SAGR"
        }
      },
      "4173 - Infraestrutura do Ensino Fundamental": {
        "2": {
          "Gestão do patrimônio realizada": ["SAAS", "SAIP"],
          "Tecnologia no ambiente escolar disponibilizada": ["SAGE", "SAEX"],
          "Gestão escolar desenvolvida": "SAGR",
          "Infraestrutura escolar modernizada": "SAIP"
        }
      },
      "4181 - Transporte Escolar do Ensino Fundamental": {
        "7": {
          "Transporte escolar mantido": "SARC"
        }
      },	  
      "4524 - FMTE - Ensino Fundamental": {
        "9": {
          "Infraestrutura escolar modernizada": ["SAIP","EPI"],
          "Regime de colaboração desenvolvido": "SAAS"
        }
      }
    },
    "362 - ENSINO MEDIO": {
      "2899 - Alimentação Escolar do Ensino Médio": {
        "3": {
          "Alimentação escolar mantida": "SAGR"
        }
      },
      "4177 - Infraestrutura do Ensino Médio": {
        "3": {
          "Gestão do patrimônio realizada": ["SAAS", "SAIP"],
          "Tecnologia no ambiente escolar disponibilizada": ["SAGE", "SAEX"],
          "Gestão escolar desenvolvida": ["SAGR", "SAGE"],
          "Infraestrutura escolar modernizada": "SAIP"
        }
      },
      "4182 - Transporte Escolar do Ensino Médio": {
        "7": {
          "Transporte escolar mantido": "SARC"
        }
      }
    },
    "122 - ADMINISTRAÇÃO GERAL": {
      "4180 - Infraestrutura de Administração e Gestão": {
        "6": {
          "Gestão integrada desenvolvida": ["GAB", "SAAS", "SAGE", "SAGR"],
          "Gestão do patrimônio realizada": ["SAAS", "SAIP"],
          "Gestão escolar desenvolvida": "SAGR",
          "Gestão estratégica de pessoas implementada": "SAGP",
          "Valorização profissional desenvolvida": ["SAGP", "GAB", "SAAS", "SAEX", "SAIP", "SAGE", "SAGR", "SARC"],
          "Infraestrutura escolar modernizada": ["SAIP", "SAAS"]
        }
      }
    },
    "365 - EDUCACAO INFANTIL": {
      "4525 - FMTE - Educação Infantil": {
        "10": {
          "Infraestrutura escolar modernizada": ["SAIP", "EPI"],
          "Regime de colaboração desenvolvido": "SAAS"
        }
      }
    }
  },
  "996 - Operações especiais: outras": {
    "846 - OUTROS ENCARGOS ESPECIAIS": {
      "8002 - Recolhimento do PIS-PASEP e pagamento do abono": {
        "1": {
          "Produto exclusivo para ação padronizada": "SAAS"
        }
      }
    },
    "845 - OUTRAS TRANSFERÊNCIAS": {
      "8026 - Pagamento de emendas parlamentares impositivas": {
        "1": {
          "Produto exclusivo para ação padronizada": "EPI"
        }
      }
    }
  },
  "997 - Previdência de inativos e pensionistas do Estado": {
    "272 - PREVIDENCIA DO REGIME ESTATUTARIO": {
      "8040 - Recolhimento de encargos e obrigações previdenciárias de inativos e pensionistas do Estado de Mato Grosso": {
        "1": {
          "Produto exclusivo para ação padronizada": "SAGP"
        }
      }
    }
  },
  "998 - Operações especiais: cumprimento de sentenças judiciais": {
    "846 - OUTROS ENCARGOS ESPECIAIS": {
      "8003 - Cumprimento de sentenças judiciais transitadas em julgado - Adm. Direta": {
        "1": {
          "Produto exclusivo para ação padronizada": "SAGP"
        }
      }
    }
  }
};

function normalizarTexto(texto) {
  if (typeof texto !== "string") {
    console.warn("⚠️ Valor passado para normalizarTexto não é string:", texto);
    return "";
  }
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}

function carregarAdj(programa, subfuncao, paoe, ug, produto) {
  const select = document.querySelector('select[name="adj"]');
  if (!select) return;

  select.innerHTML = '<option value="">Selecione</option>';

  try {
    const produtoNormalizado = normalizarTexto(produto);

    console.log("📦 Dados recebidos para carregar ADJ:");
    console.log("Programa:", programa);
    console.log("Subfunção:", subfuncao);
    console.log("PAOE:", paoe);
    console.log("UG:", ug);
    console.log("Produto original:", produto);
    console.log("Produto normalizado:", produtoNormalizado);

    const produtos = adjMap?.[programa]?.[subfuncao]?.[paoe]?.[ug];
    console.log("📦 Produtos encontrados:", produtos);

    if (!produtos) {
      console.warn("⚠️ Produtos não encontrados no mapa para os parâmetros fornecidos.");
      return;
    }

    let adjs = null;

    for (let chave in produtos) {
      const chaveNormalizada = normalizarTexto(chave);
      console.log("🔍 Comparando produto com:", chaveNormalizada);

      if (
        chaveNormalizada === produtoNormalizado ||
        chaveNormalizada.includes(produtoNormalizado) ||
        produtoNormalizado.includes(chaveNormalizada)
      ) {
        adjs = produtos[chave];
        console.log("✅ Match parcial encontrado:", chave, "→", adjs);
        break;
      }
    }

    const listaAdjs = Array.isArray(adjs) ? adjs : adjs ? [adjs] : [];

    if (listaAdjs.length === 0) {
      console.warn("⚠️ Nenhum ADJ encontrado para esse produto.");
    }

    listaAdjs.forEach(adj => {
      const opt = document.createElement("option");
      opt.value = adj;
      opt.textContent = adj;
      select.appendChild(opt);
    });

  } catch (e) {
    console.error("❌ Erro ao carregar ADJ:", e);
  }
}

const macropoliticaMap = {
	"036 - Apoio administrativo": {
    "126 - TECNOLOGIA DA INFORMAÇÃO": {
      "2009 - Manutenção de ações de informática": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAEX": "GESTÃO_INOVAÇÃO"
            }
          }
        }
      },
    "122 - ADMINISTRAÇÃO GERAL": {
      "2010 - Manutenção de órgãos colegiados": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "GAB": "GESTÃO_INOVAÇÃO"
          }
        }
      },
      "2284 - Manutenção do Conselho Estadual de Educação - CEE": {
        "1": {
          "Conselho mantido": {
            "GAB": "GESTÃO_INOVAÇÃO"
          }
        }
      },
      "4491 - Pagamento de verbas indenizatórias a servidores estaduais": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": "VALORIZAÇÃO_PRO",
            "SARC": "VALORIZAÇÃO_PRO"
          }
        }
      }
    },
    "131 - COMUNICACAO SOCIAL": {
      "2014 - Publicidade institucional e propaganda": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "GAB": "GESTÃO_INOVAÇÃO"
          }
        }
      }
    }
  },
  "533 - Educação 10 Anos": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {
      "2900 - Desenvolvimento da Educação de Jovens e Adultos": {
        "4": {
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": "AVALIAÇÃO"
          },
          "Educação para jovens e adultos (EJA) desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID",
            "SARC": "EQUIDADE_DIVERSID"
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Formação continuada de professores realizada": {
            "SAGP": "VALORIZAÇÃO_PRO",
            "SAGE": "VALORIZAÇÃO_PRO",
            "SAGR": "VALORIZAÇÃO_PRO",
            "SARC": "VALORIZAÇÃO_PRO"
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": "ACESSO_E_PERM"
          },
          "Materiais escolares disponibilizados": {
            "SAGR": "ACESSO_E_PERM"
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": "ACESSO_E_PERM",
            "SAGE": "ACESSO_E_PERM"
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": "CULTURA_DE_PAZ"
            }
          }
        }
      },
    "122 - ADMINISTRAÇÃO GERAL": {
      "2936 - Desenvolvimento das Modalidades de Ensino": {
        "8": {
          "Alfabetização desenvolvida": {
            "SARC": "REGIME_COLABORAÇÃO"
          },
		  "Regime de colaboração desenvolvido": {
            "SARC": "REGIME_COLABORAÇÃO"
          },  
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": "AVALIAÇÃO",
		    "SARC": "AVALIAÇÃO"
		  },
          "Educação em tempo integral desenvolvida": {
            "SAGE": "CURRÍCULO_AMPLIADO"
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID"
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID"
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID"
          },
          "Educação especial desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID"
          },
          "Educação para jovens e adultos (EJA) desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID",
            "SARC": "EQUIDADE_DIVERSID"
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Formação continuada de professores realizada": {
            "SAGP": "VALORIZAÇÃO_PRO"
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": "ACESSO_E_PERM"
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": "CULTURA_DE_PAZ"
		   },
          "Escolas militares desenvolvidas": {
            "SAEX": "GESTÃO_INOVAÇÃO"
          }
        }
      },
      "4541 - Educação que Protege Meninas": {
        "8": {
          "Bem-estar escolar desenvolvido": {
            "SAGR": "CULTURA_DE_PAZ"
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Formação continuada de professores realizada": {
            "SAGP": "VALORIZAÇÃO_PRO"
          },
          "Valorização profissional desenvolvida": {
            "SAGP": "VALORIZAÇÃO_PRO"
          }
        }
      }
    },
    "367 - EDUCACAO ESPECIAL": {
      "2957 - Desenvolvimento da Educação Especial": {
        "5": {
          "Alfabetização desenvolvida": {
            "SARC": "REGIME_COLABORAÇÃO"
          },
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": "AVALIAÇÃO"
          },
          "Educação especial desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID"
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Formação continuada de professores realizada": {
            "SAGP": "VALORIZAÇÃO_PRO",
            "SAGE": "VALORIZAÇÃO_PRO",
            "SAGR": "VALORIZAÇÃO_PRO",
            "SARC": "VALORIZAÇÃO_PRO"
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": "ACESSO_E_PERM"
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": "CULTURA_DE_PAZ"
            },
          "Materiais escolares disponibilizados": {
            "SAGR": "ACESSO_E_PERM"
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": "ACESSO_E_PERM",
            "SARC": "ACESSO_E_PERM"
          }
        }
      }
    },
    "361 - ENSINO FUNDAMENTAL": {
      "4172 - Desenvolvimento do Ensino Fundamental": {
        "2": {
          "Alfabetização desenvolvida": {
            "SARC": "REGIME_COLABORAÇÃO"
          },
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": "AVALIAÇÃO"
          },
          "Educação em tempo integral desenvolvida": {
            "SAGE": "CURRÍCULO_AMPLIADO"
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID"
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID"
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID"
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Formação continuada de professores realizada": {
            "SAGP": "VALORIZAÇÃO_PRO",
            "SAGE": "VALORIZAÇÃO_PRO",
            "SAGR": "VALORIZAÇÃO_PRO",
            "SARC": "VALORIZAÇÃO_PRO"
          },
          "Remuneração professores e profissionais da educação com recursos do MDE, Art 70 Lei 9394/1996": {
            "SAGP": "VALORIZAÇÃO_PRO"
          },
          "Remuneração professores e profissionais da educação, FUNDEB 30%, Arts 26-A, 14.113/20 e 70, 9394/96": {
            "SAGP": "VALORIZAÇÃO_PRO"
          },
          "Remuneração professores e profissionais da educação, FUNDEB 70%, Art 26, § 1º, II, Lei 14.113/20": {
            "SAGP": "VALORIZAÇÃO_PRO"
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": "ACESSO_E_PERM"
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": "CULTURA_DE_PAZ"
            },
          "Escolas militares desenvolvidas": {
            "SAEX": "GESTÃO_INOVAÇÃO"
          },
          "Materiais escolares disponibilizados": {
            "SAGR": "ACESSO_E_PERM"
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": "ACESSO_E_PERM",
            "SARC": "ACESSO_E_PERM"
          }
        }
      }
  ,
      "4538 - Desenvolvimento do Regime de Colaboração - Ensino Fundamental": {
        "9": {
          "Regime de colaboração desenvolvido": {
            "SARC": "REGIME_COLABORAÇÃO"
          }
        }
      }
  },
    "362 - ENSINO MEDIO": {
      "4174 - Desenvolvimento do Ensino Médio": {
        "3": {
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": "AVALIAÇÃO"
          },
          "Educação em tempo integral desenvolvida": {
            "SAGE": "CURRÍCULO_AMPLIADO"
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID"
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID"
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": "EQUIDADE_DIVERSID"
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Novo ensino médio e ensino técnico profissionalizante desenvolvido": {
            "SAGE": ["CURRÍCULO_AMPLIADO",
              "DESENV_EDUCACIONAL"]
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": "DESENV_EDUCACIONAL"
          },
          "Formação continuada de professores realizada": {
            "SAGP": "VALORIZAÇÃO_PRO",
            "SAGE": "VALORIZAÇÃO_PRO",
            "SAGR": "VALORIZAÇÃO_PRO",
            "SARC": "VALORIZAÇÃO_PRO"
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": "ACESSO_E_PERM"
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": "CULTURA_DE_PAZ"
            },
          "Escolas militares desenvolvidas": {
            "SAEX": "GESTÃO_INOVAÇÃO"
          },
          "Materiais escolares disponibilizados": {
            "SAGR": "ACESSO_E_PERM"
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": "ACESSO_E_PERM",
            "SARC": "ACESSO_E_PERM"
          }
        }
      }
    },
    "365 - EDUCACAO INFANTIL": {
      "4537 - Desenvolvimento do Regime de Colaboração - Educação Infantil": {
        "10": {
          "Regime de colaboração desenvolvido": {
            "SARC": "REGIME_COLABORAÇÃO"
          }
        }
      }
    }
  },
  "534 - Infraestrutura Educacional": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {
      "2895 - Alimentação Escolar da Educação de Jovens e Adultos": {
        "4": {
          "Alimentação escolar mantida": {
            "SAGR": "ACESSO_E_PERM",
            "SARC": "ACESSO_E_PERM"
          }
        }
      },
      "4175 - Infraestrutura da Educação de Jovens e Adultos": {
        "4": {
          "Gestão do patrimônio realizada": {
            "SAAS": "INFRAESTRUTURA",
            "SAIP": "INFRAESTRUTURA"
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": "CURRÍCULO_AMPLIADO",
            "SAEX": "CURRÍCULO_AMPLIADO"
          },
          "Gestão escolar desenvolvida": {
            "SAGR": "GESTÃO_INOVAÇÃO"
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": "INFRAESTRUTURA"
          }
        }
      }
    },
    "367 - EDUCACAO ESPECIAL": {
      "2897 - Alimentação Escolar da Educação Especial": {
        "5": {
          "Alimentação escolar mantida": {
            "SAGR": "ACESSO_E_PERM"
          }
        }
      },
      "4178 - Infraestrutura da Educação Especial": {
        "5": {
          "Gestão do patrimônio realizada": {
            "SAAS": "INFRAESTRUTURA",
            "SAIP": "INFRAESTRUTURA"
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": "CURRÍCULO_AMPLIADO",
            "SAEX": "CURRÍCULO_AMPLIADO"
          },
          "Gestão escolar desenvolvida": {
            "SAGR": "GESTÃO_INOVAÇÃO"
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": "INFRAESTRUTURA"
          }
        }
      },
      "4179 - Transporte Escolar da Educação Especial": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": "REGIME_COLABORAÇÃO"
          }
        }
      }
    },
    "361 - ENSINO FUNDAMENTAL": {
      "2898 - Alimentação Escolar do Ensino Fundamental": {
        "2": {
          "Alimentação escolar mantida": {
            "SAGR": "ACESSO_E_PERM"
          }
        }
      },
      "4173 - Infraestrutura do Ensino Fundamental": {
        "2": {
          "Gestão do patrimônio realizada": {
            "SAAS": "INFRAESTRUTURA",
            "SAIP": "INFRAESTRUTURA"
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": "CURRÍCULO_AMPLIADO",
            "SAEX": "CURRÍCULO_AMPLIADO"
          },
          "Gestão escolar desenvolvida": {
            "SAGR": "GESTÃO_INOVAÇÃO"
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": "INFRAESTRUTURA"
          }
        }
      },
      "4181 - Transporte Escolar do Ensino Fundamental": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": "REGIME_COLABORAÇÃO"
          }
        }
      },	  
      "4524 - FMTE - Ensino Fundamental": {
        "9": {
          "Infraestrutura escolar modernizada": {
            "SAIP": "INFRAESTRUTURA",
            "EPI": "EPI"
          },
          "Regime de colaboração desenvolvido": {
            "SAAS": "REGIME_COLABORAÇÃO"
          }
        }
      }
    },
    "362 - ENSINO MEDIO": {
      "2899 - Alimentação Escolar do Ensino Médio": {
        "3": {
          "Alimentação escolar mantida": {
            "SAGR": "ACESSO_E_PERM"
          }
        }
      },
      "4177 - Infraestrutura do Ensino Médio": {
        "3": {
          "Gestão do patrimônio realizada": {
            "SAAS": "INFRAESTRUTURA",
            "SAIP": "INFRAESTRUTURA"
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": "CURRÍCULO_AMPLIADO",
            "SAEX": "CURRÍCULO_AMPLIADO"
          },
          "Gestão escolar desenvolvida": {
            "SAGR": "GESTÃO_INOVAÇÃO",
            "SAGE": "GESTÃO_INOVAÇÃO"
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": "INFRAESTRUTURA"
          }
        }
      },
      "4182 - Transporte Escolar do Ensino Médio": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": "REGIME_COLABORAÇÃO"
          }
        }
      }
    },
    "122 - ADMINISTRAÇÃO GERAL": {
      "4180 - Infraestrutura de Administração e Gestão": {
        "6": {
          "Gestão integrada desenvolvida": {
            "GAB": "GESTÃO_INOVAÇÃO",
            "SAAS": "GESTÃO_INOVAÇÃO",
            "SAGE": "GESTÃO_INOVAÇÃO",
            "SAGR": "GESTÃO_INOVAÇÃO"
          },
          "Gestão do patrimônio realizada": {
            "SAAS": "INFRAESTRUTURA",
            "SAIP": "INFRAESTRUTURA"
          },
          "Gestão escolar desenvolvida": { 
            "SAGR": "GESTÃO_INOVAÇÃO"
          },
          "Gestão estratégica de pessoas implementada": {
            "SAGP": "VALORIZAÇÃO_PRO"
          },
          "Valorização profissional desenvolvida": {
            "SAGP": "VALORIZAÇÃO_PRO",
            "GAB": "VALORIZAÇÃO_PRO",
            "SAAS": "VALORIZAÇÃO_PRO",
            "SAEX": "VALORIZAÇÃO_PRO",
            "SAIP": "VALORIZAÇÃO_PRO",
            "SAGE": "VALORIZAÇÃO_PRO",
            "SAGR": "VALORIZAÇÃO_PRO",
            "SARC": "VALORIZAÇÃO_PRO"
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": "INFRAESTRUTURA",
            "SAAS": "INFRAESTRUTURA"
          }
        }
      }
    },
    "365 - EDUCACAO INFANTIL": {
      "4525 - FMTE - Educação Infantil": {
        "10": {
          "Infraestrutura escolar modernizada": {
            "SAIP": "INFRAESTRUTURA",
            "EPI": "EPI"
          },
          "Regime de colaboração desenvolvido": {
            "SAAS": "REGIME_COLABORAÇÃO"
          }
        }
      }
    }
  },
  "996 - Operações especiais: outras": {
    "846 - OUTROS ENCARGOS ESPECIAIS": {
      "8002 - Recolhimento do PIS-PASEP e pagamento do abono": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAAS": "GESTÃO_INOVAÇÃO"
          }
        }
      }
    },
    "845 - OUTRAS TRANSFERÊNCIAS": {
      "8026 - Pagamento de emendas parlamentares impositivas": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "EPI": "EPI"
          }
        }
      }
    }
  },
  "997 - Previdência de inativos e pensionistas do Estado": {
    "272 - PREVIDENCIA DO REGIME ESTATUTARIO": {
      "8040 - Recolhimento de encargos e obrigações previdenciárias de inativos e pensionistas do Estado de Mato Grosso": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": "VALORIZAÇÃO_PRO"
          }
        }
      }
    }
  },
  "998 - Operações especiais: cumprimento de sentenças judiciais": {
    "846 - OUTROS ENCARGOS ESPECIAIS": {
      "8003 - Cumprimento de sentenças judiciais transitadas em julgado - Adm. Direta": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": "VALORIZAÇÃO_PRO"
          }
        }
      }
    }
  }
};

function carregarMacropolitica(programa, subfuncao, paoe, ug, produto, adj) {
  const select = document.querySelector('select[name="macropolitica"]');
  if (!select) return;

  select.innerHTML = '<option value="">Selecione</option>';

  try {
    const produtoNormalizado = normalizarTexto(produto);
    const adjNormalizado = normalizarTexto(adj);
    const paoeCompleto = paoe.trim();

    console.log("📦 Dados recebidos para carregar MACROPOLÍTICA:");
    console.log("Programa:", programa);
    console.log("Subfunção:", subfuncao);
    console.log("PAOE:", paoeCompleto);
    console.log("UG:", ug);
    console.log("Produto:", produto);
    console.log("ADJ:", adj);

    const produtoMap = macropoliticaMap?.[programa]?.[subfuncao]?.[paoeCompleto]?.[ug];
    if (!produtoMap) {
      console.warn("⚠️ Caminho até UG não encontrado no macropoliticaMap.");
      return;
    }

    let macros = null;

    for (const chaveProduto in produtoMap) {
      const chaveNormalizada = normalizarTexto(chaveProduto);
      if (
        chaveNormalizada === produtoNormalizado ||
        chaveNormalizada.includes(produtoNormalizado) ||
        produtoNormalizado.includes(chaveNormalizada)
      ) {
        const adjMap = produtoMap[chaveProduto];
        for (const adjChave in adjMap) {
          const adjChaveNormalizada = normalizarTexto(adjChave);
          if (
            adjChaveNormalizada === adjNormalizado ||
            adjChaveNormalizada.includes(adjNormalizado) ||
            adjNormalizado.includes(adjChaveNormalizada)
          ) {
            macros = adjMap[adjChave];
            break;
          }
        }
        if (macros) break;
      }
    }
    let lista = [];
    if (macros) {
      if (typeof macros === "string") {
        lista = [macros];
      } else if (typeof macros === "object") {
        for (const sigla in macros) {
          const valor = macros[sigla];
          if (Array.isArray(valor)) {
            lista.push(...valor);
          } else if (typeof valor === "string") {
            lista.push(valor);
          }
        }
      }

      lista = [...new Set(lista)];
    }


    if (lista.length === 0) {
      console.warn("⚠️ Nenhuma Macropolítica encontrada para os dados fornecidos.");
    }

    lista.forEach(mp => {
      const opt = document.createElement("option");
      opt.value = mp;
      opt.textContent = mp;
      select.appendChild(opt);
    });

    console.log("✅ Macropolítica carregada:", lista);
  } catch (e) {
    console.error("❌ Erro ao carregar Macropolítica:", e);
  }
}

const pilarMap = {
	"036 - Apoio administrativo": {
    "126 - TECNOLOGIA DA INFORMAÇÃO": {
      "2009 - Manutenção de ações de informática": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
              }
            }
          }
        }
      },
    "122 - ADMINISTRAÇÃO GERAL": {
      "2010 - Manutenção de órgãos colegiados": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            }
          }
        }
      },
      "2284 - Manutenção do Conselho Estadual de Educação - CEE": {
        "1": {
          "Conselho mantido": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            }
          }
        }
      },
      "4491 - Pagamento de verbas indenizatórias a servidores estaduais": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          }
        }
      }
      },
    "131 - COMUNICACAO SOCIAL": {
      "2014 - Publicidade institucional e propaganda": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            }
          }
        }
      }
    }
  },
  "533 - Educação 10 Anos": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {
      "2900 - Desenvolvimento da Educação de Jovens e Adultos": {
        "4": {
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": "P_IMPACTO_"
            }
          },
          "Educação para jovens e adultos (EJA) desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            },
            "SARC": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_IMPACTO_"
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_IMPACTO_"
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_TECNOLOGIA_"
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            },
            "SAGE": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": "P_EQUIDADE_"
              }
            }
          }
        }
      },
    "122 - ADMINISTRAÇÃO GERAL": {
      "2936 - Desenvolvimento das Modalidades de Ensino": {
        "8": {
          "Alfabetização desenvolvida": {
            "SARC": {
              "REGIME_COLABORAÇÃO": "P_IMPACTO_"
            }
          },
		  "Regime de colaboração desenvolvido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": "P_GESTÃO_"
            }
          },  
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": "P_IMPACTO_"
            },
            "SARC": {
              "AVALIAÇÃO": "P_IMPACTO_"
            }
          },
          "Educação em tempo integral desenvolvida": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": "P_IMPACTO_"
            }
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Educação especial desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Educação para jovens e adultos (EJA) desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            },
            "SARC": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_IMPACTO_"
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_TECNOLOGIA_"
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_IMPACTO_"
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": "P_EQUIDADE_"
              }
		   },
          "Escolas militares desenvolvidas": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": "P_IMPACTO_"
            }
          }
        }
      },
      "4541 - Educação que Protege Meninas": {
        "8": {
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": "P_EQUIDADE_"
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_TECNOLOGIA_"
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          },
          "Valorização profissional desenvolvida": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          }
        }
      }
    },
    "367 - EDUCACAO ESPECIAL": {
      "2957 - Desenvolvimento da Educação Especial": {
        "5": {
          "Alfabetização desenvolvida": {
            "SARC": {
              "REGIME_COLABORAÇÃO": "P_IMPACTO_"
            }
          },
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": "P_IMPACTO_"
            }
          },
          "Educação especial desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_IMPACTO_"
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_TECNOLOGIA_"
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_IMPACTO_"
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": "P_EQUIDADE_"
              }
            },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            },
            "SARC": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          }
        }
      }
    },
    "361 - ENSINO FUNDAMENTAL": {
      "4172 - Desenvolvimento do Ensino Fundamental": {
        "2": {
          "Alfabetização desenvolvida": {
            "SARC": {
              "REGIME_COLABORAÇÃO": "P_IMPACTO_"
            }
          },
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": "P_IMPACTO_"
            }
          },
          "Educação em tempo integral desenvolvida": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": "P_IMPACTO_"
            }
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_IMPACTO_"
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": ["P_IMPACTO_", "P_TECNOLOGIA_"]
			      }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_IMPACTO_"
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          },
          "Remuneração professores e profissionais da educação com recursos do MDE, Art 70 Lei 9394/1996": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          },
          "Remuneração professores e profissionais da educação, FUNDEB 30%, Arts 26-A, 14.113/20 e 70, 9394/96": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          },
          "Remuneração professores e profissionais da educação, FUNDEB 70%, Art 26, § 1º, II, Lei 14.113/20": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": "P_EQUIDADE_"
              }
            },
          "Escolas militares desenvolvidas": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": "P_IMPACTO_"
            }
          },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            },
            "SARC": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          }
        }
      }
  ,
      "4538 - Desenvolvimento do Regime de Colaboração - Ensino Fundamental": {
        "9": {
          "Regime de colaboração desenvolvido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": "P_GESTÃO_"
            }
          }
        }
      }
  },
    "362 - ENSINO MEDIO": {
      "4174 - Desenvolvimento do Ensino Médio": {
        "3": {
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": "P_IMPACTO_"
            }
          },
          "Educação em tempo integral desenvolvida": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": "P_IMPACTO_"
            }
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": "P_EQUIDADE_"
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_IMPACTO_"
            }
          },
          "Novo ensino médio e ensino técnico profissionalizante desenvolvido": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": ["P_IMPACTO_"],
              "DESENV_EDUCACIONAL": ["P_IMPACTO_"]
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_TECNOLOGIA_"
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": "P_IMPACTO_"
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": "P_EQUIDADE_"
              }
            },
          "Escolas militares desenvolvidas": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": "P_IMPACTO_"
            }
          },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            },
            "SARC": {
              "ACESSO_E_PERM": "P_EQUIDADE_"
            }
          }
        }
      }
    },
    "365 - EDUCACAO INFANTIL": {
      "4537 - Desenvolvimento do Regime de Colaboração - Educação Infantil": {
        "10": {
          "Regime de colaboração desenvolvido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": "P_GESTÃO_"
            }
          }
        }
      }
    }
  },
  "534 - Infraestrutura Educacional": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {
      "2895 - Alimentação Escolar da Educação de Jovens e Adultos": {
        "4": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM": "P_INFRAESTR_"
            },
            "SARC": {
              "ACESSO_E_PERM": "P_INFRAESTR_"
            }
          }
        }
      },
      "4175 - Infraestrutura da Educação de Jovens e Adultos": {
        "4": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            },
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            }
          }
        }
      }
    },
    "367 - EDUCACAO ESPECIAL": {
      "2897 - Alimentação Escolar da Educação Especial": {
        "5": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM": "P_INFRAESTR_"
            }
          }
        }
      },
      "4178 - Infraestrutura da Educação Especial": {
        "5": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            },
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            }
          }
        }
      },
      "4179 - Transporte Escolar da Educação Especial": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": "P_INFRAESTR_"
            }
          }
        }
      }
    },
    "361 - ENSINO FUNDAMENTAL": {
      "2898 - Alimentação Escolar do Ensino Fundamental": {
        "2": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM": "P_INFRAESTR_"
            }
          }
        }
      },
      "4173 - Infraestrutura do Ensino Fundamental": {
        "2": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            },
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            }
          }
        }
      },
      "4181 - Transporte Escolar do Ensino Fundamental": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": "P_INFRAESTR_"
            }
          }
        }
      },	  
      "4524 - FMTE - Ensino Fundamental": {
        "9": {
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            },
            "EPI": {
              "EPI": "EPI"
            }
          },
          "Regime de colaboração desenvolvido": {
            "SAAS": {
              "REGIME_COLABORAÇÃO": "P_GESTÃO_"
            }
          }
        }
      }
    },
    "362 - ENSINO MEDIO": {
      "2899 - Alimentação Escolar do Ensino Médio": {
        "3": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM":  "P_INFRAESTR_"
            }
          }
        }
      },
      "4177 - Infraestrutura do Ensino Médio": {
        "3": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            },
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            },
            "SAGE": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            }
          }
        }
      },
      "4182 - Transporte Escolar do Ensino Médio": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": "P_INFRAESTR_"
            }
          }
        }
      }
    },
    "122 - ADMINISTRAÇÃO GERAL": {
      "4180 - Infraestrutura de Administração e Gestão": {
        "6": {
          "Gestão integrada desenvolvida": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            },
            "SAAS": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            },
            "SAGE": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            },
            "SAGR": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            }
          },
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            },
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            }
          },
          "Gestão escolar desenvolvida": { 
            "SAGR": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            }
          },
          "Gestão estratégica de pessoas implementada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          },
          "Valorização profissional desenvolvida": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "GAB": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAAS": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAEX": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAIP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            },
            "SAEC": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            },
            "SAAS": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            }
          }
        }
      }
    },
    "365 - EDUCACAO INFANTIL": {
      "4525 - FMTE - Educação Infantil": {
        "10": {
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": "P_INFRAESTR_"
            },
            "EPI": {
              "EPI": "EPI"
            }
          },
          "Regime de colaboração desenvolvido": {
            "SAAS": {
              "REGIME_COLABORAÇÃO": "P_GESTÃO_"
            }
          }
        }
      }
    }
  },
  "996 - Operações especiais: outras": {
    "846 - OUTROS ENCARGOS ESPECIAIS": {
      "8002 - Recolhimento do PIS-PASEP e pagamento do abono": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAAS": {
              "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
            }
          }
        }
      }
    },
    "845 - OUTRAS TRANSFERÊNCIAS": {
      "8026 - Pagamento de emendas parlamentares impositivas": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "EPI": {
              "EPI": "EPI"
            }
          }
        }
      }
    }
  },
  "997 - Previdência de inativos e pensionistas do Estado": {
    "272 - PREVIDENCIA DO REGIME ESTATUTARIO": {
      "8040 - Recolhimento de encargos e obrigações previdenciárias de inativos e pensionistas do Estado de Mato Grosso": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          }
        }
      }
    }
  },
  "998 - Operações especiais: cumprimento de sentenças judiciais": {
    "846 - OUTROS ENCARGOS ESPECIAIS": {
      "8003 - Cumprimento de sentenças judiciais transitadas em julgado - Adm. Direta": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
            }
          }
        }
      }
    }
  }
};

function carregarPilar(programa, subfuncao, paoe, ug, produto, adj, macropolitica) {
  const select = document.querySelector('select[name="pilar"]');
  if (!select) return;

  select.innerHTML = '<option value="">Selecione</option>';

  try {
    const paoeCompleto = paoe.trim();
    const produtoNormalizado = normalizarTexto(produto);
    const adjNormalizado = normalizarTexto(adj);
    const macroNormalizado = normalizarTexto(macropolitica);

    console.log("📦 Dados recebidos para carregar PILAR:");
    console.log("Programa:", programa);
    console.log("Subfunção:", subfuncao);
    console.log("PAOE:", paoeCompleto);
    console.log("UG:", ug);
    console.log("Produto:", produto);
    console.log("ADJ:", adj);
    console.log("Macropolítica:", macropolitica);

    const produtoMap = pilarMap?.[programa]?.[subfuncao]?.[paoeCompleto]?.[ug];
    if (!produtoMap) {
      console.warn("⚠️ Caminho até UG não encontrado no pilarMap.");
      return;
    }

    let pilarEncontrado = [];

    for (let nomeProduto in produtoMap) {
      const nomeProdutoNorm = normalizarTexto(nomeProduto);
      if (
        nomeProdutoNorm === produtoNormalizado ||
        nomeProdutoNorm.includes(produtoNormalizado) ||
        produtoNormalizado.includes(nomeProdutoNorm)
      ) {
        const adjs = produtoMap[nomeProduto];
        for (let adjChave in adjs) {
          const adjChaveNorm = normalizarTexto(adjChave);
          if (adjChaveNorm === adjNormalizado) {
            const macroMap = adjs[adjChave];
            for (let macroChave in macroMap) {
              const macroNorm = normalizarTexto(macroChave);
              if (macroNorm === macroNormalizado) {
                const p = macroMap[macroChave];
                if (Array.isArray(p)) {
                  pilarEncontrado.push(...p);
                } else {
                  pilarEncontrado.push(p);
                }
              }
            }
          }
        }
      }
    }

    if (pilarEncontrado.length === 0) {
      console.warn("⚠️ Nenhum Pilar encontrado para os parâmetros fornecidos.");
      return;
    }

    const unicos = [...new Set(pilarEncontrado)];
    unicos.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p;
      select.appendChild(opt);
    });

    console.log("✅ Pilar carregado:", unicos);
  } catch (e) {
    console.error("❌ Erro ao carregar PILAR:", e);
  }
}

const eixoMap = {
  "036 - Apoio administrativo": {
    "126 - TECNOLOGIA DA INFORMAÇÃO": {
      "2009 - Manutenção de ações de informática": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_INTEGRADA"
                }
              }
            }
          }
        }
      },
    "122 - ADMINISTRAÇÃO GERAL": {
      "2010 - Manutenção de órgãos colegiados": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_INTEGRADA"
              }
            }
          }
        }
      },
      "2284 - Manutenção do Conselho Estadual de Educação - CEE": {
        "1": {
          "Conselho mantido": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_INTEGRADA"
              }
            }
          }
        }
      },
      "4491 - Pagamento de verbas indenizatórias a servidores estaduais": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_GESTÃO_DE_PESSOAS"
              }
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_GESTÃO_DE_PESSOAS"
              }
            }
          }
        }
      }
      },
    "131 - COMUNICACAO SOCIAL": {
      "2014 - Publicidade institucional e propaganda": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_INTEGRADA"
              }
            }
          }
        }
      }
    }
  },
  "533 - Educação 10 Anos": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {
      "2900 - Desenvolvimento da Educação de Jovens e Adultos": {
        "4": {
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": "E_AVALIAÇÃO"
              }
            }
          },
          "Educação para jovens e adultos (EJA) desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": ["E_EDUC_EJA", "E_IMIGRANTES"]
              }
            },
            "SARC": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_EJA"
              }
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": "E_SISTEMA_ESTRUT"
              }
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": "E_LÍNG_ESTRANGEIRAS"
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": "E_PROJ_PED_INTEGRAD"
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_BUSCA_ATIVA"
              }
            }
          },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            },
            "SAGE": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_":
                  ["E_BEM-ESTAR_ESCOLAR",
                  "E_CULTURA_DE_PAZ"]
              }
            }
          }
        }
      }
    },
    "122 - ADMINISTRAÇÃO GERAL": {
      "2936 - Desenvolvimento das Modalidades de Ensino": {
        "8": {
          "Alfabetização desenvolvida": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_IMPACTO_": "E_ALFABETIZAÇÃO"
              }
            }
          },
		  "Regime de colaboração desenvolvido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_GESTÃO_": "E_REGIME_COLABORAÇÃO"
              }
            }
          },  
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": "E_AVALIAÇÃO"
              }
            },
            "SARC": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": "E_AVALIAÇÃO"
              }
            }
          },
          "Educação em tempo integral desenvolvida": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_IMPACTO_": "E_ESCOLA_TEMPO_INTEG"
              }
            }
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_CAMPO"
              }
            }
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_INDÍGENA"
              }
            }
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_QUILOMBOLA"
              }
            }
          },
          "Educação especial desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_ESPECIAL"
              }
            }
          },
          "Educação para jovens e adultos (EJA) desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_EJA"
              }
            },
            "SARC": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_EJA"
              }
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": "E_LÍNG_ESTRANGEIRAS"
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": "E_PROJ_PED_INTEGRAD"
              }
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": "E_SISTEMA_ESTRUT"
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_BUSCA_ATIVA"
              }
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_": [
                  "E_BEM-ESTAR_ESCOLAR",
                  "E_CULTURA_DE_PAZ"]
              }
            }
          },
          "Escolas militares desenvolvidas": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": {
                "P_IMPACTO_": "E_ESCOLAS_MILITARES"
              }
            }
          }
        }
      },
      "4541 - Educação que Protege Meninas": {
        "8": {
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_": "E_BEM-ESTAR_ESCOLAR"
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": "E_PROJ_PED_INTEGRAD"
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            }
          },
          "Valorização profissional desenvolvida": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            }
          }
        }
      }
    },
    "367 - EDUCACAO ESPECIAL": {
      "2957 - Desenvolvimento da Educação Especial": {
        "5": {
          "Alfabetização desenvolvida": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_IMPACTO_": "E_ALFABETIZAÇÃO"
              }
            }
          },
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": "E_AVALIAÇÃO"
              }
            }
          },
          "Educação especial desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": ["E_EDUC_ESPECIAL", "E_DISTÚRB_APRENDIZ",  "E_ALTAS_HABILIDADES"]
              }
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": "E_LÍNG_ESTRANGEIRAS"
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": "E_PROJ_PED_INTEGRAD"
              }
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": "E_SISTEMA_ESTRUT"
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_BUSCA_ATIVA"
              }
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_": [
                  "E_BEM-ESTAR_ESCOLAR",
                  "E_CULTURA_DE_PAZ"]
              }
            }
          },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            },
            "SARC": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            }
          }
        }
      }
    },
    "361 - ENSINO FUNDAMENTAL": {
      "4172 - Desenvolvimento do Ensino Fundamental": {
        "2": {
          "Alfabetização desenvolvida": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_IMPACTO_": "E_ALFABETIZAÇÃO"
              }
            }
          },
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": "E_AVALIAÇÃO"
              }
            }
          },
          "Educação em tempo integral desenvolvida": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_IMPACTO_": "E_ESCOLA_TEMPO_INTEG"
              }
            }
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_CAMPO"
              }
            }
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_INDÍGENA"
              }
            }
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_QUILOMBOLA"
              }
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": "E_LÍNG_ESTRANGEIRAS"
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": "E_PROJ_PED_INTEGRAD",
                "P_IMPACTO_": "E_ENSINO_FUNDAMENTAL"
			        }
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": "E_SISTEMA_ESTRUT"
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            }
          },
          "Remuneração professores e profissionais da educação com recursos do MDE, Art 70 Lei 9394/1996": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            }
          },
          "Remuneração professores e profissionais da educação, FUNDEB 30%, Arts 26-A, 14.113/20 e 70, 9394/96": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            }
          },
          "Remuneração professores e profissionais da educação, FUNDEB 70%, Art 26, § 1º, II, Lei 14.113/20": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_BUSCA_ATIVA"
              }
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_": [
                  "E_BEM-ESTAR_ESCOLAR",
                  "E_CULTURA_DE_PAZ"]
              }
            }
          },
          "Escolas militares desenvolvidas": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": {
                "P_IMPACTO_": "E_ESCOLAS_MILITARES"
              }
            }
          },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            },
            "SARC": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            }
          }
        }
      }
  ,
      "4538 - Desenvolvimento do Regime de Colaboração - Ensino Fundamental": {
        "9": {
          "Regime de colaboração desenvolvido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_GESTÃO_": "E_REGIME_COLABORAÇÃO"
              }
            }
          }
        }
      }
  },
    "362 - ENSINO MEDIO": {
      "4174 - Desenvolvimento do Ensino Médio": {
        "3": {
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": "E_AVALIAÇÃO"
              }
            }
          },
          "Educação em tempo integral desenvolvida": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_IMPACTO_": "E_ESCOLA_TEMPO_INTEG"
              }
            }
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_CAMPO"
              }
            }
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_INDÍGENA"
              }
            }
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": "E_EDUC_QUILOMBOLA"
              }
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": "E_LÍNG_ESTRANGEIRAS"
              }
            }
          },
          "Novo ensino médio e ensino técnico profissionalizante desenvolvido": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_IMPACTO_": "E_EDUC_PROF_TEC"
              },
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": "E_ENSINO_MÉDIO"
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": "E_PROJ_PED_INTEGRAD"
              }
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": "E_SISTEMA_ESTRUT"
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_FORMAÇÃO_DE_PROF"
              }
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_BUSCA_ATIVA"
              }
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_": [
                  "E_BEM-ESTAR_ESCOLAR",
                  "E_CULTURA_DE_PAZ"]
              }
            }
          },
          "Escolas militares desenvolvidas": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": {
                "P_IMPACTO_": "E_ESCOLAS_MILITARES"
              }
            }
          },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            },
            "SARC": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
              }
            }
          }
        }
      }
    },
    "365 - EDUCACAO INFANTIL": {
      "4537 - Desenvolvimento do Regime de Colaboração - Educação Infantil": {
        "10": {
          "Regime de colaboração desenvolvido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_GESTÃO_": "E_REGIME_COLABORAÇÃO"
              }
            }
          }
        }
      }
    }
  },
  "534 - Infraestrutura Educacional": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {
      "2895 - Alimentação Escolar da Educação de Jovens e Adultos": {
        "4": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_INFRAESTR_": "E_ALIMENTAÇÃO_"
              }
            },
            "SARC": {
              "ACESSO_E_PERM": {
                "P_INFRAESTR_": "E_ALIMENTAÇÃO_"
              }
            }
          }
        }
      },
      "4175 - Infraestrutura da Educação de Jovens e Adultos": {
        "4": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_GESTÃO_DO_PATRIM"
              }
            },
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_GESTÃO_DO_PATRIM"
              }
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": "E_TECNOL_AMB_ESCOLAR"
              }
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": "E_TECNOL_AMB_ESCOLAR"
              }
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_ESCOLAR"
              }
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_INFRAESTRUTURA_ESC"
              }
            }
          }
        }
      }
    },
    "367 - EDUCACAO ESPECIAL": {
      "2897 - Alimentação Escolar da Educação Especial": {
        "5": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_INFRAESTR_": "E_ALIMENTAÇÃO_"
              }
            }
          }
        }
      },
      "4178 - Infraestrutura da Educação Especial": {
        "5": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_GESTÃO_DO_PATRIM"
              }
            },
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_GESTÃO_DO_PATRIM"
              }
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": "E_TECNOL_AMB_ESCOLAR"
              }
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": "E_TECNOL_AMB_ESCOLAR"
              }
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_ESCOLAR"
              }
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_INFRAESTRUTURA_ESC"
              }
            }
          }
        }
      },
      "4179 - Transporte Escolar da Educação Especial": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_INFRAESTR_": "E_TRANSPORTE_ESCOLAR"
              }
            }
          }
        }
      }
    },
    "361 - ENSINO FUNDAMENTAL": {
      "2898 - Alimentação Escolar do Ensino Fundamental": {
        "2": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_INFRAESTR_": "E_ALIMENTAÇÃO_"
              }
            }
          }
        }
      },
      "4173 - Infraestrutura do Ensino Fundamental": {
        "2": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_GESTÃO_DO_PATRIM"
              }
            },
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_GESTÃO_DO_PATRIM"
              }
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": "E_TECNOL_AMB_ESCOLAR"
              }
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": "E_TECNOL_AMB_ESCOLAR"
              }
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_ESCOLAR"
              }
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_INFRAESTRUTURA_ESC"
              }
            }
          }
        }
      },
      "4181 - Transporte Escolar do Ensino Fundamental": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_INFRAESTR_": "E_TRANSPORTE_ESCOLAR"
              }
            }
          }
        }
      },	  
      "4524 - FMTE - Ensino Fundamental": {
        "9": {
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_INFRAESTRUTURA_ESC"
              }
            },
            "EPI": {
              "EPI": {
                "EPI": "EPI"
              }
            }
          },
          "Regime de colaboração desenvolvido": {
            "SAAS": {
              "REGIME_COLABORAÇÃO": {
                "P_GESTÃO_": "E_REGIME_COLABORAÇÃO"
              }
            }
          }
        }
      }
    },
    "362 - ENSINO MEDIO": {
      "2899 - Alimentação Escolar do Ensino Médio": {
        "3": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_INFRAESTR_": "E_ALIMENTAÇÃO_"
              }
            }
          }
        }
      },
      "4177 - Infraestrutura do Ensino Médio": {
        "3": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_GESTÃO_DO_PATRIM"
              }
            },
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_GESTÃO_DO_PATRIM"
              }
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": "E_TECNOL_AMB_ESCOLAR"
              }
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": "E_TECNOL_AMB_ESCOLAR"
              }
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_ESCOLAR"
              }
            },
            "SAGE": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_ESCOLAR"
              }
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_INFRAESTRUTURA_ESC"
              }
            }
          }
        }
      },
      "4182 - Transporte Escolar do Ensino Médio": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_INFRAESTR_": "E_TRANSPORTE_ESCOLAR"
              }
            }
          }
        }
      }
    },
    "122 - ADMINISTRAÇÃO GERAL": {
      "4180 - Infraestrutura de Administração e Gestão": {
        "6": {
          "Gestão integrada desenvolvida": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_INTEGRADA"
              }
            },
            "SAAS": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_INTEGRADA"
              }
            },
            "SAGE": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_INTEGRADA"
              }
            },
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_INTEGRADA"
              }
            }
          },
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_GESTÃO_DO_PATRIM"
              }
            },
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_GESTÃO_DO_PATRIM"
              }
            }
          },
          "Gestão escolar desenvolvida": { 
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_ESCOLAR"
              }
            }
          },
          "Gestão estratégica de pessoas implementada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_GESTÃO_DE_PESSOAS"
              }
            }
          },
          "Valorização profissional desenvolvida": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            },
            "GAB": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            },
            "SAAS": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            },
            "SAEX": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            },
            "SAIP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            },
            "SAEC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_VALORIZAÇÃO_PROF"
              }
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_INFRAESTRUTURA_ESC"
              }
            },
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_INFRAESTRUTURA_ESC"
              }
            }
          }
        }
      }
    },
    "365 - EDUCACAO INFANTIL": {
      "4525 - FMTE - Educação Infantil": {
        "10": {
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": "E_INFRAESTRUTURA_ESC"
              }
            },
            "EPI": {
              "EPI": {
                "EPI": "EPI"
              }
            }
          },
          "Regime de colaboração desenvolvido": {
            "SAAS": {
              "REGIME_COLABORAÇÃO": {
                "P_GESTÃO_": "E_REGIME_COLABORAÇÃO"
              }
            }
          }
        }
      }
    }
  },
  "996 - Operações especiais: outras": {
    "846 - OUTROS ENCARGOS ESPECIAIS": {
      "8002 - Recolhimento do PIS-PASEP e pagamento do abono": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAAS": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": "E_GESTÃO_INTEGRADA"
              }
            }
          }
        }
      }
    },
    "845 - OUTRAS TRANSFERÊNCIAS": {
      "8026 - Pagamento de emendas parlamentares impositivas": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "EPI": {
              "EPI": {
                "EPI": "EPI"
              }
            }
          }
        }
      }
    }
  },
  "997 - Previdência de inativos e pensionistas do Estado": {
    "272 - PREVIDENCIA DO REGIME ESTATUTARIO": {
      "8040 - Recolhimento de encargos e obrigações previdenciárias de inativos e pensionistas do Estado de Mato Grosso": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_GESTÃO_DE_PESSOAS"
              }
            }
          }
        }
      }
    }
  },
  "998 - Operações especiais: cumprimento de sentenças judiciais": {
    "846 - OUTROS ENCARGOS ESPECIAIS": {
      "8003 - Cumprimento de sentenças judiciais transitadas em julgado - Adm. Direta": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": "E_GESTÃO_DE_PESSOAS"
              }
            }
          }
        }
      }
    }
  }
};

function carregarEixo(programa, subfuncao, paoe, ug, produto, adj, macropolitica, pilar) {
  const select = document.querySelector('select[name="eixo"]');
  if (!select) return;

  select.innerHTML = '<option value="">Selecione</option>';

  try {
    const paoeCompleto = paoe.trim();
    const produtoNormalizado = normalizarTexto(produto);
    const adjNormalizado = normalizarTexto(adj);
    const macroNormalizado = normalizarTexto(macropolitica);
    const pilarNormalizado = normalizarTexto(pilar);

    console.log("📦 Dados recebidos para carregar EIXO:");
    console.log("Programa:", programa);
    console.log("Subfunção:", subfuncao);
    console.log("PAOE:", paoeCompleto);
    console.log("UG:", ug);
    console.log("Produto:", produto);
    console.log("ADJ:", adj);
    console.log("Macropolítica:", macropolitica);
    console.log("Pilar:", pilar);

    const produtoMap = eixoMap?.[programa]?.[subfuncao]?.[paoeCompleto]?.[ug];
    if (!produtoMap) {
      console.warn("⚠️ Caminho até UG não encontrado no eixoMap.");
      return;
    }

    let eixoEncontrado = [];

    for (let nomeProduto in produtoMap) {
      const nomeProdutoNorm = normalizarTexto(nomeProduto);
      if (
        nomeProdutoNorm === produtoNormalizado ||
        nomeProdutoNorm.includes(produtoNormalizado) ||
        produtoNormalizado.includes(nomeProdutoNorm)
      ) {
        const adjs = produtoMap[nomeProduto];
        for (let adjChave in adjs) {
          const adjNorm = normalizarTexto(adjChave);
          if (adjNorm === adjNormalizado) {
            const macroMap = adjs[adjChave];
            for (let macroChave in macroMap) {
              const macroNorm = normalizarTexto(macroChave);
              if (macroNorm === macroNormalizado) {
                const pilarMap = macroMap[macroChave];
                for (let pilarChave in pilarMap) {
                  const pilarNorm = normalizarTexto(pilarChave);
                  if (pilarNorm === pilarNormalizado) {
                    const eixoValor = pilarMap[pilarChave];
                    if (Array.isArray(eixoValor)) {
                      eixoEncontrado.push(...eixoValor);
                    } else {
                      eixoEncontrado.push(eixoValor);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    if (eixoEncontrado.length === 0) {
      console.warn("⚠️ Nenhum Eixo encontrado para os parâmetros fornecidos.");
      return;
    }

    const unicos = [...new Set(eixoEncontrado)];
    unicos.forEach(e => {
      const opt = document.createElement("option");
      opt.value = e;
      opt.textContent = e;
      select.appendChild(opt);
    });

    console.log("✅ Eixo carregado:", unicos);
  } catch (e) {
    console.error("❌ Erro ao carregar EIXO:", e);
  }
}

const politicaMap = {
  "036 - Apoio administrativo": {
    "126 - TECNOLOGIA DA INFORMAÇÃO": {
      "2009 - Manutenção de ações de informática": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
                }
              }
            }
          }
        }
      }
    },
    "122 - ADMINISTRAÇÃO GERAL": {
      "2010 - Manutenção de órgãos colegiados": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
                }
              }
            }
          }
        }
      },
      "2284 - Manutenção do Conselho Estadual de Educação - CEE": {
        "1": {
          "Conselho mantido": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
                }
              }
            }
          }
        }
      },
      "4491 - Pagamento de verbas indenizatórias a servidores estaduais": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_GESTÃO_DE_PESSOAS": "_GESTÃO_PESSOAS"
                }
              }
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_GESTÃO_DE_PESSOAS": "_GESTÃO_PESSOAS"
                }
              }
            }
          }
        }
      }
    },
    "131 - COMUNICACAO SOCIAL": {
      "2014 - Publicidade institucional e propaganda": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
                }
              }
            }
          }
        }
      }
    }
  },
  "533 - Educação 10 Anos": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {
      "2900 - Desenvolvimento da Educação de Jovens e Adultos": {
        "4": {
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": {
                  "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
                }
              }
            }
          },
          "Educação para jovens e adultos (EJA) desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_EJA": "_EDUC_EJA",
                  "E_IMIGRANTES": "_EDUC_EJA"
                }
              }
            },
            "SARC": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_EJA": "_EDUC_EJA"
                }
              }
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": {
                  "E_SISTEMA_ESTRUT": "_SISTEMA_ESTRUT"
                }
              }
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": {
                  "E_LÍNG_ESTRANGEIRAS": "_LÍNGUAS_ESTRANG"
                }
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": {
                  "E_PROJ_PED_INTEGRAD": "_PROJ_PED_INTEGR"
                }
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_BUSCA_ATIVA": "_ACESSO_E_PERM"
                }
              }
            }
          },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_MATERIAIS_"
                }
              }
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
                }
              }
            },
            "SAGE": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
                }
              }
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_": {
                  "E_BEM-ESTAR_ESCOLAR": "_BEM-ESTAR_",
                  "E_CULTURA_DE_PAZ": "_BEM-ESTAR_"
                }
              }
            }
          }
        }
      }
    },
    "122 - ADMINISTRAÇÃO GERAL": {
      "2936 - Desenvolvimento das Modalidades de Ensino": {
        "8": {
          "Alfabetização desenvolvida": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_IMPACTO_": {
                  "E_ALFABETIZAÇÃO": "_ALFABETIZAÇÃO"
                }
              }
            }
          },
		  "Regime de colaboração desenvolvido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_GESTÃO_": {
                  "E_REGIME_COLABORAÇÃO": "_REGIME_COLAB"
                }
              }
            }
          },  
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": {
                  "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
                }
              }
            },
            "SARC": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": {
                  "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
                }
              }
            }
          },
          "Educação em tempo integral desenvolvida": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_IMPACTO_": {
                  "E_ESCOLA_TEMPO_INTEG": "_ED_TEMPO_INTEGR"
                }
              }
            }
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_CAMPO": "_EDUC_CAMPO"
                }
              }
            }
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_INDÍGENA": "_EDUC_INDÍGENA"
                }
              }
            }
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_QUILOMBOLA": "_EDUC_QUILOMBOLA"
                }
              }
            }
          },
          "Educação especial desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_ESPECIAL": "_EDUC_ESPECIAL"
                }
              }
            }
          },
          "Educação para jovens e adultos (EJA) desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_EJA": "_EDUC_EJA"
                }
              }
            },
            "SARC": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_EJA": "_EDUC_EJA"
                }
              }
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": {
                  "E_LÍNG_ESTRANGEIRAS": "_LÍNGUAS_ESTRANG"
                }
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": {
                  "E_PROJ_PED_INTEGRAD": "_PROJ_PED_INTEGR"
                }
              }
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": {
                  "E_SISTEMA_ESTRUT": "_SISTEMA_ESTRUT"
                }
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_BUSCA_ATIVA": "_ACESSO_E_PERM"
                }
              }
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_": {
                  "E_BEM-ESTAR_ESCOLAR": "_BEM-ESTAR_",
                  "E_CULTURA_DE_PAZ": "_BEM-ESTAR_"
                }
              }
            }
          },
          "Escolas militares desenvolvidas": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": {
                "P_IMPACTO_": {
                  "E_ESCOLAS_MILITARES": "_ESCOLAS_MILITAR"
                }
              }
            }
          }
        }
      },
      "4541 - Educação que Protege Meninas": {
        "8": {
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_": {
                  "E_BEM-ESTAR_ESCOLAR": "_BEM-ESTAR_"
                }
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": {
                  "E_PROJ_PED_INTEGRAD": "_PROJ_PED_INTEGR"
                }
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            }
          },
          "Valorização profissional desenvolvida": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            }
          }
        }
      }
    },
    "367 - EDUCACAO ESPECIAL": {
      "2957 - Desenvolvimento da Educação Especial": {
        "5": {
          "Alfabetização desenvolvida": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_IMPACTO_": {
                  "E_ALFABETIZAÇÃO": "_ALFABETIZAÇÃO"
                }
              }
            }
          },
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": {
                  "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
                }
              }
            }
          },
          "Educação especial desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_ESPECIAL": "_EDUC_ESPECIAL",
                  "E_DISTÚRB_APRENDIZ": "_EDUC_ESPECIAL",
                  "E_ALTAS_HABILIDADES": "_EDUC_ESPECIAL"
                }
              }
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": {
                  "E_LÍNG_ESTRANGEIRAS": "_LÍNGUAS_ESTRANG"
                }
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": {
                  "E_PROJ_PED_INTEGRAD": "_PROJ_PED_INTEGR"
                }
              }
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": {
                  "E_SISTEMA_ESTRUT": "_SISTEMA_ESTRUT"
                }
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_BUSCA_ATIVA": "_ACESSO_E_PERM"
                }
              }
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_": {
                  "E_BEM-ESTAR_ESCOLAR": "_BEM-ESTAR_",
                  "E_CULTURA_DE_PAZ": "_BEM-ESTAR_"
                }
              }
            }
          },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_MATERIAIS_"
                }
              }
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
                }
              }
            },
            "SARC": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
                }
              }
            }
          }
        }
      }
    },
    "361 - ENSINO FUNDAMENTAL": {
      "4172 - Desenvolvimento do Ensino Fundamental": {
        "2": {
          "Alfabetização desenvolvida": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_IMPACTO_": {
                  "E_ALFABETIZAÇÃO": "_ALFABETIZAÇÃO"
                }
              }
            }
          },
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": {
                  "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
                }
              }
            }
          },
          "Educação em tempo integral desenvolvida": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_IMPACTO_": {
                  "E_ESCOLA_TEMPO_INTEG": "_ED_TEMPO_INTEGR"	// CORRETO
                }
              }
            }
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_CAMPO": "_EDUC_CAMPO"
                }
              }
            }
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_INDÍGENA": "_EDUC_INDÍGENA"
                }
              }
            }
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_QUILOMBOLA": "_EDUC_QUILOMBOLA"
                }
              }
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": {
                  "E_LÍNG_ESTRANGEIRAS": "_LÍNGUAS_ESTRANG"
                }
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": {
                  "E_PROJ_PED_INTEGRAD": "_PROJ_PED_INTEGR"	
                },
                "P_IMPACTO_": {
                  "E_ENSINO_FUNDAMENTAL": "_PROJ_PED_INTEGR"
                }
			        }
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": {
                  "E_SISTEMA_ESTRUT": "_SISTEMA_ESTRUT"
                }
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            }
          },
          "Remuneração professores e profissionais da educação com recursos do MDE, Art 70 Lei 9394/1996": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            }
          },
          "Remuneração professores e profissionais da educação, FUNDEB 30%, Arts 26-A, 14.113/20 e 70, 9394/96": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            }
          },
          "Remuneração professores e profissionais da educação, FUNDEB 70%, Art 26, § 1º, II, Lei 14.113/20": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_BUSCA_ATIVA": "_ACESSO_E_PERM"
                }
              }
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_": {
                  "E_BEM-ESTAR_ESCOLAR": "_BEM-ESTAR_",
                  "E_CULTURA_DE_PAZ": "_BEM-ESTAR_"
                }
              }
            }
          },
          "Escolas militares desenvolvidas": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": {
                "P_IMPACTO_": {
                  "E_ESCOLAS_MILITARES": "_ESCOLAS_MILITAR"
                }
              }
            }
          },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_MATERIAIS_"
                }
              }
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
                }
              }
            },
            "SARC": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
                }
              }
            }
          }
        }
      }
  ,
      "4538 - Desenvolvimento do Regime de Colaboração - Ensino Fundamental": {
        "9": {
          "Regime de colaboração desenvolvido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_GESTÃO_": {
                  "E_REGIME_COLABORAÇÃO": "_REGIME_COLAB"
                }
              }
            }
          }
        }
      }
  },
    "362 - ENSINO MEDIO": {
      "4174 - Desenvolvimento do Ensino Médio": {
        "3": {
          "Avaliação (Avalia MT) desenvolvida": {
            "SAGE": {
              "AVALIAÇÃO": {
                "P_IMPACTO_": {
                  "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
                }
              }
            }
          },
          "Educação em tempo integral desenvolvida": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_IMPACTO_": {
                  "E_ESCOLA_TEMPO_INTEG": "_ED_TEMPO_INTEGR"
                }
              }
            }
          },
          "Educação escolar do campo desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_CAMPO": "_EDUC_CAMPO"
                }
              }
            }
          },
          "Educação escolar indígena desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_INDÍGENA": "_EDUC_INDÍGENA"
                }
              }
            }
          },
          "Educação escolar quilombola desenvolvida": {
            "SAGE": {
              "EQUIDADE_DIVERSID": {
                "P_EQUIDADE_": {
                  "E_EDUC_QUILOMBOLA": "_EDUC_QUILOMBOLA"
                }
              }
            }
          },
          "Línguas estrangeiras desenvolvidas": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": {
                  "E_LÍNG_ESTRANGEIRAS": "_LÍNGUAS_ESTRANG"
                }
              }
            }
          },
          "Novo ensino médio e ensino técnico profissionalizante desenvolvido": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_IMPACTO_": {
                  "E_EDUC_PROF_TEC": "_NOVO_ENSINO_MÉD"
                }
              },
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": {
                  "E_ENSINO_MÉDIO": "_NOVO_ENSINO_MÉD"
                }
              }
            }
          },
          "Projetos pedagógicos integrados implantados": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_TECNOLOGIA_": {
                  "E_PROJ_PED_INTEGRAD": "_PROJ_PED_INTEGR"
                }
              }
            }
          },
          "Sistema estruturado de ensino implantado": {
            "SAGE": {
              "DESENV_EDUCACIONAL": {
                "P_IMPACTO_": {
                  "E_SISTEMA_ESTRUT": "_SISTEMA_ESTRUT"
                }
              }
            }
          },
          "Formação continuada de professores realizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            },
            "SARC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
                }
              }
            }
          },
          "Acesso e permanência desenvolvido": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_BUSCA_ATIVA": "_ACESSO_E_PERM"
                }
              }
            }
          },
          "Bem-estar escolar desenvolvido": {
            "SAGR": {
              "CULTURA_DE_PAZ": {
                "P_EQUIDADE_": {
                  "E_BEM-ESTAR_ESCOLAR": "_BEM-ESTAR_",
                  "E_CULTURA_DE_PAZ": "_BEM-ESTAR_"
                }
              }
            }
          },
          "Escolas militares desenvolvidas": {
            "SAEX": {
              "GESTÃO_INOVAÇÃO": {
                "P_IMPACTO_": {
                  "E_ESCOLAS_MILITARES": "_ESCOLAS_MILITAR"
                }
              }
            }
          },
          "Materiais escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_MATERIAIS_"
                }
              }
            }
          },
          "Uniformes escolares disponibilizados": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
                }
              }
            },
            "SARC": {
              "ACESSO_E_PERM": {
                "P_EQUIDADE_": {
                  "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
                }
              }
            }
          }
        }
      }
    },
    "365 - EDUCACAO INFANTIL": {
      "4537 - Desenvolvimento do Regime de Colaboração - Educação Infantil": {
        "10": {
          "Regime de colaboração desenvolvido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_GESTÃO_": {
                  "E_REGIME_COLABORAÇÃO": "_REGIME_COLAB"
                }
              }
            }
          }
        }
      }
    }
  },
  "534 - Infraestrutura Educacional": {
    "366 - EDUCACAO DE JOVENS E ADULTOS": {
      "2895 - Alimentação Escolar da Educação de Jovens e Adultos": {
        "4": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_INFRAESTR_": {
                  "E_ALIMENTAÇÃO_": "_ALIMENTAÇÃO_"
                }
              }
            },
            "SARC": {
              "ACESSO_E_PERM": {
                "P_INFRAESTR_": {
                  "E_ALIMENTAÇÃO_": "_ALIMENTAÇÃO_"
                }
              }
            }
          }
        }
      },
      "4175 - Infraestrutura da Educação de Jovens e Adultos": {
        "4": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM"
                }
              }
            },
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM"
                }
              }
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": {
                  "E_TECNOL_AMB_ESCOLAR": "_TECNOLOGIA_ESC"
                }
              }
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": {
                  "E_TECNOL_AMB_ESCOLAR": "_TECNOLOGIA_ESC"
                }
              }
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
                }
              }
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
                }
              }
            }
          }
        }
      }
    },
    "367 - EDUCACAO ESPECIAL": {
      "2897 - Alimentação Escolar da Educação Especial": {
        "5": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_INFRAESTR_": {
                  "E_ALIMENTAÇÃO_": "_ALIMENTAÇÃO_"
                }
              }
            }
          }
        }
      },
      "4178 - Infraestrutura da Educação Especial": {
        "5": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM"
                }
              }
            },
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM"
                }
              }
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": {
                  "E_TECNOL_AMB_ESCOLAR": "_TECNOLOGIA_ESC"
                }
              }
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": {
                  "E_TECNOL_AMB_ESCOLAR": "_TECNOLOGIA_ESC"
                }
              }
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
                }
              }
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
                }
              }
            }
          }
        }
      },
      "4179 - Transporte Escolar da Educação Especial": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_INFRAESTR_": {
                  "E_TRANSPORTE_ESCOLAR": "_TRANSPORTE_"
                }
              }
            }
          }
        }
      }
    },
    "361 - ENSINO FUNDAMENTAL": {
      "2898 - Alimentação Escolar do Ensino Fundamental": {
        "2": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_INFRAESTR_": {
                  "E_ALIMENTAÇÃO_": "_ALIMENTAÇÃO_"
                }
              }
            }
          }
        }
      },
      "4173 - Infraestrutura do Ensino Fundamental": {
        "2": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM"
                }
              }
            },
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM"
                }
              }
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": {
                  "E_TECNOL_AMB_ESCOLAR": "_TECNOLOGIA_ESC"
                }
              }
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": {
                  "E_TECNOL_AMB_ESCOLAR": "_TECNOLOGIA_ESC"
                }
              }
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
                }
              }
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
                }
              }
            }
          }
        }
      },
      "4181 - Transporte Escolar do Ensino Fundamental": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_INFRAESTR_": {
                  "E_TRANSPORTE_ESCOLAR": "_TRANSPORTE_"
                }
              }
            }
          }
        }
      },
	  
	  // INCLUIR EPI NO PAOE 4524 TAMBÉM
	  
      "4524 - FMTE - Ensino Fundamental": {
        "9": {
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
                }
              }
            },
            "EPI": {
              "EPI": {
                "EPI": {
                  "EPI": "EPI"
                }
              }
            }
          },
          "Regime de colaboração desenvolvido": {
            "SAAS": {
              "REGIME_COLABORAÇÃO": {
                "P_GESTÃO_": {
                  "E_REGIME_COLABORAÇÃO": "_REGIME_COLAB"
                }
              }
            }
          }
        }
      }
    },
    "362 - ENSINO MEDIO": {
      "2899 - Alimentação Escolar do Ensino Médio": {
        "3": {
          "Alimentação escolar mantida": {
            "SAGR": {
              "ACESSO_E_PERM": {
                "P_INFRAESTR_": {
                  "E_ALIMENTAÇÃO_": "_ALIMENTAÇÃO_"
                }
              }
            }
          }
        }
      },
      "4177 - Infraestrutura do Ensino Médio": {
        "3": {
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM"
                }
              }
            },
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM"
                }
              }
            }
          },
          "Tecnologia no ambiente escolar disponibilizada": {
            "SAGE": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": {
                  "E_TECNOL_AMB_ESCOLAR": "_TECNOLOGIA_ESC"
                }
              }
            },
            "SAEX": {
              "CURRÍCULO_AMPLIADO": {
                "P_TECNOLOGIA_": {
                  "E_TECNOL_AMB_ESCOLAR": "_TECNOLOGIA_ESC"
                }
              }
            }
          },
          "Gestão escolar desenvolvida": {
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
                }
              }
            },
            "SAGE": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
                }
              }
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
                }
              }
            }
          }
        }
      },
      "4182 - Transporte Escolar do Ensino Médio": {
        "7": {
          "Transporte escolar mantido": {
            "SARC": {
              "REGIME_COLABORAÇÃO": {
                "P_INFRAESTR_": {
                  "E_TRANSPORTE_ESCOLAR": "_TRANSPORTE_"
                }
              }
            }
          }
        }
      }
    },
    "122 - ADMINISTRAÇÃO GERAL": {
      "4180 - Infraestrutura de Administração e Gestão": {
        "6": {
          "Gestão integrada desenvolvida": {
            "GAB": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
                }
              }
            },
            "SAAS": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
                }
              }
            },
            "SAGE": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
                }
              }
            },
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
                }
              }
            }
          },
          "Gestão do patrimônio realizada": {
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM"
                }
              }
            },
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM"
                }
              }
            }
          },
          "Gestão escolar desenvolvida": { 
            "SAGR": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
                }
              }
            }
          },
          "Gestão estratégica de pessoas implementada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_GESTÃO_DE_PESSOAS": "_GESTÃO_PESSOAS"
                }
              }
            }
          },
          "Valorização profissional desenvolvida": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            },
            "GAB": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            },
            "SAAS": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            },
            "SAEX": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            },
            "SAIP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            },
            "SAGE": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            },
            "SAGR": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            },
            "SAEC": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
                }
              }
            }
          },
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
                }
              }
            },
            "SAAS": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
                }
              }
            }
          }
        }
      }
    },
    "365 - EDUCACAO INFANTIL": {
      "4525 - FMTE - Educação Infantil": {
        "10": {
          "Infraestrutura escolar modernizada": {
            "SAIP": {
              "INFRAESTRUTURA": {
                "P_INFRAESTR_": {
                  "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
                }
              }
            },
            "EPI": {
              "EPI": {
                "EPI": {
                  "EPI": "EPI"
                }
              }
            }
          },
          "Regime de colaboração desenvolvido": {
            "SAAS": {
              "REGIME_COLABORAÇÃO": {
                "P_GESTÃO_": {
                  "E_REGIME_COLABORAÇÃO": "_REGIME_COLAB"
                }
              }
            }
          }
        }
      }
    }
  },
  "996 - Operações especiais: outras": {
    "846 - OUTROS ENCARGOS ESPECIAIS": {
      "8002 - Recolhimento do PIS-PASEP e pagamento do abono": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAAS": {
              "GESTÃO_INOVAÇÃO": {
                "P_GESTÃO_": {
                  "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
                }
              }
            }
          }
        }
      }
    },
    "845 - OUTRAS TRANSFERÊNCIAS": {
      "8026 - Pagamento de emendas parlamentares impositivas": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "EPI": {
              "EPI": {
                "EPI": {
                  "EPI": "EPI"
                }
              }
            }
          }
        }
      }
    }
  },
  "997 - Previdência de inativos e pensionistas do Estado": {
    "272 - PREVIDENCIA DO REGIME ESTATUTARIO": {
      "8040 - Recolhimento de encargos e obrigações previdenciárias de inativos e pensionistas do Estado de Mato Grosso": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_GESTÃO_DE_PESSOAS": "_GESTÃO_PESSOAS"
                }
              }
            }
          }
        }
      }
    }
  },
  "998 - Operações especiais: cumprimento de sentenças judiciais": {
    "846 - OUTROS ENCARGOS ESPECIAIS": {
      "8003 - Cumprimento de sentenças judiciais transitadas em julgado - Adm. Direta": {
        "1": {
          "Produto exclusivo para ação padronizada": {
            "SAGP": {
              "VALORIZAÇÃO_PRO": {
                "P_VALORIZ_PRO": {
                  "E_GESTÃO_DE_PESSOAS": "_GESTÃO_PESSOAS"
                }
              }
            }
          }
        }
      }
    }
  }
};

function carregarPoliticaDecreto(programa, subfuncao, paoe, ug, produto, adj, macropolitica, pilar, eixo) {
    console.log("📦 Dados recebidos para carregar POLÍTICA DECRETO:");
    console.log("Programa:", programa);
    console.log("Subfunção:", subfuncao);
    console.log("PAOE:", paoe);
    console.log("UG:", ug);
    console.log("Produto:", produto);
    console.log("ADJ:", adj);
    console.log("Macropolítica:", macropolitica);
    console.log("Pilar:", pilar);
    console.log("Eixo:", eixo);

    const politicaSelect = document.querySelector("select[name='politica_decreto']");
    if (!politicaSelect) {
        console.warn("❌ Elemento com name='politica_decreto' não encontrado no DOM.");
        return;
    }

    // Limpa opções anteriores
    politicaSelect.innerHTML = "<option value=''>Selecione</option>";

    const politicas = politicaMap?.[programa]
        ?. [subfuncao]
        ?. [paoe]
        ?. [ug]
        ?. [produto]
        ?. [adj]
        ?. [macropolitica]
        ?. [pilar]
        ?. [eixo];

    if (!politicas) {
        console.warn("⚠️ Política Decreto não localizada com os dados informados.");
        return;
    }

    const lista = Array.isArray(politicas) ? politicas : [politicas]; // trata string ou array

    lista.forEach(politica => {
        const option = document.createElement("option");
        option.value = politica;
        option.textContent = politica;
        politicaSelect.appendChild(option);
    });

    console.log("✅ Política Decreto carregada:", lista);
}

// === Abrir formulário de Subação/Entrega ===
window.abrirFormularioSubacao = function (alterar = false) {
    console.log("📥 abrirFormularioSubacao chamado | Modo de alteração:", alterar);

    const container = document.getElementById("formularioSubacao");

    const camposObrigatorios = [
        "subacao_entrega", "produto_subacao", "unidade_setorial",
        "quantidade", "detalhamento_produto", "cpf", "email"
    ];

    let camposAusentes = camposObrigatorios.filter(id => !document.getElementById(id));
    if (camposAusentes.length > 0) {
        console.error("❌ Elementos obrigatórios ausentes:", camposAusentes);
        alert("Erro interno: elementos obrigatórios não encontrados no HTML.");
        return;
    }

    if (alterar) {
        const selecionado = document.querySelector('input[name="subacaoSelecionada"]:checked');
        if (!selecionado) {
            alert("⚠️ Por favor, selecione uma Subação/Entrega para alterar.");
            location.reload(); // recarrega antes que o form seja exibido
            return;
        }

        const subacaoId = selecionado.value;
        fetch(`/subacao_entrega_json/${subacaoId}`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert(`Erro ao carregar subação: ${data.erro}`);
                    return;
                }

                // Preenche campos do formulário
                document.getElementById("subacao_id").value = data.id || "";
                document.getElementById("subacao_entrega").value = data.subacao_entrega_raw || "";
                document.getElementById("produto_subacao").value = data.produto_subacao || "";
                document.querySelector('select[name="unidade_gestora"]').value = data.unidade_gestora || "";
                document.getElementById("unidade_setorial").value = data.unidade_setorial || "";
                document.getElementById("unidade_medida").value = data.un_medida || "";
                document.getElementById("quantidade").value = data.quantidade || "";
                document.querySelector('textarea[name="detalhamento"]').value = data.detalhamento || "";
                document.querySelector('input[name="responsavel"]').value = data.responsavel || "";
                document.getElementById("cpf").value = formatarCPF(data.cpf || "");
                document.getElementById("email").value = data.email || "";

                // Preenche campos diretos (não encadeados)
                document.querySelector('select[name="regiao"]').value = data.regiao || "";
                document.querySelector('select[name="subfuncao_ug"]').value = data.subfuncao_ug || "";
                document.querySelector('select[name="publico_ods"]').value = data.publico_ods || "";

                // Atualiza DADOS_PLANEJAMENTO para prevenir sobrescrita
                window.DADOS_PLANEJAMENTO = {
                    ...(window.DADOS_PLANEJAMENTO || {}),
                    subfuncao: data.subfuncao || window.DADOS_PLANEJAMENTO?.subfuncao || "",
                    paoe: data.paoe || window.DADOS_PLANEJAMENTO?.paoe || "",
                    produto: data.produto || window.DADOS_PLANEJAMENTO?.produto || ""
                };

                // Atualiza municípios
                window.municipiosTemp = Array.isArray(data.municipios) ? data.municipios : [];
                atualizarTabelaMunicipios();

                // ✅ Preencher campos encadeados com segurança
                setTimeout(() => {
                    preencherCamposEncadeadosDiretamente(data);
                }, 300);

                // Exibe o formulário
                container.style.display = "block";
                sincronizarAlturaListaSubacoes();
            })
            .catch(erro => {
                console.error("❌ Erro ao carregar subação:", erro);
                alert("Erro ao buscar os dados da subação.");
            });

    } else {
        // Novo cadastro
        document.getElementById("formSubacaoEntrega").reset();
        document.getElementById("subacao_id").value = "";
        window.municipiosTemp = [];
        atualizarTabelaMunicipios();

        // Exibe o formulário
        container.style.display = "block";
        sincronizarAlturaListaSubacoes();
    }
};

// === Helpers numéricos (evitam erro de ponto flutuante) ===
function brToNumber(s) {
    if (s == null) return 0;
    return Number(String(s).replace(/\./g, '').replace(',', '.')) || 0;
}
function numberToBR(n, dec = 2) {
    return Number(n).toFixed(dec).replace('.', ',');
}
function toCents(n) {
    return Math.round(Number(n) * 100);
}

// ✅ NOVA FUNÇÃO para preencher os campos encadeados diretamente
function preencherCamposEncadeadosDiretamente(data) {
  if (window.USAR_CHAVE_PLANEJAMENTO_V2 && typeof window.preencherChavePlanejamentoV2 === "function") {
    window.preencherChavePlanejamentoV2(data);
    return;
  }

  const campos = ["adj", "macropolitica", "pilar", "eixo", "politica_decreto"];
  campos.forEach(campo => {
    const el = document.querySelector(`select[name="${campo}"]`);
    if (el && data[campo]) {
      const optionExists = Array.from(el.options).some(opt => opt.value === data[campo]);
      if (optionExists) {
        el.value = data[campo];
        el.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(`✅ ${campo} carregado diretamente: ${data[campo]}`);
      } else {
        console.warn(`⚠️ Valor '${data[campo]}' não encontrado em ${campo}`);
      }
    }
  });
}

function carregarSubacaoParaEdicao(subacaoId, data) {
  console.log("📦 Dados da subação recebidos:", data);

  document.querySelector('select[name="regiao"]').value = data.regiao;
  document.querySelector('select[name="subfuncao_ug"]').value = data.subfuncao_ug;
  document.querySelector('select[name="publico_ods"]').value = data.publico_ods;
  document.getElementById("subacao_entrega").value = data.subacao_entrega_raw;
  document.getElementById("produto_subacao").value = data.produto_subacao;
  document.querySelector('select[name="unidade_gestora"]').value = data.unidade_gestora;
  document.querySelector('select[name="unidade_setorial"]').value = data.unidade_setorial;
  document.querySelector('select[name="un_medida"]').value = data.un_medida;
  document.getElementById("quantidade").value = data.quantidade;
  document.querySelector('textarea[name="detalhamento"]').value = data.detalhamento;
  document.querySelector('input[name="responsavel"]').value = data.responsavel;
  document.getElementById("cpf").value = formatarCPF(data.cpf);
  document.getElementById("email").value = data.email;

  // 🧹 Limpa a tabela e o array temporário
  const corpoTabela = document.getElementById("corpoTabelaMunicipios");
  corpoTabela.innerHTML = "";
  municipiosTemp.length = 0;

  // ✅ Preenche os municípios corretamente com índice
  if (Array.isArray(data.municipios)) {
    data.municipios.forEach((m, index) => {
      municipiosTemp.push({
        codigo: m.codigo_municipio,
        nome: m.nome_municipio,
        un_medida: m.unidade_medida,
        quantidade: parseFloat(m.quantidade?.replace(",", "."))
      });

      const linha = `
        <tr>
          <td><input type="radio" name="municipioSelecionado" value="${index}" data-temporario="true"></td>
          <td>${m.codigo_municipio}</td>
          <td>${m.nome_municipio}</td>
          <td>${m.quantidade}</td>
        </tr>
      `;
      corpoTabela.insertAdjacentHTML("beforeend", linha);
    });
    console.log("✅ Municípios preenchidos.");
  }

  preencherCamposEncadeadosDiretamente(data);
  console.log("✅ Campos encadeados preenchidos sem encadeamento.");
  console.log("✅ municípiosTemp atualizado para envio:", municipiosTemp);
}

// === Fechar formulário de Subação/Entrega ===
function fecharFormularioSubacao() {
  const form = document.getElementById("formularioSubacao");
  if (!form) return;

  form.style.display = "none";
  document.getElementById("formSubacaoEntrega").reset();
  sincronizarAlturaListaSubacoes();

  const subacaoId = document.getElementById("subacao_id");
  const btn = document.getElementById("btnCadastrarSubacao");
  if (subacaoId) subacaoId.value = "";
  if (btn) btn.innerText = "Cadastrar";

  // Desmarcar seleção da tabela (Etapa 7)
  const selecionado = document.querySelector('input[name="subacaoSelecionada"]:checked');
  if (selecionado) selecionado.checked = false;
}

// === Validar e submeter formulário ===
function validarSubacao() {
  const subacao = document.getElementById("subacao_entrega").value.trim();
  const responsavel = document.getElementById("responsavelSub").value.trim();
  const cpf = document.getElementById("cpfSub").value.trim();
  const email = document.getElementById("emailSub").value.trim();

  if (!subacao || !responsavel || !cpf || !email) {
    alert("Preencha todos os campos obrigatórios.");
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

  document.getElementById("formSubacaoEntrega").submit();
}

// === Excluir Subação ===
function excluirSubacao() {
  const selecionado = document.querySelector('input[name="subacaoSelecionada"]:checked');
  if (!selecionado) {
    alert("Selecione uma subação para excluir.");
    return;
  }

  if (confirm("Deseja realmente excluir esta subação/entrega?")) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `/excluir_subacao_entrega/${selecionado.value}`;
    document.body.appendChild(form);
    form.submit();
  }
}

const subfuncaoUGToUGMap = {
  "122.1": "1 - Sede",
  "122.6": "6 - Administração Geral",
  "122.8": "8 - Outr Modal Ens",
  "126.1": "1 - Sede",
  "131.1": "1 - Sede",
  "272.1": "1 - Sede",
  "361.2": "2 - Ensino Fundamental",
  "361.7": "7 - Transporte Escolar",
  "361.9": "9 - FMTE - Ensino Fundam",
  "362.3": "3 - Ensino Médio",
  "362.7": "7 - Transporte Escolar",
  "365.10": "10 - FMTE - Educação Inf.",
  "366.4": "4 - Educ. Jovens e Adult",
  "367.5": "5 - Educação Especial",
  "367.7": "7 - Transporte Escolar",
  "846.1": "1 - Sede"
};

function abrirFormularioMunicipio(alterar = false) {
  const regiaoAtual = document.getElementById('regiao').value;
  console.log("📍 Região selecionada:", regiaoAtual);

  if (!regiaoAtual) {
    alert("Por favor, selecione a Região antes de cadastrar município.");
    return;
  }

  const modal = new bootstrap.Modal(document.getElementById("modalMunicipio"));
  modal.show();

  const codigoSelect = document.getElementById("codigoMunicipioSelect");
  const nomeInput = document.getElementById("nomeMunicipioInput");
  const unidadeMedidaInput = document.getElementById("unidadeMedidaMunicipio");
  const quantidadeInput = document.getElementById("quantidade_municipio");

  if (!codigoSelect || !nomeInput) {
    console.error("❌ Campos 'codigoMunicipioSelect' ou 'nomeMunicipioInput' não encontrados.");
    return;
  }

  // Limpa campos
  codigoSelect.innerHTML = '<option value="">Selecione o código</option>';
  nomeInput.value = "";
  unidadeMedidaInput.value = "";
  quantidadeInput.value = "";
  document.getElementById("municipio_id").value = "";

  const municipios = regioesMunicipios[regiaoAtual];

  if (municipios && typeof municipios === "object") {
    for (const codigo in municipios) {
      const nome = municipios[codigo];
      const option = document.createElement("option");
      option.value = codigo;
      option.textContent = `${codigo} - ${nome}`;
      codigoSelect.appendChild(option);
    }
  }

  // 🔄 MODO ALTERAR
  if (alterar) {
    const selecionado = document.querySelector('input[name="municipioSelecionado"]:checked');
    if (!selecionado) {
      alert("Por favor, selecione um município da tabela para alterar.");
      return;
    }

    const id = selecionado.value;
    const linha = selecionado.closest("tr");
    const codigo = linha.children[1].textContent.trim();
    const nome = linha.children[2].textContent.trim();
    const quantidade = linha.children[3].textContent.trim();

    document.getElementById("municipio_id").value = id;
    document.getElementById("codigoMunicipioSelect").value = codigo;
    document.getElementById("nomeMunicipioInput").value = nome;
    document.getElementById("quantidade_municipio").value = quantidade;

    // Tenta detectar unidade de medida
    const municipio = municipiosTemp.find(m => m.codigo == codigo);
    if (municipio) {
      document.getElementById("unidadeMedidaMunicipio").value = municipio.un_medida || "";
    }
  }
}

function atualizarNomeMunicipio() {
  const regiao = document.getElementById('regiao').value;
  const codigo = document.getElementById('codigoMunicipioSelect').value;
  const nomeInput = document.getElementById('nomeMunicipioInput');

  console.log("🔁 Código selecionado:", codigo);
  console.log("🔍 Região atual:", regiao);

  if (regiao && codigo && regioesMunicipios[regiao] && regioesMunicipios[regiao][codigo]) {
    nomeInput.value = regioesMunicipios[regiao][codigo];
    console.log("✅ Nome do município preenchido:", nomeInput.value);
  } else {
    nomeInput.value = "";
    console.warn("⚠️ Município não encontrado para os dados fornecidos.");
  }
}


// === Inicialização DOM ===
let carregandoSubacao = false;

document.addEventListener("DOMContentLoaded", () => {
  if (window.USAR_CHAVE_PLANEJAMENTO_V2) {
    console.info("Chave de Planejamento V2 ativa; encadeamento legado desativado.");
    return;
  }

  carregarSelectRegiao();

  const { programa, subfuncao, paoe, produto } = window.DADOS_PLANEJAMENTO || {};

  console.log("🌐 Dados globais carregados do HTML:");
  console.log("Programa:", programa);
  console.log("Subfunção:", subfuncao);
  console.log("PAOE:", paoe);
  console.log("Produto:", produto);

  const isModoAlteracao = sessionStorage.getItem("modoAlteracao") === "true";
  if (!programa || !subfuncao || !paoe || !produto || carregandoSubacao) {
    console.warn("⚠️ Algum dado global está indefinido OU subação está sendo carregada. Interrompendo DOMContentLoaded.");
    return;
  }

  const paoeCodigo = paoe.split(" - ")[0].trim();
  const ug = subfuncaoUGMap?.[programa]?.[subfuncao]?.[paoeCodigo];

  console.log("🔍 Código PAOE extraído:", paoeCodigo);
  console.log("🔍 UG detectada via subfuncaoUGMap:", ug);

  carregarSubfuncaoUG(programa, subfuncao, paoe);

  if (!isModoAlteracao && ug && produto) {
    console.log("✅ Carregando ADJ com os dados válidos...");
    carregarAdj(programa, subfuncao, paoe, ug, produto);

    setTimeout(() => {
      const adjSelect = document.querySelector('select[name="adj"]');
      const adjValue = adjSelect?.value || adjSelect?.options[1]?.value || "";

      if (adjValue) {
        console.log("✅ Carregando Macropolítica com ADJ inicial:", adjValue);
        carregarMacropolitica(programa, subfuncao, paoe, ug, produto, adjValue);

        setTimeout(() => {
          const macroSelect = document.querySelector('select[name="macropolitica"]');
          const macroValue = macroSelect?.value || macroSelect?.options[1]?.value || "";

          if (macroValue) {
            console.log("✅ Carregando Pilar com dados iniciais...");
            carregarPilar(programa, subfuncao, paoe, ug, produto, adjValue, macroValue);

            setTimeout(() => {
              const pilarSelect = document.querySelector('select[name="pilar"]');
              const adjAtual = document.querySelector('select[name="adj"]')?.value?.trim();
              const macroAtual = document.querySelector('select[name="macropolitica"]')?.value?.trim();
              const pilarValue = pilarSelect?.value || pilarSelect?.options[1]?.value || "";

              if (adjAtual && macroAtual && pilarValue) {
                console.log("✅ Carregando Eixo com Pilar inicial:", pilarValue);
                carregarEixo(programa, subfuncao, paoe, ug, produto, adjAtual, macroAtual, pilarValue);

                setTimeout(() => {
                  const eixoSelect = document.querySelector('select[name="eixo"]');
                  const eixoValue = eixoSelect?.value?.trim();

                  if (eixoValue) {
                    console.log("✅ Carregando Política Decreto automaticamente com eixo:", eixoValue);
                    carregarPoliticaDecreto(programa, subfuncao, paoe, ug, produto, adjAtual, macroAtual, pilarValue, eixoValue);
                  }
                }, 200);
              }
            }, 200);
          }
        }, 200);
      }
    }, 200);
  }

  sessionStorage.removeItem("modoAlteracao");

  const subfuncaoUGSelect = document.querySelector('select[name="subfuncao_ug"]');
  const unidadeGestoraSelect = document.querySelector('select[name="unidade_gestora"]');

  if (subfuncaoUGSelect) {
    subfuncaoUGSelect.addEventListener("change", () => {
      if (isModoAlteracao) return;

      const novoUG = subfuncaoUGSelect.value.split(".")[1]?.trim();
      console.log("📢 Subfunção + UG alterada → nova UG:", novoUG);

      if (novoUG && programa && subfuncao && paoe && produto) {
        carregarAdj(programa, subfuncao, paoe, novoUG, produto);
        document.querySelector('select[name="macropolitica"]').innerHTML = '<option value="">Selecione</option>';
        document.querySelector('select[name="pilar"]').innerHTML = '<option value="">Selecione</option>';
        document.querySelector('select[name="eixo"]').innerHTML = '<option value="">Selecione</option>';
        document.querySelector('select[name="politica_decreto"]').innerHTML = '<option value="">Selecione</option>';
      }

      const valorSubfuncaoUG = subfuncaoUGSelect.value.trim();
      const unidadeGestora = subfuncaoUGToUGMap[valorSubfuncaoUG] || "";

      unidadeGestoraSelect.innerHTML = '<option value="">Selecione a unidade gestora</option>';

      if (unidadeGestora) {
        const opt = document.createElement("option");
        opt.value = unidadeGestora;
        opt.textContent = unidadeGestora;
        opt.selected = true;
        unidadeGestoraSelect.appendChild(opt);
      }
    });
  }

  document.querySelector('select[name="adj"]')?.addEventListener("change", () => {
    if (isModoAlteracao) return;

    const adjSelecionado = document.querySelector('select[name="adj"]')?.value?.trim();
    document.querySelector('select[name="pilar"]').innerHTML = '<option value="">Selecione</option>';
    document.querySelector('select[name="eixo"]').innerHTML = '<option value="">Selecione</option>';
    document.querySelector('select[name="politica_decreto"]').innerHTML = '<option value="">Selecione</option>';

    if (programa && subfuncao && paoe && ug && produto && adjSelecionado) {
      carregarMacropolitica(programa, subfuncao, paoe, ug, produto, adjSelecionado);
    }
  });

  document.querySelector('select[name="macropolitica"]')?.addEventListener("change", () => {
    if (isModoAlteracao) return;

    const adjSelecionado = document.querySelector('select[name="adj"]')?.value?.trim();
    const macroSelecionado = document.querySelector('select[name="macropolitica"]')?.value?.trim();
    document.querySelector('select[name="eixo"]').innerHTML = '<option value="">Selecione</option>';
    document.querySelector('select[name="politica_decreto"]').innerHTML = '<option value="">Selecione</option>';

    if (programa && subfuncao && paoe && ug && produto && adjSelecionado && macroSelecionado) {
      carregarPilar(programa, subfuncao, paoe, ug, produto, adjSelecionado, macroSelecionado);
    }
  });

  document.querySelector('select[name="pilar"]')?.addEventListener("change", () => {
    if (isModoAlteracao) return;

    const adjSelecionado = document.querySelector('select[name="adj"]')?.value?.trim();
    const macroSelecionada = document.querySelector('select[name="macropolitica"]')?.value?.trim();
    const pilarSelecionado = document.querySelector('select[name="pilar"]')?.value?.trim();

    document.querySelector('select[name="politica_decreto"]').innerHTML = '<option value="">Selecione</option>';

    if (programa && subfuncao && paoe && ug && produto && adjSelecionado && macroSelecionada && pilarSelecionado) {
      carregarEixo(programa, subfuncao, paoe, ug, produto, adjSelecionado, macroSelecionada, pilarSelecionado);
    }
  });

  document.querySelector('select[name="eixo"]')?.addEventListener("change", () => {
    if (isModoAlteracao) return;

    const adjSel = document.querySelector('select[name="adj"]')?.value?.trim();
    const macroSel = document.querySelector('select[name="macropolitica"]')?.value?.trim();
    const pilarSel = document.querySelector('select[name="pilar"]')?.value?.trim();
    const eixoSel = document.querySelector('select[name="eixo"]')?.value?.trim();

    if (programa && subfuncao && paoe && ug && produto && adjSel && macroSel && pilarSel && eixoSel) {
      carregarPoliticaDecreto(programa, subfuncao, paoe, ug, produto, adjSel, macroSel, pilarSel, eixoSel);
    }
  });

  const cpfInput = document.querySelector('input[name="cpf"]');
  if (cpfInput) {
    cpfInput.addEventListener("input", () => {
      cpfInput.value = cpfInput.value.replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .substring(0, 14);
    });
  }

  const emailInput = document.querySelector('input[name="email"]');
  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      const email = emailInput.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !regex.test(email)) {
        alert("E-mail inválido. Por favor, verifique.");
        emailInput.focus();
      }
    });
  }
});

// Município Modal
// Armazenamento temporário dos municípios
const municipiosTemp = [];

// ✅ Atualizar nome automaticamente
window.atualizarNomeMunicipio = function () {
    const regiao = document.querySelector('select[name="regiao"]')?.value;
    const codigo = document.getElementById("codigoMunicipioSelect")?.value;
    const nomeInput = document.getElementById("nomeMunicipioInput");

    nomeInput.value = regioesMunicipios?.[regiao]?.[codigo] || "";
};

// ✅ Abrir modal para cadastrar ou alterar município
window.abrirFormularioMunicipio = function (alterar = false) {
    const regiaoAtual = document.querySelector('select[name="regiao"]')?.value;
    if (!regiaoAtual) {
        alert("Por favor, selecione a Região antes de cadastrar ou alterar município.");
        return;
    }

    const selectCodigo = document.getElementById("codigoMunicipioSelect");
    const inputNome = document.getElementById("nomeMunicipioInput");
    const inputId = document.getElementById("municipio_id");

    selectCodigo.innerHTML = '<option value="">Selecione o código</option>';
    inputNome.value = "";
    inputId.value = "";
    document.getElementById("unidadeMedidaMunicipio").value = "";
    document.getElementById("quantidade_municipio").value = "";

    const municipiosDaRegiao = regioesMunicipios?.[regiaoAtual];
    if (municipiosDaRegiao) {
        Object.entries(municipiosDaRegiao).forEach(([codigo, nome]) => {
            const opt = document.createElement("option");
            opt.value = codigo;
            opt.textContent = `${codigo} - ${nome}`;
            selectCodigo.appendChild(opt);
        });

        selectCodigo.removeEventListener("change", atualizarNomeMunicipio);
        selectCodigo.addEventListener("change", atualizarNomeMunicipio);
    }

    if (alterar) {
        const selecionado = document.querySelector('input[name="municipioSelecionado"]:checked');
        if (!selecionado) {
            alert("Selecione um município para alterar.");
            return;
        }

        const index = parseInt(selecionado.value);
        const m = window.municipiosTemp?.[index];
        if (!m) {
            alert("Município inválido.");
            return;
        }

        // ✅ Suporte tanto para nomes vindos do banco quanto temporários
        const codigo = m.codigo_municipio || m.codigo || "";
        const nome = m.nome_municipio || m.nome || "";

        inputId.value = index;
        selectCodigo.value = codigo;
        inputNome.value = nome;
        document.getElementById("unidadeMedidaMunicipio").value = m.un_medida || m.unidade_medida || "";
        document.getElementById("quantidade_municipio").value = (m.quantidade ?? "").toString().replace(".", ",");
    }

    const modal = new bootstrap.Modal(document.getElementById("modalMunicipio"));
    modal.show();
};

// ✅ Atualiza a tabela de municípios com base no array
function atualizarTabelaMunicipios() {
  const corpoTabela = document.getElementById("corpoTabelaMunicipios");
  corpoTabela.innerHTML = "";

  if (!Array.isArray(window.municipiosTemp)) {
    console.warn("⚠️ municipiosTemp não é um array.");
    return;
  }

  window.municipiosTemp.forEach((m, index) => {
    const codigo = m.codigo_municipio || m.codigo || "❓";
    const nome   = m.nome_municipio   || m.nome   || "❓";

    // 👇 converte de forma robusta: aceita número ou string "1,56"
    const qNum = Number(m.quantidade);
    const qVal = !isNaN(qNum) ? qNum : brToNumber(m.quantidade);
    const quantidade = numberToBR(qVal); // "1,56"

    const id = m.id !== undefined ? m.id : index;

    const linha = `
      <tr>
        <td><input type="radio" name="municipioSelecionado" value="${index}"></td>
        <td>${codigo}</td>
        <td>${nome}</td>
        <td>${quantidade}</td>
      </tr>
    `;
    corpoTabela.insertAdjacentHTML("beforeend", linha);
  });

  console.log("✅ Tabela de municípios atualizada.");
}

// ✅ Função para alterar município da tabela
document.querySelector("#btnAlterarMunicipio")?.addEventListener("click", function () {
    const selecionado = document.querySelector("input[name='municipioSelecionado']:checked");
    if (!selecionado) {
        alert("Selecione um município da tabela para alterar.");
        return;
    }

    const index = parseInt(selecionado.value);
    const municipio = window.municipiosTemp[index];

    if (!municipio) {
        alert("Município inválido.");
        return;
    }

    const codigo = municipio.codigo_municipio || municipio.codigo || "";
    const nome = municipio.nome_municipio || municipio.nome || "";

    document.getElementById("codigoMunicipioSelect").value = codigo;
    document.getElementById("nomeMunicipioInput").value = nome;
    document.getElementById("unidadeMedidaMunicipio").value = municipio.un_medida || "";
    document.getElementById("quantidade_municipio").value = (municipio.quantidade ?? "").toString().replace(".", ",");
    document.getElementById("municipio_id").value = municipio.id !== undefined ? municipio.id : index;

    const modal = new bootstrap.Modal(document.getElementById("modalMunicipio"));
    modal.show();
});

// ✅ Excluir município selecionado
window.excluirMunicipio = function () {
    const selecionado = document.querySelector('input[name="municipioSelecionado"]:checked');
    if (!selecionado) {
        alert("Selecione um município para excluir.");
        return;
    }

    const index = parseInt(selecionado.value);
    if (!isNaN(index) && window.municipiosTemp && index >= 0 && index < window.municipiosTemp.length) {
        window.municipiosTemp.splice(index, 1);
        atualizarTabelaMunicipios();
    } else {
        alert("Índice inválido para exclusão.");
    }
};

// ✅ Envia os dados dos municípios junto com o formulário principal
document.addEventListener("DOMContentLoaded", function () {
    const formSubacao = document.getElementById("formSubacaoEntrega");
    if (!formSubacao) return;

    formSubacao.addEventListener("submit", function (e) {
      // Exibe confirmação ao salvar alterações
      const modoAlteracao = document.getElementById("subacao_id")?.value;

      // Se for alteração (e não novo cadastro)
      if (modoAlteracao) {
        const confirmado = confirm("Deseja realmente atualizar esta subação?");
        if (!confirmado) {
          e.preventDefault(); // Impede o envio do formulário
          return;
        }
      }

      // Serializa os municípios
      let input = formSubacao.querySelector('input[name="municipios_json"]');
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = "municipios_json";
        formSubacao.appendChild(input);
      }
      input.value = JSON.stringify(municipiosTemp);
    });
});

function voltarEtapa7() {
    // Oculta o formulário
    document.getElementById('formularioSubacao').style.display = 'none';
    sincronizarAlturaListaSubacoes();

    // Limpa seleção de subação
    const radios = document.querySelectorAll('input[name="subacaoSelecionada"]');
    radios.forEach(r => r.checked = false);

    // Reseta o formulário da Etapa 8
    const formSub = document.getElementById('formSubacaoEntrega');
    if (formSub) {
        formSub.reset();
    }

    // Limpa a tabela de municípios
    const corpoTabela = document.getElementById("corpoTabelaMunicipios");
    if (corpoTabela) {
        corpoTabela.innerHTML = "";
    }

    // Limpa o array de municípios temporários (se existir no escopo global)
    if (typeof municipiosTemp !== "undefined" && Array.isArray(municipiosTemp)) {
        municipiosTemp.length = 0;
    }
}

// Desmarca seleção automaticamente ao atualizar a página
window.addEventListener('DOMContentLoaded', () => {
    // Desmarca seleção de subação
    const radios = document.querySelectorAll('input[name="subacaoSelecionada"]');
    radios.forEach(r => r.checked = false);

    // Reseta o formulário da Etapa 8
    const formSub = document.getElementById('formSubacaoEntrega');
    if (formSub) {
        formSub.reset();
    }

    // Limpa a tabela de municípios
    const corpoTabela = document.getElementById("corpoTabelaMunicipios");
    if (corpoTabela) {
        corpoTabela.innerHTML = "";
    }

    // Limpa o array de municípios temporários
    if (typeof municipiosTemp !== "undefined" && Array.isArray(municipiosTemp)) {
        municipiosTemp.length = 0;
    }
});

    // 🔹 Contador de Caracteres
document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Subação/Entrega
    const campoSubacao = document.getElementById("subacao_entrega");
    const contadorSubacao = document.getElementById("contador_subacao");

    if (campoSubacao && contadorSubacao) {
        campoSubacao.addEventListener("input", function () {
            const comprimento = campoSubacao.value.length;
            contadorSubacao.textContent = `${comprimento} / 250 caracteres`;

            if (comprimento > 250) {
                campoSubacao.value = campoSubacao.value.substring(0, 250);
                contadorSubacao.textContent = "250 / 250 caracteres";
            }
        });
    }

    // 🔹 Detalhamento e Qualificação do Produto
    const campoDetalhamento = document.getElementById("detalhamento_produto");
    const contadorDetalhamento = document.getElementById("contador_detalhamento");

    if (campoDetalhamento && contadorDetalhamento) {
        campoDetalhamento.addEventListener("input", function () {
            const comprimento = campoDetalhamento.value.length;
            contadorDetalhamento.textContent = `${comprimento} / 500 caracteres`;

            if (comprimento > 500) {
                campoDetalhamento.value = campoDetalhamento.value.substring(0, 500);
                contadorDetalhamento.textContent = "500 / 500 caracteres";
            }
        });
    }
});


// ✅ Versão consolidada com validações unificadas

document.addEventListener("DOMContentLoaded", function () {
    console.log("🟢 JS subacao_entrega.js carregado.");

    const formSubacao = document.getElementById("formSubacaoEntrega");
    const quantidadeInput = document.getElementById("quantidade");
    const unidadeSelect = document.getElementById("un_medida");

    const quantidadeMunicipioInput = document.getElementById("quantidade_municipio");
    const unidadeMedidaMunicipioSelect = document.getElementById("unidadeMedidaMunicipio");

    // 🔹 Máscara e formatação campo quantidade da subação
    if (quantidadeInput) {
        quantidadeInput.addEventListener("input", function (e) {
            let valor = e.target.value.replace(/[^\d,\.]/g, '');
            const partes = valor.split(/[,\.]/);
            if (partes.length > 2) valor = partes[0] + "," + partes[1];
            e.target.value = valor;
        });
    }

    // 🔹 Máscara e formatação campo quantidade do município
    if (quantidadeMunicipioInput) {
        quantidadeMunicipioInput.addEventListener("input", function (e) {
            let valor = e.target.value.replace(/[^\d,]/g, '');
            const partes = valor.split(',');
            if (partes.length > 2) valor = partes[0] + ',' + partes.slice(1).join('');
            if (partes[1]) {
                partes[1] = partes[1].slice(0, 2);
                valor = partes[0] + ',' + partes[1];
            }
            e.target.value = valor;
        });
    }

    // 🔹 Validação completa antes de enviar a subação
    if (formSubacao) {
        formSubacao.addEventListener("submit", function (e) {
            const quantidadeSubacao = brToNumber(quantidadeInput?.value);
            const unidade = unidadeSelect?.value;

            // 🚫 Quantidade inválida
            if (!quantidadeSubacao || quantidadeSubacao <= 0) {
                alert("Informe uma quantidade válida maior que 0 para a Subação.");
                quantidadeInput.focus();
                e.preventDefault();
                return;
            }

            // 🚫 Quantidade > 100 se for percentual
            if (unidade === "Percentual" && quantidadeSubacao > 100) {
                alert("Para unidade Percentual, a quantidade da Subação não pode ser maior que 100.");
                quantidadeInput.focus();
                e.preventDefault();
                return;
            }

            // 🚫 Nenhum município incluído
            if (!Array.isArray(window.municipiosTemp) || window.municipiosTemp.length === 0) {
                alert("⚠️ Você deve adicionar pelo menos um município antes de salvar a subação.");
                e.preventDefault();
                return;
            }

            // 🔍 Soma dos municípios deve ser IGUAL à quantidade da subação (em centavos)
            const totalC = toCents(quantidadeSubacao);
            const somaMunicipiosC = window.municipiosTemp.reduce((acc, m) => {
                return acc + toCents(Number(m.quantidade) || brToNumber(m.quantidade));
            }, 0);

            const diffC = totalC - somaMunicipiosC;

            if (diffC > 0) {
                alert(`A meta física dos municípios está menor que a da Subação.
Faltam ${numberToBR(diffC/100)} ${unidade} para completar.`);
                e.preventDefault();
                return;
            }

            if (diffC < 0) {
                alert(`A soma das quantidades dos municípios excede a quantidade da Subação.
Excesso de ${numberToBR(Math.abs(diffC)/100)} ${unidade}.`);
                e.preventDefault();
                return;
            }

            // ✅ Tudo certo, segue o envio
        });
    }

    // ✅ Salvar Municipio Temporario (com validação em centavos e permitindo igualdade)
    window.salvarMunicipioTemporario = function () {
        const codigo = document.getElementById("codigoMunicipioSelect")?.value;
        const unidade_medida = document.getElementById("unidadeMedidaMunicipio")?.value;
        const quantidadeRaw = document.getElementById("quantidade_municipio")?.value;
        const idBanco = document.getElementById("municipio_id")?.value;
        const regiao = document.querySelector('select[name="regiao"]')?.value;

        // ✅ Busca segura do nome do município
        const nome = codigo && regiao && regioesMunicipios?.[regiao]?.[codigo] 
            ? regioesMunicipios[regiao][codigo] 
            : document.getElementById("nomeMunicipioInput")?.value?.trim() || "";

        if (!codigo || !nome || !unidade_medida || !quantidadeRaw) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const quantidade = brToNumber(quantidadeRaw);
        if (!quantidade || quantidade <= 0) {
            alert("Quantidade inválida.");
            return;
        }

        const unSubacao = document.getElementById("unidade_medida")?.value;
        if (unidade_medida !== unSubacao) {
            alert(`A unidade de medida do município deve ser igual à unidade da Subação (${unSubacao}).`);
            return;
        }

        const quantidadeSubacao = brToNumber(document.getElementById("quantidade")?.value);
        if (!quantidadeSubacao || quantidadeSubacao <= 0) {
            alert("A quantidade total da Subação é inválida ou igual a zero.");
            return;
        }

        // 🔐 Comparação em centavos (permite IGUALDADE)
        const totalSubacaoC = toCents(quantidadeSubacao);
        const novaQtdC = toCents(quantidade);

        let totalAtualC = 0;
        window.municipiosTemp.forEach((m, i) => {
            const mesmoRegistro = m.id?.toString() === idBanco || i.toString() === idBanco;
            if (!mesmoRegistro) {
                const q = Number(m.quantidade) || brToNumber(m.quantidade);
                totalAtualC += toCents(q);
            }
        });

        const restanteC = totalSubacaoC - totalAtualC;

        if (novaQtdC > restanteC) {
            alert(`A quantidade excede o limite da Subação. Máximo permitido: ${numberToBR(restanteC/100)} ${unSubacao}.`);
            return;
        }

        const novoRegistro = {
            id: idBanco && !isNaN(idBanco) && parseInt(idBanco) >= 0 ? parseInt(idBanco) : undefined,
            codigo_municipio: codigo,
            nome_municipio: nome,
            un_medida: unidade_medida,
            quantidade
        };

        console.log("✅ Salvando município temporário:", novoRegistro);

        const index = window.municipiosTemp.findIndex(m =>
            m.id?.toString() === idBanco || window.municipiosTemp.indexOf(m).toString() === idBanco
        );

        if (idBanco !== "" && index !== -1) {
            window.municipiosTemp[index] = novoRegistro;
        } else {
            window.municipiosTemp.push(novoRegistro);
        }

        atualizarTabelaMunicipios();

        const modalEl = document.getElementById("modalMunicipio");
        bootstrap.Modal.getInstance(modalEl).hide();
    };

    // ✅ Função para excluir município da tabela
    document.querySelector("#btnExcluirMunicipio")?.addEventListener("click", function () {
        const selecionado = document.querySelector("input[name='municipioSelecionado']:checked");
        if (!selecionado) {
            alert("Selecione um município da tabela para excluir.");
            return;
        }

        const index = parseInt(selecionado.value);

        if (!window.municipiosTemp[index]) {
            alert("Município inválido.");
            return;
        }

        if (confirm("Tem certeza que deseja excluir este município?")) {
            window.municipiosTemp.splice(index, 1);
            atualizarTabelaMunicipios();
        }
    });

});

// ✅ Função de validação independente
function validarSubacaoAntesDeEnviar() {
    const form = document.getElementById("formSubacaoEntrega");
    if (!form) {
        console.error("⚠️ Formulário não encontrado.");
        alert("Erro interno: o formulário ainda não foi carregado corretamente.");
        return false;
    }

    // ✅ Validação nativa dos campos obrigatórios
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    const unidadeMedidaSelect = document.getElementById("unidade_medida");
    const quantidadeInput = document.getElementById("quantidade");

    const unidadeMedida = unidadeMedidaSelect?.value?.trim();
    const quantidadeSubacao = brToNumber(quantidadeInput?.value?.trim());

    const municipios = window.municipiosTemp || [];

    // 🔒 Validação específica para "Percentual"
    if (unidadeMedida === "Percentual") {
        if (!quantidadeSubacao || quantidadeSubacao <= 0) {
            alert("A quantidade em percentual deve ser maior que zero.");
            return false;
        }
        if (quantidadeSubacao > 100) {
            alert("A quantidade em percentual não pode ultrapassar 100.");
            return false;
        }
    }

    // 🔒 Validação geral de quantidade > 0
    if (!quantidadeSubacao || quantidadeSubacao <= 0) {
        alert("A quantidade da subação deve ser maior que zero.");
        return false;
    }

    // 🔒 Pelo menos um município deve ser cadastrado
    if (municipios.length === 0) {
        alert("⚠️ Você deve adicionar pelo menos um município antes de salvar a subação.");
        return false;
    }

    // 🔒 Valida soma total dos municípios com meta da subação (em centavos)
    const totalC = toCents(quantidadeSubacao);
    const somaC = municipios.reduce((acc, m) => {
        const q = Number(m.quantidade) || brToNumber(m.quantidade);
        return acc + toCents(q);
    }, 0);

    if (somaC < totalC) {
        const restante = (totalC - somaC) / 100;
        alert(`⚠️ A meta física dos municípios está abaixo da meta da subação. Faltam ${numberToBR(restante)} unidade(s).`);
        return false;
    }

    if (somaC > totalC) {
        const excesso = (somaC - totalC) / 100;
        alert(`⚠️ A meta física dos municípios ultrapassa a da subação em ${numberToBR(excesso)} unidade(s). Ajuste antes de prosseguir.`);
        return false;
    }

    return true;
}

// ✅ Função principal que envia a subação
window.salvarSubacaoEntrega = function () {
    const form = document.getElementById("formSubacaoEntrega");
    const rotaInserir = document.getElementById("rota_inserir");

    // 🚨 Verifica se formulário e campos obrigatórios existem
    if (!form || !document.getElementById("municipios_json") || !rotaInserir) {
        console.error("❌ Elementos obrigatórios ausentes.");
        alert("Erro interno: o formulário ainda não foi carregado corretamente.");
        return;
    }

    // ✅ Executa validações da subação e municípios
    if (!validarSubacaoAntesDeEnviar()) {
        return;
    }

    // Preenche campo oculto com os municípios temporários
    const inputMunicipios = document.getElementById("municipios_json");
    inputMunicipios.value = JSON.stringify(window.municipiosTemp);

    const formData = new FormData(form);

    fetch(rotaInserir.value, {
        method: "POST",
        body: formData,
    })
    .then(async (res) => {
        if (res.status === 409) {
            const data = await res.json();
            sessionStorage.setItem("mensagem_popup", data.mensagem || "❌ Já existe uma subação duplicada.");
            location.reload();
            return;
        }

        if (!res.ok) {
            const html = await res.text();
            console.error("⚠️ Erro ao salvar subação.");
            document.open();
            document.write(html);
            document.close();
            return;
        }

        const data = await res.json();
        if (data && data.sucesso) {
            sessionStorage.setItem("mensagem_popup", "✅ Subação cadastrada com sucesso!");
            location.reload();
        } else if (data && data.mensagem) {
            sessionStorage.setItem("mensagem_popup", data.mensagem);
            location.reload();
        }
    })
    .catch((err) => {
        console.error("❌ Erro inesperado:", err);
        alert("❌ Erro inesperado ao salvar subação.");
    });
};

function abrirPaginaEtapa() {
    const selecionado = document.querySelector('input[name="subacaoSelecionada"]:checked');
    if (!selecionado) {
        alert("Por favor, selecione uma Subação para acessar as Etapas.");
        return;
    }
    const subacaoId = selecionado.value;
    window.location.href = `/etapas/${subacaoId}`;
}

function formatarCPF(valor) {
    return String(valor || "")
        .replace(/\D/g, "")
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
}

function aplicarMascaraCPF() {
    const campos = Array.from(new Set(document.querySelectorAll('input[name="cpf"], #cpf')));

    campos.forEach((campo) => {
        if (campo.dataset.cpfMaskReady === "true") return;

        campo.value = formatarCPF(campo.value);
        campo.addEventListener("input", () => {
            campo.value = formatarCPF(campo.value);
        });
        campo.dataset.cpfMaskReady = "true";
    });
}

function sincronizarAlturaListaSubacoes() {
    const cardLista = document.querySelector(".subacao-list-card");
    const formulario = document.getElementById("formularioSubacao");
    const cardFormulario = document.querySelector(".subacao-form-card");

    if (!cardLista || !formulario || !cardFormulario) return;

    const formularioVisivel = window.getComputedStyle(formulario).display !== "none";
    const layoutMobile = window.matchMedia("(max-width: 767.98px)").matches;

    if (!formularioVisivel || layoutMobile) {
        cardLista.classList.remove("subacao-list-card--synced");
        cardLista.style.removeProperty("--subacao-list-height");
        return;
    }

    window.requestAnimationFrame(() => {
        const alturaFormulario = Math.ceil(cardFormulario.getBoundingClientRect().height);
        if (!alturaFormulario) return;

        cardLista.style.setProperty("--subacao-list-height", `${alturaFormulario}px`);
        cardLista.classList.add("subacao-list-card--synced");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    aplicarMascaraCPF();
    sincronizarAlturaListaSubacoes();

    const formulario = document.getElementById("formularioSubacao");
    if (formulario) {
        const observer = new MutationObserver(sincronizarAlturaListaSubacoes);
        observer.observe(formulario, { attributes: true, attributeFilter: ["style", "class"] });
    }

    const cardFormulario = document.querySelector(".subacao-form-card");
    if (cardFormulario && typeof ResizeObserver !== "undefined") {
        const resizeObserver = new ResizeObserver(sincronizarAlturaListaSubacoes);
        resizeObserver.observe(cardFormulario);
    }

    window.addEventListener("resize", sincronizarAlturaListaSubacoes);
});


// Expor funções globais
window.abrirFormularioSubacao = abrirFormularioSubacao;
window.fecharFormularioSubacao = fecharFormularioSubacao;
window.validarSubacao = validarSubacao;
window.excluirSubacao = excluirSubacao;
window.carregarPilar = carregarPilar;
window.carregarEixo = carregarEixo;
window.carregarPoliticaDecreto = carregarPoliticaDecreto;
window.formatarCPF = formatarCPF;
window.sincronizarAlturaListaSubacoes = sincronizarAlturaListaSubacoes;

document.addEventListener("DOMContentLoaded", function () {
    const filtro = document.getElementById("filtroSubacao");
    const linhas = Array.from(document.querySelectorAll("#corpoTabelaSubacoes tr.subacao-row"));
    const semResultado = document.getElementById("semResultadoSubacao");

    if (!filtro || linhas.length === 0) return;

    filtro.addEventListener("input", function () {
        const termo = normalizarTexto(filtro.value);
        let visiveis = 0;

        linhas.forEach((linha) => {
            const subacao = linha.cells[1]?.textContent || "";
            const produtoEntrega = linha.cells[2]?.textContent || "";
            const textoBusca = normalizarTexto(`${subacao} ${produtoEntrega}`);
            const exibir = textoBusca.includes(termo);

            linha.classList.toggle("d-none", !exibir);
            if (exibir) {
                visiveis += 1;
                return;
            }

            const radio = linha.querySelector('input[name="subacaoSelecionada"]');
            if (radio?.checked) {
                radio.checked = false;
            }
        });

        semResultado?.classList.toggle("d-none", visiveis > 0);
    });
});

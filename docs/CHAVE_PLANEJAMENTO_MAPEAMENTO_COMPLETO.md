# Mapeamento Completo - Chave de Planejamento

Data da analise: 2026-07-27

Origem dos mapas: `static/js/subacao_entrega.js`.

Este documento traz os blocos de codigo atuais dos mapas que alimentam a estrutura:

```text
Subfuncao + UG
  -> ADJ
    -> Macropolitica
      -> Pilar
        -> Eixo
          -> Politica Decreto
            -> Publico Transversal
```

## regioesPlanejamento

```js
const regioesPlanejamento = [
  "R100", "R200", "R300", "R400", "R500", "R600", "R700",
  "R800", "R900", "R1000", "R1100", "R1200", "R9900"
];
```

## subfuncaoUGMap

```js
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
    "122 - ADMINISTRAÇÃO GERAL": {"2936": "8"},
    "367 - EDUCACAO ESPECIAL": {"2957": "5"},
    "361 - ENSINO FUNDAMENTAL":{ "4172": "2"},
    "362 - ENSINO MEDIO": {"4174":"3"}
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
```

## adjMap

```js
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
```

## macropoliticaMap

```js
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
```

## pilarMap

```js
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
```

## eixoMap

```js
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
```

## politicaMap

```js
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
```

## publico_ods

Origem: `templates/subacao_entrega.html`.

```html
<select name="publico_ods" class="form-select" required autocomplete="off">
                                    <option value="" disabled selected>Selecione</option>
                                    <option value="I">I - Crianças</option>
                                    <option value="II">II - Adolescentes</option>
                                    <option value="III">III - Juventude</option>
                                    <option value="IV">IV - Mulheres</option>
                                    <option value="V">V - Pessoas idosas</option>
                                    <option value="VI">VI - Pessoas com deficiência</option>
                                    <option value="VII">VII - População em situação de rua</option>
                                    <option value="VIII">VIII - Povos indígenas</option>
                                    <option value="IX">IX - Comunidades tradicionais e quilombolas</option>
                                    <option value="X">X - Negros</option>
                                    <option value="XI">XI - Pessoas LGBTQIAPN+</option>
                                    <option value="XII">XII - Não se aplica</option>
</select>
```

## Estrutura Para Atualizacoes Futuras

Esta estrutura sera usada mais tarde para cadastrar novas acoes/PAOEs na Chave de Planejamento. Por enquanto, nao aplicar alteracoes nos mapas sem as informacoes formais.

Formato recomendado para envio:

```text
Programa:
Subfuncao:
PAOE:
UG:

Produto:
ADJ:
Macropolitica:
Pilar:
Eixo:
Politica Decreto:
```

Quando um mesmo produto tiver mais de um caminho de ADJ/Macropolitica/Pilar/Eixo/Politica Decreto, repetir o bloco do produto.

Exemplo:

```text
Programa: 534 - Infraestrutura Educacional
Subfuncao: 365 - EDUCACAO INFANTIL
PAOE: 4525 - FMTE - Educacao Infantil
UG: 10

Produto: Unidade reformada
ADJ: SAIP
Macropolitica: INFRAESTRUTURA
Pilar: P_INFRAESTR_
Eixo: E_INFRAESTRUTURA_ESC
Politica Decreto: _INFRAESTRUTURA

Produto: Unidade reformada
ADJ: EPI
Macropolitica: EPI
Pilar: EPI
Eixo: EPI
Politica Decreto: EPI
```

Formato alternativo em tabela:

```text
Programa | Subfuncao | PAOE | UG | Produto | ADJ | Macropolitica | Pilar | Eixo | Politica Decreto
534 - Infraestrutura Educacional | 365 - EDUCACAO INFANTIL | 4525 - FMTE - Educacao Infantil | 10 | Unidade reformada | SAIP | INFRAESTRUTURA | P_INFRAESTR_ | E_INFRAESTRUTURA_ESC | _INFRAESTRUTURA
```

Mapas que deverao ser atualizados quando a informacao formal for recebida:

```text
subfuncaoUGMap
adjMap
macropoliticaMap
pilarMap
eixoMap
politicaMap
```

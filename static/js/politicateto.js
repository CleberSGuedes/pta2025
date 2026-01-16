// Mapeamento global: Ação/PAOE → Subfunção + UG
const paoesubfuncaoUGMap = {
    "2009": "126.1",
    "2010": "122.1",
    "2284": "122.1",
    "4491": "122.1",
    "2014": "131.1",
    "2900": "366.4",
    "2936": "122.8",
    "2957": "367.5",
    "4172": "361.2",
    "4174": "362.3",
    "2895": "366.4",
    "4175": "366.4",
    "2897": "367.5",
    "4178": "367.5",
    "4179": "367.7",
    "2898": "361.2",
    "4173": "361.2",
    "4181": "361.7",	  
    "4524": "361.9",
    "2899": "362.3",
    "4177": "362.3",
    "4182": "362.7",
    "4180": "122.6",
    "4525": "365.10",
    "8002": "846.1",
    "8026": "845.1",
    "8040": "272.1",
    "8003": "846.1"
};

// Mapeamento PAOE + Subfunção => ADJ
const paoeadjMap = {
    "2009": {"126.1": "SAEX"},
    "2010": {"122.1": "GAB"},
    "2284": {"122.1": "GAB"},
    "4491": {"122.1": "SAGP"},
	"2014": {"131.1": "GAB"},
	"2900": {"366.4": ["SAGE", "SARC", "SAGP", "SAGR"]},
    "2936": {"122.8": ["SARC", "SAGE", "SAGP", "SAGR", "SAEX"]},
    "2957": {"367.5": ["SARC", "SAGE", "SAGP", "SAGR"]},
    "4172": {"361.2": ["SARC", "SAGE", "SAGP", "SAGR", "SAEX"]},
    "4174": {"362.3": ["SAGE", "SAGP", "SAGR", "SARC", "SAEX"]},
    "2895": {"366.4": ["SAGR", "SARC"]},
	"4175": {"366.4": ["SAAS", "SAIP", "SAGE", "SAEX", "SAGR"]},
    "2897": {"367.5": "SAGR"},
    "4178": {"367.5": ["SAAS", "SAIP", "SAGE", "SAEX", "SAGR"]},
    "4179": {"367.7": "SARC"},
    "2898": {"361.2": "SAGR"},
    "4173": {"361.2": ["SAAS", "SAIP", "SAGE", "SAEX", "SAGR"]},
    "4181": {"361.7": "SARC"},	  
    "4524": {"361.9": ["SAIP", "SAAS", "EPI"]},
    "2899": {"362.3": "SAGR"},
    "4177": {"362.3": ["SAAS", "SAIP", "SAGE", "SAEX", "SAGR"]},
    "4182": {"362.7": "SARC"},
    "4180": {"122.6": ["GAB", "SAAS", "SAIP", "SAGE", "SAGR", "SAGP", "SAEX", "SARC"]},
    "4525": {"365.10": ["SAIP", "SAAS", "EPI"]},
    "8002": {"846.1": "SAAS"},
    "8026": {"845.1": "EPI"},
    "8040": {"272.1": "SAGP"},
    "8003": {"846.1": "SAGP"}
};


// Mapeamento PAOE + Subfunção + ADJ => macropolitica
const paoemacropoliticaMap = {
    "2009": {"126.1": {"SAEX": "GESTÃO_INOVAÇÃO"}
	},
    "2010": {"122.1": {"GAB": "GESTÃO_INOVAÇÃO"}
	},
    "2284": {"122.1": {"GAB": "GESTÃO_INOVAÇÃO"}
	},
    "4491": {"122.1": {"SAGP": "VALORIZAÇÃO_PRO"}
	},
	"2014": {"131.1": {"GAB": "GESTÃO_INOVAÇÃO"}
	},
	"2900": {"366.4": {
		"SAGE": ["AVALIAÇÃO","EQUIDADE_DIVERSID", "DESENV_EDUCACIONAL", "ACESSO_E_PERM", "VALORIZAÇÃO_PRO"],
        "SARC": ["EQUIDADE_DIVERSID", "VALORIZAÇÃO_PRO"],
		"SAGP": ["VALORIZAÇÃO_PRO"],
		"SAGR": ["ACESSO_E_PERM", "CULTURA_DE_PAZ", "VALORIZAÇÃO_PRO"]
		}
	},
    "2936": {"122.8": {
		"SARC": ["REGIME_COLABORAÇÃO", "AVALIAÇÃO", "EQUIDADE_DIVERSID"], 
		"SAGE": ["AVALIAÇÃO", "CURRÍCULO_AMPLIADO", "EQUIDADE_DIVERSID", "DESENV_EDUCACIONAL"],
		"SAGP": ["VALORIZAÇÃO_PRO"], 
		"SAGR": ["ACESSO_E_PERM", "CULTURA_DE_PAZ"],
    "SAEX": ["GESTÃO_INOVAÇÃO"]
		}
	},
    "2957": {"367.5": {
		"SARC": ["REGIME_COLABORAÇÃO", "ACESSO_E_PERM", "VALORIZAÇÃO_PRO"], 
		"SAGE": ["AVALIAÇÃO", "EQUIDADE_DIVERSID", "DESENV_EDUCACIONAL", "VALORIZAÇÃO_PRO"],
		"SAGP": ["VALORIZAÇÃO_PRO"], 
		"SAGR": ["ACESSO_E_PERM", "CULTURA_DE_PAZ", "VALORIZAÇÃO_PRO"]
		}
	},
    "4172": {"361.2": {
		"SARC": ["REGIME_COLABORAÇÃO", "ACESSO_E_PERM", "VALORIZAÇÃO_PRO"],
		"SAGE": ["AVALIAÇÃO", "CURRÍCULO_AMPLIADO", "EQUIDADE_DIVERSID", "DESENV_EDUCACIONAL", "VALORIZAÇÃO_PRO"],
		"SAGP": ["VALORIZAÇÃO_PRO"], 
		"SAGR": ["ACESSO_E_PERM", "CULTURA_DE_PAZ", "VALORIZAÇÃO_PRO"],
    "SAEX": ["GESTÃO_INOVAÇÃO"]
		}
	},
    "4174": {"362.3": {
		"SAGE": ["AVALIAÇÃO", "CURRÍCULO_AMPLIADO", "EQUIDADE_DIVERSID", "DESENV_EDUCACIONAL", "VALORIZAÇÃO_PRO"],
		"SAGP": ["VALORIZAÇÃO_PRO"], 
		"SAGR": ["ACESSO_E_PERM", "CULTURA_DE_PAZ", "VALORIZAÇÃO_PRO"],
		"SARC": ["ACESSO_E_PERM", "VALORIZAÇÃO_PRO"],
    "SAEX": ["GESTÃO_INOVAÇÃO"]
		}
	},
    "2895": {"366.4": {
      "SAGR": ["ACESSO_E_PERM"],
      "SARC": ["ACESSO_E_PERM"]
    }
	},
	"4175": {"366.4": {
		"SAAS": ["INFRAESTRUTURA"], 
		"SAIP": ["INFRAESTRUTURA"], 
		"SAGE": ["CURRÍCULO_AMPLIADO"], 
		"SAEX": ["CURRÍCULO_AMPLIADO"], 
		"SAGR": ["GESTÃO_INOVAÇÃO"]
		}
	},
    "2897": {"367.5": {"SAGR": "ACESSO_E_PERM"}
	},
    "4178": {"367.5": {
		"SAAS": ["INFRAESTRUTURA"], 
		"SAIP": ["INFRAESTRUTURA"], 
		"SAGE": ["CURRÍCULO_AMPLIADO"], 
		"SAEX": ["CURRÍCULO_AMPLIADO"], 
		"SAGR": ["GESTÃO_INOVAÇÃO"]
		}
	},
    "4179": {"367.7": {"SARC": "REGIME_COLABORAÇÃO"}
	},
    "2898": {"361.2": {"SAGR": "ACESSO_E_PERM"}
	},
    "4173": {"361.2": {
		"SAAS": ["INFRAESTRUTURA"], 
		"SAIP": ["INFRAESTRUTURA"], 
		"SAGE": ["CURRÍCULO_AMPLIADO"], 
		"SAEX": ["CURRÍCULO_AMPLIADO"], 
		"SAGR": ["GESTÃO_INOVAÇÃO"]
		}
	},
    "4181": {"361.7": {"SARC": "REGIME_COLABORAÇÃO"}
	},	  
    "4524": {"361.9": {
		"SAIP": ["INFRAESTRUTURA"], 
		"SAAS": ["REGIME_COLABORAÇÃO"], 
		"EPI": ["EPI"]
		}
	},
    "2899": {"362.3": {"SAGR": "ACESSO_E_PERM"}
	},
    "4177": {"362.3":{
		"SAAS": ["INFRAESTRUTURA"], 
		"SAIP": ["INFRAESTRUTURA"], 
		"SAGE": ["CURRÍCULO_AMPLIADO", "GESTÃO_INOVAÇÃO"], 
		"SAEX": ["CURRÍCULO_AMPLIADO"], 
		"SAGR": ["GESTÃO_INOVAÇÃO"]
		}
	},
    "4182": {"362.7": {"SARC": "REGIME_COLABORAÇÃO"}
	},
    "4180": {"122.6": {
		"GAB": ["GESTÃO_INOVAÇÃO", "VALORIZAÇÃO_PRO"], 
		"SAAS": ["GESTÃO_INOVAÇÃO", "INFRAESTRUTURA", "VALORIZAÇÃO_PRO"],
		"SAIP": ["INFRAESTRUTURA", "VALORIZAÇÃO_PRO"], 
		"SAGE": ["GESTÃO_INOVAÇÃO", "VALORIZAÇÃO_PRO"], 
		"SAGR": ["GESTÃO_INOVAÇÃO", "VALORIZAÇÃO_PRO"],
    "SARC": ["VALORIZAÇÃO_PRO"], 
		"SAGP": ["VALORIZAÇÃO_PRO"],
    "SAEX": ["VALORIZAÇÃO_PRO"]
		}
	},
    "4525": {"365.10": {
		"SAIP": ["INFRAESTRUTURA"], 
		"SAAS": ["REGIME_COLABORAÇÃO"], 
		"EPI": ["EPI"]
		}
	},
    "8002": {"846.1": {"SAAS": "GESTÃO_INOVAÇÃO"}
	},
    "8026": {"845.1": {"EPI": "EPI"}
	},
    "8040": {"272.1": {"SAGP": "VALORIZAÇÃO_PRO"}
	},
    "8003": {"846.1": {"SAGP": "VALORIZAÇÃO_PRO"}
	}
};

// Mapeamento PAOE + Subfunção + ADJ + macropolitica => Pilar
const paoepilarMap = {
    "2009": {"126.1": {"SAEX": {"GESTÃO_INOVAÇÃO": "P_GESTÃO_"}
		}
	},
    "2010": {"122.1": {"GAB": {"GESTÃO_INOVAÇÃO": "P_GESTÃO_"}
		}
	},
    "2284": {"122.1": {"GAB": {"GESTÃO_INOVAÇÃO": "P_GESTÃO_"}
		}
	},
    "4491": {"122.1": {"SAGP": {"VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"}
		}
	},
	"2014": {"131.1": {"GAB": {"GESTÃO_INOVAÇÃO": "P_GESTÃO_"}
		}
	},
	"2900": {"366.4": {
		"SAGE": {
			"AVALIAÇÃO": "P_IMPACTO_",
			"EQUIDADE_DIVERSID":"P_EQUIDADE_", 
			"DESENV_EDUCACIONAL": ["P_IMPACTO_", "P_TECNOLOGIA_"],
      "ACESSO_E_PERM": "P_EQUIDADE_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
		"SARC": {
			"EQUIDADE_DIVERSID":"P_EQUIDADE_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO" 
			},
		"SAGP": {
		"VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
		"SAGR": {
			"ACESSO_E_PERM": "P_EQUIDADE_", 
			"CULTURA_DE_PAZ": "P_EQUIDADE_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}
		}
	},
    "2936": {"122.8": {
		"SARC": {
			"REGIME_COLABORAÇÃO": ["P_IMPACTO_", "P_GESTÃO_"],
			"AVALIAÇÃO": "P_IMPACTO_", 
			"EQUIDADE_DIVERSID": "P_EQUIDADE_"
			}, 
		"SAGE": {
			"AVALIAÇÃO": "P_IMPACTO_", 
			"CURRÍCULO_AMPLIADO": "P_IMPACTO_", 
			"EQUIDADE_DIVERSID": "P_EQUIDADE_", 
			"DESENV_EDUCACIONAL": ["P_IMPACTO_", "P_TECNOLOGIA_"]
			},
		"SAGP": {
			"VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}, 
		"SAGR": {
			"ACESSO_E_PERM": "P_EQUIDADE_", 
			"CULTURA_DE_PAZ": "P_EQUIDADE_"
		},
    "SAEX": {
      "GESTÃO_INOVAÇÃO": "P_IMPACTO_"
     }
		}
	},
    "2957": {"367.5": {
		"SARC": {
			"REGIME_COLABORAÇÃO": "P_IMPACTO_",
      "ACESSO_E_PERM": "P_EQUIDADE_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}, 
		"SAGE": {
			"AVALIAÇÃO": "P_IMPACTO_", 
			"EQUIDADE_DIVERSID": "P_EQUIDADE_", 
			"DESENV_EDUCACIONAL": ["P_IMPACTO_", "P_TECNOLOGIA_"],
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
		"SAGP": {
			"VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}, 
		"SAGR": {
			"ACESSO_E_PERM": "P_EQUIDADE_", 
			"CULTURA_DE_PAZ": "P_EQUIDADE_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}
		}
	},
    "4172": {"361.2": {
		"SARC": {
			"REGIME_COLABORAÇÃO": "P_IMPACTO_", 
      "ACESSO_E_PERM": "P_EQUIDADE_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
		"SAGE": {
			"AVALIAÇÃO": "P_IMPACTO_", 
			"CURRÍCULO_AMPLIADO": "P_IMPACTO_", 
			"EQUIDADE_DIVERSID": "P_EQUIDADE_", 
			"DESENV_EDUCACIONAL": ["P_IMPACTO_", "P_TECNOLOGIA_"],
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
		"SAGP": {
			"VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}, 
		"SAGR": {
			"ACESSO_E_PERM": "P_EQUIDADE_", 
			"CULTURA_DE_PAZ": "P_EQUIDADE_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
    "SAEX": {
      "GESTÃO_INOVAÇÃO": "P_IMPACTO_"
      }
		}
	},
    "4174": {"362.3": {
		"SAGE": {
			"AVALIAÇÃO": "P_IMPACTO_", 
			"CURRÍCULO_AMPLIADO": "P_IMPACTO_", 
			"EQUIDADE_DIVERSID": "P_EQUIDADE_", 
			"DESENV_EDUCACIONAL": ["P_IMPACTO_", "P_TECNOLOGIA_"],
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
		"SAGP": {
			"VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}, 
		"SAGR": {
			"ACESSO_E_PERM": "P_EQUIDADE_", 
			"CULTURA_DE_PAZ": "P_EQUIDADE_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
		"SARC": {
      "ACESSO_E_PERM": "P_EQUIDADE_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
    "SAEX": {
      "GESTÃO_INOVAÇÃO": "P_IMPACTO_"
      }
		}
	},
    "2895": {"366.4": {
		"SAGR": {
			"ACESSO_E_PERM": "P_INFRAESTR_"
			},
    "SARC": {
			"ACESSO_E_PERM": "P_INFRAESTR_"
			}
		}
	},
	"4175": {"366.4": {
		"SAAS": {
			"INFRAESTRUTURA": "P_INFRAESTR_"
			}, 
		"SAIP": {
			"INFRAESTRUTURA": "P_INFRAESTR_"
			}, 
		"SAGE": {
			"CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
			}, 
		"SAEX": {
			"CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
			}, 
		"SAGR": {
			"GESTÃO_INOVAÇÃO": "P_GESTÃO_"
			}
		}
	},
    "2897": {"367.5": {
		"SAGR": {
			"ACESSO_E_PERM": "P_INFRAESTR_"
			}
        }
	},
    "4178": {"367.5": {
		"SAAS": {
			"INFRAESTRUTURA": "P_INFRAESTR_"
			}, 
		"SAIP": {
			"INFRAESTRUTURA": "P_INFRAESTR_"
			}, 
		"SAGE": {
			"CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
			}, 
		"SAEX": {
			"CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
			}, 
		"SAGR": {
			"GESTÃO_INOVAÇÃO": "P_GESTÃO_"
			}
		}
	},
    "4179": {"367.7": {
		"SARC": {
			"REGIME_COLABORAÇÃO": "P_INFRAESTR_"
			}
		}
	},
    "2898": {"361.2": {
		"SAGR": {
			"ACESSO_E_PERM": "P_INFRAESTR_"
			}
		}
	},
    "4173": {"361.2": {
		"SAAS": {
			"INFRAESTRUTURA": "P_INFRAESTR_"
			}, 
		"SAIP": {
			"INFRAESTRUTURA": "P_INFRAESTR_"
			}, 
		"SAGE": {
			"CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
			}, 
		"SAEX": {
			"CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
			}, 
		"SAGR": {
			"GESTÃO_INOVAÇÃO": "P_GESTÃO_"
			}
		}
	},
    "4181": {"361.7": {
		"SARC": {
			"REGIME_COLABORAÇÃO": "P_INFRAESTR_"
			}
		}
	},		
    "4524": {"361.9": {
		"SAIP": {
			"INFRAESTRUTURA": "P_INFRAESTR_"
			}, 
		"SAAS": {
			"REGIME_COLABORAÇÃO": "P_GESTÃO_"
			}, 
		"EPI": {
			"EPI": "EPI"
			}
		}
	},
    "2899": {"362.3": {
		"SAGR": {
			"ACESSO_E_PERM": "P_INFRAESTR_"
			}
		}
	},
    "4177": {"362.3":{
		"SAAS": {
			"INFRAESTRUTURA": "P_INFRAESTR_"
			}, 
		"SAIP": {
			"INFRAESTRUTURA": "P_INFRAESTR_"
			}, 
		"SAGE": {
			"CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_",
      "GESTÃO_INOVAÇÃO": "P_GESTÃO_"
			}, 
		"SAEX": {
			"CURRÍCULO_AMPLIADO": "P_TECNOLOGIA_"
			}, 
		"SAGR": {
			"GESTÃO_INOVAÇÃO": "P_GESTÃO_"
			}
		}
	},
    "4182": {"362.7": {
		"SARC": {
			"REGIME_COLABORAÇÃO": "P_INFRAESTR_"
			}
		}
	},
    "4180": {"122.6": {
		"GAB": {
			"GESTÃO_INOVAÇÃO": "P_GESTÃO_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}, 
		"SAAS": {
			"GESTÃO_INOVAÇÃO": "P_GESTÃO_", 
			"INFRAESTRUTURA": "P_INFRAESTR_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
		"SAIP": {
			"INFRAESTRUTURA": "P_INFRAESTR_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}, 
		"SAGE": {
			"GESTÃO_INOVAÇÃO": "P_GESTÃO_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}, 
		"SAGR": {
			"GESTÃO_INOVAÇÃO": "P_GESTÃO_",
      "VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}, 
      "SARC": {
			"VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
		"SAGP": {
			"VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			},
    "SAEX": {
			"VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}
		}
	},
    "4525": {"365.10": {
		"SAIP": {
			"INFRAESTRUTURA": "P_INFRAESTR_"
			}, 
		"SAAS": {
			"REGIME_COLABORAÇÃO": "P_GESTÃO_"
			}, 
		"EPI": {
			"EPI": "EPI"
			}
		}
	},
    "8002": {"846.1": {
		"SAAS": {
			"GESTÃO_INOVAÇÃO": "P_GESTÃO_"
			}
		}
	},
    "8026": {"845.1": {
		"EPI": {
			"EPI": "EPI"
			}
		}
	},
    "8040": {"272.1": {
		"SAGP": {
			"VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}
		}
	},
    "8003": {"846.1": {
		"SAGP": {
			"VALORIZAÇÃO_PRO": "P_VALORIZ_PRO"
			}
	    }
    }
};

// Mapeamento PAOE + Subfunção + ADJ + macropolitica + Pilar => Eixo
const paoeeixoMap = {
  "2009": {
    "126.1": {
      "SAEX": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_INTEGRADA"]
        }
      }
    }
  },
  "2010": {
    "122.1": {
      "GAB": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_INTEGRADA"]
        }
      }
    }
  },
  "2284": {
    "122.1": {
        "GAB": {
          "GESTÃO_INOVAÇÃO": {
            "P_GESTÃO_": ["E_GESTÃO_INTEGRADA"]
          }
        }
      }
    },
  "4491": {
    "122.1": {
        "SAGP": {
          "VALORIZAÇÃO_PRO": {
            "P_VALORIZ_PRO": ["E_GESTÃO_DE_PESSOAS"]
          }
        }
      }
    },
  "2014": {
    "131.1": {
      "GAB": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_INTEGRADA"]
        }
      }
    }
  },
  "2900": {
    "366.4": {
      "SAGE": {
        "AVALIAÇÃO": {
          "P_IMPACTO_": ["E_AVALIAÇÃO"]
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": ["E_EDUC_EJA", "E_IMIGRANTES"]
        },
        "DESENV_EDUCACIONAL": {
          "P_IMPACTO_": ["E_SISTEMA_ESTRUT", "E_LÍNG_ESTRANGEIRAS"],
          "P_TECNOLOGIA_": ["E_PROJ_PED_INTEGRAD"]
        },
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SARC": {
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": ["E_EDUC_EJA"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": ["E_BUSCA_ATIVA", "E_MATERIAIS_UNIFORM"]
        },
        "CULTURA_DE_PAZ": {
          "P_EQUIDADE_": ["E_BEM-ESTAR_ESCOLAR", "E_CULTURA_DE_PAZ"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      }
    }
  },
  "2936": {
    "122.8": {
      "SARC": {
        "REGIME_COLABORAÇÃO": {
          "P_IMPACTO_": ["E_ALFABETIZAÇÃO"],
          "P_GESTÃO_": ["E_REGIME_COLABORAÇÃO"]
        },
        "AVALIAÇÃO": {
          "P_IMPACTO_": ["E_AVALIAÇÃO"]
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": ["E_EDUC_EJA"]
        }
      },
      "SAGE": {
        "AVALIAÇÃO": {
          "P_IMPACTO_": ["E_AVALIAÇÃO"]
        },
        "CURRÍCULO_AMPLIADO": {
          "P_IMPACTO_": ["E_ESCOLA_TEMPO_INTEG"]
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": [
            "E_EDUC_CAMPO",
            "E_EDUC_INDÍGENA",
            "E_EDUC_QUILOMBOLA",
            "E_EDUC_ESPECIAL",
            "E_EDUC_EJA"
          ]
        },
        "DESENV_EDUCACIONAL": {
          "P_IMPACTO_": ["E_LÍNG_ESTRANGEIRAS", "E_SISTEMA_ESTRUT"],
          "P_TECNOLOGIA_": ["E_PROJ_PED_INTEGRAD"]
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": ["E_BUSCA_ATIVA"]
        },
        "CULTURA_DE_PAZ": {
          "P_EQUIDADE_": ["E_BEM-ESTAR_ESCOLAR", "E_CULTURA_DE_PAZ"]
        }
      },
      "SAEX": {
        "GESTÃO_INOVAÇÃO": {
          "P_IMPACTO_": ["E_ESCOLAS_MILITARES"]
        }
      }
    }
  },
  "2957": {
    "367.5": {
      "SARC": {
        "REGIME_COLABORAÇÃO": {
          "P_IMPACTO_": ["E_ALFABETIZAÇÃO"]
        },
      "ACESSO_E_PERM": {
          "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
        },
      "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAGE": {
        "AVALIAÇÃO": {
          "P_IMPACTO_": ["E_AVALIAÇÃO"]
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": ["E_EDUC_ESPECIAL", "E_DISTÚRB_APRENDIZ",  "E_ALTAS_HABILIDADES"]
        },
        "DESENV_EDUCACIONAL": {
          "P_IMPACTO_": ["E_LÍNG_ESTRANGEIRAS", "E_SISTEMA_ESTRUT"],
          "P_TECNOLOGIA_": ["E_PROJ_PED_INTEGRAD"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": ["E_BUSCA_ATIVA", "E_MATERIAIS_UNIFORM"]
        },
        "CULTURA_DE_PAZ": {
          "P_EQUIDADE_": ["E_BEM-ESTAR_ESCOLAR", "E_CULTURA_DE_PAZ"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      }
    }
  },
  "4172": {
    "361.2": {
      "SARC": {
        "REGIME_COLABORAÇÃO": {
          "P_IMPACTO_": ["E_ALFABETIZAÇÃO"]
        },
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAGE": {
        "AVALIAÇÃO": {
          "P_IMPACTO_": ["E_AVALIAÇÃO"]
        },
        "CURRÍCULO_AMPLIADO": {
          "P_IMPACTO_": ["E_ESCOLA_TEMPO_INTEG"]
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": [
            "E_EDUC_CAMPO",
            "E_EDUC_INDÍGENA",
            "E_EDUC_QUILOMBOLA"
          ]
        },
        "DESENV_EDUCACIONAL": {
          "P_IMPACTO_": [
            "E_LÍNG_ESTRANGEIRAS",
            "E_ENSINO_FUNDAMENTAL",
            "E_SISTEMA_ESTRUT"
          ],
          "P_TECNOLOGIA_": ["E_PROJ_PED_INTEGRAD"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": [
            "E_FORMAÇÃO_DE_PROF",
            "E_VALORIZAÇÃO_PROF"
          ]
        }
      },
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": [
            "E_BUSCA_ATIVA",
            "E_MATERIAIS_UNIFORM"
          ]
        },
        "CULTURA_DE_PAZ": {
          "P_EQUIDADE_": ["E_BEM-ESTAR_ESCOLAR", "E_CULTURA_DE_PAZ"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAEX": {
        "GESTÃO_INOVAÇÃO": {
          "P_IMPACTO_": ["E_ESCOLAS_MILITARES"]
        }
      }
    }
  },
  "4174": {
    "362.3": {
      "SAGE": {
        "AVALIAÇÃO": {
          "P_IMPACTO_": ["E_AVALIAÇÃO"]
        },
        "CURRÍCULO_AMPLIADO": {
          "P_IMPACTO_": ["E_ESCOLA_TEMPO_INTEG", "E_EDUC_PROF_TEC"]
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": [
            "E_EDUC_CAMPO",
            "E_EDUC_INDÍGENA",
            "E_EDUC_QUILOMBOLA"
          ]
        },
        "DESENV_EDUCACIONAL": {
          "P_IMPACTO_": [
            "E_LÍNG_ESTRANGEIRAS",
            "E_ENSINO_MÉDIO",
            "E_SISTEMA_ESTRUT"
          ],
          "P_TECNOLOGIA_": ["E_PROJ_PED_INTEGRAD"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": [
            "E_BUSCA_ATIVA",
            "E_MATERIAIS_UNIFORM"
          ]
        },
        "CULTURA_DE_PAZ": {
          "P_EQUIDADE_": ["E_BEM-ESTAR_ESCOLAR", "E_CULTURA_DE_PAZ"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SARC": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": "E_MATERIAIS_UNIFORM"
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_FORMAÇÃO_DE_PROF"]
        }
      },
      "SAEX": {
        "GESTÃO_INOVAÇÃO": {
          "P_IMPACTO_": ["E_ESCOLAS_MILITARES"]
        }
      }
    }
  },
  "2895": {
    "366.4": {
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_INFRAESTR_": ["E_ALIMENTAÇÃO_"]
        }
      },
      "SARC": {
        "ACESSO_E_PERM": {
          "P_INFRAESTR_": ["E_ALIMENTAÇÃO_"]
        }
      }
    }
  },
  "4175": {
    "366.4": {
      "SAAS": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_GESTÃO_DO_PATRIM"]
        }
      },
      "SAIP": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_GESTÃO_DO_PATRIM", "E_INFRAESTRUTURA_ESC"]
        }
      },
      "SAGE": {
        "CURRÍCULO_AMPLIADO": {
          "P_TECNOLOGIA_": ["E_TECNOL_AMB_ESCOLAR"]
        }
      },
      "SAEX": {
        "CURRÍCULO_AMPLIADO": {
          "P_TECNOLOGIA_": ["E_TECNOL_AMB_ESCOLAR"]
        }
      },
      "SAGR": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_ESCOLAR"]
        }
      }
    }
  },
  "2897": {
    "367.5": {
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_INFRAESTR_": ["E_ALIMENTAÇÃO_"]
        }
      }
    }
  },
  "4178": {
    "367.5": {
      "SAAS": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_GESTÃO_DO_PATRIM"]
        }
      },
      "SAIP": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_GESTÃO_DO_PATRIM", "E_INFRAESTRUTURA_ESC"]
        }
      },
      "SAGE": {
        "CURRÍCULO_AMPLIADO": {
          "P_TECNOLOGIA_": ["E_TECNOL_AMB_ESCOLAR"]
        }
      },
      "SAEX": {
        "CURRÍCULO_AMPLIADO": {
          "P_TECNOLOGIA_": ["E_TECNOL_AMB_ESCOLAR"]
        }
      },
      "SAGR": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_ESCOLAR"]
        }
      }
    }
  },
  "4179": {
    "367.7": {
      "SARC": {
        "REGIME_COLABORAÇÃO": {
          "P_INFRAESTR_": ["E_TRANSPORTE_ESCOLAR"]
        }
      }
    }
  },
  "2898": {
    "361.2": {
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_INFRAESTR_": ["E_ALIMENTAÇÃO_"]
        }
      }
    }
  },
  "4173": {
    "361.2": {
      "SAAS": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_GESTÃO_DO_PATRIM"]
        }
      },
      "SAIP": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_GESTÃO_DO_PATRIM", "E_INFRAESTRUTURA_ESC"]
        }
      },
      "SAGE": {
        "CURRÍCULO_AMPLIADO": {
          "P_TECNOLOGIA_": ["E_TECNOL_AMB_ESCOLAR"]
        }
      },
      "SAEX": {
        "CURRÍCULO_AMPLIADO": {
          "P_TECNOLOGIA_": ["E_TECNOL_AMB_ESCOLAR"]
        }
      },
      "SAGR": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_ESCOLAR"]
        }
      }
    }
  },
  "4181": {
    "361.7": {
      "SARC": {
        "REGIME_COLABORAÇÃO": {
          "P_INFRAESTR_": ["E_TRANSPORTE_ESCOLAR"]
        }
      }
    }
  },
  "4524": {
    "361.9": {
      "SAIP": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_INFRAESTRUTURA_ESC"]
        }
      },
      "EPI": {
        "EPI": {
          "EPI": ["EPI"]
        }
      },
      "SAAS": {
        "REGIME_COLABORAÇÃO": {
          "P_GESTÃO_": ["E_REGIME_COLABORAÇÃO"]
        }
      }
    }
  },
  "2899": {
    "362.3": {
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_INFRAESTR_": ["E_ALIMENTAÇÃO_"]
        }
      }
    }
  },
  "4177": {
    "362.3": {
      "SAAS": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_GESTÃO_DO_PATRIM"]
        }
      },
      "SAIP": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_GESTÃO_DO_PATRIM", "E_INFRAESTRUTURA_ESC"]
        }
      },
      "SAGE": {
        "CURRÍCULO_AMPLIADO": {
          "P_TECNOLOGIA_": ["E_TECNOL_AMB_ESCOLAR"]
        },
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_ESCOLAR"]
        }
      },
      "SAEX": {
        "CURRÍCULO_AMPLIADO": {
          "P_TECNOLOGIA_": ["E_TECNOL_AMB_ESCOLAR"]
        }
      },
      "SAGR": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_ESCOLAR"]
        }
      }
    }
  },
  "4182": {
    "362.7": {
      "SARC": {
        "REGIME_COLABORAÇÃO": {
          "P_INFRAESTR_": ["E_TRANSPORTE_ESCOLAR"]
        }
      }
    }
  },
  "4180": {
    "122.6": {
      "GAB": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_INTEGRADA"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_VALORIZAÇÃO_PROF"]
        }
      },
      "SAAS": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_INTEGRADA"]
        },
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_GESTÃO_DO_PATRIM"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_VALORIZAÇÃO_PROF"]
        }
      },
      "SAGE": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_INTEGRADA"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_VALORIZAÇÃO_PROF"]
        }
      },
      "SAGR": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_INTEGRADA", "E_GESTÃO_ESCOLAR"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_VALORIZAÇÃO_PROF"]
        }
      },
      "SARC": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_VALORIZAÇÃO_PROF"]
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_GESTÃO_DE_PESSOAS", "E_VALORIZAÇÃO_PROF"]
        }
      },
      "SAIP": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_GESTÃO_DO_PATRIM", "E_INFRAESTRUTURA_ESC"]
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_VALORIZAÇÃO_PROF"]
        }
      },
      "SAEX": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_VALORIZAÇÃO_PROF"]
        }
      }
    }
  },
  "4525": {
    "365.10": {
      "SAIP": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": ["E_INFRAESTRUTURA_ESC"]
        }
      },
      "EPI": {
        "EPI": {
          "EPI": ["EPI"]
        }
      },
      "SAAS": {
        "REGIME_COLABORAÇÃO": {
          "P_GESTÃO_": ["E_REGIME_COLABORAÇÃO"]
        }
      }
    }
  },
  "8002": {
    "846.1": {
      "SAAS": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": ["E_GESTÃO_INTEGRADA"]
        }
      }
    }
  },
  "8026": {
    "845.1": {
      "EPI": {
        "EPI": {
          "EPI": ["EPI"]
        }
      }
    }
  },
  "8040": {
    "272.1": {
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_GESTÃO_DE_PESSOAS"]
        }
      }
    }
  },
  "8003": {
    "846.1": {
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": ["E_GESTÃO_DE_PESSOAS"]
        }
      }
    }
  }
};

// Mapeamento PAOE + Subfunção + ADJ + macropolitica + Pilar + Eixo => Politica Decreto
const paoepoliticaMap = {
  "2009": {
    "126.1": {
      "SAEX": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
          }
        }
      }
    }
  },
  "2010": {
    "122.1": {
      "GAB": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
          }
        }
      }
    }
  },
  "2284": {
    "122.1": {
        "GAB": {
          "GESTÃO_INOVAÇÃO": {
            "P_GESTÃO_": {
              "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
            }
          }
        }
      }
    },
  "4491": {
    "122.1": {
        "SAGP": {
          "VALORIZAÇÃO_PRO": {
            "P_VALORIZ_PRO": {
              "E_GESTÃO_DE_PESSOAS": "_GESTÃO_PESSOAS"
            }
          }
        }
      }
    },
  "2014": {
    "131.1": {
      "GAB": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
          }
        }
      }
    }
  },
  "2900": {
    "366.4": {
      "SAGE": {
        "AVALIAÇÃO": {
          "P_IMPACTO_": {
            "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
          }
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": {
            "E_EDUC_EJA": "_EDUC_EJA",
            "E_IMIGRANTES": "_EDUC_EJA"

          }
        },
        "DESENV_EDUCACIONAL": {
          "P_IMPACTO_": {
            "E_SISTEMA_ESTRUT": "_SISTEMA_ESTRUT",
            "E_LÍNG_ESTRANGEIRAS": "_LÍNGUAS_ESTRANG"
          },
          "P_TECNOLOGIA_": {
            "E_PROJ_PED_INTEGRAD": "_PROJ_PED_INTEGR"
          }
        },
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": {
            "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SARC": {
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": {
            "E_EDUC_EJA": "_EDUC_EJA"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": {
            "E_BUSCA_ATIVA": "_ACESSO_E_PERM",
            "E_MATERIAIS_UNIFORM": ["_MATERIAIS_", "_UNIFORMES_"]
          }
        },
        "CULTURA_DE_PAZ": {
          "P_EQUIDADE_": {
            "E_BEM-ESTAR_ESCOLAR": "_BEM-ESTAR_",
            "E_CULTURA_DE_PAZ": "_BEM-ESTAR_"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      }
    }
  },
  "2936": {
    "122.8": {
      "SARC": {
        "REGIME_COLABORAÇÃO": {
          "P_IMPACTO_": {
            "E_ALFABETIZAÇÃO": "_ALFABETIZAÇÃO"
          },
          "P_GESTÃO_": {
            "E_REGIME_COLABORAÇÃO": "_REGIME_COLAB"
          }
        },
        "AVALIAÇÃO": {
          "P_IMPACTO_": {
            "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
          }
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": {
            "E_EDUC_EJA": "_EDUC_EJA"
          }
        }
      },
      "SAGE": {
        "AVALIAÇÃO": {
          "P_IMPACTO_": {
            "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
          }
        },
        "CURRÍCULO_AMPLIADO": {
          "P_IMPACTO_": {
            "E_ESCOLA_TEMPO_INTEG": "_ED_TEMPO_INTEGR"
          }
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": {
            "E_EDUC_CAMPO": "_EDUC_CAMPO",
            "E_EDUC_INDÍGENA": "_EDUC_INDÍGENA",
            "E_EDUC_QUILOMBOLA": "_EDUC_QUILOMBOLA",
            "E_EDUC_ESPECIAL": "_EDUC_ESPECIAL",
            "E_EDUC_EJA": "_EDUC_EJA"
          }
        },
        "DESENV_EDUCACIONAL": {
          "P_IMPACTO_": {
            "E_LÍNG_ESTRANGEIRAS": "_LÍNGUAS_ESTRANG",
            "E_SISTEMA_ESTRUT": "_SISTEMA_ESTRUT"
          },
          "P_TECNOLOGIA_": {
            "E_PROJ_PED_INTEGRAD": "_PROJ_PED_INTEGR"
          }
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": {
            "E_BUSCA_ATIVA": "_ACESSO_E_PERM"
          }
        },
        "CULTURA_DE_PAZ": {
          "P_EQUIDADE_": {
            "E_BEM-ESTAR_ESCOLAR": "_BEM-ESTAR_",
            "E_CULTURA_DE_PAZ": "_BEM-ESTAR_"
          }
        }
      },
      "SAEX": {
        "GESTÃO_INOVAÇÃO": {
          "P_IMPACTO_": {
            "E_ESCOLAS_MILITARES": "_ESCOLAS_MILITAR"
          }
        }
      }
    }
  },
  "2957": {
    "367.5": {
      "SARC": {
        "REGIME_COLABORAÇÃO": {
          "P_IMPACTO_": {
            "E_ALFABETIZAÇÃO": "_ALFABETIZAÇÃO"
          }
        },
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": {
            "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SAGE": {
        "AVALIAÇÃO": {
          "P_IMPACTO_": {
            "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
          }
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": {
            "E_EDUC_ESPECIAL": "_EDUC_ESPECIAL",
            "E_DISTÚRB_APRENDIZ": "_EDUC_ESPECIAL",
            "E_ALTAS_HABILIDADES": "_EDUC_ESPECIAL"
          }
        },
        "DESENV_EDUCACIONAL": {
          "P_IMPACTO_": {
            "E_LÍNG_ESTRANGEIRAS": "_LÍNGUAS_ESTRANG",
            "E_SISTEMA_ESTRUT": "_SISTEMA_ESTRUT"
          },
          "P_TECNOLOGIA_": {
            "E_PROJ_PED_INTEGRAD": "_PROJ_PED_INTEGR"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": {
            "E_BUSCA_ATIVA": "_ACESSO_E_PERM",
            "E_MATERIAIS_UNIFORM": ["_MATERIAIS_", "_UNIFORMES_"]
          }
        },
        "CULTURA_DE_PAZ": {
          "P_EQUIDADE_": {
            "E_BEM-ESTAR_ESCOLAR": "_BEM-ESTAR_",
            "E_CULTURA_DE_PAZ": "_BEM-ESTAR_"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      }
    }
  },
  "4172": {
    "361.2": {
      "SARC": {
      "REGIME_COLABORAÇÃO": {
        "P_IMPACTO_": {
          "E_ALFABETIZAÇÃO": "_ALFABETIZAÇÃO"
        }
      },
      "ACESSO_E_PERM": {
          "P_EQUIDADE_": {
            "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
    },
      "SAGE": {
        "AVALIAÇÃO": {
          "P_IMPACTO_": {
            "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
          }
        },
        "CURRÍCULO_AMPLIADO": {
          "P_IMPACTO_": {
            "E_ESCOLA_TEMPO_INTEG": "_ED_TEMPO_INTEGR"
          }
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": {
            "E_EDUC_CAMPO": "_EDUC_CAMPO",
            "E_EDUC_INDÍGENA": "_EDUC_INDÍGENA",
            "E_EDUC_QUILOMBOLA": "_EDUC_QUILOMBOLA"
          }
        },
        "DESENV_EDUCACIONAL": {
          "P_IMPACTO_": {
            "E_LÍNG_ESTRANGEIRAS": "_LÍNGUAS_ESTRANG",
            "E_ENSINO_FUNDAMENTAL": "_PROJ_PED_INTEGR",
            "E_SISTEMA_ESTRUT": "_SISTEMA_ESTRUT"
          },
          "P_TECNOLOGIA_": {
            "E_PROJ_PED_INTEGRAD": "_PROJ_PED_INTEGR"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF",
            "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
          }
        }
      },
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": {
            "E_BUSCA_ATIVA": "_ACESSO_E_PERM",
            "E_MATERIAIS_UNIFORM": ["_MATERIAIS_", "_UNIFORMES_"]
          }
        },
        "CULTURA_DE_PAZ": {
          "P_EQUIDADE_": {
            "E_BEM-ESTAR_ESCOLAR": "_BEM-ESTAR_",
            "E_CULTURA_DE_PAZ": "_BEM-ESTAR_"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SAEX": {
        "GESTÃO_INOVAÇÃO": {
          "P_IMPACTO_": {
            "E_ESCOLAS_MILITARES": "_ESCOLAS_MILITAR"
          }
        }
      }
    }
  },
  "4174": {
    "362.3": {
      "SAGE": {
        "AVALIAÇÃO": {
          "P_IMPACTO_": {
            "E_AVALIAÇÃO": "_AVALIAÇÃO_MT"
          }
        },
        "CURRÍCULO_AMPLIADO": {
          "P_IMPACTO_": {
            "E_ESCOLA_TEMPO_INTEG": "_ED_TEMPO_INTEGR",
            "E_EDUC_PROF_TEC": "_NOVO_ENSINO_MÉD"
          }
        },
        "EQUIDADE_DIVERSID": {
          "P_EQUIDADE_": {
            "E_EDUC_CAMPO": "_EDUC_CAMPO",
            "E_EDUC_INDÍGENA": "_EDUC_INDÍGENA",
            "E_EDUC_QUILOMBOLA": "_EDUC_QUILOMBOLA"
          }
        },
        "DESENV_EDUCACIONAL": {
          "P_IMPACTO_": {
            "E_LÍNG_ESTRANGEIRAS": "_LÍNGUAS_ESTRANG",
            "E_ENSINO_MÉDIO": "_NOVO_ENSINO_MÉD",
            "E_SISTEMA_ESTRUT": "_SISTEMA_ESTRUT"
          },
          "P_TECNOLOGIA_": {
            "E_PROJ_PED_INTEGRAD": "_PROJ_PED_INTEGR"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": {
            "E_BUSCA_ATIVA": "_ACESSO_E_PERM",
            "E_MATERIAIS_UNIFORM": ["_MATERIAIS_", "_UNIFORMES_"]
          }
        },
        "CULTURA_DE_PAZ": {
          "P_EQUIDADE_": {
            "E_BEM-ESTAR_ESCOLAR": "_BEM-ESTAR_",
            "E_CULTURA_DE_PAZ": "_BEM-ESTAR_"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SARC": {
        "ACESSO_E_PERM": {
          "P_EQUIDADE_": {
            "E_MATERIAIS_UNIFORM": "_UNIFORMES_"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_FORMAÇÃO_DE_PROF": "_FORMAÇÃO_PROF"
          }
        }
      },
      "SAEX": {
        "GESTÃO_INOVAÇÃO": {
          "P_IMPACTO_": {
            "E_ESCOLAS_MILITARES": "_ESCOLAS_MILITAR"
          }
        }
      }
    }
  },
  "2895": {
    "366.4": {
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
  },
  "4175": {
    "366.4": {
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
            "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM",
            "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
          }
        }
      },
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
      },
      "SAGR": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
          }
        }
      }
    }
  },
  "2897": {
    "367.5": {
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_INFRAESTR_": {
            "E_ALIMENTAÇÃO_": "_ALIMENTAÇÃO_"
          }
        }
      }
    }
  },
  "4178": {
    "367.5": {
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
            "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM",
            "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
          }
        }
      },
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
      },
      "SAGR": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
          }
        }
      },
    }
  },
  "4179": {
    "367.7": {
      "SARC": {
        "REGIME_COLABORAÇÃO": {
          "P_INFRAESTR_": {
            "E_TRANSPORTE_ESCOLAR": "_TRANSPORTE_"
          }
        }
      }
    }
  },
  "2898": {
    "361.2": {
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_INFRAESTR_": {
            "E_ALIMENTAÇÃO_": "_ALIMENTAÇÃO_"
          }
        }
      }
    }
  },
  "4173": {
    "361.2": {
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
            "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM",
            "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
            }
        }
      },
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
      },
      "SAGR": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
          }
        }
      }
    }
  },
  "4181": {
    "361.7": {
      "SARC": {
        "REGIME_COLABORAÇÃO": {
          "P_INFRAESTR_": {
            "E_TRANSPORTE_ESCOLAR": "_TRANSPORTE_"
          }
        }
      }
    }
  },
  "4524": {
    "361.9": {
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
      },
      "SAAS": {
        "REGIME_COLABORAÇÃO": {
          "P_GESTÃO_": {
            "E_REGIME_COLABORAÇÃO": "_REGIME_COLAB"
          }
        }
      }
    }
  },
  "2899": {
    "362.3": {
      "SAGR": {
        "ACESSO_E_PERM": {
          "P_INFRAESTR_": {
            "E_ALIMENTAÇÃO_": "_ALIMENTAÇÃO_"
          }
        }
      }
    }
  },
  "4177": {
    "362.3": {
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
            "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM",
            "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
          }
        }
      },
      "SAGE": {
        "CURRÍCULO_AMPLIADO": {
          "P_TECNOLOGIA_": {
            "E_TECNOL_AMB_ESCOLAR": "_TECNOLOGIA_ESC"
          }
        },
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
          }
        }
      },
      "SAEX": {
        "CURRÍCULO_AMPLIADO": {
          "P_TECNOLOGIA_": {
            "E_TECNOL_AMB_ESCOLAR": "_TECNOLOGIA_ESC"
          }
        }
      },
      "SAGR": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
          }
        }
      }
    }
  },
  "4182": {
    "362.7": {
      "SARC": {
        "REGIME_COLABORAÇÃO": {
          "P_INFRAESTR_": {
            "E_TRANSPORTE_ESCOLAR": "_TRANSPORTE_"
          }
        }
      }
    }
  },
  "4180": {
    "122.6": {
      "GAB": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
          }
        }
      },
      "SAAS": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
          }
        },
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": {
            "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
          }
        }
      },
      "SAGE": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
          }
        }
      },
      "SAGR": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR",
            "E_GESTÃO_ESCOLAR": "_GESTÃO_ESCOLAR"
          }
        },
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
          }
        }
      },
      "SARC": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
          }
        }
      },
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_GESTÃO_DE_PESSOAS": "_GESTÃO_PESSOAS",
            "E_VALORIZAÇÃO_PROF": "_VALORIZ_PROF"
          }
        }
      },
      "SAIP": {
        "INFRAESTRUTURA": {
          "P_INFRAESTR_": {
            "E_GESTÃO_DO_PATRIM": "_GESTÃO_PATRIM",
            "E_INFRAESTRUTURA_ESC": "_INFRAESTRUTURA"
          }
        },
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
      }
    }
  },
  "4525": {
    "365.10": {
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
      },
      "SAAS": {
        "REGIME_COLABORAÇÃO": {
          "P_GESTÃO_": {
            "E_REGIME_COLABORAÇÃO": "_REGIME_COLAB"
          }
        }
      }
    }
  },
  "8002": {
    "846.1": {
      "SAAS": {
        "GESTÃO_INOVAÇÃO": {
          "P_GESTÃO_": {
            "E_GESTÃO_INTEGRADA": "_GESTÃO_INTEGR"
          }
        }
      }
    }
  },
  "8026": {
    "845.1": {
      "EPI": {
        "EPI": {
          "EPI": {
            "EPI": "EPI"
          }
        }
      }
    }
  },
  "8040": {
    "272.1": {
      "SAGP": {
        "VALORIZAÇÃO_PRO": {
          "P_VALORIZ_PRO": {
            "E_GESTÃO_DE_PESSOAS": "_GESTÃO_PESSOAS"
          }
        }
      }
    }
  },
  "8003": {
    "846.1": {
        "SAGP": {
          "VALORIZAÇÃO_PRO": {
            "P_VALORIZ_PRO": {
              "E_GESTÃO_DE_PESSOAS": "_GESTÃO_PESSOAS"
            }
          }
        }
      }
    }
};

// Função para preencher Subfunção + UG
function preencherSelectSubfuncaoUG(valores = "") {
    const select = document.getElementById("subfuncao_ug");
    if (!select) return;

    select.innerHTML = '<option value="">Selecione</option>';

    if (valores) {
        const lista = Array.isArray(valores) ? valores : [valores];
        lista.forEach(valor => {
            const option = document.createElement("option");
            option.value = valor;
            option.textContent = valor;
            select.appendChild(option);
        });

        if (lista.length === 1) {
            select.value = lista[0];
        }
    }
}

// Função para preencher campo ADJ com base em PAOE e Subfunção
function atualizarCampoADJ() {
    const acaoSelect = document.getElementById("acao_paoe");
    const subfuncaoSelect = document.getElementById("subfuncao_ug");
    const adjSelect = document.getElementById("adj");

    const acaoCodigo = (acaoSelect.value || "").split(" - ")[0].trim();
    const subfuncaoUG = subfuncaoSelect.value || "";

    console.log("🧩 Atualizando ADJ...");
    console.log("🔑 Ação código:", acaoCodigo);
    console.log("🔢 Subfunção + UG selecionado:", subfuncaoUG);

    const adjMap = paoeadjMap[acaoCodigo];

    // Limpa o select antes de adicionar
    adjSelect.innerHTML = '<option value="">Selecione</option>';

    if (adjMap) {
        const valorAdj = adjMap[subfuncaoUG] || adjMap["*"];
        console.log("🎯 Valor encontrado no mapa ADJ:", valorAdj);

        if (Array.isArray(valorAdj)) {
            valorAdj.forEach(opcao => {
                const option = document.createElement("option");
                option.value = opcao;
                option.text = opcao;
                adjSelect.appendChild(option);
            });

            // Se só há uma opção, selecione automaticamente
            if (valorAdj.length === 1) {
                adjSelect.value = valorAdj[0];
            }
        } else if (typeof valorAdj === "string") {
            const option = document.createElement("option");
            option.value = valorAdj;
            option.text = valorAdj;
            adjSelect.appendChild(option);
            adjSelect.value = valorAdj;
        } else {
            console.warn("⚠️ ADJ não encontrado para essa combinação.");
        }
    } else {
        console.warn("⚠️ Nenhum mapeamento de ADJ encontrado para essa ação.");
    }

    console.log("✅ ADJ atual:", adjSelect.value);
}

// Função para preencher campo Macropolitica com base em PAOE, Subfunção e ADJ
function atualizarCampoMacropolitica() {
    console.log("🧠 Atualizando Macropolítica...");
    const acaoTexto = document.getElementById("acao_paoe").value || "";
    const acaoCodigo = acaoTexto.split(" - ")[0].trim();
    const subfuncaoUG = document.getElementById("subfuncao_ug").value || "";
    const adj = document.getElementById("adj").value || "";
    const select = document.getElementById("macropolitica");

    console.log("🔍 Código da ação:", acaoCodigo);
    console.log("📌 Subfunção + UG:", subfuncaoUG);
    console.log("🧩 ADJ:", adj);

    select.innerHTML = '<option value="">Selecione</option>';

    const mapa = paoemacropoliticaMap[acaoCodigo];
    if (!mapa) {
        console.warn("⚠️ Nenhum mapeamento de Macropolítica para esta ação.");
        return;
    }

    const submapa = mapa[subfuncaoUG] || mapa["*"];
    if (!submapa) {
        console.warn("⚠️ Nenhum mapeamento para essa subfunção + UG.");
        return;
    }

    const valores = submapa[adj] || submapa["*"];
    if (!valores) {
        console.warn("⚠️ Nenhum mapeamento de Macropolítica para esse ADJ.");
        return;
    }

    // Se valor for string, transforma em array
    const lista = Array.isArray(valores) ? valores : [valores];

    lista.forEach(valor => {
        const option = document.createElement("option");
        option.value = valor;
        option.textContent = valor;
        select.appendChild(option);
    });

    if (lista.length === 1) {
        select.value = lista[0];
    }

    console.log("✅ Macropolítica carregada:", lista);
}

// Função para preencher campo Pilar
function atualizarCampoPilar() {
    console.log("🧱 Atualizando Pilar...");

    const acaoTexto = document.getElementById("acao_paoe").value || "";
    const acaoCodigo = acaoTexto.split(" - ")[0].trim();
    const subfuncaoUG = document.getElementById("subfuncao_ug").value || "";
    const adj = document.getElementById("adj").value || "";
    const macropolitica = document.getElementById("macropolitica").value || "";
    const select = document.getElementById("pilar");

    console.log("🔑 Código:", acaoCodigo);
    console.log("📌 Subfunção + UG:", subfuncaoUG);
    console.log("🧩 ADJ:", adj);
    console.log("🏛️ Macropolítica:", macropolitica);

    select.innerHTML = '<option value="">Selecione</option>';

    const mapa = paoepilarMap[acaoCodigo];
    if (!mapa) {
        console.warn("⚠️ Nenhum mapeamento de Pilar para esta ação.");
        return;
    }

    const subfuncaoData = mapa[subfuncaoUG];
    if (!subfuncaoData) {
        console.warn("⚠️ Nenhum mapeamento para essa Subfunção + UG.");
        return;
    }

    const adjData = subfuncaoData[adj];
    if (!adjData) {
        console.warn("⚠️ Nenhum mapeamento para esse ADJ.");
        return;
    }

    // Verifica se existe a chave ignorando maiúsculas/minúsculas
    const chaveMacropolitica = Object.keys(adjData).find(
        key => key.toUpperCase() === macropolitica.toUpperCase()
    );

    if (!chaveMacropolitica) {
        console.warn("⚠️ Nenhum Pilar para essa Macropolítica.");
        return;
    }

    const valores = adjData[chaveMacropolitica];
    const lista = Array.isArray(valores) ? valores : [valores];

    lista.forEach(valor => {
        const option = document.createElement("option");
        option.value = valor;
        option.textContent = valor;
        select.appendChild(option);
    });

    if (lista.length === 1) {
        select.value = lista[0];
    }

    console.log("✅ Pilar carregado:", lista);
}

// Função para preencher campo Eixo
function atualizarCampoEixo() {
    console.log("🧱 Atualizando Eixo...");

    const acaoTexto = document.getElementById("acao_paoe").value || "";
    const acaoCodigo = acaoTexto.split(" - ")[0].trim();
    const subfuncaoUG = document.getElementById("subfuncao_ug").value.trim();
    const adj = document.getElementById("adj").value.trim();
    const macropolitica = document.getElementById("macropolitica").value.trim().toUpperCase();
    const pilar = document.getElementById("pilar").value.trim();
    const select = document.getElementById("eixo");

    console.log("🔑 Código:", acaoCodigo);
    console.log("📌 Subfunção + UG:", subfuncaoUG);
    console.log("🧩 ADJ:", adj);
    console.log("🏛️ Macropolítica:", macropolitica);
    console.log("🏗️ Pilar:", pilar);

    select.innerHTML = '<option value="">Selecione</option>';

    const mapa = paoeeixoMap?.[acaoCodigo];
    if (!mapa) {
        console.warn("⚠️ Nenhum mapeamento de Eixo para esta ação.");
        return;
    }

    const subfuncaoData = mapa?.[subfuncaoUG];
    if (!subfuncaoData) {
        console.warn("⚠️ Nenhum mapeamento para essa Subfunção + UG.");
        console.log("🔎 Subfunções disponíveis:", Object.keys(mapa));
        return;
    }

    const adjData = subfuncaoData?.[adj];
    if (!adjData) {
        console.warn("⚠️ Nenhum mapeamento para esse ADJ.");
        console.log("🔎 ADJs disponíveis:", Object.keys(subfuncaoData));
        return;
    }

    const macropoliticaData = adjData?.[macropolitica];
    if (!macropoliticaData) {
        console.warn("⚠️ Nenhum mapeamento para essa Macropolítica.");
        console.log("🔎 Macropolíticas disponíveis:", Object.keys(adjData));
        return;
    }

    const pilarData = macropoliticaData?.[pilar];
    if (!pilarData) {
        console.warn("⚠️ Nenhum Eixo para esse Pilar.");
        console.log("🔎 Pilares disponíveis:", Object.keys(macropoliticaData));
        return;
    }

    const lista = Array.isArray(pilarData) ? pilarData : [pilarData];
    lista.forEach(valor => {
        const option = document.createElement("option");
        option.value = valor;
        option.textContent = valor;
        select.appendChild(option);
    });

    if (lista.length === 1) {
        select.value = lista[0];
    }

    console.log("✅ Eixo carregado:", lista);
}

// Função para preencher campo Politica Decreto
function atualizarCampoPoliticaDecreto() {
    console.log("📦 Atualizando Política do Decreto...");

    const acaoTexto = document.getElementById("acao_paoe").value || "";
    const acaoCodigo = acaoTexto.split(" - ")[0].trim();
    const subfuncaoUG = document.getElementById("subfuncao_ug").value || "";
    const adj = document.getElementById("adj").value || "";
    const macropolitica = document.getElementById("macropolitica").value || "";
    const pilar = document.getElementById("pilar").value || "";
    const eixo = document.getElementById("eixo").value || "";

    const campoPolitica = document.getElementById("politica_decreto");
    campoPolitica.innerHTML = '<option value="">Selecione a Política</option>';

    console.log("🔍 Chaves:", { acaoCodigo, subfuncaoUG, adj, macropolitica, pilar, eixo });

    const politicas = paoepoliticaMap?.[acaoCodigo]?.[subfuncaoUG]?.[adj]?.[macropolitica]?.[pilar]?.[eixo];

    if (!politicas) {
        console.warn("⚠️ Nenhuma Política encontrada.");
        return;
    }

    const lista = Array.isArray(politicas) ? politicas : [politicas];

    lista.forEach(politica => {
        const option = document.createElement("option");
        option.value = politica;
        option.textContent = politica;
        campoPolitica.appendChild(option);
    });

    console.log("✅ Políticas carregadas:", lista);
}


// Abertura do formulário
let emAlteracao = false;

function abrirFormularioPolitica(alterar = false) {
    const formulario = document.getElementById("formulario-politica");
    const radios = document.getElementsByName("selecionar_politica");
    const botaoSalvar = document.getElementById("btn-salvar-politica");

    emAlteracao = alterar;

    if (alterar) {
        const selecionado = Array.from(radios).find(r => r.checked);
        if (!selecionado) {
            alert("Selecione uma política para alterar.");
            return;
        }

        const linha = selecionado.closest("tr");

        const acaoPAOE = linha.children[1].textContent.trim();
        const regiao = linha.children[4].textContent.trim();
        const subfuncaoUG = linha.children[5].textContent.trim();
        const adj = linha.children[6].textContent.trim();
        const macropolitica = linha.children[7].textContent.trim();
        const pilar = linha.children[8].textContent.trim();
        const eixo = linha.children[9].textContent.trim();
        const politicaDecreto = linha.children[10].textContent.trim();
        const chavePlanejamento = linha.children[2].textContent.trim();
        const valorTetoTexto = linha.children[3].textContent.trim();

        document.getElementById("id").value = selecionado.value;
        document.getElementById("chave_planejamento").value = chavePlanejamento;

        const acaoCodigo = acaoPAOE.split(" - ")[0].trim();
        const opcoes = Array.from(document.querySelectorAll("#acao_paoe option"));
        const opcaoCompleta = opcoes.find(opt => opt.textContent.startsWith(acaoCodigo));
        if (opcaoCompleta) {
            $('#acao_paoe').val(opcaoCompleta.value).trigger("change");
        } else {
            console.warn("❌ Ação/PAOE não encontrada no select.");
        }

        setTimeout(() => {
            document.getElementById("regiao").innerHTML = `<option value="${regiao}">${regiao}</option>`;
            document.getElementById("regiao").value = regiao;

            document.getElementById("subfuncao_ug").innerHTML = `<option value="${subfuncaoUG}">${subfuncaoUG}</option>`;
            document.getElementById("subfuncao_ug").value = subfuncaoUG;
            atualizarCampoADJ();

            setTimeout(() => {
                document.getElementById("adj").innerHTML = `<option value="${adj}">${adj}</option>`;
                document.getElementById("adj").value = adj;
                atualizarCampoMacropolitica();

                setTimeout(() => {
                    document.getElementById("macropolitica").innerHTML = `<option value="${macropolitica}">${macropolitica}</option>`;
                    document.getElementById("macropolitica").value = macropolitica;
                    atualizarCampoPilar();

                    setTimeout(() => {
                        document.getElementById("pilar").innerHTML = `<option value="${pilar}">${pilar}</option>`;
                        document.getElementById("pilar").value = pilar;
                        atualizarCampoEixo();

                        setTimeout(() => {
                            document.getElementById("eixo").innerHTML = `<option value="${eixo}">${eixo}</option>`;
                            document.getElementById("eixo").value = eixo;
                            atualizarCampoPoliticaDecreto();

                            setTimeout(() => {
                                document.getElementById("politica_decreto").innerHTML = `<option value="${politicaDecreto}">${politicaDecreto}</option>`;
                                document.getElementById("politica_decreto").value = politicaDecreto;

                                const campoTeto = AutoNumeric.getAutoNumericElement("#teto_politica_decreto");
                                const valorTetoNumericoFinal = parseFloat(
                                    valorTetoTexto.replace(/[^\d,]/g, '').replace(',', '.')
                                );
                                if (!isNaN(valorTetoNumericoFinal) && campoTeto) {
                                    campoTeto.set(valorTetoNumericoFinal);
                                    document.getElementById("teto_politica_decreto_real").value = valorTetoNumericoFinal;
                                    document.getElementById("teto_politica_decreto").dataset.valorOriginal = valorTetoNumericoFinal;
                                } else {
                                    console.warn("⚠️ Valor do teto inválido:", valorTetoTexto);
                                }

                                atualizarChavePlanejamento();
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        }, 300);

        botaoSalvar.innerText = "Salvar Alterações";
        formulario.style.display = "block";
        window.scrollTo({ top: formulario.offsetTop, behavior: "smooth" });

    } else {
        emAlteracao = false;

        const saldoAnual = parseFloat(document.getElementById("info-saldo-anual").dataset.saldo || "0");
        if (saldoAnual <= 0) {
            alert("❌ O valor do Teto já foi totalmente distribuído para esta Fonte.");
            return;
        }

        document.getElementById("form-politicateto").reset();
        document.getElementById("id").value = "";
        document.getElementById("teto_politica_decreto_real").value = "";

        const campoTeto = AutoNumeric.getAutoNumericElement("#teto_politica_decreto");
        if (campoTeto) campoTeto.clear();

        document.getElementById("teto_politica_decreto").dataset.valorOriginal = "0";
        document.getElementById("regiao").value = "";

        $('#acao_paoe').val(null).trigger("change");
        preencherSelectSubfuncaoUG();

        botaoSalvar.innerText = "Cadastrar";
        formulario.style.display = "block";
        window.scrollTo({ top: formulario.offsetTop, behavior: "smooth" });
    }
}

function excluirPolitica() {
    const radios = document.getElementsByName("selecionar_politica");
    const selecionado = Array.from(radios).find(r => r.checked);
    if (!selecionado) {
        alert("Selecione uma política para excluir.");
        return;
    }

    const id = selecionado.value;
    const mompIdInput = document.getElementById("momp_id");
    const mompId = mompIdInput ? mompIdInput.value : null;

    if (!mompId) {
        alert("Erro: MOMP não identificado.");
        return;
    }

    if (confirm("Tem certeza que deseja excluir esta política?")) {
        window.location.href = `/excluir_politicateto/${id}/${mompId}`;
    }
}

function fecharFormularioPolitica() {
    document.getElementById("formulario-politica").style.display = "none";

    const formulario = document.getElementById("form-politicateto");
    if (formulario) {
        formulario.reset();
        const campoTeto = AutoNumeric.getAutoNumericElement("#teto_politica_decreto");
        if (campoTeto) campoTeto.clear();
        const campoReal = document.getElementById("teto_politica_decreto_real");
        if (campoReal) campoReal.value = "";
    }

    const radios = document.querySelectorAll('input[name="selecionar_politica"]');
    radios.forEach(r => r.checked = false);
}

function enviarFormularioPolitica() {
    const form = document.getElementById("form-politicateto");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const campoTeto = AutoNumeric.getAutoNumericElement("#teto_politica_decreto");
    const valorTeto = campoTeto ? campoTeto.getNumber() : 0;
    document.getElementById("teto_politica_decreto_real").value = isNaN(valorTeto) ? 0 : valorTeto;

    const mompIdInput = document.getElementById("momp_id");
    const mompId = mompIdInput ? mompIdInput.value : null;
    if (!mompId) {
        alert("Erro: MOMP não identificado. Atualize a página e tente novamente.");
        return;
    }

    const campoId = document.getElementById("id").value;
    const ehAlteracao = campoId !== "";
    const saldoPermitido = parseFloat(document.getElementById("teto_politica_decreto").dataset.saldoAnual || "0");

    if (ehAlteracao) {
        const valorTetoOriginal = parseFloat(document.getElementById("teto_politica_decreto").dataset.valorOriginal || "0");
        if (valorTeto > valorTetoOriginal) {
            const incremento = valorTeto - valorTetoOriginal;
            if (incremento > saldoPermitido) {
                alert(`❌ O valor informado excede o saldo disponível para incremento.\n\n🔢 Valor original: R$ ${valorTetoOriginal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n➕ Incremento solicitado: R$ ${incremento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n💰 Saldo permitido: R$ ${saldoPermitido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`);
                return;
            }
        }
    } else {
        if (valorTeto > saldoPermitido) {
            alert(`❌ O valor informado excede o saldo disponível.\n\n💰 O saldo permitido é de R$ ${saldoPermitido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`);
            return;
        }
    }

    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            sessionStorage.setItem("mensagem_popup", "Política salva com sucesso.");
            window.location.href = `/politicateto?momp_id=${mompId}`;
        } else {
            alert("Erro ao salvar a Política. Verifique os dados e tente novamente.");
        }
    })
    .catch(error => {
        console.error("Erro no envio:", error);
        alert("Erro inesperado. Verifique sua conexão ou entre em contato com o suporte.");
    });
}

function atualizarChavePlanejamento() {
    const regiao = document.getElementById("regiao")?.value.trim() || "";
    const subfuncao = document.getElementById("subfuncao_ug")?.value.trim() || "";
    const adj = document.getElementById("adj")?.value.trim() || "";
    const macropolitica = document.getElementById("macropolitica")?.value.trim() || "";
    const pilar = document.getElementById("pilar")?.value.trim() || "";
    const eixo = document.getElementById("eixo")?.value.trim() || "";
    const politicaDecreto = document.getElementById("politica_decreto")?.value.trim() || "";

    const chave = `* ${regiao} * ${subfuncao} * ${adj} * ${macropolitica} * ${pilar} * ${eixo} * ${politicaDecreto} *`;
    document.getElementById("chave_planejamento").value = chave;
}

document.addEventListener("DOMContentLoaded", function () {
    $('#acao_paoe').select2({
        width: '100%',
        placeholder: "Selecione uma ação",
        allowClear: true
    });

    const inputTeto = document.getElementById("teto_politica_decreto");
    const saldoAnual = parseFloat(inputTeto?.dataset?.saldoAnual || "999999999");

    const campoTeto = new AutoNumeric(inputTeto, {
        decimalCharacter: ",",
        digitGroupSeparator: ".",
        decimalPlaces: 2,
        minimumValue: "0",
        modifyValueOnWheel: false
    });

    const inputTetoReal = document.getElementById("teto_politica_decreto_real");
    const formulario = document.getElementById("form-politicateto");

    if (formulario) {
        formulario.reset();
        campoTeto.clear();
        if (inputTetoReal) inputTetoReal.value = "";

        formulario.addEventListener("submit", function (e) {
            const valorTeto = campoTeto.getNumber();
            inputTetoReal.value = valorTeto;

            if (valorTeto < 0) {
                alert("O valor do Teto Política do Decreto não pode ser negativo.");
                e.preventDefault();
            } else if (valorTeto > saldoAnual) {
                alert(`O valor informado não pode ser maior que o Saldo Anual disponível: R$ ${saldoAnual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`);
                e.preventDefault();
            }
        });
    }

    const radios = document.querySelectorAll('input[name="selecionar_politica"]');
    radios.forEach(r => r.checked = false);

    $('#acao_paoe').on('change', function () {
        const acaoSelecionada = this.value || "";
        const acaoCodigo = acaoSelecionada.split(" - ")[0].trim();
        const valorSubfuncao = paoesubfuncaoUGMap[acaoCodigo] || "";
        preencherSelectSubfuncaoUG(valorSubfuncao);

        setTimeout(() => {
            atualizarCampoADJ();
            setTimeout(() => {
                atualizarCampoMacropolitica();
                setTimeout(() => {
                    atualizarCampoPilar();
                    setTimeout(() => {
                        atualizarCampoEixo();
                        setTimeout(() => {
                            atualizarCampoPoliticaDecreto();
                            atualizarChavePlanejamento();
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    });

    document.getElementById("subfuncao_ug")?.addEventListener("change", () => {
        atualizarCampoADJ();
        setTimeout(() => {
            atualizarCampoMacropolitica();
            setTimeout(() => {
                atualizarCampoPilar();
                setTimeout(() => {
                    atualizarCampoEixo();
                    setTimeout(() => {
                        atualizarCampoPoliticaDecreto();
                        atualizarChavePlanejamento();
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    });

    document.getElementById("adj")?.addEventListener("change", () => {
        atualizarCampoMacropolitica();
        setTimeout(() => {
            atualizarCampoPilar();
            setTimeout(() => {
                atualizarCampoEixo();
                setTimeout(() => {
                    atualizarCampoPoliticaDecreto();
                    atualizarChavePlanejamento();
                }, 100);
            }, 100);
        }, 100);
    });

    document.getElementById("macropolitica")?.addEventListener("change", () => {
        atualizarCampoPilar();
        setTimeout(() => {
            atualizarCampoEixo();
            setTimeout(() => {
                atualizarCampoPoliticaDecreto();
                atualizarChavePlanejamento();
            }, 100);
        }, 100);
    });

    document.getElementById("pilar")?.addEventListener("change", () => {
        atualizarCampoEixo();
        setTimeout(() => {
            atualizarCampoPoliticaDecreto();
            atualizarChavePlanejamento();
        }, 100);
    });

    document.getElementById("eixo")?.addEventListener("change", () => {
        atualizarCampoPoliticaDecreto();
        setTimeout(() => {
            atualizarChavePlanejamento();
        }, 100);
    });

    document.getElementById("politica_decreto")?.addEventListener("change", () => {
        atualizarChavePlanejamento();
    });

    // NOVO: garantir que a mudança de REGIÃO também atualize a chave
    document.getElementById("regiao")?.addEventListener("change", () => {
        atualizarChavePlanejamento();
    });
});

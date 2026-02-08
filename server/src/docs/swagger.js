import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SAPD API',
      version: '1.0.0',
      description: 'API do Sistema de Apoio a Pessoas com Diabetes',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
  Usuario: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 3,
      },
      nome_completo: {
        type: 'string',
        example: 'Ana Souza',
      },
      email: {
        type: 'string',
        example: 'ana@sapd.com',
      },
      senha: {
        type: 'string',
        example: '$2b$10$ahvmtRoEcpKEio6Dj3W55O4A4TQmqsaOAoPpvVCJLKC1nt2MlXwZe',
      },
      data_nascimento: {
        type: 'string',
        format: 'date',
        example: '1998-05-01',
      },
      tipo_diabetes: {
        type: 'string',
        example: 'Tipo 1',
      },
      peso: {
        type: 'string',
        example: '75.50',
      },
      altura: {
        type: 'string',
        example: '3.75',
      },
      foto_perfil: {
        type: 'string',
        example: '',
      },
      status_conta: {
        type: 'string',
        example: 'ATIVA',
      },
      reset_token: {
        type: 'string',
        nullable: true,
        example: null,
      },
      reset_token_expira: {
        type: 'string',
        nullable: true,
        example: null,
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        example: '2026-01-25T00:21:12.249Z',
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        example: '2026-01-30T14:21:17.065Z',
      },
    },
  },  GlicemiaGraficoItem: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: '30/01',
      },
      valor: {
        type: 'number',
        example: 120,
      },
    },
  },

  PesoGraficoItem: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: '30/01',
      },
      valor: {
        type: 'string',
        example: '75.50',
      },
    },
  },

  RefeicaoMedicao: {
    type: 'object',
    properties: {
      calorias: {
        type: 'number',
        example: 19500,
      },
      data: {
        type: 'string',
        example: '24/01',
      },
    },
  },

  RelatorioRefeicaoItem: {
    type: 'object',
    properties: {
      nome: {
        type: 'string',
        example: 'Semana 1',
      },
      dataInicio: {
        type: 'string',
        example: '19/01',
      },
      dataFim: {
        type: 'string',
        example: '25/01',
      },
      totalCalorias: {
        type: 'number',
        example: 36000,
      },
      medicoes: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/RefeicaoMedicao',
        },
      },
      horaInicio: {
        type: 'string',
        example: '00:00',
      },
      horaFim: {
        type: 'string',
        example: '00:00',
      },
    },
  },

  PesoMedicao: {
    type: 'object',
    properties: {
      valor: {
        type: 'number',
        example: 75.5,
      },
      data: {
        type: 'string',
        example: '24/01',
      },
    },
  },

  RelatorioPesoItem: {
    type: 'object',
    properties: {
      nome: {
        type: 'string',
        example: 'Semana 1',
      },
      dataInicio: {
        type: 'string',
        example: '19/01',
      },
      dataFim: {
        type: 'string',
        example: '25/01',
      },
      medicoes: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/PesoMedicao',
        },
      },
      horaInicio: {
        type: 'string',
        example: '00:00',
      },
      horaFim: {
        type: 'string',
        example: '00:00',
      },
    },
  },

  RelatorioDashboardCompleto: {
    type: 'object',
    properties: {
      glicemia: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/GlicemiaGraficoItem',
        },
      },
      peso: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/PesoGraficoItem',
        },
      },
      relatoriosRefeicao: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/RelatorioRefeicaoItem',
        },
      },
      relatoriosPeso: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/RelatorioPesoItem',
        },
      },
    },
  },

  RelatorioPorPeriodo: {
    type: 'object',
    properties: {
      glicemia: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/GlicemiaGraficoItem',
        },
      },
      peso: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/PesoGraficoItem',
        },
      },
    },
  },
  GlicemiaRegistro: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      valor: {
        type: 'number',
        example: 110,
      },
      data: {
        type: 'string',
        example: '30/01',
      },
    },
  },

  GlicemiaCreate: {
    type: 'object',
    required: ['valor', 'data'],
    properties: {
      valor: {
        type: 'number',
        example: 120,
      },
      data: {
        type: 'string',
        example: '30/01',
      },
    },
  },

  GlicemiaUpdate: {
    type: 'object',
    properties: {
      valor: {
        type: 'number',
        example: 95,
      },
      data: {
        type: 'string',
        example: '31/01',
      },
    },
  },

  GlicemiaLista: {
    type: 'array',
    items: {
      $ref: '#/components/schemas/GlicemiaRegistro',
    },
    
  },
  InsulinaRegistro: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      tipo: {
        type: 'string',
        example: 'Rápida',
      },
      dose: {
        type: 'number',
        example: 10,
      },
      data: {
        type: 'string',
        example: '30/01',
      },
      hora: {
        type: 'string',
        example: '08:30',
      },
    },
  },

  InsulinaCreate: {
    type: 'object',
    required: ['tipo', 'dose', 'data'],
    properties: {
      tipo: {
        type: 'string',
        example: 'Basal',
      },
      dose: {
        type: 'number',
        example: 12,
      },
      data: {
        type: 'string',
        example: '31/01',
      },
      hora: {
        type: 'string',
        example: '22:00',
      },
    },
  },

  InsulinaUpdate: {
    type: 'object',
    properties: {
      tipo: {
        type: 'string',
        example: 'Rápida',
      },
      dose: {
        type: 'number',
        example: 8,
      },
      data: {
        type: 'string',
        example: '31/01',
      },
      hora: {
        type: 'string',
        example: '07:45',
      },
    },
  },

  InsulinaLista: {
    type: 'array',
    items: {
      $ref: '#/components/schemas/InsulinaRegistro',
    }},
    RefeicaoAlimento: {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 5
    },
    refeicao_id: {
      type: 'integer',
      example: 2
    },
    alimento_nome: {
      type: 'string',
      example: 'Arroz'
    },
    quantidade: {
      type: 'number',
      example: 150
    },
    calorias: {
      type: 'number',
      example: 195
    }
  }
},RefeicaoAlimentoInput: {
  type: 'object',
  required: ['alimento_nome', 'quantidade', 'calorias'],
  properties: {
    alimento_nome: {
      type: 'string',
      example: 'Arroz'
    },
    quantidade: {
      type: 'number',
      example: 150
    },
    calorias: {
      type: 'number',
      example: 195
    }
  }
},PredicaoGlicemia: {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    valor_previsto: {
      type: 'number',
      example: 135
    },
    data_prevista: {
      type: 'string',
      format: 'date-time',
      example: '2026-02-10T08:00:00.000Z'
    },
    confirmado: {
      type: 'boolean',
      example: false
    },
    valor_real: {
      type: 'number',
      nullable: true,
      example: 140
    },
    created_at: {
      type: 'string',
      format: 'date-time'
    }
  }
},PredicaoInput: {
  type: 'object',
  properties: {
    dataReferencia: {
      type: 'string',
      example: '2026-02-09'
    }
  }
},ConfirmarPredicaoInput: {
  type: 'object',
  required: ['valor_real'],
  properties: {
    valor_real: {
      type: 'number',
      example: 142
    }
  }
},PlanoAlimentar: {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    nome: {
      type: 'string',
      example: 'Plano Semanal'
    },
    data_inicio: {
      type: 'string',
      example: '2026-02-01'
    },
    data_fim: {
      type: 'string',
      example: '2026-02-07'
    },
    created_at: {
      type: 'string',
      format: 'date-time'
    }
  }
},PlanoAlimentarInput: {
  type: 'object',
  required: ['nome', 'data_inicio', 'data_fim'],
  properties: {
    nome: {
      type: 'string',
      example: 'Plano Semanal'
    },
    data_inicio: {
      type: 'string',
      example: '2026-02-01'
    },
    data_fim: {
      type: 'string',
      example: '2026-02-07'
    }
  }
},Lembrete: {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    titulo: {
      type: 'string',
      example: 'Aplicar insulina'
    },
    descricao: {
      type: 'string',
      example: 'Aplicar dose basal'
    },
    data: {
      type: 'string',
      example: '2026-02-10'
    },
    hora: {
      type: 'string',
      example: '08:00'
    },
    created_at: {
      type: 'string',
      format: 'date-time'
    }
  }
},

LembreteInput: {
  type: 'object',
  required: ['titulo', 'data', 'hora'],
  properties: {
    titulo: {
      type: 'string',
      example: 'Aplicar insulina'
    },
    descricao: {
      type: 'string',
      example: 'Aplicar dose basal'
    },
    data: {
      type: 'string',
      example: '2026-02-10'
    },
    hora: {
      type: 'string',
      example: '08:00'
    }
  }
},ComparacaoPlanoConsumo: {
  type: 'object',
  properties: {
    plano_calorias: {
      type: 'number',
      example: 2000
    },
    consumo_calorias: {
      type: 'number',
      example: 1850
    },
    diferenca_calorias: {
      type: 'number',
      example: -150
    },
    data: {
      type: 'string',
      example: '2026-02-07'
    }
  }
},AuthLoginInput: {
  type: 'object',
  required: ['email', 'senha'],
  properties: {
    email: {
      type: 'string',
      example: 'ana@sapd.com'
    },
    senha: {
      type: 'string',
      example: '123456'
    }
  }
},AuthLoginResponse: {
  type: 'object',
  properties: {
    token: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    },
    usuario: {
      $ref: '#/components/schemas/Usuario'
    }
  }
},Alimento: {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    nome: {
      type: 'string',
      example: 'Arroz branco'
    },
    calorias: {
      type: 'number',
      example: 130
    },
    created_at: {
      type: 'string',
      format: 'date-time'
    },
    updated_at: {
      type: 'string',
      format: 'date-time'
    }
  }
},AlimentoInput: {
  type: 'object',
  required: ['nome', 'calorias'],
  properties: {
    nome: {
      type: 'string',
      example: 'Arroz branco'
    },
    calorias: {
      type: 'number',
      example: 130
    }
  }
},AlimentoUpdate: {
  type: 'object',
  properties: {
    nome: {
      type: 'string',
      example: 'Arroz integral'
    },
    calorias: {
      type: 'number',
      example: 120
    }
  }
},AlimentoLista: {
  type: 'array',
  items: {
    $ref: '#/components/schemas/Alimento'
  }
},













}

      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  

  // IMPORTANTE: Swagger vai buscar as rotas aqui
  apis: ['src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

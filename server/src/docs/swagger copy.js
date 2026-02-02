import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SAPD API',
      version: '1.0.0',
      description: 'API do Sistema de Apoio a Pessoas com Diabetes'
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
// --- AUTH & USUÁRIO ---
        UsuarioCadastroInput: {
          type: 'object',
          required: ['nome_completo', 'email', 'senha'],
          properties: {
            nome_completo: { type: 'string', minLength: 3, example: 'João Silva' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            senha: { type: 'string', minLength: 6, example: 'senha123' },
            data_nascimento: { type: 'string', format: 'date', example: '1990-01-01' },
            tipo_diabetes: { type: 'string', enum: ['Tipo 1', 'Tipo 2', 'Gestacional'], example: 'Tipo 1' },
            peso: { type: 'number', example: 75.5 },
            altura: { type: 'number', example: 1.75 },
            foto_perfil: { type: 'string' }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: 'string', example: 'joao@email.com' },
            senha: { type: 'string', example: 'senha123' }
          }
        },
        RecuperarSenhaInput: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string', example: 'joao@email.com' }
          }
        },
        RedefinirSenhaInput: {
          type: 'object',
          required: ['token', 'novaSenha'],
          properties: {
            token: { type: 'string', description: 'Token enviado por e-mail' },
            novaSenha: { type: 'string', minLength: 6 }
          }
        },
        UsuarioOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome_completo: { type: 'string' },
            email: { type: 'string' },
            status_conta: { type: 'string' }
          }
        },UsuarioInput: {
          type: 'object',
          properties: {
            nome_completo: { type: 'string' },
            email: { type: 'string' },
            senha: { type: 'string' },
            data_nascimento: { type: 'string', format: 'date' },
            tipo_diabetes: { type: 'string' },
            peso: { type: 'number' },
            altura: { type: 'number' },
            foto_perfil: { type: 'string' }
          }
        }, 

// --- GLICEMIA ---
        GlicemiaInput: {
          type: 'object',
          required: ['valor', 'data_hora'],
          properties: {
            valor: { type: 'number' },
            data_hora: { type: 'string', format: 'date-time' },
            momento: { type: 'string' },
            observacao: { type: 'string' }
          }
        },
        GlicemiaOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            valor: { type: 'number' },
            data_hora: { type: 'string', format: 'date-time' },
            momento: { type: 'string' },
            observacao: { type: 'string' },
            usuario_id: { type: 'integer' }
          }
        },
        // --- INSULINA ---
        InsulinaInput: {
          type: 'object',
          required: ['quantidade_insulina', 'tipo', 'data_hora'],
          properties: {
            quantidade_insulina: { type: 'number' },
            tipo: { type: 'string' },
            data_hora: { type: 'string', format: 'date-time' },
            momento: { type: 'string' },
            observacoes: { type: 'string' }
          }
        }
      ,

        // --- GENÉRICO ---
        ErroResponse: {
          type: 'object',
          properties: { erro: { type: 'string', example: 'Mensagem de erro' } }
        },
        // --- RELATÓRIOS ---
        RelatorioGlicemiaOutput: {
          type: 'object',
          properties: {
            periodo: {
              type: 'object',
              properties: {
                dataInicio: { type: 'string', format: 'date', example: '2024-01-01' },
                dataFim: { type: 'string', format: 'date', example: '2024-01-31' }
              }
            },
            resumo: {
              type: 'object',
              properties: {
                total_medicoes: { type: 'integer', example: 45 },
                media: { type: 'number', example: 115.5 },
                minimo: { type: 'number', example: 70 },
                maximo: { type: 'number', example: 180 }
              }
            },
            medicoes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  valor: { type: 'number' },
                  data_hora: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        },
        // --- REFEIÇÕES ---
        RefeicaoInput: {
          type: 'object',
          required: ['tipo', 'data_hora', 'alimentos'],
          properties: {
            tipo: { type: 'string', example: 'Almoço', description: 'Tipo da refeição efetuada' },
            data_hora: { type: 'string', format: 'date-time', example: '2024-03-20T12:30:00Z' },
            alimentos: {
              type: 'array',
              items: {
                type: 'object',
                required: ['alimento_id', 'quantidade'],
                properties: {
                  alimento_id: { type: 'integer', example: 10 },
                  quantidade: { type: 'number', example: 150, description: 'Quantidade em gramas ou unidades' }
                }
              }
            }
          }
        },
        RefeicaoOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            usuario_id: { type: 'integer' },
            tipo: { type: 'string' },
            data_hora: { type: 'string', format: 'date-time' }
          }
        },

        // --- PREDIÇÃO DE GLICEMIA ---
        PredicaoOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            usuario_id: { type: 'integer' },
            glicemia_prevista: { type: 'number', example: 145.5 },
            data_hora: { type: 'string', format: 'date-time' },
            confirmada: { type: 'boolean', example: false },
            glicemia_real: { type: 'number', nullable: true }
          }
        },
        ConfirmarPredicaoInput: {
          type: 'object',
          required: ['glicemia_real'],
          properties: {
            glicemia_real: { type: 'number', example: 140 }
          }
        },
        // --- LEMBRETES ---
        LembreteInput: {
          type: 'object',
          required: ['tipo', 'data_hora'],
          properties: {
            tipo: { type: 'string', example: 'Medicação', description: 'Categoria do lembrete' },
            data_hora: { type: 'string', format: 'date-time', example: '2026-02-01T08:00:00Z' },
            observacoes: { type: 'string', example: 'Tomar em jejum' }
          }
        },
        LembreteOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            usuario_id: { type: 'integer' },
            tipo: { type: 'string' },
            data_hora: { type: 'string', format: 'date-time' },
            observacoes: { type: 'string' }
          }
        },

        // --- PLANO ALIMENTAR ---
        PlanoAlimentarInput: {
          type: 'object',
          required: ['descricao', 'data_inicio', 'data_fim', 'refeicoes'],
          properties: {
            descricao: { type: 'string', example: 'Dieta de Verão' },
            data_inicio: { type: 'string', format: 'date', example: '2026-01-01' },
            data_fim: { type: 'string', format: 'date', example: '2026-03-01' },
            refeicoes: {
              type: 'array',
              items: {
                type: 'object',
                required: ['tipo', 'horario', 'alimentos'],
                properties: {
                  tipo: { type: 'string', example: 'Café da Manhã' },
                  horario: { type: 'string', example: '07:30' },
                  alimentos: {
                    type: 'array',
                    items: {
                      type: 'object',
                      required: ['alimento_id', 'quantidade'],
                      properties: {
                        alimento_id: { type: 'integer', example: 5 },
                        quantidade: { type: 'number', example: 100 }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        PlanoAlimentarOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            usuario_id: { type: 'integer' },
            descricao: { type: 'string' },
            data_inicio: { type: 'string', format: 'date' },
            data_fim: { type: 'string', format: 'date' }
          }
        },
        // --- ALIMENTOS ---

        AlimentoInput: {
          type: 'object',
          required: ['nome'],
          properties: {
            nome: { type: 'string', example: 'Arroz Integral' },
            tipo: { type: 'string', example: 'Grãos' },
            kcal: { type: 'number', example: 110, description: 'Calorias por 100g' },
            carboidratos: { type: 'number', example: 23 },
            proteinas: { type: 'number', example: 2.6 },
            gorduras: { type: 'number', example: 0.9 },
            vitaminas: { type: 'string', example: 'B1, B3, B6' }
          }
        },
        AlimentoOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            tipo: { type: 'string' },
            kcal: { type: 'number' },
            carboidratos: { type: 'number' },
            proteinas: { type: 'number' },
            gorduras: { type: 'number' },
            vitaminas: { type: 'string' }
          }
        },
        // --- ITENS DE REFEIÇÃO ---
        RefeicaoAlimentoInput: {
          type: 'object',
          required: ['alimento_id', 'quantidade'],
          properties: {
            alimento_id: { type: 'integer', example: 1 },
            quantidade: { type: 'number', example: 200, description: 'Quantidade consumida' }
          }
        },
        RefeicaoAlimentoOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            kcal: { type: 'number' },
            carboidratos: { type: 'number' },
            proteinas: { type: 'number' },
            gorduras: { type: 'number' },
            quantidade: { type: 'number' }
          }
        },

        // --- COMPARAÇÃO (Plano vs Consumo) ---
        ComparacaoOutput: {
          type: 'object',
          properties: {
            kcal: { $ref: '#/components/schemas/ItemComparacao' },
            carboidratos: { $ref: '#/components/schemas/ItemComparacao' },
            proteinas: { $ref: '#/components/schemas/ItemComparacao' },
            gorduras: { $ref: '#/components/schemas/ItemComparacao' }
          }
        },
        ItemComparacao: {
          type: 'object',
          properties: {
            planejado: { type: 'string', example: '2000.00' },
            consumido: { type: 'string', example: '1850.50' },
            diferenca: { type: 'string', example: '-149.50' },
            status: { type: 'string', enum: ['acima', 'abaixo', 'igual'], example: 'abaixo' }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }],
    paths: {
'/usuarios/cadastrar': {
        post: {
          tags: ['Usuários'],
          summary: 'Cadastro de novo usuário',
          requestBody: {
            content: { 'application/json': { schema: { $ref: '#/components/schemas/UsuarioInput' } } }
          },
          responses: { 201: { description: 'Cadastrado' } }
        }
      },
      '/usuarios/me': {
        get: {
          tags: ['Perfil'],
          summary: 'Ver dados do perfil logado',
          responses: { 200: { description: 'Dados do perfil' } }
        },
        put: {
          tags: ['Perfil'],
          summary: 'Atualizar perfil logado',
          requestBody: {
            content: { 'application/json': { schema: { $ref: '#/components/schemas/UsuarioInput' } } }
          },
          responses: { 200: { description: 'Atualizado' } }
        },
        delete: {
          tags: ['Perfil'],
          summary: 'Inativar conta',
          responses: { 200: { description: 'Inativada' } }
        }
      },
      '/usuarios/recuperar-senha': {
        post: {
          tags: ['Autenticação'],
          summary: 'Solicita token de recuperação de senha',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/RecuperarSenhaInput' } } }
          },
          responses: { 200: { description: 'Token gerado com sucesso' } }
        }
      },
      '/usuarios/redefinir-senha': {
        post: {
          tags: ['Autenticação'],
          summary: 'Redefine a senha usando o token recebido',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/RedefinirSenhaInput' } } }
          },
          responses: { 200: { description: 'Senha alterada com sucesso' } }
        }
      },

      // ROTAS PROTEGIDAS
      '/usuarios/me': {
        get: {
          tags: ['Perfil'],
          summary: 'Busca dados do perfil do usuário logado',
          security: [{ bearerAuth: [] }],
          responses: { 200: { content: { 'application/json': { schema: { type: 'object' } } } } }
        },
        put: {
          tags: ['Perfil'],
          summary: 'Atualiza dados do perfil',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/UsuarioCadastroInput' } } }
          },
          responses: { 200: { content: { 'application/json': { schema: { type: 'object' } } } } }
        },
        delete: {
          tags: ['Perfil'],
          summary: 'Inativa a conta do usuário logado',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Conta inativada com sucesso' } }
        }
      },
      '/insulina': {
        get: {
          tags: ['Insulina'],
          summary: 'Lista todas as aplicações do usuário',
          responses: {
            200: { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/InsulinaOutput' } } } } }
          }
        },
        post: {
          tags: ['Insulina'],
          summary: 'Registra uma nova aplicação de insulina',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/InsulinaInput' } } }
          },
          responses: {
            201: { content: { 'application/json': { schema: { $ref: '#/components/schemas/InsulinaOutput' } } } },
            400: { content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroResponse' } } } }
          }
        }
      },
      '/insulina/{id}': {
        get: {
          tags: ['Insulina'],
          summary: 'Busca uma aplicação específica',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { content: { 'application/json': { schema: { $ref: '#/components/schemas/InsulinaOutput' } } } },
            404: { $ref: '#/components/schemas/ErroResponse' }
          }
        },
        put: {
          tags: ['Insulina'],
          summary: 'Atualiza um registro de insulina',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/InsulinaInput' } } }
          },
          responses: {
            200: { content: { 'application/json': { schema: { $ref: '#/components/schemas/InsulinaOutput' } } } },
            400: { $ref: '#/components/schemas/ErroResponse' }
          }
        },
        delete: {
          tags: ['Insulina'],
          summary: 'Remove um registro de insulina',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 204: { description: 'Excluído com sucesso' } }
        }
      },
      '/glicemia': {
        get: {
          tags: ['Glicemia'],
          summary: 'Lista registros de glicemia',
          responses: {
            200: { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/GlicemiaOutput' } } } } }
          }
        },
        post: {
          tags: ['Glicemia'],
          summary: 'Registra glicemia',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/GlicemiaInput' } } }
          },
          responses: {
            201: { content: { 'application/json': { schema: { $ref: '#/components/schemas/GlicemiaOutput' } } } },
            400: { content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroResponse' } } } }
          }
        }
      },
      '/glicemia/{id}': {
        get: {
          tags: ['Glicemia'],
          summary: 'Busca registro específico',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { content: { 'application/json': { schema: { $ref: '#/components/schemas/GlicemiaOutput' } } } },
            404: { $ref: '#/components/schemas/ErroResponse' }
          }
        },
        delete: {
          tags: ['Glicemia'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 204: { description: 'Excluído' } }
        }
      },
      '/relatorios/glicemia': {
        get: {
          tags: ['Relatórios'],
          summary: 'Gera relatório de glicemia em PDF',
          description: 'Retorna um arquivo PDF contendo o resumo estatístico (média, mín, máx) e a lista de medições no período informado.',
          parameters: [
            {
              name: 'dataInicio',
              in: 'query',
              required: true,
              description: 'Data inicial do período (ISO 8601)',
              schema: { type: 'string', format: 'date', example: '2024-01-01' }
            },
            {
              name: 'dataFim',
              in: 'query',
              required: true,
              description: 'Data final do período (ISO 8601)',
              schema: { type: 'string', format: 'date', example: '2024-01-31' }
            }
          ],
          responses: {
            200: {
              description: 'Arquivo PDF gerado com sucesso',
              content: {
                'application/pdf': {
                  schema: { type: 'string', format: 'binary' }
                }
              }
            },
            400: { $ref: '#/components/schemas/ErroResponse' },
            401: { description: 'Não autorizado - Token ausente ou inválido' }
          }
        }
      },
      // ROTAS DE REFEIÇÕES
      '/refeicoes': {
        post: {
          tags: ['Refeições'],
          summary: 'Registra uma nova refeição com múltiplos alimentos',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/RefeicaoInput' } } }
          },
          responses: {
            201: { content: { 'application/json': { schema: { $ref: '#/components/schemas/RefeicaoOutput' } } } },
            400: { $ref: '#/components/schemas/ErroResponse' }
          }
        },
        get: {
          tags: ['Refeições'],
          summary: 'Lista histórico de refeições do usuário',
          responses: {
            200: { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/RefeicaoOutput' } } } } }
          }
        }
      },

      // ROTAS DE PREDIÇÃO
      '/predicoes': {
        post: {
          tags: ['Predição'],
          summary: 'Gera uma predição de glicemia baseada no histórico e última refeição',
          responses: {
            201: { content: { 'application/json': { schema: { $ref: '#/components/schemas/PredicaoOutput' } } } },
            400: { description: 'Sem histórico suficiente para predição', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroResponse' } } } }
          }
        },
        get: {
          tags: ['Predição'],
          summary: 'Lista histórico de predições do usuário',
          responses: {
            200: { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/PredicaoOutput' } } } } }
          }
        }
      },
      '/predicoes/{id}/confirmar': {
        put: {
          tags: ['Predição'],
          summary: 'Confirma uma predição informando o valor real medido',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ConfirmarPredicaoInput' } } }
          },
          responses: {
            204: { description: 'Predição confirmada com sucesso' }
          }
        }
      },
      // ROTAS DE LEMBRETES
      '/lembretes': {
        post: {
          tags: ['Lembretes'],
          summary: 'Cria um lembrete para o futuro',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LembreteInput' } } }
          },
          responses: {
            201: { content: { 'application/json': { schema: { $ref: '#/components/schemas/LembreteOutput' } } } },
            400: { description: 'Erro: Data no passado ou dados inválidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroResponse' } } } }
          }
        },
        get: {
          tags: ['Lembretes'],
          summary: 'Lista lembretes do usuário logado',
          responses: {
            200: { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/LembreteOutput' } } } } }
          }
        }
      },
      '/lembretes/{id}': {
        put: {
          tags: ['Lembretes'],
          summary: 'Atualiza um lembrete específico',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LembreteInput' } } }
          },
          responses: { 204: { description: 'Atualizado com sucesso' } }
        },
        delete: {
          tags: ['Lembretes'],
          summary: 'Exclui um lembrete',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 204: { description: 'Excluído com sucesso' } }
        }
      },

      // ROTAS DE PLANOS ALIMENTARES
      '/planos-alimentares': {
        post: {
          tags: ['Plano Alimentar'],
          summary: 'Cadastra um plano alimentar completo com refeições e alimentos',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/PlanoAlimentarInput' } } }
          },
          responses: {
            201: { content: { 'application/json': { schema: { $ref: '#/components/schemas/PlanoAlimentarOutput' } } } },
            400: { $ref: '#/components/schemas/ErroResponse' }
          }
        },
        get: {
          tags: ['Plano Alimentar'],
          summary: 'Lista planos alimentares do usuário',
          responses: {
            200: { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/PlanoAlimentarOutput' } } } } }
          }
        }
      },
// ROTAS DE ALIMENTOS (Base Geral)
      '/alimentos': {
        post: {
          tags: ['Alimentos'],
          summary: 'Cadastra um novo alimento na base geral',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AlimentoInput' } } }
          },
          responses: {
            201: { content: { 'application/json': { schema: { $ref: '#/components/schemas/AlimentoOutput' } } } },
            400: { $ref: '#/components/schemas/ErroResponse' }
          }
        },
        get: {
          tags: ['Alimentos'],
          summary: 'Lista todos os alimentos cadastrados',
          responses: {
            200: { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/AlimentoOutput' } } } } }
          }
        }
      },
      '/alimentos/{id}': {
        put: {
          tags: ['Alimentos'],
          summary: 'Atualiza dados de um alimento',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AlimentoInput' } } }
          },
          responses: {
            200: { content: { 'application/json': { schema: { $ref: '#/components/schemas/AlimentoOutput' } } } }
          }
        },
        delete: {
          tags: ['Alimentos'],
          summary: 'Remove um alimento da base',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 204: { description: 'Excluído' } }
        }
      },

      // ROTAS DE ITENS DE REFEIÇÃO (Relacional)
      '/refeicoes/{refeicaoId}/alimentos': {
        post: {
          tags: ['Refeições - Itens'],
          summary: 'Adiciona um alimento a uma refeição específica',
          parameters: [{ name: 'refeicaoId', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/RefeicaoAlimentoInput' } } }
          },
          responses: {
            201: { content: { 'application/json': { schema: { $ref: '#/components/schemas/RefeicaoAlimentoOutput' } } } },
            400: { $ref: '#/components/schemas/ErroResponse' }
          }
        },
        get: {
          tags: ['Refeições - Itens'],
          summary: 'Lista todos os alimentos de uma refeição específica',
          parameters: [{ name: 'refeicaoId', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/RefeicaoAlimentoOutput' } } } } }
          }
        }
      },
      '/refeicao-alimentos/{id}': {
        delete: {
          tags: ['Refeições - Itens'],
          summary: 'Remove um alimento de uma refeição pelo ID do item',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 204: { description: 'Item removido' } }
        }
      },

      // ROTAS DE COMPARAÇÃO
      '/comparacao/plano-consumo': {
        get: {
          tags: ['Relatórios'],
          summary: 'Compara os macronutrientes planejados vs consumidos',
          description: 'Calcula a soma de kcal, carboidratos, proteínas e gorduras dos planos ativos no período e compara com as refeições registradas.',
          parameters: [
            {
              name: 'dataInicio',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'date', example: '2026-01-01' }
            },
            {
              name: 'dataFim',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'date', example: '2026-01-31' }
            }
          ],
          responses: {
            200: { 
              description: 'Comparativo calculado com sucesso',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/ComparacaoOutput' } } } 
            },
            401: { description: 'Token inválido ou ausente' }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
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
        // --- USUÁRIO ---
        UsuarioCadastroInput: {
          type: 'object',
          required: ['nome_completo', 'email', 'senha'],
          properties: {
            nome_completo: { type: 'string', minLength: 3, example: 'João da Silva' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            senha: { type: 'string', minLength: 6, example: 'senha123' },
            data_nascimento: { type: 'string', format: 'date', example: '1995-05-20' },
            tipo_diabetes: { type: 'string', enum: ['Tipo 1', 'Tipo 2', 'Gestacional'], example: 'Tipo 1' },
            peso: { type: 'number', minimum: 0.1, example: 75.5 },
            altura: { type: 'number', minimum: 0.1, example: 1.75 }
          }
        },
        UsuarioCadastradoOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome_completo: { type: 'string' },
            email: { type: 'string' },
            status_conta: { type: 'string' }
          }
        },

        // --- AUTH ---
        LoginInput: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: 'string', example: 'joao@email.com' },
            senha: { type: 'string', example: 'senha123' }
          }
        },
        LoginOutput: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1Ni...' }
          }
        },

        // --- INSULINA ---
        InsulinaInput: {
          type: 'object',
          required: ['quantidade_insulina', 'tipo', 'data_hora'],
          properties: {
            quantidade_insulina: { type: 'number', minimum: 0.1, example: 5, description: 'Quantidade em unidades' },
            tipo: { type: 'string', example: 'Rápida' },
            data_hora: { type: 'string', format: 'date-time', example: '2024-03-20T12:00:00Z' },
            momento: { type: 'string', example: 'Antes do Almoço' },
            observacoes: { type: 'string', example: 'Aplicação no abdômen' }
          }
        },
        InsulinaOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            usuario_id: { type: 'integer' },
            quantidade_insulina: { type: 'number' },
            tipo: { type: 'string' },
            data_hora: { type: 'string', format: 'date-time' },
            momento: { type: 'string' },
            observacoes: { type: 'string' }
          }
        },

        // --- GLICEMIA ---
        GlicemiaInput: {
          type: 'object',
          required: ['valor', 'data_hora'],
          properties: {
            valor: { type: 'number', minimum: 1, example: 120 },
            data_hora: { type: 'string', format: 'date-time' },
            momento: { type: 'string', example: 'Pós-Prandial' },
            observacao: { type: 'string' }
          }
        },
        GlicemiaOutput: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            usuario_id: { type: 'integer' },
            valor: { type: 'number' },
            data_hora: { type: 'string', format: 'date-time' },
            momento: { type: 'string' },
            observacao: { type: 'string' }
          }
        },

        // --- GENÉRICO ---
        ErroResponse: {
          type: 'object',
          properties: { erro: { type: 'string', example: 'Mensagem de erro' } }
        }
      }
    },
    security: [{ bearerAuth: [] }],
    paths: {
      '/usuarios': {
        post: {
          tags: ['Usuários'],
          summary: 'Cadastra um novo usuário',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/UsuarioCadastroInput' } } }
          },
          responses: {
            201: { description: 'Criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/UsuarioCadastradoOutput' } } } },
            400: { content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroResponse' } } } }
          }
        }
      },
      '/auth/login': {
        post: {
          tags: ['Autenticação'],
          summary: 'Login do usuário',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } } }
          },
          responses: {
            200: { content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginOutput' } } } },
            401: { content: { 'application/json': { schema: { $ref: '#/components/schemas/ErroResponse' } } } }
          }
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
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
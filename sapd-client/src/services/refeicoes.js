import axios from 'axios';

const API_URL = 'http://localhost:3000/api/refeicoes'; // ajuste se necessário

// Cria uma instância do axios com o token de autenticação
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const RefeicoesService = {
  // Listar todas as refeições
  listar: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar refeições:', error);
      throw error;
    }
  },

  // Criar uma nova refeição
  criar: async (refeicao) => {
    try {
      const response = await api.post('/', refeicao);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar refeição:', error);
      throw error;
    }
  },

  // Excluir uma refeição
  excluir: async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir refeição:', error);
      throw error;
    }
  }
};

export default RefeicoesService;
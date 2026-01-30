import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
  api.interceptors.request.use(
    (config) => {
      // Tenta pegar o token salvo no navegador
      const token = localStorage.getItem('token_usuario');

      // Se tiver token, adiciona no cabeçalho
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Se o backend retornar erro 401 (Não autorizado/Token expirado)
      if (error.response && error.response.status > 299 && error.response.status < 400) {
        // Opcional: Deslogar o usuário automaticamente
        localStorage.removeItem('token_usuario');
        window.location.href = '/'; // Manda pra login
      }
      return Promise.reject(error);
    }
  );
export default api;

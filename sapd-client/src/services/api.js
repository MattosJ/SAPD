import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

/**
 * REQUEST
 * Adiciona token do localStorage OU sessionStorage
 */
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token_usuario") ||
      sessionStorage.getItem("token_usuario");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE
 * Apenas limpa token se for 401
 * NÃO redireciona aqui
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token_usuario");
      sessionStorage.removeItem("token_usuario");
    }

    return Promise.reject(error);
  }
);

export default api;

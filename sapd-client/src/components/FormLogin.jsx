import { useState } from "react";
import DynamicForm from "./FormGenerator";
import { useNavigate } from 'react-router-dom';

import "../styles/loginForm.css";
import api from "../services/api";

export default function FormLogin() {
  const navigate = useNavigate();

  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);

  const handleLogin = async () => {
    try {
      if(!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
      console.log('chegou aqui');
      const response = await api.post("/usuario/login", {
        email,
        senha,
        keepLogin,
      });

      const data = await response.data;
      localStorage.setItem('token_usuario', data.token);

      navigate('/perfil');
    } catch (error) {
      console.error('Erro ao fazer login:', error.response);
    }
  };
  return (
    <DynamicForm
      config={{
        title: "Login",
        fields: [
          {
            name: "email",
            label: "E-mail",
            type: "email",
            value: email,
            onchange: setEmail,
          },
          {
            name: "senha",
            label: "Senha",
            type: "password",
            value: senha,
            onchange: setSenha,
          },
          {
            name: "keepLogin",
            label: "Manter login",
            type: "checkbox",
            value: keepLogin,
            onchange: setKeepLogin,
          },
        ],
        navigationItems: [
          {
            label: "Não tem uma conta?",
            actionLabel: "Registre-se",
            to: "/registro",
          },
          {
            label: "Esqueceu a senha?",
            actionLabel: "Recuperar Senha",
            to: "/recuperar-acesso",
          },
        ],
        onSubmit: () => handleLogin()
      }}
    />
  );
};

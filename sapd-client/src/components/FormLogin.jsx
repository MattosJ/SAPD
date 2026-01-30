import { useState } from "react";
import DynamicForm from "./FormGenerator";
import { useNavigate } from 'react-router-dom';

import "../styles/loginForm.css";
import api from "../services/api";

export default function FormLogin() {
  const navigate = useNavigate();

  const FormLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepLogin, setKeepLogin] = useState(false);

    const handleLogin = async () => {
      try {
        if(!email || !password) {
          alert("Por favor, preencha todos os campos.");
          return;
        }
        const response = await api.post("/login", {
          email,
          password,
          keepLogin,
        });

        const data = await response.json();
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
              name: "password",
              label: "Senha",
              type: "password",
              value: password,
              onchange: setPassword,
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
}

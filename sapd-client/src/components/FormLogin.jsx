import { useState } from "react";
import DynamicForm from "./FormGenerator";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/loginForm.css";

export default function FormLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !senha) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/login", {
        email,
        senha,
      });

      const data = response.data;

      if (keepLogin) {
        localStorage.setItem("token_usuario", data.token);
      } else {
        sessionStorage.setItem("token_usuario", data.token);
      }

      navigate("/perfil");

    } catch (err) {
      // 🔐 Mensagem padrão de credenciais inválidas
      if (err.response?.status === 401) {
        setError("E-mail ou senha incorretos.");
      } else {
        setError("Erro ao realizar login. Tente novamente.");
      }
    } finally {
      setLoading(false);
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
        onSubmit: handleLogin,
      }}
    >
      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}

      {loading && (
        <p style={{ marginTop: 10 }}>
          Entrando...
        </p>
      )}
    </DynamicForm>
  );
}

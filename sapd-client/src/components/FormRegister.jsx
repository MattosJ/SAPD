import { useState } from "react";
import DynamicForm from "./FormGenerator";
import api from "../services/api";
import "../styles/loginForm.css";

const FormRegister = () => {
  const [email, setEmail] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");

      await api.post("/cadastrar", {
        email,
        nome_completo: nomeCompleto,
        senha: password, 
      });

      console.log("Usuário cadastrado com sucesso!");
     

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Erro ao cadastrar usuário"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DynamicForm
      config={{
        title: "Criar Conta",
        fields: [
          {
            name: "email",
            label: "E-mail",
            type: "email",
            value: email,
            onchange: setEmail,
          },
          {
            name: "nome_completo",
            label: "Nome Completo",
            type: "text",
            value: nomeCompleto,
            onchange: setNomeCompleto,
          },
          {
            name: "password",
            label: "Senha",
            type: "password",
            value: password,
            onchange: setPassword,
          },
        ],
        navigationItems: [
          {
            label: "Já tem uma conta?",
            actionLabel: "Entre",
            to: "/login",
          },
        ],
        onSubmit: handleRegister,
      }}
    >
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      {loading && <p>Enviando...</p>}
    </DynamicForm>
  );
};

export default FormRegister;

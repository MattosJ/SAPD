import { useState } from "react";
import DynamicForm from "./FormGenerator";
import api from "../services/api";
import "../styles/loginForm.css";

const FormRegister = () => {
  const [email, setEmail] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [password, setPassword] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [tipoDiabetes, setTipoDiabetes] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //  validação de e-mail
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  //  validação de senha
  const passwordRules = {
    minLength: password.length >= 6,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
  };

  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.hasUpper &&
    passwordRules.hasLower &&
    passwordRules.hasNumber;

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (
      !email ||
      !nomeCompleto ||
      !password ||
      !dataNascimento ||
      !tipoDiabetes
    ) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    if (!isValidEmail(email)) {
      setError("E-mail inválido");
      return;
    }

    if (!isPasswordValid) {
      setError("A senha não atende aos requisitos");
      return;
    }

    try {
      setLoading(true);

      await api.post("/usuario/cadastrar", {
        email,
        nome_completo: nomeCompleto,
        senha: password,
        data_nascimento: dataNascimento,
        tipo_diabetes: tipoDiabetes,
        peso: peso ? Number(peso) : undefined,
        altura: altura ? Number(altura) : undefined,
      });

      setSuccess("Conta criada com sucesso! 🎉");
      
      setEmail("");
      setNomeCompleto("");
      setPassword("");
      setDataNascimento("");
      setTipoDiabetes("");
      setPeso("");
      setAltura("");

    } catch (err) {
      setError(
        err.response?.data?.erro ||
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
            name: "data_nascimento",
            label: "Data de Nascimento",
            type: "date",
            value: dataNascimento,
            inline:true,
            onchange: setDataNascimento,
          },
        {
          name: "tipo_diabetes",
          label: "Tipo de Diabetes",
          type: "select",
          value: tipoDiabetes,
          inline:true,
          onchange: setTipoDiabetes,
          options: [
            { label: "Tipo 1", value: "Tipo 1" },
            { label: "Tipo 2", value: "Tipo 2" },
            { label: "Gestacional", value: "Gestacional" },
          ],
        },
          {
            name: "peso",
            label: "Peso (kg)",
            type: "number",
            value: peso,
            inline:true,
            onchange: setPeso,
            min: 0,
            max: 1000,
          },
          {
            name: "altura",
            label: "Altura (m)",
            type: "number",
            value: altura,
            inline:true,
            onchange: setAltura,
            min: 0,
            max: 3,
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
      {/*  Regras de senha */}
      <div style={{ marginTop: 10 }}>
        <p> A senha deve conter:</p>
        <ul style={{ paddingLeft: 20 }}>
          <li style={{ color: passwordRules.minLength ? "green" : "red" }}>
            Mínimo de 6 caracteres
          </li>
          <li style={{ color: passwordRules.hasUpper ? "green" : "red" }}>
            Pelo menos 1 letra maiúscula
          </li>
          <li style={{ color: passwordRules.hasLower ? "green" : "red" }}>
            Pelo menos 1 letra minúscula
          </li>
          <li style={{ color: passwordRules.hasNumber ? "green" : "red" }}>
            Pelo menos 1 número
          </li>
        </ul>
      </div>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: 10 }}>{success}</p>}
      {loading && <p>Enviando...</p>}
    </DynamicForm>
  );
};

export default FormRegister;

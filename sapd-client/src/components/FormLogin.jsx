import { useState } from "react";
import DynamicForm from "./FormGenerator";
import "../styles/loginForm.css";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);

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
        onSubmit: () => {
          console.log("Login enviado:", {
            email,
            password,
            keepLogin,
          });
        },
      }}
    />
  );
};

export default FormLogin;

import DynamicForm from "./FormGenerator";
import "../styles/loginForm.css";
const FormLogin = () => {
  return(
<DynamicForm
  config={{
    title: "Login",
    fields: [
      {
        name: "email",
        label: "E-mail",
        type: "email",
      },
      {
        name: "password",
        label: "Senha",
        type: "password",
      }
    ],
    onSubmit: (data) => {
      console.log("Login enviado:", data);
    }
  }}
/>
  
  
)
}

export default FormLogin;
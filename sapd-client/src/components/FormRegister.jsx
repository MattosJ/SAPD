import DynamicForm from "./FormGenerator";
const FormRegister = () =>{
  return(
    <DynamicForm
  config={{
    title: "Criar Conta",
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
      },
      {
        name: "keepLogin",
        label: "Manter login",
        type: "checkbox",
      }
    ],
    onSubmit: (data) => {
      console.log("Registro enviado:", data);
    }
  }}
>
  {/* Elementos extras opcionalmente enviados como children */}
  <div className="extra-links">
    <a href="/forgot-password">Esqueci minha senha</a>
  </div>
</DynamicForm>

  )
}

export default FormRegister;
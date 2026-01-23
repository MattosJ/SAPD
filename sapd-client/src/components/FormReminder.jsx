import DynamicForm from "./FormGenerator"
const FormReminder = () =>{
  return(
    <DynamicForm
  config={{
    title: "Criar Lembrete",
    fields: [
      {
        name: "title",
        label: "Título",
        type: "text",
      },
      {
        name: "description",
        label: "Descrição",
        type: "text",
      },
      {
        name: "date",
        label: "Data",
        type: "date",
      },
      {
        name: "time",
        label: "Hora",
        type: "time",
      },
      {
        name: "repeat",
        label: "Repetir lembrete",
        type: "checkbox",
      }
    ],
    onSubmit: (data) => {
      console.log("Lembrete criado:", data);
    }
  }}
/>

  ) 
}

export default FormReminder;
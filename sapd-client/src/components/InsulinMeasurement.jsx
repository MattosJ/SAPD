import DynamicForm from './FormGenerator'
const InsulinMeasurement = () =>{
  return(
    <DynamicForm
  config={{
    title: "Medição de Insulina",
    fields: [
      { name: "centena", label: "Centena", type: "number", min: 0, max: 9 },
      { name: "dezena", label: "Dezena", type: "number", min: 0, max: 9 },
      { name: "unidade", label: "Unidade", type: "number", min: 0, max: 9 },
    ],
    onSubmit: (data) => console.log("Form:", data)
  }}
/>

)
}
export default InsulinMeasurement;
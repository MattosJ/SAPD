import './App.css'
import { Link } from 'react-router-dom';
function App() {
/**
* Página Inicial da Aplicação - posteriormente alterada.
*   Cria uma linkagem para as outras páginas da aplicação
*   -`<Link></Link>` é a fomra de criar o link.
*   a propriedade `to` diz para qual rota o link será feito.
*/
  return (
    <>
      <h1>SAPD, Hello World!</h1>
      <Link to ="/signin" >Tela de login</Link>
      <Link to ="/signUP" >Tela de Registro</Link>
      <Link to="/insulinPage">Medição de Insulina</Link>
      <Link to ="/reminderPage">Página de Lembrete</Link>
    </>
  )
}

export default App;

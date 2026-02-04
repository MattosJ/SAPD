import { Routes, Route } from 'react-router-dom';
import App from '../App';
import InsulinPage from "../pages/InsulinPage"
import ReminderPage from '../pages/ReminderPage';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
/** 
* Define as rotas da aplicação
*   <Routes>
*     define onde começa e onde terminam as rotas definidas.
*   <Route>
*      é a declaração de uma nova rota, 
*         path o caminho dela.
*         element é o componente que será renderizado.
*   São retornada as rotas da aplicação.
*   Esse componente é chamado no main.js
*/
export const AppRoutes = () => {
  return (

    
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/registro" element={<Registro/>} />
      <Route path='/InsulinPage' element={<InsulinPage/>}/>
      <Route path='/reminderPage' element={<ReminderPage/>}/>
      <Route path = "/" element = {<Landing />}  />
      <Route path="*" element={<h1>404 | Página Não Encontrada</h1>} />
    </Routes>
  )
}

export default AppRoutes;

import { Routes, Route } from 'react-router-dom';
import App from '../App';
import SignIn from "../pages/SignIn"
import SignUP from "../pages/SignUp"
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
      <Route path="/signin" element={<SignIn />} />
      <Route path="signup" element={<SignUP/>} />
      <Route path = "/" element = {<App/>}  />
      <Route path="*" element={<h1>404 | Página Não Encontrada</h1>} />
    </Routes>
  )
}

export default AppRoutes;

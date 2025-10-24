import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from "../src/routes/index.jsx"
import { BrowserRouter } from 'react-router-dom'
/** 
* Renderiza as rotas da aplicação para serem renderizadas. 
*  -`<BrowserRouter/>`
*     define  o formato de roteamento.
*  -`<AppRoutes/>`
*      é o chamado da rota.
*
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
)

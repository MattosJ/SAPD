import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Perfil from './pages/Perfil';
import Relatorios from './pages/Relatorios';
import Insulina from './pages/Insulina';
import Refeicoes from './pages/Refeicoes';
import Medicoes from './pages/Medicoes';
import Login from './pages/Login';
import Registro from './pages/Registro';
import PlanosAlimentares from './pages/PlanosAlimentares';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<h1>404 | Página Não Encontrada</h1>} />
        
        <Route path="/registro" element={<Registro/>} />
        
        {/* Rotas Protegidas (Layout aparece aqui) */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/medicoes" element={<Medicoes />} />
            <Route path="/insulina" element={<Insulina />} />
            <Route path="/refeicoes" element={<Refeicoes />} />
            <Route path="/planos" element={<PlanosAlimentares />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
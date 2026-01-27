import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Simulação: Verifica se existe um item 'usuario_logado' no navegador
  const isAuth = localStorage.getItem('usuario_logado');

  // Se tiver logado, renderiza as rotas filhas (Outlet). Se não, joga pra Home (/)
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
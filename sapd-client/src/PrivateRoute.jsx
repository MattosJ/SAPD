import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Verifica token no localStorage OU sessionStorage
  const token = localStorage.getItem('token_usuario') || sessionStorage.getItem('token_usuario');

  // Se não estiver autenticado, redireciona para login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

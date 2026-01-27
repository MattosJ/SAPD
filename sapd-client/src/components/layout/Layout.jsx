import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { User, FileText, Activity, Syringe, Utensils, Settings, LogOut } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path ? 'active' : 'active';

  const handleLogout = () => {
    localStorage.removeItem('usuario_logado'); // Apaga o token
    navigate('/'); // Manda pra home
  };

  return (
    <div className="app-container">
        
      <nav className="sidebar">
        {/* Links baseados nos ícones da imagem */}
        <Link to="/perfil" className={`sidebar-icon ${isActive('/perfil')}`}><User size={24} /></Link>
        <Link to="/relatorios" className={`sidebar-icon ${isActive('/relatorios')}`}><FileText size={24} /></Link>
        <Link to="/medicoes" className={`sidebar-icon ${isActive('/medicoes')}`}><Activity size={24} /></Link>
        <Link to="/insulina" className={`sidebar-icon ${isActive('/insulina')}`}><Syringe size={24} /></Link>
        <Link to="/refeicoes" className={`sidebar-icon ${isActive('/refeicoes')}`}><Utensils size={24} /></Link>
        
        <div className="spacer"></div>
        <div onClick={handleLogout} className="sidebar-icon">
          <LogOut size={24} />
       </div>
      </nav>
      
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}
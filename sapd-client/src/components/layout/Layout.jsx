import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { User, FileText, Activity, Syringe, Utensils, Settings, LogOut, Package } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path ? 'active' : 'active';

  const handleLogout = () => {
    localStorage.removeItem('usuario_logado'); // Apaga o token
    navigate('/'); // Manda pra home
  };

  const [tema, setTema] = useState(true);

  function toggleTema() {
    setTema(!tema);
    if (tema) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return (
    <div className="app-container">
        
      <nav className="sidebar">
        {/* Links baseados nos ícones da imagem */}
        <Link to="/perfil" className={`sidebar-icon ${isActive('/perfil')}`}><User size={24} />Perfil</Link>
        <Link to="/relatorios" className={`sidebar-icon ${isActive('/relatorios')}`}><FileText size={24} />Relatórios</Link>
        <Link to="/medicoes" className={`sidebar-icon ${isActive('/medicoes')}`}><Activity size={24} />Glicemia</Link>
        <Link to="/insulina" className={`sidebar-icon ${isActive('/insulina')}`}><Syringe size={24} />Insulina</Link>
        <Link to="/refeicoes" className={`sidebar-icon ${isActive('/refeicoes')}`}><Utensils size={24} />Refeições</Link>
        <Link to="/planos" className={`sidebar-icon ${isActive('/planos')}`}><Package size={24} />Planos</Link>

        <div className="spacer"></div>
        <div onClick={handleLogout} className="sidebar-icon">
          <LogOut size={24} />
       </div>
       <div className='sidebar-icon' onClick={toggleTema} style={{cursor: 'pointer'}}>
          TEMA
       </div>
      </nav>
      
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}
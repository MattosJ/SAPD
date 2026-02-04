import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  const handleLogin = () => {

    // 2. Redireciona para o perfil
    navigate('/login');
  };

  return (
    <div className="landing">
      <h1 style={{color: '#4a6fa5', fontSize: '3rem'}}>SAPD</h1>
      <p style={{margin: '20px 0', color: '#666'}}>Seu controle de saúde simplificado.</p>
      
      {/* Botão agora chama a função handleLogin */}
      <button 
        onClick={handleLogin} 
        className="btn btn-primary" 
        style={{fontSize: '1.2rem', padding: '15px 40px'}}
      >
        Entrar
      </button>
    </div>
  );
}
import { useState, useEffect } from 'react';
import api from "../services/api";

export default function Perfil() {
  useEffect(() => {
    const buscarDados = async () => {
        try {
            const response = await api.get('/usuario');
            console.log(response);
          
            const data = response.data;
            setUser({
              nomeCompleto: data.nome_completo,
              email: data.email,
              senha: data.senha,
              dataNascimento: data.data_nascimento,
              tipoDiabetes: data.tipo_diabetes,
              altura: data.altura,
              peso: data.peso
            });
            console.log(data);
        } catch (error) {
            console.log('Erro ao buscar dados:', error.response);
        }
    };

    buscarDados();
  }, []);

  async function salvarAlteracoes() {
    try {
      await api.post('/usuario',
        {
          nome_completo: user.nomeCompleto,
          email: user.email,
          senha: user.senha,
          data_nascimento: user.dataNascimento,
          tipo_diabetes: user.tipoDiabetes,
          altura: user.altura,
          peso: user.peso,
          foto_perfil: ''
        }
      );

    } catch (error) {
      console.error('Erro ao salvar alterações:', error.response);
    }
  };

  // Mock inicial
  const [user, setUser] = useState({
    nomeCompleto: 'José dos Santos Vieira',
    email: 'jozezinho@gmail.com',
    dataNascimento: '2000-04-10',
    tipoDiabetes: 'Tipo 1',
    altura: '2.10',
    peso: '75'
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="page-title">Perfil</h2>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Avatar Mockado */}
        <div style={{ 
          width: '100px', height: '100px', backgroundColor: '#d0e0f5', 
          borderRadius: '50%', margin: '0 auto 20px', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', fontSize: '30px' 
        }}>
          👤
        </div>

        <div className="form-group">
          <label>Nome completo</label>
          <input className="input-field" name="nomeCompleto" value={user.nomeCompleto} onChange={handleChange} style={{textAlign: 'center'}} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-group" style={{flex: 1}}>
            <label>Data Nascimento</label>
            <input type="date" className="input-field" name="nascimento" value={user.dataNascimento} onChange={handleChange} style={{textAlign: 'center'}} />
          </div>
          <div className="form-group" style={{flex: 0.5}}>
            <label>Altura (m)</label>
            <input type="number" className="input-field" name="altura" value={user.altura} onChange={handleChange} style={{textAlign: 'center'}}/>
          </div>
          <div className="form-group" style={{flex: 0.5}}>
            <label>Peso (Kg)</label>
            <input type="number" className="input-field" name="peso" value={user.peso} onChange={handleChange} style={{textAlign: 'center'}}/>
          </div>
          <div className="form-group" style={{flex: 0.5}}>
            <label>Diabetes</label>
            <input type="text" className="input-field" name="tipoDiabetes" value={user.tipoDiabetes} onChange={handleChange} style={{textAlign: 'center'}}/>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-group" style={{flex: 1}}>
            <label>E-mail</label>
            <input type="email" className="input-field" name="email" value={user.email} onChange={handleChange} style={{textAlign: 'center'}} />
          </div>
        </div>

        <button className="btn btn-primary" style={{marginTop: '20px'}} onClick={salvarAlteracoes}>Salvar Alterações</button>
      </div>
    </div>
  );
}
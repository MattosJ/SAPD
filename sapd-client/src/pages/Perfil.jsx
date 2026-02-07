import { useState, useEffect } from 'react';
import api from "../services/api";
import ConfirmPopup from '../components/layout/ConfirmPopup';

export default function Perfil() {
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    nomeCompleto: '',
    email: '',
    dataNascimento: '',
    tipoDiabetes: '',
    altura: '',
    peso: ''
  });

  useEffect(() => {
    const buscarDados = async () => {
        try {
            const response = await api.get('/usuario');
            const data = response.data;
            setUser({
              nomeCompleto: data.nome_completo || '',
              email: data.email || '',
              senha: data.senha || '',
              dataNascimento: data.data_nascimento || '',
              tipoDiabetes: data.tipo_diabetes || '',
              altura: data.altura || '',
              peso: data.peso || ''
            });
        } catch (error) {
            console.log('Erro ao buscar dados:', error.response);
        }
    };
    buscarDados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setUser(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validarFormulario = () => {
    const novosErros = {};
    let isValid = true;

    if (!user.nomeCompleto.trim()) {
      novosErros.nomeCompleto = "Nome é obrigatório";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email.trim()) {
      novosErros.email = "E-mail é obrigatório";
      isValid = false;
    } else if (!emailRegex.test(user.email)) {
      novosErros.email = "E-mail inválido";
      isValid = false;
    }

    if (!user.dataNascimento) {
      novosErros.dataNascimento = "Data necessária";
      isValid = false;
    }
    if (!user.altura || user.altura <= 0) {
      novosErros.altura = "Altura inválida";
      isValid = false;
    }
    if (!user.peso || user.peso <= 0) {
      novosErros.peso = "Peso inválido";
      isValid = false;
    }
    if (!user.tipoDiabetes) {
      novosErros.tipoDiabetes = "Campo obrigatório";
      isValid = false;
    }

    setErrors(novosErros);
    return isValid;
  };

  const handleBotaoSalvar = () => {
    if (validarFormulario()) {
      setModalConfirmacao(true);
    } else {
      console.log("Formulário inválido"); 
    }
  };

  async function salvarAlteracoes() {
    try {
      await api.put('/usuario/me', {
        nome_completo: user.nomeCompleto,
        email: user.email,
        data_nascimento: user.dataNascimento,
        tipo_diabetes: user.tipoDiabetes,
        altura: user.altura,
        peso: user.peso,
        foto_perfil: ''
      });
      setModalConfirmacao(false);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error.response);
    }
  };

  return (
    <div>
      <ConfirmPopup
        isOpen={modalConfirmacao}
        onClose={() => setModalConfirmacao(false)}
        onConfirm={() => salvarAlteracoes()}
        msg={'Foram modificados dados importantes do seu perfil, realmente deseja fazer essa alteração?'}
        titulo={'Alterar Dados de perfil'}
      />
      
      <h2 className="page-title">Perfil</h2>
      
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        
        <div style={{ 
          width: '100px', height: '100px', backgroundColor: '#d0e0f5', 
          borderRadius: '50%', margin: '0 auto 20px', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', fontSize: '30px' 
        }}>
          👤
        </div>

        <div className="form-group">
          <label>Nome completo</label>
          {errors.nomeCompleto && <div className="error-popup">{errors.nomeCompleto}</div>}
          <input 
            className="input-field" 
            name="nomeCompleto"
            value={user.nomeCompleto}
            onChange={handleChange}
            style={{textAlign: 'center', borderColor: errors.nomeCompleto ? '#ff4d4f' : ''}} 
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          
          <div className="form-group" style={{flex: 1}}>
            <label>Data Nascimento</label>
            {errors.dataNascimento && <div className="error-popup">{errors.dataNascimento}</div>}
            <input 
              type="date" 
              className="input-field" 
              name="dataNascimento" 
              value={user.dataNascimento} 
              onChange={handleChange}
              style={{textAlign: 'center', borderColor: errors.dataNascimento ? '#ff4d4f' : ''}} 
            />
          </div>

          <div className="form-group" style={{flex: 0.5}}>
            <label>Altura (m)</label>
            {errors.altura && <div className="error-popup">{errors.altura}</div>}
            <input 
              type="number" 
              className="input-field" 
              name="altura" 
              value={user.altura} 
              onChange={handleChange}
              style={{textAlign: 'center', borderColor: errors.altura ? '#ff4d4f' : ''}}
            />
          </div>

          <div className="form-group" style={{flex: 0.5}}>
            <label>Peso (Kg)</label>
            {errors.peso && <div className="error-popup">{errors.peso}</div>}
            <input 
              type="number" 
              className="input-field" 
              name="peso" 
              value={user.peso} 
              onChange={handleChange}
              style={{textAlign: 'center', borderColor: errors.peso ? '#ff4d4f' : ''}}
            />
          </div>

          <div className="form-group" style={{flex: 0.5}}>
            <label>Diabetes</label>
            {errors.tipoDiabetes && <div className="error-popup">{errors.tipoDiabetes}</div>}
            <input 
              type="text" 
              className="input-field" 
              name="tipoDiabetes" 
              value={user.tipoDiabetes} 
              onChange={handleChange}
              style={{textAlign: 'center', borderColor: errors.tipoDiabetes ? '#ff4d4f' : ''}}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-group" style={{flex: 1}}>
            <label>E-mail</label>
            {errors.email && <div className="error-popup">{errors.email}</div>}
            <input 
              type="email" 
              className="input-field" 
              name="email" 
              value={user.email} 
              onChange={handleChange}
              style={{textAlign: 'center', borderColor: errors.email ? '#ff4d4f' : ''}} 
            />
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          style={{marginTop: '20px'}} 
          onClick={handleBotaoSalvar}
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
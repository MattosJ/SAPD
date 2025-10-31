import { Link } from "react-router-dom";
import "../styles/loginForm.css";
const FormBody = () => {
  return(
  <div className="form-Container">
    <form className="login-form">
      <label>Login</label>
      <input type="email" placeholder="seuemail@gmail.com"  required/>
      <label>Senha</label>
      <input type="password" placeholder="Senha" required/>
      <nav className="option-login-form">
         <Link to="/signup" className="register-Link">Ainda não tem uma conta? <span>Registre-se</span></Link>
         <Link to="" className="forget-you-pass">Esqueceu sua senha?</Link>
      </nav>
     <div className="btn-container">
        <button type="submit" className="btn-form">Entrar</button>
     </div>
      
    </form>
  </div>
  )
}

export default FormBody;
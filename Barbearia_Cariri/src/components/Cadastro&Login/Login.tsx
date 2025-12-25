import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./CadastroTela.css";
function Login() {
  return (
    <>
      <Navbar />
      <section className="container-cadastro">
        <div className="cadastro-card">
          <h1 className="titulo-cadastro">Entre na sua conta</h1>

          <p className="subtitulo-cadastro">
            Faca login para agendar seus horários e aproveitar nossos planos.
          </p>

          <form className="form-cadastro">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Senha" />

            <button className="btn-cadastro">Entrar</button>
          </form>

          <p className="login-link">
            Primeiro acesso? <Link to="/Cadastro">Cadastre-se</Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;

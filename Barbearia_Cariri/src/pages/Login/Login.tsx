import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const navigate = useNavigate();

  const fazerLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usuario = {
      email,
      senha,
    };

    try {
      const response = await fetch(
        "https://api-cadastro-dqny.onrender.com/usuario/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        },
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("usuario", JSON.stringify(data));
        console.log("Login bem-sucedido:", data);

        navigate("/painel");
      } else {
        alert("Email ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <>
      <section className="container-cadastro">
        <div className="cadastro-card">
          <h1 className="titulo-cadastro">Entre na sua conta</h1>

          <p className="subtitulo-cadastro">
            Faça login para agendar seus horários e aproveitar nossos planos.
          </p>


          <form className="form-cadastro" onSubmit={fazerLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button className="btn-cadastro" type="submit">
              Entrar
            </button>
          </form>

          <p className="login-link">
            Primeiro acesso? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </section>

    </>
  );
}

export default Login;

import './CadastroTela.css'
import { Link } from "react-router-dom";
import { useState } from "react";

function CadastroTela() {

    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const cadastrarUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const usuario = {
            nome,
            email,
            senha
        };

        try {
            const response = await fetch("https://projeto-production-8f50.up.railway.app/usuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Usuário cadastrado:", data);
                alert("Cadastro realizado com sucesso!");
            } else {
                alert("Erro ao cadastrar usuário");
            }

        } catch (error) {
            console.error("Erro:", error);
        }
    };

    return (
        <section className="container-cadastro">
            <div className="cadastro-card">

                <h1 className="titulo-cadastro">Crie sua conta</h1>

                <form className="form-cadastro" onSubmit={cadastrarUsuario}>

                    <input
                        type="text"
                        placeholder="Nome completo"
                        value={nome}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                    />

                    <button type="submit" className="btn-cadastro">
                        Cadastrar
                    </button>
                </form>

                <p className="login-link">
                    Já tem uma conta? <Link to="/Login">Entrar</Link>
                </p>

            </div>
        </section>
    )
}

export default CadastroTela;
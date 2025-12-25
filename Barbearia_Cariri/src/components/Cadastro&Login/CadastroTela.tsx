import './CadastroTela.css'
import { Link } from "react-router-dom";
import { useState } from "react";

function CadastroTela() {
    const [mostrarTipo, setMostrarTipo] = useState(true);
    const [tipoUsuario, setTipoUsuario] = useState("");

    return (
        <section className="container-cadastro">
            <div className="cadastro-card">

                <h1 className="titulo-cadastro">Crie sua conta</h1>

                <p className="subtitulo-cadastro">
                    Cadastre-se para agendar seus horários e aproveitar nossos planos.
                </p>

                <form className="form-cadastro">
                    <input type="text" placeholder="Nome completo" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Senha" />
                    <input type="password" placeholder="Confirmar senha" />

                    <button
                        type="button"
                        className="btn-escolha"
                        onClick={() => setMostrarTipo(!mostrarTipo)}
                    >
                        Selecionar tipo de conta
                    </button>

                    {mostrarTipo && (
                        <div className="tipo-usuario">
                            <button
                                type="button"
                                className={tipoUsuario === "cliente" ? "ativo" : ""}
                                onClick={() => setTipoUsuario("cliente")}
                            >
                                Cliente
                            </button>

                            <button
                                type="button"
                                className={tipoUsuario === "profissional" ? "ativo" : ""}
                                onClick={() => setTipoUsuario("profissional")}
                            >
                                Profissional
                            </button>
                        </div>
                    )}

                    <button className="btn-cadastro">
                        Cadastrar
                    </button>
                </form>

                <p className="login-link">
                    Já tem uma conta? <Link to="/login">Entrar</Link>
                </p>

            </div>
        </section>
    )
}

export default CadastroTela

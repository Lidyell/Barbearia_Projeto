import './Planos.css'

function Planos() {
    return (
        <section className="Container-2">
            <h1 className="titulo-plano">
                Confira nossos <span>planos</span> disponíveis
            </h1>

            <div className="bloco-planos">

                <div className="card-plano">
                    <h3 className="plano-titulo">Plano Básico</h3>

                    <p className="plano-preco">
                        R$ 50 <span>/mês</span>
                    </p>

                    <ul className="plano-beneficios">
                        <li>Corte de cabelo</li>
                        <li>Barba simples</li>
                        <li>Lavagem</li>
                    </ul>

                    <button className="btn-plano">
                        Assinar agora
                    </button>
                </div>

                <div className="card-plano">
                    <span className="badge">Mais Popular</span>

                    <h3 className="plano-titulo">Plano Premium</h3>

                    <p className="plano-preco">
                        R$ 80 <span>/mês</span>
                    </p>

                    <ul className="plano-beneficios">
                        <li>Corte de cabelo</li>
                        <li>Barba completa</li>
                        <li>Lavagem</li>
                        <li>Hidratação</li>
                        <li>Sobrancelha</li>
                        <li>Atendimento Preferencial</li>
                    </ul>

                    <button className="btn-plano">
                        Assinar agora
                    </button>
                </div>

            </div>
        </section>
    )
}

export default Planos

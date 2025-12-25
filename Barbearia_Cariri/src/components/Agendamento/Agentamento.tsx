import "./Agendamento.css";
import { useState } from "react";

function Agendamento() {
  const [profissional, setProfissional] = useState("");

  return (
    <>

      <section className="agendamento-container">
        <div className="agendamento-card">
          <header className="agendamento-header">
            <h1>Agendar serviço</h1>
            <p>Preencha os dados para confirmar seu horário</p>
          </header>

          <form className="agendamento-form">
            <div className="form-group">
              <label>Nome completo</label>
              <input type="text" placeholder="Seu nome" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="seu@email.com" />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input type="tel" placeholder="(88) 9 9999-9999" />
            </div>
            <div className="form-group">
              <label>Serviço</label>
                <select>
                  <option value="">Selecione um serviço</option>
                  <option value="">Corte de cabelo</option>
                  <option value="">Barba</option>
                  <option value="">Corte de cabelo + Barba</option>
                  <option value="">Sobrancelha</option>
                  <option value="">Descolorir o cabelo + Corte</option>
                </select>
            </div>

            <div className="form-group">
              <label>Profissional</label>
              <select
                value={profissional}
                onChange={(e) => setProfissional(e.target.value)}
              >
                <option value="">Selecione um profissional</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Data</label>
                <input type="date" />
              </div>

              <div className="form-group">
                <label>Horário</label>
                <input type="time" />
              </div>
            </div>

            <button className="btn-agendar">Confirmar agendamento</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Agendamento;

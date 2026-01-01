import "./Agendamento.css";
import { useState } from "react";

function Agendamento() {
  const [profissional, setProfissional] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [horario, setHorario] = useState<string>("");

  
  const gerarDatas = () => {
    const datas = [];
    const hoje = new Date();

    for (let i = 0; i < 14; i++) {
      const novaData = new Date();
      novaData.setDate(hoje.getDate() + i);

      const diaSemana = novaData.getDay();
      if (diaSemana === 0) continue; 

      datas.push(novaData.toISOString().split("T")[0]);
    }

    return datas;
  };

 
  const gerarHorarios = () => {
    const horarios = [];
    for (let h = 9; h <= 19; h++) {
      horarios.push(`${h.toString().padStart(2, "0")}:00`);
    }
    return horarios;
  };

  const datasDisponiveis = gerarDatas();
  const horariosDisponiveis = gerarHorarios();

  return (
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
              <option>Corte de cabelo</option>
              <option>Barba</option>
              <option>Corte + Barba</option>
              <option>Sobrancelha</option>
              <option>Descolorir + Corte</option>
            </select>
          </div>

          <div className="form-group">
            <label>Profissional</label>
            <select
              value={profissional}
              onChange={(e) => setProfissional(e.target.value)}
            >
              <option value="">Selecione um profissional</option>
              <option value="joao">João</option>
              <option value="maria">Maria</option>
              <option value="carlos">Carlos</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data</label>
              <select value={data} onChange={(e) => setData(e.target.value)}>
                <option value="">Selecione uma data</option>
                {datasDisponiveis.map((d) => (
                  <option key={d} value={d}>
                    {d.split("-").reverse().join("/")}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Horário</label>
              <select
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                disabled={!data}
              >
                <option value="">Selecione um horário</option>
                {horariosDisponiveis.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn-agendar">Confirmar agendamento</button>
        </form>
      </div>
    </section>
  );
}

export default Agendamento;

import "./Painel.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Painel() {
  const [nome] = useState<string>(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (!usuarioSalvo) return "";
    try {
      const usuario = JSON.parse(usuarioSalvo);
      return usuario.nome || "";
    } catch {
      return "";
    }
  });
  const [mostrarTodos, setMostrarTodos] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (!usuarioSalvo) {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };
  const dados = [
    {
      cliente: "João Silva",
      servico: "Corte de cabelo",
      data: "12/01",
      hora: "14:00",
      profissional: "João",
      status: "confirmado",
    },
    {
      cliente: "Carlos Souza",
      servico: "Barba",
      data: "12/01",
      hora: "15:00",
      profissional: "Pedro",
      status: "pendente",
    },
    {
      cliente: "Lucas Lima",
      servico: "Corte + Barba",
      data: "12/01",
      hora: "16:00",
      profissional: "João",
      status: "confirmado",
    },
  ];

  return (
    <>
      <section className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="dashboard-main-title">Painel de Controle</h1>
          </div>

          <div className="header-right">
            <div className="user-info">
              <span className="user-avatar">
                {nome?.charAt(0).toUpperCase()}
              </span>
              <span className="user-name">{nome}</span>
            </div>

            <button onClick={logout} className="btn-logout">
              Sair
            </button>
          </div>
        </div>
        <div className="dashboard-cards">
          <div className="card">
            <span>Agendamentos Hoje</span>
            <h5>12</h5>
          </div>

          <div className="card">
            <span>Faturamento Mensal</span>
            <h5>R$ 2.450</h5>
          </div>

          <div className="card">
            <span>Clientes Atendidos</span>
            <h5>86</h5>
          </div>
        </div>


        <div className="dashboard-section">
          <h2>Agendamentos Recentes</h2>

          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Serviço</th>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Profissional</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {(mostrarTodos ? dados : dados.slice(0, 1)).map(
                  (item, index) => (
                    <tr key={index}>
                      <td data-label="Cliente">{item.cliente}</td>
                      <td data-label="Serviço">{item.servico}</td>
                      <td data-label="Data">{item.data}</td>
                      <td data-label="Hora">{item.hora}</td>
                      <td data-label="Profissional">{item.profissional}</td>
                      <td
                        data-label="Status"
                        className={`status ${item.status}`}
                      >
                        {item.status}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

          {dados.length > 1 && (
            <div className="ver-mais-container">
              <button
                className="ver-mais-btn"
                onClick={() => setMostrarTodos(!mostrarTodos)}
              >
                {mostrarTodos ? "Ver menos ↑" : "Ver mais ↓"}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

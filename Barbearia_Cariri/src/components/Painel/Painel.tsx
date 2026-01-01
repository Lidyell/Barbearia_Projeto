import './Painel.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Painel() {
  const nome = "João"

  return (
    <>
      <Navbar />

      <section className="dashboard-container">
        {/* TÍTULOS */}
        <h1 className="dashboard-greeting">Olá, {nome}</h1>
        <h2 className="dashboard-main-title">Painel de Controle</h2>

        {/* CARDS */}
        <div className="dashboard-cards">
          <div className="card">
            <span>Agendamentos Hoje</span>
            <strong>12</strong>
          </div>

          <div className="card">
            <span>Faturamento Mensal</span>
            <strong>R$ 2.450</strong>
          </div>

          <div className="card">
            <span>Clientes Atendidos</span>
            <strong>86</strong>
          </div>
        </div>

        {/* AGENDAMENTOS */}
        <div className="dashboard-section">
          <h2>Agendamentos Recentes</h2>

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
              <tr>
                <td>João Silva</td>
                <td>Corte de cabelo</td>
                <td>12/01</td>
                <td>14:00</td>
                <td>João</td>
                <td className="status confirmado">Confirmado</td>
              </tr>

              <tr>
                <td>Maria Costa</td>
                <td>Corte + Barba</td>
                <td>12/01</td>
                <td>16:00</td>
                <td>Carlos</td>
                <td className="status pendente">Pendente</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dashboard-section">
          <h2>Serviços Finalizados</h2>
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
                    <tr>
                        <td>Carlos Souza</td>
                        <td>Barba</td>
                        <td>11/01</td>
                        <td>15:00</td>
                        <td>Maria</td>
                        <td className="status finalizado">Finalizado</td>
                    </tr>
                    <tr>
                        <td>Ana Lima</td>
                        <td>Sobrancelha</td>
                        <td>11/01</td>
                        <td>17:00</td>
                        <td>João</td>
                        <td className="status finalizado">Finalizado</td>
                    </tr>
                </tbody>
            </table>
            
        </div>

        {/* FINANCEIRO */}
        <div className="dashboard-section">
          <h2>Resumo Financeiro</h2>

          <div className="financeiro">
            <div>
              <span>Total de Entradas</span>
              <strong>R$ 2.450</strong>
            </div>

            <div>
              <span>Ticket Médio</span>
              <strong>R$ 28,50</strong>
            </div>

            <div>
              <span>Serviços Realizados</span>
              <strong>86</strong>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

import './Painel_Admin.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Painel() {

  const [nome, setNome] = useState<string>("")
  const navigate = useNavigate()

  useEffect(() => {

    const usuarioSalvo = localStorage.getItem("usuario")

    if (!usuarioSalvo) {
      navigate("/login")
      return
    }

    const usuario = JSON.parse(usuarioSalvo)
    setNome(usuario.nome)

  }, [])

  const logout = () => {
    localStorage.removeItem("usuario")
    navigate("/login")
  }

  return (
    <>
      <Navbar />

      <section className="dashboard-container">

        {/* SAUDAÇÃO */}
        <h1 className="dashboard-greeting">Olá, {nome}</h1>
        <h2 className="dashboard-main-title">Painel de Controle</h2>

        {/* BOTÃO LOGOUT */}
        <button onClick={logout} className="btn-logout">
          Sair
        </button>

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
            </tbody>
          </table>
        </div>

      </section>

      <Footer />
    </>
  )
}
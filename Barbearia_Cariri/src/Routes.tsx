import "./App.css"
import Home from "./Pages/Home.tsx"
import Cadastro from "./Pages/Cadastro.tsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Agenda from "./Pages/Agenda.tsx"
import Login from "./components/Cadastro&Login/Login.tsx"
import Painel from "./components/Painel/Painel.tsx"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<h1>Erro 404: Página não encontrada!</h1>} />
        <Route path="/painel" element={<Painel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router

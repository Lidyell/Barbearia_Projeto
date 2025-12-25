import "./App.css"
import Home from "./Pages/Home.tsx"
import Cadastro from "./Pages/Cadastro.tsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Agenda from "./Pages/Agenda.tsx"
import Login from "./components/Cadastro&Login/Login.tsx"


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Erro 404: Página não encontrada!</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router

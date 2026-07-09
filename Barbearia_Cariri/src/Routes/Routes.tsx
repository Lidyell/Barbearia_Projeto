import "../App.css";
import Home from "../FrontEnd/Pages/Home.tsx";
import Cadastro from "../FrontEnd/Pages/Cadastro.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agenda from "../FrontEnd/Pages/Agenda.tsx";
import Login from "../FrontEnd/components/Cadastro/Login.tsx";
import Painel from "../FrontEnd/Pages/Painel.tsx"


export default function Router() {
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
  );
}

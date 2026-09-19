import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Cadastro from "../pages/Cadastro/Cadastro";
import Agenda from "../pages/Agenda/Agenda";
import Login from "../pages/Login/Login";
import Painel from "../pages/Painel/Painel";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/painel" element={<Painel />} />
      <Route path="*" element={<h1>Erro 404: Página não encontrada!</h1>} />
    </Routes>
  );
}

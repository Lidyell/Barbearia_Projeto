import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Cadastro from "../pages/Cadastro/Cadastro";
import Agenda from "../pages/Agenda/Agenda";
import Login from "../pages/Login/Login";
import Painel from "../pages/Painel/Painel";
import ServicosPage from "../pages/Servicos/ServicosPage";
import BarbeirosPage from "../pages/Barbeiros/BarbeirosPage";
import LocalizacaoPage from "../pages/Localizacao/LocalizacaoPage";
import RecuperarSenha from "../pages/Login/RecuperarSenha";
import NotFound from "../pages/NotFound/NotFound";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/servicos" element={<ServicosPage />} />
      <Route path="/barbeiros" element={<BarbeirosPage />} />
      <Route path="/localizacao" element={<LocalizacaoPage />} />
      <Route path="/contato" element={<LocalizacaoPage />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/painel" element={<Painel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

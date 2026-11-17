import { Link } from 'react-router-dom';
import {
  Scissors,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-luxury">
      <div className="footer-top-cta">
        <div className="footer-cta-container">
          <div className="cta-text">
            <h3>Pronto para renovar seu visual?</h3>
            <p>Garanta seu horário com nossos mestres barbeiros em poucos cliques.</p>
          </div>
          <Link to="/agenda" className="btn-dourado-principal footer-cta-btn">
            <span>Agendar Atendimento</span>
          </Link>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-container">
          {/* Coluna 1: Marca & Conceito */}
          <div className="footer-col brand-col">
            <div className="footer-brand-logo">
              <div className="brand-icon-box">
                <Scissors size={20} />
              </div>
              <h2>Barbearia Castelo Branco</h2>
            </div>
            <p className="brand-description">
              Tradição, estilo e excelência no coração do Cariri. O padrão mais
              alto em barboterapia, cortes masculinos e atendimento exclusivo.
            </p>
            <div className="footer-socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://wa.me/5588999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="footer-col links-col">
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <a href="#servicos">Nossos Serviços</a>
              </li>
              <li>
                <Link to="/agenda">Agendar Horário</Link>
              </li>
              <li>
                <a href="#localizacao">Onde Estamos</a>
              </li>
              <li>
                <Link to="/painel">Painel do Gestor</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Horários de Atendimento */}
          <div className="footer-col hours-col">
            <h4 className="footer-col-title">Horários</h4>
            <ul className="footer-hours-list">
              <li>
                <span>Segunda a Sexta</span>
                <strong>09:00 - 20:00</strong>
              </li>
              <li>
                <span>Sábado</span>
                <strong>08:00 - 19:00</strong>
              </li>
              <li>
                <span>Domingo</span>
                <strong className="closed-text">Fechado</strong>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contato & Endereço */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Localização</h4>
            <div className="contact-item">
              <MapPin size={17} className="contact-icon" />
              <span>Av. Castelo Branco, 4455 • Novo Juazeiro, CE</span>
            </div>
            <div className="contact-item">
              <Phone size={17} className="contact-icon" />
              <span>(88) 99999-9999</span>
            </div>
            <div className="contact-item">
              <Mail size={17} className="contact-icon" />
              <span>contato@castelobranco.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Inferior de Direitos */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p>© {new Date().getFullYear()} Barbearia Castelo Branco. Todos os direitos reservados.</p>
          <div className="footer-author">
            <span>Desenvolvido com excelência por Lidyell Rocha</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import { MapPin, Clock, Phone, MessageCircle, Navigation, ExternalLink } from 'lucide-react';
import './Localizacao.css';

const HORARIOS = [
  { dia: 'Segunda-feira', horario: '09:00 - 20:00', aberto: true },
  { dia: 'Terça-feira', horario: '09:00 - 20:00', aberto: true },
  { dia: 'Quarta-feira', horario: '09:00 - 20:00', aberto: true },
  { dia: 'Quinta-feira', horario: '09:00 - 20:00', aberto: true },
  { dia: 'Sexta-feira', horario: '09:00 - 20:00', aberto: true },
  { dia: 'Sábado', horario: '08:00 - 19:00', aberto: true },
  { dia: 'Domingo', horario: 'Fechado para descanso', aberto: false },
];

export default function Localizacao() {
  const diaSemanaHoje = new Date().getDay(); // 0 domingo, 1 segunda, etc.
  // Mapa de índice para nosso array: 1->0 (seg), 2->1 (ter), etc., 0->6 (dom)
  const indiceHoje = diaSemanaHoje === 0 ? 6 : diaSemanaHoje - 1;

  return (
    <section id="localizacao" className="localizacao-section">
      <div className="localizacao-container">
        {/* Lado Esquerdo: Dados de Contato e Horários */}
        <div className="localizacao-info">
          <span className="tag-dourada">
            <MapPin size={14} /> Localização & Atendimento
          </span>

          <h2 className="titulo-secao">
            Visite Nossa <span>Barbearia no Cariri</span>
          </h2>

          <p className="subtitulo-secao">
            Fácil acesso, estacionamento facilitado e um ambiente planejado
            para o seu máximo conforto e bem-estar.
          </p>

          {/* Cards de Endereço e Contato */}
          <div className="info-cards-group">
            <div className="info-card">
              <div className="info-card-icon">
                <MapPin size={20} />
              </div>
              <div className="info-card-text">
                <h4>Endereço</h4>
                <p>Av. Castelo Branco, 4455 - Novo Juazeiro</p>
                <small>Juazeiro do Norte - CE, CEP: 63030-000</small>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-icon">
                <Phone size={20} />
              </div>
              <div className="info-card-text">
                <h4>Telefone & WhatsApp</h4>
                <p>(88) 99999-9999</p>
                <small>Atendimento rápido para dúvidas e encaixes</small>
              </div>
            </div>
          </div>

          {/* Horários de Funcionamento */}
          <div className="horarios-card">
            <div className="horarios-title">
              <Clock size={18} className="clock-icon" />
              <span>Horários de Funcionamento</span>
            </div>

            <ul className="horarios-list">
              {HORARIOS.map((item, idx) => {
                const isHoje = idx === indiceHoje;
                return (
                  <li key={idx} className={`horario-item ${isHoje ? 'is-hoje' : ''}`}>
                    <span className="horario-dia">
                      {item.dia} {isHoje && <span className="hoje-badge">Hoje</span>}
                    </span>
                    <span className={`horario-hora ${!item.aberto ? 'fechado' : ''}`}>
                      {item.horario}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Botões de Ação */}
          <div className="localizacao-actions">
            <a
              href="https://wa.me/5588999999999?text=Ol%C3%A1,%20gostaria%20de%20agendar%20um%20hor%C3%A1rio%20na%20Barbearia%20Castelo%20Branco"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-direto"
            >
              <MessageCircle size={18} />
              <span>Falar no WhatsApp</span>
            </a>

            <a
              href="https://maps.google.com/?q=Av+Castelo+Branco+Novo+Juazeiro+Juazeiro+do+Norte+CE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-como-chegar"
            >
              <Navigation size={17} />
              <span>Como Chegar</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Lado Direito: Mapa Interativo com Moldura Nobre */}
        <div className="localizacao-mapa-wrap">
          <div className="mapa-frame">
            <iframe
              title="Localização Barbearia Castelo Branco"
              className="mapa-iframe"
              src="https://www.google.com/maps/embed?pb=!4v1766135435614!6m8!1m7!1sWSDDHJM-qz6P_-NvdCH5PQ!2m2!1d-7.231126499392646!2d-39.28324984936312!3f19.381104383230564!4f1.7031035641905845!5f0.7820865974627469"
              loading="lazy"
              allowFullScreen
            />
            <div className="mapa-badge-overlay">
              <span className="mapa-badge-dot" />
              <span>Barbearia Castelo Branco • Novo Juazeiro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

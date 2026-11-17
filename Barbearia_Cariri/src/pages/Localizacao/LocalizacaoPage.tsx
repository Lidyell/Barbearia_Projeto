import { useEffect, useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  Send,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import './LocalizacaoPage.css';

const HORARIOS = [
  { dia: 'Segunda-feira', horario: '09:00 - 20:00', aberto: true },
  { dia: 'Terça-feira', horario: '09:00 - 20:00', aberto: true },
  { dia: 'Quarta-feira', horario: '09:00 - 20:00', aberto: true },
  { dia: 'Quinta-feira', horario: '09:00 - 20:00', aberto: true },
  { dia: 'Sexta-feira', horario: '09:00 - 20:00', aberto: true },
  { dia: 'Sábado', horario: '08:00 - 19:00', aberto: true },
  { dia: 'Domingo', horario: 'Fechado para descanso', aberto: false },
];

export default function LocalizacaoPage() {
  const diaSemanaHoje = new Date().getDay();
  const indiceHoje = diaSemanaHoje === 0 ? 6 : diaSemanaHoje - 1;

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !telefone.trim() || !mensagem.trim()) {
      toast.error('Preencha todos os campos da mensagem.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast.success('Mensagem enviada com sucesso! Responderemos em breve.');
      setNome('');
      setTelefone('');
      setMensagem('');
    }, 600);
  };

  return (
    <div className="loc-page-wrapper">
      {/* Hero da Página */}
      <section className="loc-page-hero">
        <div className="loc-hero-container">
          <span className="tag-dourada">
            <MapPin size={14} /> Juazeiro do Norte • Cariri
          </span>
          <h1 className="loc-hero-title">
            Onde Estamos & <span>Fale Conosco</span>
          </h1>
          <p className="loc-hero-subtitle">
            Localizada no coração do Novo Juazeiro, a Barbearia Castelo Branco
            oferece fácil acesso, estacionamento e um ambiente totalmente climatizado.
          </p>
        </div>
      </section>

      {/* Grid Principal de Informações */}
      <section className="loc-page-content">
        <div className="loc-content-grid">
          {/* Coluna Esquerda: Dados de Contato e Horários */}
          <div className="loc-left-col">
            <div className="loc-contact-cards-grid">
              <div className="loc-contact-card">
                <div className="loc-card-icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4>Nosso Endereço</h4>
                  <p>Av. Castelo Branco, 4455</p>
                  <small>Novo Juazeiro • Juazeiro do Norte - CE</small>
                </div>
              </div>

              <div className="loc-contact-card">
                <div className="loc-card-icon">
                  <Phone size={22} />
                </div>
                <div>
                  <h4>Telefone</h4>
                  <p>(88) 99999-9999</p>
                  <small>Ligue para dúvidas ou encaixes</small>
                </div>
              </div>

              <div className="loc-contact-card">
                <div className="loc-card-icon">
                  <Mail size={22} />
                </div>
                <div>
                  <h4>E-mail</h4>
                  <p>contato@castelobranco.com</p>
                  <small>Suporte e parcerias comerciais</small>
                </div>
              </div>

              <div className="loc-contact-card">
                <div className="loc-card-icon">
                  <Sparkles size={22} />
                </div>
                <div>
                  <h4>Comodidades</h4>
                  <p>Chopp & Café cortesia</p>
                  <small>Wi-Fi 5G & Lounge VIP com TV</small>
                </div>
              </div>
            </div>

            {/* Horários */}
            <div className="loc-schedule-box">
              <div className="schedule-box-header">
                <Clock size={18} className="schedule-clock-icon" />
                <h4>Horários de Atendimento Semanal</h4>
              </div>

              <ul className="schedule-items-list">
                {HORARIOS.map((item, idx) => {
                  const isHoje = idx === indiceHoje;
                  return (
                    <li key={idx} className={`schedule-item-row ${isHoje ? 'active-today' : ''}`}>
                      <span className="sched-day">
                        {item.dia} {isHoje && <span className="today-badge">Hoje</span>}
                      </span>
                      <span className={`sched-time ${!item.aberto ? 'closed' : ''}`}>
                        {item.horario}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Ações Rápidas */}
            <div className="loc-quick-actions">
              <a
                href="https://wa.me/5588999999999?text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Barbearia%20Castelo%20Branco."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-full"
              >
                <MessageCircle size={18} />
                <span>Conversar pelo WhatsApp</span>
              </a>

              <a
                href="https://maps.google.com/?q=Av+Castelo+Branco+4455+Novo+Juazeiro+Juazeiro+do+Norte+CE"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maps-full"
              >
                <Navigation size={18} />
                <span>Abrir Rotas no Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Coluna Direita: Mapa Street View + Formulário de Mensagem */}
          <div className="loc-right-col">
            {/* Mapa Street View da Fachada Real */}
            <div className="loc-map-container">
              <iframe
                title="Google Street View da Barbearia"
                className="loc-iframe"
                src="https://www.google.com/maps/embed?pb=!4v1766135435614!6m8!1m7!1sWSDDHJM-qz6P_-NvdCH5PQ!2m2!1d-7.231126499392646!2d-39.28324984936312!3f19.381104383230564!4f1.7031035641905845!5f0.7820865974627469"
                allowFullScreen
                loading="lazy"
              />
              <div className="loc-map-badge">
                <span className="live-dot" />
                <span>Fachada Oficial • Barbearia Castelo Branco</span>
              </div>
            </div>

            {/* Formulário de Mensagem */}
            <div className="loc-message-form-box">
              <div className="message-form-header">
                <Send size={18} className="text-gold" />
                <h4>Envie uma Mensagem Direta</h4>
              </div>

              <form onSubmit={handleSendMessage} className="contact-form">
                <div className="form-group">
                  <label>Seu Nome *</label>
                  <input
                    type="text"
                    placeholder="Como podemos te chamar?"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Telefone / WhatsApp *</label>
                  <input
                    type="tel"
                    placeholder="(88) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Sua Dúvida ou Mensagem *</label>
                  <textarea
                    rows={3}
                    placeholder="Escreva sua mensagem aqui..."
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-dourado-principal btn-send-message" disabled={isSending}>
                  {isSending ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

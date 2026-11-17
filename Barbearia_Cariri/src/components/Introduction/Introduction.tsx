import { Link } from 'react-router-dom';
import {
  Calendar,
  Sparkles,
  ShieldCheck,
  Scissors,
  Coffee,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import './Introduction.css';

function Introduction() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Lado Esquerdo: Conteúdo e Chamadas */}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} className="hero-badge-icon" />
            <span>Tradição & Visagismo no Cariri</span>
          </div>

          <h1 className="hero-title">
            A Arte do Corte Clássico com a{' '}
            <span className="hero-title-gradient">Precisão Moderna.</span>
          </h1>

          <p className="hero-description">
            Muito mais que um corte de cabelo ou barba. Viva a experiência
            Castelo Branco com toalha quente, navalha tradicional, chopp gelado e
            barbeiros experientes dedicados ao seu estilo.
          </p>

          <div className="hero-cta-group">
            <Link to="/agenda" className="btn-dourado-principal hero-btn-primary">
              <Calendar size={18} />
              <span>Agendar Meu Horário</span>
              <ArrowRight size={16} />
            </Link>

            <a href="#servicos" className="btn-secundario-outline hero-btn-secondary">
              <Scissors size={17} />
              <span>Conhecer Serviços</span>
            </a>
          </div>

          {/* Destaques rápidos */}
          <div className="hero-perks">
            <div className="perk-item">
              <CheckCircle2 size={15} className="perk-icon" />
              <span>Toalha Quente & Barboterapia</span>
            </div>
            <div className="perk-item">
              <CheckCircle2 size={15} className="perk-icon" />
              <span>Chopp Artesanal & Café</span>
            </div>
            <div className="perk-item">
              <CheckCircle2 size={15} className="perk-icon" />
              <span>Pontualidade Britânica</span>
            </div>
          </div>

          {/* Destaques / Valores da Marca */}
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-number">Alto Padrão</span>
              <span className="stat-label">Cortes & barba sob medida</span>
            </div>

            <div className="stat-divider" />

            <div className="stat-card">
              <span className="stat-number">Visagismo</span>
              <span className="stat-label">Harmonia facial personalizada</span>
            </div>

            <div className="stat-divider" />

            <div className="stat-card">
              <span className="stat-number">Exclusividade</span>
              <span className="stat-label">Lounge VIP & Chopp cortesia</span>
            </div>
          </div>
        </div>

        {/* Lado Direito: Card Visual de Destaque */}
        <div className="hero-visual">
          <div className="hero-card-frame">
            <div className="hero-card-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80"
                alt="Ambiente Barbearia Castelo Branco"
                className="hero-main-image"
              />
              <div className="hero-image-overlay" />
            </div>

            {/* Badge Flutuante: Status em tempo real */}
            <div className="floating-badge-status">
              <span className="pulse-dot" />
              <div className="status-text">
                <strong>Aberto Hoje</strong>
                <small>09h às 20h • Sem filas</small>
              </div>
            </div>

            {/* Card Flutuante: Experiência VIP */}
            <div className="floating-badge-vip">
              <div className="vip-icon-box">
                <Coffee size={20} />
              </div>
              <div className="vip-text">
                <span className="vip-title">Cortesia da Casa</span>
                <span className="vip-subtitle">Chopp gelado & Café expresso</span>
              </div>
            </div>

            {/* Card Inferior com Informações de Confiança */}
            <div className="hero-card-footer">
              <div className="footer-tag">
                <ShieldCheck size={16} />
                <span>Atendimento Personalizado</span>
              </div>
              <p className="footer-text">
                Av. Castelo Branco, 4455 • Novo Juazeiro
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Introduction;

import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scissors,
  Sparkles,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { fetchServices } from '../Painel/services/dashboardService';
import type { ServiceItem } from '../Painel/types/dashboard.types';
import './ServicosPage.css';

const SERVICE_IMAGES: Record<string, string> = {
  'Corte de Cabelo':
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
  'Barba':
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
  'Corte + Barba':
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
  'Cabelo Infantil':
    'https://images.unsplash.com/photo-1517832606589-7629c33971a6?auto=format&fit=crop&w=800&q=80',
  'Sobrancelha':
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
  'Descolorir Cabelo':
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
};

const SERVICE_DETAILS: Record<string, { desc: string; perks: string[] }> = {
  'Corte de Cabelo': {
    desc: 'Corte moderno ou clássico adaptado ao visagismo facial, com lavagem refrescante e finalização com pomada modeladora.',
    perks: ['Lavagem inclusa', 'Consultoria de visagismo', 'Pomada premium'],
  },
  'Barba': {
    desc: 'Alinhamento completo da barba com toalha quente aromática, hidratação de fios e acabamento milimétrico na navalha.',
    perks: ['Toalha quente aromática', 'Óleo e balm hidratante', 'Navalha tradicional'],
  },
  'Corte + Barba': {
    desc: 'O combo supremo de estilo masculino. Cuidado integral com cabelo e barba no mais alto padrão de sofisticação.',
    perks: ['Experiência completa', 'Barboterapia inclusa', 'Chopp cortesia'],
  },
  'Cabelo Infantil': {
    desc: 'Atendimento paciente e cuidadoso para os pequenos, garantindo um corte estiloso e uma experiência muito divertida.',
    perks: ['Ambiente acolhedor', 'Paciência e carinho', 'Corte moderno'],
  },
  'Sobrancelha': {
    desc: 'Design e limpeza alinhada com pinça ou navalha para valorizar a expressão do olhar sem perder a naturalidade masculina.',
    perks: ['Alinhamento natural', 'Acabamento limpo', 'Rápido e indolor'],
  },
  'Descolorir Cabelo': {
    desc: 'Técnica profissional de platinado / nevou com descoloração controlada, preservando a saúde dos fios e brilho intenso.',
    perks: ['Produtos de alta performance', 'Matização perfeita', 'Tratamento pós-química'],
  },
};

const CATEGORIES = [
  { id: 'todos', label: 'Todos os Serviços' },
  { id: 'cabelo', label: 'Cortes & Cabelo' },
  { id: 'barba', label: 'Barba & Barboterapia' },
  { id: 'combos', label: 'Combos & Estética' },
];

export default function ServicosPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedCat, setSelectedCat] = useState('todos');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchServices().then((data) => {
      setServices(data.filter((s) => s.ativo));
    });
  }, []);

  const filteredServices = useMemo(() => {
    if (selectedCat === 'todos') return services;
    if (selectedCat === 'cabelo') {
      return services.filter(
        (s) =>
          s.nome.toLowerCase().includes('corte de cabelo') ||
          s.nome.toLowerCase().includes('infantil') ||
          s.nome.toLowerCase().includes('descolorir')
      );
    }
    if (selectedCat === 'barba') {
      return services.filter(
        (s) =>
          s.nome.toLowerCase().includes('barba') &&
          !s.nome.toLowerCase().includes('corte +')
      );
    }
    if (selectedCat === 'combos') {
      return services.filter(
        (s) =>
          s.nome.toLowerCase().includes('corte + barba') ||
          s.nome.toLowerCase().includes('sobrancelha') ||
          s.nome.toLowerCase().includes('descolorir')
      );
    }
    return services;
  }, [services, selectedCat]);

  return (
    <div className="servicos-page-wrapper">
      {/* Hero da Página */}
      <section className="servicos-page-hero">
        <div className="servicos-hero-container">
          <span className="tag-dourada">
            <Sparkles size={14} /> Menu de Procedimentos & Preços
          </span>
          <h1 className="servicos-hero-title">
            Serviços Exclusivos <span>Castelo Branco</span>
          </h1>
          <p className="servicos-hero-subtitle">
            Cada procedimento é executado com técnicas de visagismo, produtos
            importados de primeira linha e ambiente climatizado para o seu conforto.
          </p>

          <div className="servicos-page-categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`page-cat-btn ${selectedCat === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Serviços Detalhados */}
      <section className="servicos-page-content">
        <div className="servicos-page-grid">
          {filteredServices.map((service) => {
            const details = SERVICE_DETAILS[service.nome] || {
              desc: 'Atendimento de excelência com produtos nobres e acabamento de barbearia tradicional.',
              perks: ['Atendimento com hora marcada', 'Profissionais certificados'],
            };
            const img =
              SERVICE_IMAGES[service.nome] ||
              'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80';

            return (
              <div key={service.id} className="servico-detalhe-card">
                <div
                  className="servico-card-media"
                  style={{ backgroundImage: `url(${img})` }}
                >
                  <div className="media-overlay" />
                  <span className="servico-duracao-tag">
                    <Clock size={13} /> {service.duracao_minutos} min
                  </span>
                  <div className="servico-preco-floating">
                    R$ {service.preco.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                <div className="servico-card-body">
                  <div className="servico-header-row">
                    <div className="servico-icon-pill">
                      <Scissors size={18} />
                    </div>
                    <h3 className="servico-nome-h3">{service.nome}</h3>
                  </div>

                  <p className="servico-desc-text">{details.desc}</p>

                  <div className="servico-perks-list">
                    {details.perks.map((perk, i) => (
                      <div key={i} className="perk-tag-item">
                        <CheckCircle2 size={13} className="perk-check" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn-dourado-principal btn-card-agendar"
                    onClick={() => navigate(`/agenda?service=${service.id}`)}
                  >
                    <Calendar size={16} />
                    <span>Agendar este Serviço</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Faixa de Garantia / Cortesia */}
      <section className="servicos-bottom-guarantee">
        <div className="guarantee-container">
          <div className="guarantee-icon-box">
            <ShieldCheck size={28} />
          </div>
          <div className="guarantee-text">
            <h4>Padrão de Excelência em Todos os Atendimentos</h4>
            <p>
              Chopp artesanal ou café expresso cortesia em todos os serviços.
              Atendimento pontual com garantia de satisfação.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

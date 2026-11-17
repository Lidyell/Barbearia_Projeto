import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scissors,
  Sparkles,
  ArrowRight,
  Clock,
  Flame,
  BadgeCheck,
} from 'lucide-react';
import { fetchServices } from '../../pages/Painel/services/dashboardService';
import type { ServiceItem } from '../../pages/Painel/types/dashboard.types';
import './Cards.css';

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

const CATEGORIES = [
  { id: 'todos', label: 'Todos os Serviços' },
  { id: 'cabelo', label: 'Cortes & Cabelo' },
  { id: 'barba', label: 'Barba & Barboterapia' },
  { id: 'combos', label: 'Combos & Estética' },
];

function Cards_Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices().then((data) => {
      setServices(data.filter((s) => s.ativo));
    });
  }, []);

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'todos') return services;
    if (selectedCategory === 'cabelo') {
      return services.filter(
        (s) =>
          s.nome.toLowerCase().includes('corte de cabelo') ||
          s.nome.toLowerCase().includes('infantil') ||
          s.nome.toLowerCase().includes('descolorir')
      );
    }
    if (selectedCategory === 'barba') {
      return services.filter(
        (s) =>
          s.nome.toLowerCase().includes('barba') &&
          !s.nome.toLowerCase().includes('corte +')
      );
    }
    if (selectedCategory === 'combos') {
      return services.filter(
        (s) =>
          s.nome.toLowerCase().includes('corte + barba') ||
          s.nome.toLowerCase().includes('sobrancelha') ||
          s.nome.toLowerCase().includes('descolorir')
      );
    }
    return services;
  }, [services, selectedCategory]);

  const handleSelectService = (serviceId: string) => {
    navigate(`/agenda?service=${serviceId}`);
  };

  return (
    <section id="servicos" className="servicos-section">
      <div className="servicos-container">
        {/* Cabeçalho */}
        <div className="section-title-wrap">
          <span className="tag-dourada">
            <Sparkles size={14} /> Tabela de Serviços & Valores
          </span>
          <h2 className="titulo-secao">
            Cortes & Cuidados <span>Sob Medida</span>
          </h2>
          <p className="subtitulo-secao">
            Escolha o atendimento ideal para você. Todos os procedimentos incluem
            lavagem especial, finalização com pomadas premium e consultoria visagista.
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className="categorias-filtro">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`cat-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de Serviços */}
        <div className="bloco-services">
          {filteredServices.map((item) => {
            const bgImg =
              SERVICE_IMAGES[item.nome] ||
              'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80';

            const isPopular =
              item.nome.includes('Corte + Barba') ||
              item.nome === 'Corte de Cabelo';

            return (
              <div
                key={item.id}
                className="item-service"
                style={{ backgroundImage: `url(${bgImg})` }}
                onClick={() => handleSelectService(item.id)}
              >
                <div className="service-overlay" />

                {/* Badge Destaque */}
                {isPopular && (
                  <div className="service-popular-badge">
                    <Flame size={12} /> Mais Escolhido
                  </div>
                )}

                <div className="service-card-content">
                  <div className="service-top-row">
                    <div className="service-icon-pill">
                      <Scissors size={18} />
                    </div>
                    <span className="service-duration">
                      <Clock size={13} /> {item.duracao_minutos} min
                    </span>
                  </div>

                  <h3 className="service-name">{item.nome}</h3>

                  <div className="service-price-row">
                    <div className="service-price-box">
                      <span className="price-currency">R$</span>
                      <span className="price-value">
                        {item.preco.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <button
                      className="service-btn-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectService(item.id);
                      }}
                    >
                      <span>Agendar</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rodapé da Seção com Nota de Confiança */}
        <div className="servicos-footer-note">
          <BadgeCheck size={18} className="note-icon" />
          <span>
            Todos os cortes acompanham finalização profissional com tônicos e
            pomadas de barbearia nobre.
          </span>
        </div>
      </div>
    </section>
  );
}

export default Cards_Services;

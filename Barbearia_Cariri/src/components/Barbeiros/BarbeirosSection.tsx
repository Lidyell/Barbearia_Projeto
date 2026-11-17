import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, Award } from 'lucide-react';
import { fetchBarbers } from '../../pages/Painel/services/dashboardService';
import type { Barber } from '../../pages/Painel/types/dashboard.types';
import './BarbeirosSection.css';

const BARBER_SPECIALTIES: Record<string, { role: string; desc: string; years: string }> = {
  'João Silva': {
    role: 'Mestre em Fade & Degradê',
    desc: 'Especialista em transições perfeitas, navalhado e cortes modernos com acabamento milimétrico.',
    years: '8 anos de experiência',
  },
  'Maria Santos': {
    role: 'Visagista & Barboterapia',
    desc: 'Referência em barboterapia aromática, alinhamento de barba e consultoria de harmonia facial.',
    years: '6 anos de experiência',
  },
  'Carlos Souza': {
    role: 'Cortes Clássicos & Tesoura',
    desc: 'Tradicionalista dos cortes clássicos, penteados nobres e barba alinhada à moda antiga.',
    years: '10 anos de experiência',
  },
};

export default function BarbeirosSection() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBarbers().then((data) => {
      setBarbers(data.filter((b) => b.ativo));
    });
  }, []);

  const handleBookWithBarber = (barberId: string) => {
    navigate(`/agenda?barber=${barberId}`);
  };

  return (
    <section className="barbeiros-section">
      <div className="barbeiros-container">
        {/* Cabeçalho */}
        <div className="barbeiros-header">
          <span className="tag-dourada">
            <Award size={14} /> Mestres Barbeiros
          </span>
          <h2 className="titulo-secao">
            Nossa <span>Equipe de Especialistas</span>
          </h2>
          <p className="subtitulo-secao">
            Profissionais apaixonados pela arte da barbearia clássica, treinados
            nas mais avançadas técnicas de visagismo e atendimento personalizado.
          </p>
        </div>

        {/* Grid de Barbeiros */}
        <div className="barbeiros-grid">
          {barbers.map((barber) => {
            const extra = BARBER_SPECIALTIES[barber.nome] || {
              role: 'Barbeiro Especialista',
              desc: 'Técnicas avançadas de corte e barba com atendimento de excelência.',
              years: 'Profissional certificado',
            };

            const avatar =
              barber.avatar_url ||
              'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80';

            return (
              <div key={barber.id} className="barbeiro-card">
                <div className="barbeiro-image-wrap">
                  <img
                    src={avatar}
                    alt={barber.nome}
                    className="barbeiro-avatar"
                  />
                  <div className="barbeiro-overlay" />
                  <div className="barbeiro-rating-pill">
                    <Star size={13} fill="#ECC968" color="#ECC968" />
                    <span>5.0</span>
                  </div>
                </div>

                <div className="barbeiro-info">
                  <span className="barbeiro-experience">{extra.years}</span>
                  <h3 className="barbeiro-nome">{barber.nome}</h3>
                  <span className="barbeiro-role">{extra.role}</span>
                  <p className="barbeiro-desc">{extra.desc}</p>

                  <button
                    className="btn-agendar-barbeiro"
                    onClick={() => handleBookWithBarber(barber.id)}
                  >
                    <Calendar size={15} />
                    <span>Agendar com {barber.nome.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

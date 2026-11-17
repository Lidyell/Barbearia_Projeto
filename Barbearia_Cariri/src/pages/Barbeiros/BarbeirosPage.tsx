import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Star, Calendar, Scissors, Sparkles, CheckCircle2 } from 'lucide-react';
import { fetchBarbers } from '../Painel/services/dashboardService';
import type { Barber } from '../Painel/types/dashboard.types';
import './BarbeirosPage.css';

const BARBERS_EXTENDED: Record<
  string,
  {
    role: string;
    bio: string;
    experience: string;
    skills: string[];
    instagram: string;
  }
> = {
  'João Silva': {
    role: 'Mestre em Fade & Degradê Navalhado',
    bio: 'Pioneiro em técnicas de transição limpa, alinhamento capilar e tesoura clássica. Especialista em visagismo para cortes modernos.',
    experience: '8 anos de profissão',
    skills: ['Degradê Low/Mid/High Fade', 'Navalhado Artístico', 'Alinhamento com Pigmentação', 'Finalização com Pomadas Nobres'],
    instagram: '@joao.castelobranco',
  },
  'Maria Santos': {
    role: 'Especialista em Visagismo & Barboterapia',
    bio: 'Referência regional no cuidado integral da barba e pele masculina. Conduz o ritual de toalha quente e massagem facial relaxante.',
    experience: '6 anos de profissão',
    skills: ['Barboterapia Aromática', 'Visagismo & Desenho de Barba', 'Hidratação Profunda', 'Design de Sobrancelha'],
    instagram: '@maria.castelobranco',
  },
  'Carlos Souza': {
    role: 'Tradicionalista dos Cortes Clássicos & Tesoura',
    bio: 'Mestre na arte dos cortes tradicionais masculinos (Executive, Pompadour, Side Part). Dedicação máxima à precisão milimétrica.',
    experience: '10 anos de profissão',
    skills: ['Corte na Tesoura', 'Penteados Vintage', 'Barba Tradicional', 'Acabamento com Navalhete'],
    instagram: '@carlos.castelobranco',
  },
};

export default function BarbeirosPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBarbers().then((data) => {
      setBarbers(data.filter((b) => b.ativo));
    });
  }, []);

  return (
    <div className="barbeiros-page-wrapper">
      {/* Hero */}
      <section className="barbeiros-page-hero">
        <div className="barbeiros-hero-container">
          <span className="tag-dourada">
            <Award size={14} /> Equipe de Especialistas
          </span>
          <h1 className="barbeiros-hero-title">
            Mestres Barbeiros <span>Castelo Branco</span>
          </h1>
          <p className="barbeiros-hero-subtitle">
            Conheça os profissionais que transformam técnica, visagismo e
            tradição em arte. Escolha o seu barbeiro de confiança e agende com antecedência.
          </p>
        </div>
      </section>

      {/* Grid de Perfis Completos */}
      <section className="barbeiros-page-content">
        <div className="barbeiros-page-grid">
          {barbers.map((barber) => {
            const ext = BARBERS_EXTENDED[barber.nome] || {
              role: 'Barbeiro Especialista',
              bio: 'Profissional dedicado ao corte clássico masculino e atendimento personalizado de alto padrão.',
              experience: 'Profissional Certificado',
              skills: ['Corte Masculino', 'Barba Alinhada', 'Acabamento Premium'],
              instagram: '@castelobranco.cariri',
            };

            const avatar =
              barber.avatar_url ||
              'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80';

            return (
              <div key={barber.id} className="barbeiro-perfil-card">
                <div className="perfil-foto-col">
                  <img
                    src={avatar}
                    alt={barber.nome}
                    className="perfil-foto"
                  />
                  <div className="perfil-foto-badge">
                    <Star size={14} fill="#ECC968" color="#ECC968" />
                    <span>5.0 Excelência</span>
                  </div>
                </div>

                <div className="perfil-info-col">
                  <div className="perfil-top">
                    <span className="perfil-exp-tag">{ext.experience}</span>
                    <h2 className="perfil-nome">{barber.nome}</h2>
                    <h4 className="perfil-role">{ext.role}</h4>
                  </div>

                  <p className="perfil-bio">{ext.bio}</p>

                  <div className="perfil-skills-box">
                    <span className="skills-title">
                      <Sparkles size={13} /> Principais Especialidades:
                    </span>
                    <div className="skills-tags-wrap">
                      {ext.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="skill-pill">
                          <CheckCircle2 size={12} className="text-gold" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="perfil-card-footer">
                    <button
                      className="btn-dourado-principal btn-perfil-agendar"
                      onClick={() => navigate(`/agenda?barber=${barber.id}`)}
                    >
                      <Calendar size={16} />
                      <span>Agendar Horário com {barber.nome.split(' ')[0]}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

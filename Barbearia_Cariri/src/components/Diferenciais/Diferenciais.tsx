import { Sparkles, Flame, Beer, Clock, Award } from 'lucide-react';
import './Diferenciais.css';

const DIFERENCIAIS = [
  {
    icon: Flame,
    title: 'Barboterapia Tradicional',
    description:
      'Toalha quente aromática, esfoliação facial revigorante, óleos nobres e navalha afiada com o máximo conforto e alinhamento.',
    highlight: 'Toalha quente & Massagem',
  },
  {
    icon: Beer,
    title: 'Lounge Bar & Café Expresso',
    description:
      'Ambiente climatizado, poltronas vintage em couro, Wi-Fi de alta velocidade e chopp artesanal ou café expresso de cortesia.',
    highlight: 'Chopp ou Café cortesia',
  },
  {
    icon: Clock,
    title: 'Pontualidade Britânica',
    description:
      'Chega de esperar horas na barbearia. Agendamento digital descomplicado com garantia de atendimento no horário marcado.',
    highlight: 'Zero espera',
  },
  {
    icon: Award,
    title: 'Visagismo Masculino',
    description:
      'Barbeiros especialistas que analisam o formato do seu rosto e estilo de vida para criar um visual único e marcante.',
    highlight: 'Consultoria de Estilo',
  },
];

export default function Diferenciais() {
  return (
    <section className="diferenciais-section">
      <div className="diferenciais-container">
        <div className="diferenciais-header">
          <span className="tag-dourada">
            <Sparkles size={14} /> A Experiência Castelo Branco
          </span>
          <h2 className="titulo-secao">
            Muito mais que um corte. <span>Um momento só seu.</span>
          </h2>
          <p className="subtitulo-secao">
            Cuidamos de cada detalhe para que sua passagem pela barbearia seja
            uma pausa relaxante e revigorante na sua rotina.
          </p>
        </div>

        <div className="diferenciais-grid">
          {DIFERENCIAIS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="diferencial-card">
                <div className="diferencial-badge">{item.highlight}</div>
                <div className="diferencial-icon-wrapper">
                  <Icon size={24} className="diferencial-icon" />
                </div>
                <h3 className="diferencial-title">{item.title}</h3>
                <p className="diferencial-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

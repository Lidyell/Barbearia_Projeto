import { Sparkles, Scissors, ShieldCheck } from 'lucide-react';
import './Depoimentos.css';

export default function Depoimentos() {
  return (
    <section className="manifesto-section">
      <div className="manifesto-container">
        <div className="manifesto-card">
          <div className="manifesto-badge-pill">
            <Sparkles size={14} /> Filosofia Castelo Branco
          </div>

          <div className="manifesto-quote-mark">“</div>

          <blockquote className="manifesto-quote">
            O corte de cabelo e a barba não são apenas estética — são a sua
            marca pessoal, sua postura e sua confiança diante do mundo.
            Aqui no Cariri, honramos a tradição da navalha clássica e a
            precisão do visagismo moderno para entregar a sua melhor versão.
          </blockquote>

          <div className="manifesto-divider" />

          <div className="manifesto-signature-block">
            <div className="signature-icon-box">
              <Scissors size={20} />
            </div>
            <div className="signature-text-box">
              <h3 className="signature-brand">Barbearia Castelo Branco</h3>
              <p className="signature-role">
                Tradição, Precisão & Cuidado com o Homem Moderno
              </p>
              <div className="signature-tags">
                <span className="signature-pill">
                  <ShieldCheck size={12} /> Juazeiro do Norte • Cariri
                </span>
                <span className="signature-pill">Atendimento Exclusivo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

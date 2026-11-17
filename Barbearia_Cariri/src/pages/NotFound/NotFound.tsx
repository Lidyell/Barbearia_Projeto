import { Link } from 'react-router-dom';
import { Scissors, Home, Calendar, ArrowRight } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-card">
        <div className="not-found-icon-box">
          <Scissors size={40} className="not-found-scissors" />
        </div>

        <span className="not-found-badge">Erro 404</span>

        <h1 className="not-found-title">Página Não Encontrada</h1>

        <p className="not-found-description">
          Parece que o caminho que você tentou acessar não existe ou foi
          removido. Não se preocupe, nosso estilo e pontualidade continuam
          impecáveis.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn-secundario-outline btn-nf">
            <Home size={16} />
            <span>Voltar ao Início</span>
          </Link>

          <Link to="/agenda" className="btn-dourado-principal btn-nf">
            <Calendar size={16} />
            <span>Agendar Horário</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

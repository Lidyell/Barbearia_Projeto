import { LogOut, RefreshCw, Database } from 'lucide-react';
import { isSupabaseConfigured } from '../../../services/supabase';

interface DashboardHeaderProps {
  userName: string;
  onLogout: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function DashboardHeader({
  userName,
  onLogout,
  onRefresh,
  isRefreshing,
}: DashboardHeaderProps) {
  const initial = userName ? userName.charAt(0).toUpperCase() : 'A';

  return (
    <header className="dash-header">
      <div className="dash-header-title-container">
        <div className="dash-badge-container">
          <span className="dash-badge-pill">
            <span className="pulse-dot"></span>
            Painel Executivo
          </span>
          <span
            className={`dash-db-status ${
              isSupabaseConfigured ? 'status-online' : 'status-demo'
            }`}
            title={
              isSupabaseConfigured
                ? 'Conectado ao Supabase (PostgreSQL)'
                : 'Chave não configurada no .env. Exibindo dados locais seguros.'
            }
          >
            <Database size={13} />
            {isSupabaseConfigured ? 'Supabase Ativo' : 'Demonstração'}
          </span>
        </div>
        <h1 className="dash-title">Gestão Barbearia Castelo Branco</h1>
        <p className="dash-subtitle">
          Acompanhamento em tempo real de faturamento, produtividade e metas
        </p>
      </div>

      <div className="dash-header-actions">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="dash-btn-secondary"
          title="Atualizar dados"
        >
          <RefreshCw size={16} className={isRefreshing ? 'spin-icon' : ''} />
          <span>Atualizar</span>
        </button>

        <div className="dash-user-badge">
          <div className="dash-user-avatar">{initial}</div>
          <div className="dash-user-text">
            <span className="dash-user-name">{userName || 'Administrador'}</span>
            <span className="dash-user-role">Gestor</span>
          </div>
        </div>

        <button onClick={onLogout} className="dash-btn-logout" title="Encerrar sessão">
          <LogOut size={16} />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}

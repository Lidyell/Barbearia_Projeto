import { useState } from 'react';
import { Award, Target, Trophy, ArrowUpDown } from 'lucide-react';
import type { BarberRankingItem } from '../types/dashboard.types';
import { formatCurrency } from '../utils/dashboardCalculations';

interface BarberRankingProps {
  ranking: BarberRankingItem[];
  totalRevenue: number;
  generalGoal?: number;
}

type SortField = 'faturamento' | 'atendimentos' | 'ticketMedio' | 'progressoMeta';

export function BarberRanking({
  ranking,
  totalRevenue,
  generalGoal = 12000,
}: BarberRankingProps) {
  const [sortBy, setSortBy] = useState<SortField>('faturamento');

  // Ordenação dinâmica
  const sortedRanking = [...ranking].sort((a, b) => b[sortBy] - a[sortBy]);

  // Meta Geral da Barbearia
  const progressGeneral = Math.min(100, Math.round((totalRevenue / generalGoal) * 100));
  const remainingGeneral = Math.max(0, generalGoal - totalRevenue);

  return (
    <div className="dash-section-card">
      <div className="dash-card-header-row">
        <div>
          <div className="dash-title-with-icon">
            <Trophy size={20} className="text-gold" />
            <h3 className="dash-section-title">Ranking de Barbeiros & Metas</h3>
          </div>
          <p className="dash-section-desc">
            Produtividade individual, ticket médio e progresso das metas mensais
          </p>
        </div>

        <div className="dash-sort-control">
          <ArrowUpDown size={14} />
          <span>Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortField)}
            className="dash-sort-select"
          >
            <option value="faturamento">Faturamento</option>
            <option value="atendimentos">Atendimentos</option>
            <option value="ticketMedio">Ticket Médio</option>
            <option value="progressoMeta">Progresso da Meta</option>
          </select>
        </div>
      </div>

      {/* Card de Meta Geral da Barbearia */}
      <div className="dash-general-goal-box">
        <div className="general-goal-header">
          <div className="goal-title-group">
            <Target size={18} className="text-gold" />
            <span className="goal-title">Meta Geral da Barbearia</span>
          </div>
          <div className="goal-values">
            <span className="goal-achieved">{formatCurrency(totalRevenue)}</span>
            <span className="goal-target"> / {formatCurrency(generalGoal)}</span>
          </div>
        </div>

        <div className="progress-bar-track">
          <div
            className="progress-bar-fill gold-fill"
            style={{ width: `${progressGeneral}%` }}
          />
        </div>

        <div className="general-goal-footer">
          <span>{progressGeneral}% concluído</span>
          <span>
            {remainingGeneral > 0
              ? `Falta ${formatCurrency(remainingGeneral)} para atingir a meta`
              : '🎉 Meta atingida com sucesso!'}
          </span>
        </div>
      </div>

      {/* Grid de Cards dos Barbeiros */}
      <div className="barber-cards-grid">
        {sortedRanking.map((barber, index) => {
          const position = index + 1;
          const isTop1 = position === 1;

          return (
            <div
              key={barber.id}
              className={`barber-ranking-card ${isTop1 ? 'highlight-top1' : ''}`}
            >
              <div className="barber-card-top">
                <div className="barber-avatar-group">
                  <div className={`barber-rank-badge pos-${position}`}>
                    {position}º
                  </div>
                  <div className="barber-avatar">
                    {barber.nome.charAt(0).toUpperCase()}
                  </div>
                  <div className="barber-details">
                    <h4 className="barber-name">{barber.nome}</h4>
                    {isTop1 && (
                      <span className="barber-leader-tag">
                        <Award size={12} /> Líder do período
                      </span>
                    )}
                  </div>
                </div>

                <div className="barber-revenue-badge">
                  <span className="rev-val">{formatCurrency(barber.faturamento)}</span>
                </div>
              </div>

              <div className="barber-stats-row">
                <div className="barber-stat-item">
                  <span className="stat-label">Atendimentos</span>
                  <span className="stat-value">{barber.atendimentos}</span>
                </div>
                <div className="barber-stat-item">
                  <span className="stat-label">Ticket Médio</span>
                  <span className="stat-value">{formatCurrency(barber.ticketMedio)}</span>
                </div>
                <div className="barber-stat-item">
                  <span className="stat-label">Conclusão</span>
                  <span className="stat-value">{barber.taxaConclusao}%</span>
                </div>
              </div>

              {/* Barra de Meta Individual */}
              <div className="barber-goal-section">
                <div className="barber-goal-header">
                  <span className="b-goal-label">Meta Individual</span>
                  <span className="b-goal-percent">{barber.progressoMeta}%</span>
                </div>
                <div className="progress-bar-track small">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${barber.progressoMeta}%`,
                      backgroundColor:
                        barber.progressoMeta >= 100
                          ? '#2ecc71'
                          : barber.progressoMeta >= 70
                          ? '#D3AF37'
                          : '#e67e22',
                    }}
                  />
                </div>
                <div className="barber-goal-sub">
                  <span>Alvo: {formatCurrency(barber.meta)}</span>
                  <span>
                    {barber.restanteMeta > 0
                      ? `Faltam ${formatCurrency(barber.restanteMeta)}`
                      : 'Meta Batida!'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

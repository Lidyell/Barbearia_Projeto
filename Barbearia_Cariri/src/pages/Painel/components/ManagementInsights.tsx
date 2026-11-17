import {
  Lightbulb,
  Award,
  Sparkles,
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import type { ManagementInsightsData } from '../types/dashboard.types';
import { formatCurrency } from '../utils/dashboardCalculations';

interface ManagementInsightsProps {
  insights: ManagementInsightsData;
}

export function ManagementInsights({ insights }: ManagementInsightsProps) {
  const {
    melhorBarbeiro,
    servicoMaisVendido,
    diaMaiorMovimento,
    horarioBaixaOcupacao,
    crescimentoFaturamento,
    crescimentoAtendimentos,
    statusGeral,
  } = insights;

  return (
    <div className="dash-section-card insights-card">
      <div className="dash-card-header-row">
        <div className="dash-title-with-icon">
          <Lightbulb size={20} className="text-gold" />
          <h3 className="dash-section-title">Inteligência & Insights Gerenciais</h3>
        </div>
        <div className={`status-pill ${statusGeral}`}>
          {statusGeral === 'crescimento' ? (
            <>
              <CheckCircle2 size={13} /> Ritmo em Crescimento
            </>
          ) : statusGeral === 'atencao' ? (
            <>
              <AlertTriangle size={13} /> Ponto de Atenção
            </>
          ) : (
            <>
              <Sparkles size={13} /> Operação Estável
            </>
          )}
        </div>
      </div>

      <div className="insights-grid">
        {/* Melhor Barbeiro */}
        <div className="insight-box">
          <div className="insight-icon-circle gold">
            <Award size={18} />
          </div>
          <div className="insight-content">
            <span className="insight-label">Barbeiro Destaque</span>
            <h4 className="insight-value">{melhorBarbeiro?.nome || 'N/A'}</h4>
            <p className="insight-desc">
              Gerou {formatCurrency(melhorBarbeiro?.faturamento || 0)} em{' '}
              {melhorBarbeiro?.atendimentos || 0} atendimentos no período.
            </p>
          </div>
        </div>

        {/* Serviço Mais Vendido */}
        <div className="insight-box">
          <div className="insight-icon-circle green">
            <Sparkles size={18} />
          </div>
          <div className="insight-content">
            <span className="insight-label">Carro-Chefe</span>
            <h4 className="insight-value">{servicoMaisVendido?.nome || 'N/A'}</h4>
            <p className="insight-desc">
              {servicoMaisVendido?.quantidade || 0} cortes realizados, somando{' '}
              {formatCurrency(servicoMaisVendido?.receita || 0)} de receita direta.
            </p>
          </div>
        </div>

        {/* Dia de Maior Movimento */}
        <div className="insight-box">
          <div className="insight-icon-circle blue">
            <Calendar size={18} />
          </div>
          <div className="insight-content">
            <span className="insight-label">Dia Mais Movimentado</span>
            <h4 className="insight-value">{diaMaiorMovimento?.dia || 'Sábado'}</h4>
            <p className="insight-desc">
              Maior concentração com {diaMaiorMovimento?.atendimentos || 0} atendimentos
              concluídos. Ideal para reforçar escalas.
            </p>
          </div>
        </div>

        {/* Oportunidade em Horários de Baixa Ocupação */}
        <div className="insight-box">
          <div className="insight-icon-circle amber">
            <Clock size={18} />
          </div>
          <div className="insight-content">
            <span className="insight-label">Oportunidade de Horário</span>
            <h4 className="insight-value">{horarioBaixaOcupacao?.horario || '14:00'}</h4>
            <p className="insight-desc">
              Menor ocupação ({horarioBaixaOcupacao?.atendimentos || 0} atendimentos). Recomendado
              para promoções relâmpago ou folgas rotativas.
            </p>
          </div>
        </div>

        {/* Crescimento de Faturamento */}
        <div className="insight-box full-width">
          <div className="insight-icon-circle gold">
            <TrendingUp size={18} />
          </div>
          <div className="insight-content">
            <span className="insight-label">Desempenho Comercial Comparativo</span>
            <p className="insight-big-text">
              O faturamento está{' '}
              <strong>
                {crescimentoFaturamento >= 0
                  ? `+${crescimentoFaturamento}% acima`
                  : `${crescimentoFaturamento}% abaixo`}
              </strong>{' '}
              do período anterior, com volume de atendimentos variando em{' '}
              <strong>
                {crescimentoAtendimentos >= 0
                  ? `+${crescimentoAtendimentos}%`
                  : `${crescimentoAtendimentos}%`}
              </strong>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

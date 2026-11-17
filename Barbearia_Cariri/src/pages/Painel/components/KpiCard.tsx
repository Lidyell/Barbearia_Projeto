import type { ReactNode } from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  growth?: number;
  comparisonLabel?: string;
  icon: ReactNode;
  subtitle?: string;
  isInverse?: boolean; // Para cancelamentos: queda é boa, alta é ruim
}

export function KpiCard({
  title,
  value,
  growth,
  comparisonLabel = 'vs. período anterior',
  icon,
  subtitle,
  isInverse = false,
}: KpiCardProps) {
  const hasGrowth = typeof growth === 'number' && !isNaN(growth);
  const isPositive = hasGrowth && growth > 0;
  const isZero = hasGrowth && Math.abs(growth) < 0.1;

  // Lógica de status para cores:
  // Se for cancelamento (isInverse): positivo = alerta (ruim), negativo = sucesso (bom)
  const isSuccess = isInverse ? !isPositive && !isZero : isPositive;
  const isAlert = isInverse ? isPositive : !isPositive && !isZero;

  return (
    <div className="dash-kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <div className="kpi-icon-wrapper">{icon}</div>
      </div>

      <div className="kpi-body">
        <h3 className="kpi-value">{value}</h3>

        {hasGrowth && (
          <div className="kpi-comparison">
            <span
              className={`kpi-badge ${
                isZero ? 'neutral' : isSuccess ? 'positive' : isAlert ? 'negative' : ''
              }`}
            >
              {isZero ? (
                <Minus size={12} />
              ) : isPositive ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              {isPositive ? `+${Math.abs(growth).toFixed(1)}%` : `${growth.toFixed(1)}%`}
            </span>
            <span className="kpi-comparison-text">{comparisonLabel}</span>
          </div>
        )}

        {subtitle && <p className="kpi-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

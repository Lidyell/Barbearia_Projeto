import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DollarSign, Calendar } from 'lucide-react';
import type { RevenueEvolutionItem } from '../types/dashboard.types';
import { formatCurrency } from '../utils/dashboardCalculations';

interface RevenueChartProps {
  data: RevenueEvolutionItem[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Encontra o melhor dia de faturamento
  const bestDay = [...data].sort((a, b) => b.faturamento - a.faturamento)[0];

  return (
    <div className="dash-chart-card">
      <div className="dash-chart-header">
        <div className="dash-chart-title-group">
          <div className="dash-chart-icon-box">
            <DollarSign size={18} />
          </div>
          <div>
            <h3 className="dash-chart-title">Evolução do Faturamento</h3>
            <p className="dash-chart-desc">
              Receita diária realizada no período selecionado
            </p>
          </div>
        </div>

        {bestDay && bestDay.faturamento > 0 && (
          <div className="dash-chart-tag" title="Melhor resultado diário registrado">
            <Calendar size={13} />
            <span>Pico: {bestDay.date} ({formatCurrency(bestDay.faturamento)})</span>
          </div>
        )}
      </div>

      <div className="dash-chart-body">
        {data.length === 0 ? (
          <div className="dash-empty-chart">Sem dados de faturamento para o período.</div>
        ) : (
          <ResponsiveContainer width="100%" height={290}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D3AF37" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D3AF37" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis
                dataKey="date"
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis
                stroke="#888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `R$${val}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as RevenueEvolutionItem;
                    return (
                      <div className="dash-custom-tooltip">
                        <p className="tooltip-date">Data: {label}</p>
                        <p className="tooltip-value">
                          Receita: <strong>{formatCurrency(item.faturamento)}</strong>
                        </p>
                        <p className="tooltip-sub">
                          Atendimentos: <strong>{item.atendimentos}</strong>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="faturamento"
                stroke="#D3AF37"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#goldGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

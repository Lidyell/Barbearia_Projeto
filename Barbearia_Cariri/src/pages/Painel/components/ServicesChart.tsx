import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Scissors } from 'lucide-react';
import type { ServiceDistributionItem } from '../types/dashboard.types';
import { formatCurrency } from '../utils/dashboardCalculations';

interface ServicesChartProps {
  data: ServiceDistributionItem[];
}

const COLORS = [
  '#D3AF37', // Dourado metálico principal
  '#f39c12', // Dourado âmbar
  '#3498db', // Azul suave
  '#9b59b6', // Roxo elegante
  '#2ecc71', // Verde esmeralda
  '#e67e22', // Laranja
  '#1abc9c', // Turquesa
];

export function ServicesChart({ data }: ServicesChartProps) {
  const chartData = data.filter((item) => item.receitaTotal > 0);

  return (
    <div className="dash-chart-card">
      <div className="dash-chart-header">
        <div className="dash-chart-title-group">
          <div className="dash-chart-icon-box">
            <Scissors size={18} />
          </div>
          <div>
            <h3 className="dash-chart-title">Mix de Serviços & Receita</h3>
            <p className="dash-chart-desc">
              Participação de cada serviço no faturamento total
            </p>
          </div>
        </div>
      </div>

      <div className="dash-chart-body services-chart-layout">
        <div className="pie-wrapper">
          {chartData.length === 0 ? (
            <div className="dash-empty-chart">Sem serviços concluídos no período.</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="receitaTotal"
                  nameKey="nome"
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#0d0d0d"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as ServiceDistributionItem;
                      return (
                        <div className="dash-custom-tooltip">
                          <p className="tooltip-date">{item.nome}</p>
                          <p className="tooltip-value">
                            Receita: <strong>{formatCurrency(item.receitaTotal)}</strong>
                          </p>
                          <p className="tooltip-sub">
                            Atendimentos: <strong>{item.quantidade}</strong> ({item.percentual}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="services-ranked-list">
          <h4 className="services-list-title">Desempenho por Serviço</h4>
          <ul className="services-items">
            {data.map((item, index) => (
              <li key={item.id} className="service-row">
                <div className="service-row-left">
                  <span
                    className="service-bullet"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="service-row-info">
                    <span className="service-name">{item.nome}</span>
                    <span className="service-qty">{item.quantidade} realizados</span>
                  </div>
                </div>
                <div className="service-row-right">
                  <span className="service-revenue">{formatCurrency(item.receitaTotal)}</span>
                  <span className="service-percent">{item.percentual}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

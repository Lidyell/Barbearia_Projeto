import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CalendarDays, Clock } from 'lucide-react';
import type {
  AppointmentsByDayOfWeek,
  AppointmentsByHourItem,
} from '../types/dashboard.types';

interface AppointmentsChartProps {
  byDayOfWeek: AppointmentsByDayOfWeek[];
  byHour: AppointmentsByHourItem[];
}

export function AppointmentsChart({
  byDayOfWeek,
  byHour,
}: AppointmentsChartProps) {
  const [viewMode, setViewMode] = useState<'dayOfWeek' | 'byHour'>('dayOfWeek');

  return (
    <div className="dash-chart-card">
      <div className="dash-chart-header">
        <div className="dash-chart-title-group">
          <div className="dash-chart-icon-box">
            {viewMode === 'dayOfWeek' ? <CalendarDays size={18} /> : <Clock size={18} />}
          </div>
          <div>
            <h3 className="dash-chart-title">Fluxo de Atendimentos</h3>
            <p className="dash-chart-desc">
              {viewMode === 'dayOfWeek'
                ? 'Volume por dia da semana (Segunda a Sábado)'
                : 'Distribuição por horário de funcionamento (09h às 19h)'}
            </p>
          </div>
        </div>

        <div className="dash-view-toggle">
          <button
            type="button"
            className={`dash-toggle-btn ${viewMode === 'dayOfWeek' ? 'active' : ''}`}
            onClick={() => setViewMode('dayOfWeek')}
          >
            Dias da Semana
          </button>
          <button
            type="button"
            className={`dash-toggle-btn ${viewMode === 'byHour' ? 'active' : ''}`}
            onClick={() => setViewMode('byHour')}
          >
            Horários
          </button>
        </div>
      </div>

      <div className="dash-chart-body">
        {viewMode === 'dayOfWeek' ? (
          <ResponsiveContainer width="100%" height={290}>
            <BarChart
              data={byDayOfWeek}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="dia" stroke="#888" fontSize={12} tickLine={false} />
              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as AppointmentsByDayOfWeek;
                    return (
                      <div className="dash-custom-tooltip">
                        <p className="tooltip-date">Dia: {label}</p>
                        <p className="tooltip-value text-green">
                          Concluídos: <strong>{data.concluidos}</strong>
                        </p>
                        <p className="tooltip-sub text-red">
                          Cancelados: <strong>{data.cancelados}</strong>
                        </p>
                        <p className="tooltip-total">
                          Total Agendado: <strong>{data.total}</strong>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
                formatter={(value) => (value === 'concluidos' ? 'Concluídos' : 'Cancelados')}
              />
              <Bar dataKey="concluidos" fill="#2ecc71" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cancelados" fill="#e74c3c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={290}>
            <BarChart
              data={byHour}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="horario" stroke="#888" fontSize={11} tickLine={false} />
              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="dash-custom-tooltip">
                        <p className="tooltip-date">Horário: {label}</p>
                        <p className="tooltip-value">
                          Atendimentos: <strong>{payload[0].value}</strong>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="total" fill="#D3AF37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

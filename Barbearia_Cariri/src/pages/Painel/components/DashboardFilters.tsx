import { Calendar, Filter, Users } from 'lucide-react';
import type { Barber, DashboardFiltersState, FilterPeriod } from '../types/dashboard.types';

interface DashboardFiltersProps {
  filters: DashboardFiltersState;
  onChange: (newFilters: DashboardFiltersState) => void;
  barbers: Barber[];
}

export function DashboardFilters({
  filters,
  onChange,
  barbers,
}: DashboardFiltersProps) {
  const periodOptions: { label: string; value: FilterPeriod }[] = [
    { label: 'Hoje', value: 'today' },
    { label: 'Últimos 7 dias', value: 'last_7_days' },
    { label: 'Últimos 30 dias', value: 'last_30_days' },
    { label: 'Este mês', value: 'this_month' },
    { label: 'Mês anterior', value: 'last_month' },
    { label: 'Personalizado', value: 'custom' },
  ];

  return (
    <div className="dash-filters-bar">
      <div className="dash-filters-left">
        <div className="dash-filter-group">
          <Calendar size={16} className="dash-filter-icon" />
          <span className="dash-filter-label">Período:</span>
          <div className="dash-period-chips">
            {periodOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`dash-chip ${filters.period === opt.value ? 'active' : ''}`}
                onClick={() => onChange({ ...filters, period: opt.value })}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {filters.period === 'custom' && (
          <div className="dash-custom-dates">
            <input
              type="date"
              className="dash-date-input"
              value={filters.customStartDate || ''}
              onChange={(e) =>
                onChange({ ...filters, customStartDate: e.target.value })
              }
            />
            <span className="dash-date-sep">até</span>
            <input
              type="date"
              className="dash-date-input"
              value={filters.customEndDate || ''}
              onChange={(e) =>
                onChange({ ...filters, customEndDate: e.target.value })
              }
            />
          </div>
        )}
      </div>

      <div className="dash-filters-right">
        <div className="dash-filter-select-wrapper">
          <Users size={16} className="dash-filter-icon" />
          <select
            className="dash-select"
            value={filters.barberId}
            onChange={(e) => onChange({ ...filters, barberId: e.target.value })}
          >
            <option value="all">Todos os Barbeiros</option>
            {barbers.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nome}
              </option>
            ))}
          </select>
        </div>

        {filters.barberId !== 'all' && (
          <button
            className="dash-btn-reset-filter"
            onClick={() => onChange({ ...filters, barberId: 'all' })}
            title="Limpar filtro de profissional"
          >
            <Filter size={14} />
            <span>Limpar Barbeiro</span>
          </button>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, UserCheck } from 'lucide-react';
import type { Appointment } from '../types/dashboard.types';
import { formatCurrency } from '../utils/dashboardCalculations';

interface RecentAppointmentsTableProps {
  appointments: Appointment[];
}

export function RecentAppointmentsTable({
  appointments,
}: RecentAppointmentsTableProps) {
  const [mostrarTodos, setMostrarTodos] = useState<boolean>(false);

  const displayedList = mostrarTodos ? appointments : appointments.slice(0, 5);

  const getStatusClass = (status: Appointment['status']) => {
    switch (status) {
      case 'concluido':
        return 'status-concluido';
      case 'confirmado':
        return 'status-confirmado';
      case 'pendente':
        return 'status-pendente';
      case 'cancelado':
        return 'status-cancelado';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: Appointment['status']) => {
    switch (status) {
      case 'concluido':
        return 'Concluído';
      case 'confirmado':
        return 'Confirmado';
      case 'pendente':
        return 'Pendente';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <div className="dash-section-card">
      <div className="dash-card-header-row">
        <div className="dash-title-with-icon">
          <Clock size={20} className="text-gold" />
          <h3 className="dash-section-title">Agendamentos Recentes</h3>
        </div>
        <span className="dash-badge-count">
          {appointments.length} registrados no período
        </span>
      </div>

      <div className="table-responsive-wrapper">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Serviço</th>
              <th>Barbeiro</th>
              <th>Data & Hora</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayedList.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  Nenhum agendamento encontrado para o filtro selecionado.
                </td>
              </tr>
            ) : (
              displayedList.map((item) => {
                const dateObj = parseISO(item.data_hora);
                const dataFormatada = format(dateObj, 'dd/MM/yyyy', { locale: ptBR });
                const horaFormatada = format(dateObj, 'HH:mm');
                const valorServico = item.servicos?.preco ? Number(item.servicos.preco) : 0;

                return (
                  <tr key={item.id}>
                    <td data-label="Cliente">
                      <div className="client-cell">
                        <UserCheck size={14} className="text-gold" />
                        <span>{item.clientes?.nome || 'Cliente Balcão'}</span>
                      </div>
                    </td>
                    <td data-label="Serviço">{item.servicos?.nome || 'Serviço Padrão'}</td>
                    <td data-label="Barbeiro">
                      <span className="barber-tag">
                        {item.barbeiros?.nome || 'Não definido'}
                      </span>
                    </td>
                    <td data-label="Data & Hora">
                      {dataFormatada} às {horaFormatada}
                    </td>
                    <td data-label="Valor">{formatCurrency(valorServico)}</td>
                    <td data-label="Status">
                      <span className={`status-pill-table ${getStatusClass(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {appointments.length > 5 && (
        <div className="dash-ver-mais-wrapper">
          <button
            type="button"
            className="ver-mais-btn"
            onClick={() => setMostrarTodos(!mostrarTodos)}
          >
            {mostrarTodos
              ? 'Ver menos ↑'
              : `Ver todos os ${appointments.length} agendamentos ↓`}
          </button>
        </div>
      )}
    </div>
  );
}

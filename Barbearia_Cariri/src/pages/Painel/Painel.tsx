import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  DollarSign,
  Scissors,
  TrendingUp,
  Users,
  Percent,
  XCircle,
  AlertCircle,
} from 'lucide-react';

import './Painel.css';
import type { DashboardFiltersState } from './types/dashboard.types';
import { useDashboard } from './hooks/useDashboard';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardFilters } from './components/DashboardFilters';
import { KpiCard } from './components/KpiCard';
import { RevenueChart } from './components/RevenueChart';
import { AppointmentsChart } from './components/AppointmentsChart';
import { ServicesChart } from './components/ServicesChart';
import { BarberRanking } from './components/BarberRanking';
import { ManagementInsights } from './components/ManagementInsights';
import { RecentAppointmentsTable } from './components/RecentAppointmentsTable';
import { formatCurrency } from './utils/dashboardCalculations';

export default function Painel() {
  const navigate = useNavigate();

  // 1. Controle de Usuário e Autenticação
  const [userName] = useState<string>(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (!usuarioSalvo) return 'Administrador';
    try {
      const usuario = JSON.parse(usuarioSalvo);
      return usuario.nome || 'Administrador';
    } catch {
      return 'Administrador';
    }
  });

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (!usuarioSalvo) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    toast.info('Sessão encerrada com sucesso.');
    navigate('/login');
  };

  // 2. Estado Global de Filtros
  const [filters, setFilters] = useState<DashboardFiltersState>({
    period: 'last_30_days',
    barberId: 'all',
  });

  // 3. Hook do Dashboard com React Query + Supabase
  const {
    isLoading,
    isError,
    refetch,
    barbers,
    kpis,
    revenueEvolution,
    appointmentsByDay,
    appointmentsByHour,
    barberRanking,
    servicesDistribution,
    insights,
    recentAppointments,
  } = useDashboard(filters);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Dados atualizados com sucesso!');
    }, 400);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-content-container">
        {/* Cabeçalho */}
        <DashboardHeader
          userName={userName}
          onLogout={handleLogout}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        {/* Barra de Filtros Globais */}
        <DashboardFilters
          filters={filters}
          onChange={setFilters}
          barbers={barbers}
        />

        {/* Indicador de Carregamento Ativo */}
        {isLoading && (
          <div className="dash-loading-bar">
            <div className="dash-loading-indicator" />
          </div>
        )}

        {/* Estado de Erro de Conexão */}
        {isError && (
          <div className="dash-error-banner">
            <AlertCircle size={20} />
            <span>
              Houve uma instabilidade ao conectar ao Supabase. Exibindo dados de cache seguros.
            </span>
          </div>
        )}

        {/* 1. SEÇÃO DE KPIS PRINCIPAIS */}
        <section className="dash-kpis-grid">
          <KpiCard
            title="Faturamento Total"
            value={formatCurrency(kpis.totalRevenue)}
            growth={kpis.revenueGrowth}
            icon={<DollarSign size={20} className="text-gold" />}
            subtitle="Receita líquida realizada no período"
          />

          <KpiCard
            title="Atendimentos Concluídos"
            value={kpis.totalAppointments}
            growth={kpis.appointmentsGrowth}
            icon={<Scissors size={20} className="text-gold" />}
            subtitle="Clientes efetivamente atendidos"
          />

          <KpiCard
            title="Ticket Médio"
            value={formatCurrency(kpis.averageTicket)}
            growth={kpis.ticketGrowth}
            icon={<TrendingUp size={20} className="text-gold" />}
            subtitle="Gasto médio por cliente"
          />

          <KpiCard
            title="Barbeiros Ativos"
            value={`${kpis.activeBarbersCount} profissionais`}
            icon={<Users size={20} className="text-gold" />}
            subtitle="Equipe disponível na barbearia"
          />

          <KpiCard
            title="Taxa de Ocupação"
            value={`${kpis.occupancyRate}%`}
            icon={<Percent size={20} className="text-gold" />}
            subtitle="Capacidade produtiva utilizada"
          />

          <KpiCard
            title="Cancelamentos"
            value={`${kpis.cancellationsCount} (${kpis.cancellationRate.toFixed(1)}%)`}
            growth={kpis.cancellationRate}
            isInverse={true}
            icon={<XCircle size={20} className="text-red" />}
            subtitle="Taxa sobre total de agendamentos"
          />
        </section>

        {/* 2. GRÁFICOS PRINCIPAIS: FATURAMENTO & FLUXO */}
        <section className="dash-charts-grid">
          <RevenueChart data={revenueEvolution} />
          <AppointmentsChart
            byDayOfWeek={appointmentsByDay}
            byHour={appointmentsByHour}
          />
        </section>

        {/* 3. DISTRIBUIÇÃO DE SERVIÇOS & RANKING DE BARBEIROS */}
        <section className="dash-two-cols-grid">
          <ServicesChart data={servicesDistribution} />
          <BarberRanking
            ranking={barberRanking}
            totalRevenue={kpis.totalRevenue}
          />
        </section>

        {/* 4. INTELIGÊNCIA & INSIGHTS GERENCIAIS */}
        <section className="dash-insights-section">
          <ManagementInsights insights={insights} />
        </section>

        {/* 5. TABELA DE AGENDAMENTOS RECENTES */}
        <section className="dash-table-section">
          <RecentAppointmentsTable appointments={recentAppointments} />
        </section>
      </div>
    </div>
  );
}

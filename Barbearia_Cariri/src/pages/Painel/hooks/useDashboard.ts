import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { DashboardFiltersState } from '../types/dashboard.types';
import {
  fetchAppointments,
  fetchBarbers,
  fetchGoals,
  fetchServices,
} from '../services/dashboardService';
import {
  calculateAppointmentsByDayOfWeek,
  calculateAppointmentsByHour,
  calculateBarberRanking,
  calculateDateIntervals,
  calculateKpis,
  calculateManagementInsights,
  calculateRevenueEvolution,
  calculateServicesDistribution,
  filterAppointments,
} from '../utils/dashboardCalculations';
import { differenceInDays } from 'date-fns';

export function useDashboard(filters: DashboardFiltersState) {
  // Intervalos de data para o período selecionado e período anterior correspondente
  const intervals = useMemo(() => calculateDateIntervals(filters), [filters]);

  // 1. Barbeiros
  const barbersQuery = useQuery({
    queryKey: ['dashboard', 'barbers'],
    queryFn: fetchBarbers,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // 2. Serviços
  const servicesQuery = useQuery({
    queryKey: ['dashboard', 'services'],
    queryFn: fetchServices,
    staleTime: 1000 * 60 * 5,
  });

  // 3. Metas
  const goalsQuery = useQuery({
    queryKey: ['dashboard', 'goals'],
    queryFn: fetchGoals,
    staleTime: 1000 * 60 * 10,
  });

  // 4. Agendamentos (busca o período total que cobre o anterior e o atual)
  const appointmentsQuery = useQuery({
    queryKey: [
      'dashboard',
      'appointments',
      intervals.previousStart.toISOString(),
      intervals.currentEnd.toISOString(),
    ],
    queryFn: () =>
      fetchAppointments(
        intervals.previousStart.toISOString(),
        intervals.currentEnd.toISOString()
      ),
    staleTime: 1000 * 60 * 2,
  });

  const isLoading =
    barbersQuery.isLoading ||
    servicesQuery.isLoading ||
    goalsQuery.isLoading ||
    appointmentsQuery.isLoading;

  const isError =
    barbersQuery.isError ||
    servicesQuery.isError ||
    goalsQuery.isError ||
    appointmentsQuery.isError;

  // Cálculos derivados
  const dashboardData = useMemo(() => {
    const allAppointments = appointmentsQuery.data || [];
    const barbers = barbersQuery.data || [];
    const services = servicesQuery.data || [];
    const goals = goalsQuery.data || [];

    // Agendamentos filtrados por barbeiro e intervalo
    const currentApps = filterAppointments(
      allAppointments,
      filters.barberId,
      intervals.currentStart,
      intervals.currentEnd
    );

    const prevApps = filterAppointments(
      allAppointments,
      filters.barberId,
      intervals.previousStart,
      intervals.previousEnd
    );

    const daysInPeriod = Math.max(
      1,
      differenceInDays(intervals.currentEnd, intervals.currentStart) + 1
    );

    const activeBarbersCount = barbers.filter((b) => b.ativo).length;

    // 1. KPIs
    const kpis = calculateKpis(currentApps, prevApps, activeBarbersCount, daysInPeriod);

    // 2. Gráfico de Evolução de Receita
    const revenueEvolution = calculateRevenueEvolution(
      currentApps,
      intervals.currentStart,
      intervals.currentEnd
    );

    // 3. Gráficos de Atendimentos
    const appointmentsByDay = calculateAppointmentsByDayOfWeek(currentApps);
    const appointmentsByHour = calculateAppointmentsByHour(currentApps);

    // 4. Ranking de Barbeiros
    const barberRanking = calculateBarberRanking(barbers, currentApps, goals);

    // 5. Distribuição de Serviços
    const servicesDistribution = calculateServicesDistribution(services, currentApps);

    // 6. Insights Gerenciais
    const insights = calculateManagementInsights(
      barberRanking,
      servicesDistribution,
      appointmentsByDay,
      appointmentsByHour,
      kpis
    );

    return {
      kpis,
      revenueEvolution,
      appointmentsByDay,
      appointmentsByHour,
      barberRanking,
      servicesDistribution,
      insights,
      recentAppointments: currentApps.slice(0, 10),
    };
  }, [
    appointmentsQuery.data,
    barbersQuery.data,
    servicesQuery.data,
    goalsQuery.data,
    filters.barberId,
    intervals,
  ]);

  return {
    isLoading,
    isError,
    refetch: () => {
      barbersQuery.refetch();
      servicesQuery.refetch();
      goalsQuery.refetch();
      appointmentsQuery.refetch();
    },
    barbers: barbersQuery.data || [],
    services: servicesQuery.data || [],
    intervals,
    ...dashboardData,
  };
}

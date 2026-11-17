import {
  subDays,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  subMonths,
  differenceInDays,
  format,
  parseISO,
  isWithinInterval,
  getDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type {
  Appointment,
  Barber,
  BarberRankingItem,
  DashboardFiltersState,
  DashboardKpis,
  Goal,
  ManagementInsightsData,
  RevenueEvolutionItem,
  ServiceDistributionItem,
  ServiceItem,
} from '../types/dashboard.types';

export interface DateInterval {
  currentStart: Date;
  currentEnd: Date;
  previousStart: Date;
  previousEnd: Date;
}

/**
 * Retorna os intervalos de data para o período atual e o período anterior correspondente
 */
export function calculateDateIntervals(filters: DashboardFiltersState): DateInterval {
  const now = new Date();
  let currentStart = startOfDay(now);
  let currentEnd = endOfDay(now);

  switch (filters.period) {
    case 'today':
      currentStart = startOfDay(now);
      currentEnd = endOfDay(now);
      break;

    case 'last_7_days':
      currentStart = startOfDay(subDays(now, 6));
      currentEnd = endOfDay(now);
      break;

    case 'last_30_days':
      currentStart = startOfDay(subDays(now, 29));
      currentEnd = endOfDay(now);
      break;

    case 'this_month':
      currentStart = startOfMonth(now);
      currentEnd = endOfDay(now);
      break;

    case 'last_month': {
      const prevMonth = subMonths(now, 1);
      currentStart = startOfMonth(prevMonth);
      currentEnd = endOfMonth(prevMonth);
      break;
    }

    case 'custom':
      if (filters.customStartDate && filters.customEndDate) {
        currentStart = startOfDay(parseISO(filters.customStartDate));
        currentEnd = endOfDay(parseISO(filters.customEndDate));
      } else {
        currentStart = startOfDay(subDays(now, 29));
        currentEnd = endOfDay(now);
      }
      break;
  }

  // Período anterior com a mesma quantidade de dias
  const daysDiff = Math.max(1, differenceInDays(currentEnd, currentStart) + 1);
  const previousEnd = endOfDay(subDays(currentStart, 1));
  const previousStart = startOfDay(subDays(previousEnd, daysDiff - 1));

  return {
    currentStart,
    currentEnd,
    previousStart,
    previousEnd,
  };
}

/**
 * Filtra agendamentos por barbeiro e intervalo de data
 */
export function filterAppointments(
  appointments: Appointment[],
  barberId: string,
  start: Date,
  end: Date
): Appointment[] {
  return appointments.filter((app) => {
    if (barberId !== 'all' && app.barbeiro_id !== barberId) {
      return false;
    }
    const date = parseISO(app.data_hora);
    return isWithinInterval(date, { start, end });
  });
}

/**
 * Calcula os principais KPIs do painel
 */
export function calculateKpis(
  currentAppointments: Appointment[],
  previousAppointments: Appointment[],
  activeBarbersCount: number,
  daysInPeriod: number
): DashboardKpis {
  // Faturamento Atual (soma dos pagamentos válidos ou valor do serviço para atendimentos concluídos)
  const currentCompleted = currentAppointments.filter((a) => a.status === 'concluido');
  const prevCompleted = previousAppointments.filter((a) => a.status === 'concluido');

  const getRevenue = (completedApps: Appointment[]) =>
    completedApps.reduce((sum, app) => {
      // Se houver pagamento pago registrado
      const paid = app.pagamentos?.find((p) => p.status === 'pago');
      if (paid) return sum + Number(paid.valor);
      // Fallback para o preço do serviço
      return sum + (app.servicos ? Number(app.servicos.preco) : 0);
    }, 0);

  const totalRevenue = getRevenue(currentCompleted);
  const prevRevenue = getRevenue(prevCompleted);

  // Crescimento Faturamento
  const revenueGrowth =
    prevRevenue > 0
      ? ((totalRevenue - prevRevenue) / prevRevenue) * 100
      : totalRevenue > 0
      ? 100
      : 0;

  // Atendimentos Concluídos
  const totalAppointments = currentCompleted.length;
  const prevAppointmentsCount = prevCompleted.length;
  const appointmentsGrowth =
    prevAppointmentsCount > 0
      ? ((totalAppointments - prevAppointmentsCount) / prevAppointmentsCount) * 100
      : totalAppointments > 0
      ? 100
      : 0;

  // Ticket Médio
  const averageTicket = totalAppointments > 0 ? totalRevenue / totalAppointments : 0;
  const prevTicket = prevAppointmentsCount > 0 ? prevRevenue / prevAppointmentsCount : 0;
  const ticketGrowth =
    prevTicket > 0
      ? ((averageTicket - prevTicket) / prevTicket) * 100
      : averageTicket > 0
      ? 100
      : 0;

  // Cancelamentos
  const currentCancellations = currentAppointments.filter((a) => a.status === 'cancelado').length;
  const cancellationRate =
    currentAppointments.length > 0
      ? (currentCancellations / currentAppointments.length) * 100
      : 0;

  // Taxa de ocupação:
  // Capacidade estimada: 10 horas/dia (600 minutos) * barbeiros ativos * dias
  const totalBarbers = Math.max(1, activeBarbersCount);
  const totalCapacityMinutes = daysInPeriod * 600 * totalBarbers;
  const totalOccupiedMinutes = currentCompleted.reduce((sum, app) => {
    return sum + (app.servicos?.duracao_minutos || 30);
  }, 0);

  const occupancyRate =
    totalCapacityMinutes > 0
      ? Math.min(100, Math.round((totalOccupiedMinutes / totalCapacityMinutes) * 100))
      : 0;

  return {
    totalRevenue,
    revenueGrowth,
    totalAppointments,
    appointmentsGrowth,
    averageTicket,
    ticketGrowth,
    activeBarbersCount,
    occupancyRate,
    cancellationRate,
    cancellationsCount: currentCancellations,
  };
}

/**
 * Prepara dados para o gráfico de evolução de faturamento diário
 */
export function calculateRevenueEvolution(
  currentAppointments: Appointment[],
  start: Date,
  end: Date
): RevenueEvolutionItem[] {
  const daysMap = new Map<string, { faturamento: number; atendimentos: number }>();

  // Inicializa todos os dias do período com 0
  const daysCount = Math.max(1, differenceInDays(end, start) + 1);
  for (let i = 0; i < daysCount; i++) {
    const d = subDays(end, daysCount - 1 - i);
    const key = format(d, 'yyyy-MM-dd');
    daysMap.set(key, { faturamento: 0, atendimentos: 0 });
  }

  // Agrupa os concluídos
  currentAppointments.forEach((app) => {
    if (app.status !== 'concluido') return;
    const dateKey = format(parseISO(app.data_hora), 'yyyy-MM-dd');
    const existing = daysMap.get(dateKey);
    if (existing) {
      const paid = app.pagamentos?.find((p) => p.status === 'pago');
      const val = paid ? Number(paid.valor) : app.servicos ? Number(app.servicos.preco) : 0;
      existing.faturamento += val;
      existing.atendimentos += 1;
    }
  });

  return Array.from(daysMap.entries()).map(([dateStr, data]) => {
    const dateObj = parseISO(dateStr);
    return {
      date: format(dateObj, 'dd/MM', { locale: ptBR }),
      faturamento: data.faturamento,
      atendimentos: data.atendimentos,
    };
  });
}

/**
 * Atendimentos por dia da semana (Segunda a Sábado)
 */
export function calculateAppointmentsByDayOfWeek(appointments: Appointment[]): {
  dia: string;
  total: number;
  concluidos: number;
  cancelados: number;
}[] {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const map = new Map<number, { total: number; concluidos: number; cancelados: number }>();

  for (let i = 1; i <= 6; i++) {
    map.set(i, { total: 0, concluidos: 0, cancelados: 0 });
  }

  appointments.forEach((app) => {
    const d = getDay(parseISO(app.data_hora));
    if (d === 0) return; // Domingo fechado
    const stat = map.get(d);
    if (stat) {
      stat.total += 1;
      if (app.status === 'concluido') stat.concluidos += 1;
      if (app.status === 'cancelado') stat.cancelados += 1;
    }
  });

  return [1, 2, 3, 4, 5, 6].map((dayIdx) => ({
    dia: days[dayIdx],
    total: map.get(dayIdx)?.total || 0,
    concluidos: map.get(dayIdx)?.concluidos || 0,
    cancelados: map.get(dayIdx)?.cancelados || 0,
  }));
}

/**
 * Atendimentos por faixa horária
 */
export function calculateAppointmentsByHour(appointments: Appointment[]): {
  horario: string;
  total: number;
}[] {
  const hoursMap = new Map<string, number>();

  for (let h = 9; h <= 19; h++) {
    hoursMap.set(`${h.toString().padStart(2, '0')}:00`, 0);
  }

  appointments.forEach((app) => {
    if (app.status !== 'concluido') return;
    const hour = parseISO(app.data_hora).getHours();
    const key = `${hour.toString().padStart(2, '0')}:00`;
    if (hoursMap.has(key)) {
      hoursMap.set(key, (hoursMap.get(key) || 0) + 1);
    }
  });

  return Array.from(hoursMap.entries()).map(([horario, total]) => ({
    horario,
    total,
  }));
}

/**
 * Ranking e Desempenho de Barbeiros com Metas
 */
export function calculateBarberRanking(
  barbers: Barber[],
  appointments: Appointment[],
  goals: Goal[]
): BarberRankingItem[] {
  return barbers.map((barber) => {
    const barberApps = appointments.filter((a) => a.barbeiro_id === barber.id);
    const completed = barberApps.filter((a) => a.status === 'concluido');

    const faturamento = completed.reduce((sum, app) => {
      const paid = app.pagamentos?.find((p) => p.status === 'pago');
      return sum + (paid ? Number(paid.valor) : app.servicos ? Number(app.servicos.preco) : 0);
    }, 0);

    const atendimentos = completed.length;
    const ticketMedio = atendimentos > 0 ? faturamento / atendimentos : 0;
    const taxaConclusao =
      barberApps.length > 0 ? Math.round((atendimentos / barberApps.length) * 100) : 0;

    // Meta do barbeiro
    const barberGoal = goals.find((g) => g.barbeiro_id === barber.id)?.valor_meta || 3000;
    const progressoMeta = Math.min(100, Math.round((faturamento / barberGoal) * 100));
    const restanteMeta = Math.max(0, barberGoal - faturamento);

    return {
      id: barber.id,
      nome: barber.nome,
      avatar_url: barber.avatar_url,
      posicao: 1, // calculado após ordenação
      faturamento,
      atendimentos,
      ticketMedio,
      taxaConclusao,
      meta: barberGoal,
      progressoMeta,
      restanteMeta,
    };
  })
  .sort((a, b) => b.faturamento - a.faturamento)
  .map((item, index) => ({
    ...item,
    posicao: index + 1,
  }));
}

/**
 * Participação e receita por serviço
 */
export function calculateServicesDistribution(
  services: ServiceItem[],
  appointments: Appointment[]
): ServiceDistributionItem[] {
  const completed = appointments.filter((a) => a.status === 'concluido');
  const totalRevenue = completed.reduce((sum, app) => {
    const paid = app.pagamentos?.find((p) => p.status === 'pago');
    return sum + (paid ? Number(paid.valor) : app.servicos ? Number(app.servicos.preco) : 0);
  }, 0);

  return services
    .map((service) => {
      const apps = completed.filter((a) => a.servico_id === service.id);
      const quantidade = apps.length;
      const receitaTotal = apps.reduce((sum, app) => {
        const paid = app.pagamentos?.find((p) => p.status === 'pago');
        return sum + (paid ? Number(paid.valor) : Number(service.preco));
      }, 0);

      const percentual = totalRevenue > 0 ? Math.round((receitaTotal / totalRevenue) * 100) : 0;

      return {
        id: service.id,
        nome: service.nome,
        quantidade,
        receitaTotal,
        percentual,
      };
    })
    .sort((a, b) => b.receitaTotal - a.receitaTotal);
}

/**
 * Insights Gerenciais automatizados por regras objetivas
 */
export function calculateManagementInsights(
  ranking: BarberRankingItem[],
  servicesDist: ServiceDistributionItem[],
  byDayOfWeek: { dia: string; total: number; concluidos: number }[],
  byHour: { horario: string; total: number }[],
  kpis: DashboardKpis
): ManagementInsightsData {
  // Melhor Barbeiro
  const melhorBarbeiro = ranking.length > 0 ? {
    nome: ranking[0].nome,
    faturamento: ranking[0].faturamento,
    atendimentos: ranking[0].atendimentos,
  } : null;

  // Serviço mais vendido
  const sortedServicesByQty = [...servicesDist].sort((a, b) => b.quantidade - a.quantidade);
  const servicoMaisVendido = sortedServicesByQty.length > 0 ? {
    nome: sortedServicesByQty[0].nome,
    quantidade: sortedServicesByQty[0].quantidade,
    receita: sortedServicesByQty[0].receitaTotal,
  } : null;

  // Dia com maior movimento
  const sortedDays = [...byDayOfWeek].sort((a, b) => b.concluidos - a.concluidos);
  const diaMaiorMovimento = sortedDays.length > 0 ? {
    dia: sortedDays[0].dia,
    atendimentos: sortedDays[0].concluidos,
  } : null;

  // Horário de Pico e Horário de Baixa Ocupação
  const activeHours = byHour.filter((h) => h.total >= 0);
  const sortedHoursDesc = [...activeHours].sort((a, b) => b.total - a.total);
  const sortedHoursAsc = [...activeHours].sort((a, b) => a.total - b.total);

  const horarioPico = sortedHoursDesc.length > 0 ? {
    horario: sortedHoursDesc[0].horario,
    atendimentos: sortedHoursDesc[0].total,
  } : null;

  const horarioBaixaOcupacao = sortedHoursAsc.length > 0 ? {
    horario: sortedHoursAsc[0].horario,
    atendimentos: sortedHoursAsc[0].total,
  } : null;

  let statusGeral: 'crescimento' | 'estavel' | 'atencao' = 'estavel';
  if (kpis.revenueGrowth > 5) statusGeral = 'crescimento';
  else if (kpis.revenueGrowth < -5 || kpis.cancellationRate > 20) statusGeral = 'atencao';

  return {
    melhorBarbeiro,
    servicoMaisVendido,
    diaMaiorMovimento,
    horarioPico,
    horarioBaixaOcupacao,
    crescimentoFaturamento: Math.round(kpis.revenueGrowth),
    crescimentoAtendimentos: Math.round(kpis.appointmentsGrowth),
    statusGeral,
  };
}

/**
 * Formata moeda para padrão brasileiro
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

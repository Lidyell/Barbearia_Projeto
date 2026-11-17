export type FilterPeriod =
  | 'today'
  | 'last_7_days'
  | 'last_30_days'
  | 'this_month'
  | 'last_month'
  | 'custom';

export interface DashboardFiltersState {
  period: FilterPeriod;
  customStartDate?: string;
  customEndDate?: string;
  barberId: string; // 'all' ou UUID do barbeiro
}

export interface Barber {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  avatar_url: string | null;
  ativo: boolean;
  created_at?: string;
}

export interface ServiceItem {
  id: string;
  nome: string;
  preco: number;
  duracao_minutos: number;
  ativo: boolean;
}

export interface Client {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
}

export interface Appointment {
  id: string;
  cliente_id: string;
  barbeiro_id: string;
  servico_id: string;
  data_hora: string;
  status: 'pendente' | 'confirmado' | 'concluido' | 'cancelado';
  observacoes: string | null;
  created_at?: string;
  // Joins
  clientes?: Client;
  barbeiros?: Barber;
  servicos?: ServiceItem;
  pagamentos?: Payment[];
}

export interface Payment {
  id: string;
  agendamento_id: string;
  valor: number;
  metodo_pagamento: 'pix' | 'cartao_credito' | 'cartao_debito' | 'dinheiro';
  status: 'pago' | 'pendente' | 'estornado';
  data_pagamento: string;
}

export interface Goal {
  id: string;
  barbeiro_id: string | null; // null = barbearia geral
  mes_ano: string;
  valor_meta: number;
}

// Métricas de KPIs
export interface DashboardKpis {
  totalRevenue: number;
  revenueGrowth: number;
  totalAppointments: number; // Apenas concluídos
  appointmentsGrowth: number;
  averageTicket: number;
  ticketGrowth: number;
  activeBarbersCount: number;
  occupancyRate: number; // % de horários ocupados (base 10h/dia x barbeiros ativos)
  cancellationRate: number; // % cancelados sobre total
  cancellationsCount: number;
}

export interface RevenueEvolutionItem {
  date: string; // "DD/MM" ou "DD"
  faturamento: number;
  atendimentos: number;
  faturamentoAnterior?: number;
}

export interface AppointmentsByDayOfWeek {
  dia: string; // Seg, Ter, Qua, Qui, Sex, Sab
  total: number;
  concluidos: number;
  cancelados: number;
}

export interface AppointmentsByHourItem {
  horario: string; // "09:00", "10:00", etc.
  total: number;
}

export interface BarberRankingItem {
  id: string;
  nome: string;
  avatar_url?: string | null;
  posicao: number;
  faturamento: number;
  atendimentos: number;
  ticketMedio: number;
  taxaConclusao: number;
  meta: number;
  progressoMeta: number; // 0 - 100%
  restanteMeta: number;
}

export interface ServiceDistributionItem {
  id: string;
  nome: string;
  quantidade: number;
  receitaTotal: number;
  percentual: number; // % da receita
}

export interface ManagementInsightsData {
  melhorBarbeiro: {
    nome: string;
    faturamento: number;
    atendimentos: number;
  } | null;
  servicoMaisVendido: {
    nome: string;
    quantidade: number;
    receita: number;
  } | null;
  diaMaiorMovimento: {
    dia: string;
    atendimentos: number;
  } | null;
  horarioPico: {
    horario: string;
    atendimentos: number;
  } | null;
  horarioBaixaOcupacao: {
    horario: string;
    atendimentos: number;
  } | null;
  crescimentoFaturamento: number;
  crescimentoAtendimentos: number;
  statusGeral: 'crescimento' | 'estavel' | 'atencao';
}

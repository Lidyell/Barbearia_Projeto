import { supabase, isSupabaseConfigured } from '../../../services/supabase';
import type {
  Appointment,
  Barber,
  Goal,
  ServiceItem,
} from '../types/dashboard.types';

// Dados de fallback seguros caso as tabelas do Supabase ainda estejam vazias ou em criação
const FALLBACK_BARBERS: Barber[] = [
  { id: 'b1', nome: 'João Silva', email: 'joao@castelobranco.com', telefone: '(88) 99811-1001', avatar_url: null, ativo: true },
  { id: 'b2', nome: 'Pedro Rocha', email: 'pedro@castelobranco.com', telefone: '(88) 99822-2002', avatar_url: null, ativo: true },
  { id: 'b3', nome: 'Carlos Lima', email: 'carlos@castelobranco.com', telefone: '(88) 99833-3003', avatar_url: null, ativo: true },
  { id: 'b4', nome: 'Maria Oliveira', email: 'maria@castelobranco.com', telefone: '(88) 99844-4004', avatar_url: null, ativo: true },
];

const FALLBACK_SERVICES: ServiceItem[] = [
  { id: 's1', nome: 'Corte de Cabelo', preco: 30, duracao_minutos: 30, ativo: true },
  { id: 's2', nome: 'Barba', preco: 20, duracao_minutos: 30, ativo: true },
  { id: 's3', nome: 'Corte + Barba', preco: 45, duracao_minutos: 50, ativo: true },
  { id: 's4', nome: 'Cabelo Infantil', preco: 25, duracao_minutos: 30, ativo: true },
  { id: 's5', nome: 'Sobrancelha', preco: 20, duracao_minutos: 15, ativo: true },
  { id: 's6', nome: 'Descolorir Cabelo', preco: 50, duracao_minutos: 60, ativo: true },
];

/**
 * Busca a lista de barbeiros ativos
 */
export async function fetchBarbers(): Promise<Barber[]> {
  if (!isSupabaseConfigured) return FALLBACK_BARBERS;

  try {
    const { data, error } = await supabase
      .from('barbeiros')
      .select('*')
      .order('nome', { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_BARBERS;
    }
    return data as Barber[];
  } catch (err) {
    console.warn('[DashboardService] Usando fallback de barbeiros:', err);
    return FALLBACK_BARBERS;
  }
}

/**
 * Busca o catálogo de serviços
 */
export async function fetchServices(): Promise<ServiceItem[]> {
  if (!isSupabaseConfigured) return FALLBACK_SERVICES;

  try {
    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .order('preco', { ascending: false });

    if (error || !data || data.length === 0) {
      return FALLBACK_SERVICES;
    }
    return data as ServiceItem[];
  } catch (err) {
    console.warn('[DashboardService] Usando fallback de serviços:', err);
    return FALLBACK_SERVICES;
  }
}

/**
 * Busca todos os agendamentos com relacionamentos (cliente, barbeiro, servico, pagamentos)
 */
export async function fetchAppointments(
  startDateIso: string,
  endDateIso: string
): Promise<Appointment[]> {
  if (!isSupabaseConfigured) {
    return generateFallbackAppointments();
  }

  try {
    const { data, error } = await supabase
      .from('agendamentos')
      .select(`
        id,
        cliente_id,
        barbeiro_id,
        servico_id,
        data_hora,
        status,
        observacoes,
        created_at,
        clientes ( id, nome, email, telefone ),
        barbeiros ( id, nome, avatar_url, ativo ),
        servicos ( id, nome, preco, duracao_minutos ),
        pagamentos ( id, agendamento_id, valor, metodo_pagamento, status, data_pagamento )
      `)
      .gte('data_hora', startDateIso)
      .lte('data_hora', endDateIso)
      .order('data_hora', { ascending: false });

    if (error) {
      console.warn('[DashboardService] Erro ao buscar agendamentos no Supabase:', error.message);
      return generateFallbackAppointments();
    }

    if (!data || data.length === 0) {
      // Se a tabela existe mas ainda não foi populada
      return generateFallbackAppointments();
    }

    // Normaliza tipos
    return data as unknown as Appointment[];
  } catch (err) {
    console.warn('[DashboardService] Exceção ao consultar agendamentos:', err);
    return generateFallbackAppointments();
  }
}

/**
 * Busca metas cadastradas
 */
export async function fetchGoals(): Promise<Goal[]> {
  if (!isSupabaseConfigured) {
    return [
      { id: 'g0', barbeiro_id: null, mes_ano: '2026-11-01', valor_meta: 12000 },
      { id: 'g1', barbeiro_id: 'b1', mes_ano: '2026-11-01', valor_meta: 3500 },
      { id: 'g2', barbeiro_id: 'b2', mes_ano: '2026-11-01', valor_meta: 3200 },
      { id: 'g3', barbeiro_id: 'b3', mes_ano: '2026-11-01', valor_meta: 2800 },
      { id: 'g4', barbeiro_id: 'b4', mes_ano: '2026-11-01', valor_meta: 2500 },
    ];
  }

  try {
    const { data, error } = await supabase.from('metas').select('*');
    if (error || !data || data.length === 0) {
      return [
        { id: 'g0', barbeiro_id: null, mes_ano: '2026-11-01', valor_meta: 12000 },
        { id: 'g1', barbeiro_id: 'b1111111-1111-1111-1111-111111111111', mes_ano: '2026-11-01', valor_meta: 3500 },
        { id: 'g2', barbeiro_id: 'b2222222-2222-2222-2222-222222222222', mes_ano: '2026-11-01', valor_meta: 3200 },
        { id: 'g3', barbeiro_id: 'b3333333-3333-3333-3333-333333333333', mes_ano: '2026-11-01', valor_meta: 2800 },
        { id: 'g4', barbeiro_id: 'b4444444-4444-4444-4444-444444444444', mes_ano: '2026-11-01', valor_meta: 2500 },
      ];
    }
    return data as Goal[];
  } catch {
    return [];
  }
}

/**
 * Gera conjunto demonstrativo coerente com o Cariri caso o banco ainda esteja sendo populado
 */
function generateFallbackAppointments(): Appointment[] {
  const result: Appointment[] = [];
  const now = new Date();
  const clients = ['João Silva', 'Lucas Lima', 'Carlos Souza', 'Mateus Silva', 'Felipe Santos', 'Gabriel Rocha'];
  const methods: ('pix' | 'cartao_credito' | 'cartao_debito' | 'dinheiro')[] = ['pix', 'cartao_credito', 'cartao_debito', 'dinheiro'];

  for (let i = 0; i < 45; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - (i % 25));
    date.setHours(9 + ((i * 2) % 9), 0, 0, 0);

    const bIndex = i % FALLBACK_BARBERS.length;
    const sIndex = i % FALLBACK_SERVICES.length;
    const barber = FALLBACK_BARBERS[bIndex];
    const service = FALLBACK_SERVICES[sIndex];
    const isCancelled = i % 8 === 0;
    const status: Appointment['status'] = isCancelled ? 'cancelado' : 'concluido';

    const appId = `app-${i}`;
    result.push({
      id: appId,
      cliente_id: `c-${i % clients.length}`,
      barbeiro_id: barber.id,
      servico_id: service.id,
      data_hora: date.toISOString(),
      status,
      observacoes: null,
      clientes: { id: `c-${i % clients.length}`, nome: clients[i % clients.length], email: null, telefone: null },
      barbeiros: barber,
      servicos: service,
      pagamentos: isCancelled
        ? []
        : [
            {
              id: `p-${i}`,
              agendamento_id: appId,
              valor: service.preco,
              metodo_pagamento: methods[i % methods.length],
              status: 'pago',
              data_pagamento: date.toISOString(),
            },
          ],
    });
  }
  return result;
}

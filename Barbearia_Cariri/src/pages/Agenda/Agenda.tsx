import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  User,
  Scissors,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { supabase } from '../../services/supabase';
import { fetchBarbers, fetchServices } from '../Painel/services/dashboardService';
import type { Barber, ServiceItem } from '../Painel/types/dashboard.types';
import { AppointmentCalendar } from './components/AppointmentCalendar';
import './Agenda.css';

const BARBER_SPECIALTIES: Record<string, { role: string }> = {
  'João Silva': { role: 'Fade & Degradê' },
  'Maria Santos': { role: 'Visagismo & Barba' },
  'Carlos Souza': { role: 'Cortes Clássicos' },
};

function Agenda() {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get('service') || '';
  const preSelectedBarber = searchParams.get('barber') || '';

  const [barbeiros, setBarbeiros] = useState<Barber[]>([]);
  const [servicos, setServicos] = useState<ServiceItem[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servicoId, setServicoId] = useState(preSelectedService);
  const [barbeiroId, setBarbeiroId] = useState(preSelectedBarber);
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agendamentoSucesso, setAgendamentoSucesso] = useState<{
    cliente: string;
    servico: string;
    barbeiro: string;
    dataHora: string;
    valor: number;
  } | null>(null);

  useEffect(() => {
    Promise.all([fetchBarbers(), fetchServices()]).then(([bList, sList]) => {
      setBarbeiros(bList.filter((b) => b.ativo));
      setServicos(sList.filter((s) => s.ativo));
      if (preSelectedService && sList.some((s) => s.id === preSelectedService)) {
        setServicoId(preSelectedService);
      }
      if (preSelectedBarber && bList.some((b) => b.id === preSelectedBarber)) {
        setBarbeiroId(preSelectedBarber);
      }
      setLoadingInitial(false);
    });
  }, [preSelectedService, preSelectedBarber]);

  const handleAgendar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !telefone.trim() || !servicoId || !barbeiroId || !data || !horario) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Cadastra ou localiza cliente no Supabase
      let clienteId = 'c1111111-1111-1111-1111-111111111111';

      const { data: clienteExistente } = await supabase
        .from('clientes')
        .select('id')
        .eq('telefone', telefone)
        .maybeSingle();

      if (clienteExistente?.id) {
        clienteId = clienteExistente.id;
      } else {
        const { data: novoCliente } = await supabase
          .from('clientes')
          .insert({
            nome,
            email: email || null,
            telefone,
          })
          .select('id')
          .single();

        if (novoCliente?.id) {
          clienteId = novoCliente.id;
        }
      }

      // 2. Cria agendamento no Supabase
      const dataHoraIso = `${data}T${horario}:00.000Z`;
      const servicoObj = servicos.find((s) => s.id === servicoId);
      const barbeiroObj = barbeiros.find((b) => b.id === barbeiroId);

      const { data: novoAgendamento, error: agError } = await supabase
        .from('agendamentos')
        .insert({
          cliente_id: clienteId,
          barbeiro_id: barbeiroId,
          servico_id: servicoId,
          data_hora: dataHoraIso,
          status: 'confirmado',
          observacoes: 'agendado via web',
        })
        .select('id')
        .single();

      if (agError) {
        console.warn('Erro ao salvar agendamento no Supabase:', agError.message);
      }

      // 3. Cria registro inicial de pagamento pendente
      if (novoAgendamento?.id && servicoObj) {
        await supabase.from('pagamentos').insert({
          agendamento_id: novoAgendamento.id,
          valor: servicoObj.preco,
          metodo_pagamento: 'pix',
          status: 'pendente',
        });
      }

      // Sucesso
      setAgendamentoSucesso({
        cliente: nome,
        servico: servicoObj?.nome || 'Serviço',
        barbeiro: barbeiroObj?.nome || 'Profissional',
        dataHora: `${data.split('-').reverse().join('/')} às ${horario}`,
        valor: servicoObj?.preco || 0,
      });

      toast.success('Agendamento realizado com sucesso!');
    } catch (err) {
      console.error('Erro no agendamento:', err);
      toast.error('Erro ao agendar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setServicoId('');
    setBarbeiroId('');
    setData('');
    setHorario('');
    setAgendamentoSucesso(null);
  };

  const servicoSelecionado = servicos.find((s) => s.id === servicoId);
  const barbeiroSelecionado = barbeiros.find((b) => b.id === barbeiroId);

  return (
    <section className="agendamento-container">
      <div className="agendamento-card">
        {agendamentoSucesso ? (
          <div className="agendamento-sucesso-view">
            <div className="sucesso-icon-box">
              <CheckCircle2 size={48} className="text-gold" />
            </div>

            <h2 className="sucesso-title">Horário Confirmado!</h2>
            <p className="sucesso-desc">
              Obrigado, <strong>{agendamentoSucesso.cliente}</strong>! Seu horário foi
              registrado com sucesso em nosso sistema.
            </p>

            <div className="resumo-box">
              <div className="resumo-item">
                <span className="resumo-label">Serviço</span>
                <span className="resumo-val">{agendamentoSucesso.servico}</span>
              </div>
              <div className="resumo-item">
                <span className="resumo-label">Profissional</span>
                <span className="resumo-val">{agendamentoSucesso.barbeiro}</span>
              </div>
              <div className="resumo-item">
                <span className="resumo-label">Data e Horário</span>
                <span className="resumo-val text-gold">{agendamentoSucesso.dataHora}</span>
              </div>
              <div className="resumo-item">
                <span className="resumo-label">Valor Estimado</span>
                <span className="resumo-val">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(agendamentoSucesso.valor)}
                </span>
              </div>
            </div>

            <div className="sucesso-actions">
              <a
                href={`https://wa.me/55889999999?text=Ol%C3%A1%2C+acabei+de+agendar+meu+hor%C3%A1rio+de+${encodeURIComponent(
                  agendamentoSucesso.servico
                )}+para+${encodeURIComponent(agendamentoSucesso.dataHora)}.`}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle size={18} />
                <span>Confirmar via WhatsApp</span>
              </a>

              <div className="sucesso-secondary-actions">
                <button onClick={handleReset} className="btn-outro-agendamento">
                  Agendar outro serviço
                </button>
                <Link to="/" className="btn-voltar-home">
                  Voltar ao Início
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <header className="agendamento-header">
              <div className="header-badge">
                <Sparkles size={14} /> Atendimento Premium
              </div>
              <h1>Agende seu Horário</h1>
              <p>Escolha seu serviço e barbeiro de preferência no Cariri</p>
            </header>

            <form className="agendamento-form" onSubmit={handleAgendar}>
              <div className="form-section-title">
                <User size={16} /> Seus Dados
              </div>

              <div className="form-group">
                <label>Nome Completo *</label>
                <div className="input-with-icon">
                  <User size={16} className="field-icon" />
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Telefone / WhatsApp *</label>
                  <div className="input-with-icon">
                    <Phone size={16} className="field-icon" />
                    <input
                      type="tel"
                      placeholder="(88) 99999-9999"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>E-mail (opcional)</label>
                  <div className="input-with-icon">
                    <Mail size={16} className="field-icon" />
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section-title">
                <Scissors size={16} /> Detalhes do Corte
              </div>

              {/* 1. Escolha Visual do Serviço */}
              <div className="form-group">
                <label className="selection-label">
                  <span>1. Escolha o Serviço *</span>
                  {servicoSelecionado && (
                    <span className="selection-counter">
                      {servicoSelecionado.nome} • R$ {servicoSelecionado.preco.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </label>
                <div className="services-selection-grid">
                  {servicos.map((s) => {
                    const isSelected = servicoId === s.id;
                    return (
                      <div
                        key={s.id}
                        className={`service-select-card ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => setServicoId(s.id)}
                      >
                        <div className="card-select-radio">
                          <span className={`radio-dot ${isSelected ? 'active' : ''}`} />
                        </div>
                        <div className="service-select-info">
                          <h4 className="service-select-name">{s.nome}</h4>
                          <span className="service-select-duration">
                            <Clock size={11} /> {s.duracao_minutos} min
                          </span>
                        </div>
                        <div className="service-select-price">
                          R$ {s.preco.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Escolha Visual do Barbeiro */}
              <div className="form-group">
                <label className="selection-label">
                  <span>2. Barbeiro de Preferência *</span>
                  {barbeiroSelecionado && (
                    <span className="selection-counter">
                      Profissional: {barbeiroSelecionado.nome}
                    </span>
                  )}
                </label>
                <div className="barbers-selection-grid">
                  {barbeiros.map((b) => {
                    const isSelected = barbeiroId === b.id;
                    const avatar =
                      b.avatar_url ||
                      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80';
                    const spec = BARBER_SPECIALTIES[b.nome]?.role || 'Barbeiro Especialista';

                    return (
                      <div
                        key={b.id}
                        className={`barber-select-card ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => setBarbeiroId(b.id)}
                      >
                        <div className="barber-select-avatar-wrap">
                          <img
                            src={avatar}
                            alt={b.nome}
                            className="barber-select-avatar"
                          />
                          {isSelected && (
                            <span className="barber-check-badge">
                              <CheckCircle2 size={12} />
                            </span>
                          )}
                        </div>
                        <div className="barber-select-info">
                          <h5 className="barber-select-name">{b.nome}</h5>
                          <span className="barber-select-spec">{spec}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="form-section-title">
                <Calendar size={16} /> Data e Horário
              </div>

              <div className="calendar-scheduler-section">
                <AppointmentCalendar
                  selectedDate={data}
                  selectedTime={horario}
                  onSelectSlot={(dateStr, timeStr) => {
                    setData(dateStr);
                    setHorario(timeStr);
                  }}
                  serviceDuration={servicoSelecionado?.duracao_minutos || 30}
                />
              </div>

              <button
                type="submit"
                className="btn-agendar"
                disabled={isSubmitting || loadingInitial}
              >
                {isSubmitting ? (
                  <span>Registrando Agendamento...</span>
                ) : (
                  <>
                    <span>Confirmar Agendamento</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default Agenda;
export { Agenda as Agendamento };

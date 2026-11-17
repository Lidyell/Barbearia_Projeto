import { useState, useMemo } from 'react';
import {
  format,
  addDays,
  subDays,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isToday,
  isBefore,
  startOfDay,
  getDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import './AppointmentCalendar.css';

interface AppointmentCalendarProps {
  selectedDate: string; // Formato YYYY-MM-DD
  selectedTime: string; // Formato HH:mm
  onSelectSlot: (dateStr: string, timeStr: string) => void;
  serviceDuration?: number;
}

const BASE_HOURS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
];

export function AppointmentCalendar({
  selectedDate,
  selectedTime,
  onSelectSlot,
  serviceDuration = 30,
}: AppointmentCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);

  // Mês em visualização no mini-calendário
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (selectedDate) {
      const [year, month, day] = selectedDate.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date();
  });

  // Data de início da janela de colunas de horário (exibe 5 dias a partir dela)
  const [scheduleStart, setScheduleStart] = useState<Date>(() => {
    if (selectedDate) {
      const [year, month, day] = selectedDate.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return today;
  });

  // Dias da semana visíveis na grade de horários (5 dias)
  const visibleScheduleDays = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => addDays(scheduleStart, i));
  }, [scheduleStart]);

  // Dias gerados para a matriz do mini-calendário
  const miniCalendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Domingo
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentMonth]);

  // Navegação do mini-calendário
  const handlePrevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

  // Navegação das colunas de horário
  const handlePrevSchedule = () => {
    setScheduleStart((prev) => {
      const newDate = subDays(prev, 5);
      return isBefore(newDate, today) ? today : newDate;
    });
  };

  const handleNextSchedule = () => {
    setScheduleStart((prev) => addDays(prev, 5));
  };

  // Ao clicar em um dia no mini-calendário
  const handleDayClick = (day: Date) => {
    if (isBefore(day, today)) return;
    setScheduleStart(day);
    setCurrentMonth(day);
  };

  // Formatação do resumo selecionado
  const formattedSelectedSummary = useMemo(() => {
    if (!selectedDate || !selectedTime) return null;
    const [year, month, day] = selectedDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayName = format(dateObj, "EEEE, dd 'de' MMMM", { locale: ptBR });
    const capitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    return `${capitalized} às ${selectedTime}`;
  }, [selectedDate, selectedTime]);

  const canGoPrevSchedule = !isSameDay(scheduleStart, today) && !isBefore(scheduleStart, today);

  return (
    <div className="appointment-calendar-wrapper">
      {/* Top Header estilo Google Calendar */}
      <div className="calendar-top-header">
        <div className="top-header-left">
          <div className="calendar-icon-badge">
            <CalendarIcon size={16} />
          </div>
          <div>
            <h4 className="top-header-title">Selecione uma Data e Horário</h4>
            <span className="top-header-subtitle">
              <Clock size={12} /> Horários de {serviceDuration} min • Atendimento com hora marcada
            </span>
          </div>
        </div>

        <div className="top-header-tz">
          <Globe size={13} />
          <span>(GMT-03:00) Horário de Brasília</span>
        </div>
      </div>

      {/* Grid Principal: Mini Calendário (Esquerda) + Colunas de Horário (Direita) */}
      <div className="calendar-body-grid">
        {/* LADO ESQUERDO: MINI CALENDÁRIO */}
        <div className="mini-calendar-container">
          <div className="mini-cal-header">
            <span className="mini-cal-month-title">
              {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
            </span>
            <div className="mini-cal-nav-buttons">
              <button
                type="button"
                className="mini-nav-btn"
                onClick={handlePrevMonth}
                aria-label="Mês anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="mini-nav-btn"
                onClick={handleNextMonth}
                aria-label="Próximo mês"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Cabeçalho dos dias da semana (D S T Q Q S S) */}
          <div className="mini-cal-weekdays">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((w, idx) => (
              <span key={idx} className="mini-weekday">
                {w}
              </span>
            ))}
          </div>

          {/* Dias do mês */}
          <div className="mini-cal-days-grid">
            {miniCalendarDays.map((day, idx) => {
              const isPast = isBefore(day, today);
              const isSunday = getDay(day) === 0;
              const disabled = isPast || isSunday;
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const dateIso = format(day, 'yyyy-MM-dd');
              const isSelectedDay = selectedDate === dateIso;
              const isViewing = isSameDay(day, scheduleStart);

              return (
                <button
                  type="button"
                  key={idx}
                  className={`mini-day-cell ${
                    !isCurrentMonth ? 'outside-month' : ''
                  } ${disabled ? 'day-disabled' : ''} ${
                    isSelectedDay ? 'day-selected' : ''
                  } ${isViewing && !isSelectedDay ? 'day-viewing' : ''} ${
                    isToday(day) ? 'day-today' : ''
                  }`}
                  disabled={disabled}
                  onClick={() => handleDayClick(day)}
                >
                  <span className="mini-day-number">{format(day, 'd')}</span>
                </button>
              );
            })}
          </div>

          <div className="mini-cal-legend">
            <div className="legend-item">
              <span className="legend-dot dot-selected" />
              <span>Selecionado</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot dot-closed" />
              <span>Domingos fechado</span>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: COLUNAS DE HORÁRIO ESTILO GOOGLE AGENDA */}
        <div className="schedule-columns-container">
          <div className="schedule-nav-bar">
            <button
              type="button"
              className={`schedule-arrow-btn ${!canGoPrevSchedule ? 'btn-disabled' : ''}`}
              onClick={handlePrevSchedule}
              disabled={!canGoPrevSchedule}
              aria-label="Dias anteriores"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="schedule-range-indicator">
              {format(visibleScheduleDays[0], "dd 'de' MMM", { locale: ptBR })} —{' '}
              {format(visibleScheduleDays[visibleScheduleDays.length - 1], "dd 'de' MMM 'de' yyyy", {
                locale: ptBR,
              })}
            </span>

            <button
              type="button"
              className="schedule-arrow-btn"
              onClick={handleNextSchedule}
              aria-label="Próximos dias"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Grade de Colunas */}
          <div className="schedule-days-columns">
            {visibleScheduleDays.map((day) => {
              const isSunday = getDay(day) === 0;
              const isPast = isBefore(day, today);
              const dayIso = format(day, 'yyyy-MM-dd');
              const isDayActive = selectedDate === dayIso;
              const dayOfWeek = format(day, 'EEE', { locale: ptBR }).toUpperCase();
              const dayNumber = format(day, 'dd');

              return (
                <div
                  key={dayIso}
                  className={`schedule-day-column ${isDayActive ? 'column-active' : ''} ${
                    isSunday || isPast ? 'column-disabled' : ''
                  }`}
                >
                  {/* Cabeçalho do Dia */}
                  <div className="day-column-header">
                    <span className="day-name">{dayOfWeek}</span>
                    <span className={`day-number ${isDayActive ? 'num-active' : ''}`}>
                      {dayNumber}
                    </span>
                  </div>

                  {/* Lista de Slots / Horários */}
                  <div className="day-slots-list">
                    {isSunday ? (
                      <div className="slot-closed-notice">
                        <span>—</span>
                        <small>Fechado</small>
                      </div>
                    ) : isPast ? (
                      <div className="slot-closed-notice">
                        <span>—</span>
                        <small>Passado</small>
                      </div>
                    ) : (
                      BASE_HOURS.map((hour) => {
                        const isSlotSelected =
                          selectedDate === dayIso && selectedTime === hour;

                        return (
                          <button
                            type="button"
                            key={hour}
                            className={`time-slot-btn ${
                              isSlotSelected ? 'slot-selected' : ''
                            }`}
                            onClick={() => onSelectSlot(dayIso, hour)}
                          >
                            <span>{hour}</span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Barra de Confirmação do Horário Selecionado */}
      <div className={`selected-slot-feedback ${formattedSelectedSummary ? 'has-selection' : ''}`}>
        {formattedSelectedSummary ? (
          <div className="feedback-content">
            <CheckCircle2 size={18} className="feedback-icon-success" />
            <span>
              Horário selecionado: <strong>{formattedSelectedSummary}</strong>
            </span>
          </div>
        ) : (
          <div className="feedback-content">
            <Clock size={16} className="feedback-icon-pending" />
            <span>Escolha um dos horários disponíveis acima para confirmar seu agendamento.</span>
          </div>
        )}
      </div>
    </div>
  );
}

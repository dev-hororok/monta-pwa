import Calendar from 'react-calendar';
import { formatTime } from '@/lib/date-format';
import { DailyStatisticSection } from './DailyStatisticSection';
import { useCalendar } from '@/hooks/useCalendar';

import '@/styles/calendar.css';

interface Props {
  memberId: string;
}

export const CalendarSection = ({ memberId }: Props) => {
  const {
    value,
    onChange,
    selectedDateStr,
    onActiveStartDateChange,
    tileContent,
    monthlyStatistic,
  } = useCalendar(memberId);

  return (
    <section className="px-4">
      <div className="calendar-container py-4">
        <Calendar
          value={value}
          onChange={onChange}
          view="month"
          onActiveStartDateChange={onActiveStartDateChange}
          formatDay={(_locale, date) => date.getDate().toString()}
          maxDate={new Date()} // 오늘까지만 조회가능
          tileContent={tileContent}
        />
        <p className="text-right text-sm text-foreground/70">
          <span>{formatTime(monthlyStatistic?.totalSeconds || 0)}</span> /
          <span> {monthlyStatistic?.uniqueStudyDays || 0}일</span>
        </p>
      </div>

      <DailyStatisticSection dateStr={selectedDateStr} memberId={memberId} />
    </section>
  );
};

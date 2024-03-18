import Calendar from 'react-calendar';

import '@/styles/calendar.css';
import { formatTime } from '@/lib/date-format';
import { useCalendar } from '@/pages/my/hooks/use-calendar';
import { DailyStatistic } from './daily-statistic';
import { useAuthStore } from '@/stores/auth-store';

export const CalendarSection = () => {
  const memberId = useAuthStore((state) => state.memberId);
  const {
    value,
    onChange,
    selectedDateStr,
    onActiveStartDateChange,
    tileContent,
    monthlyStatistic,
  } = useCalendar(memberId);

  return (
    <section className="px-0">
      <div className="calendar-container pt-4">
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
          <span> {monthlyStatistic?.uniqueStudyDays || 0}일</span> /
          <span> {monthlyStatistic?.totalCompleted || 0}회</span>
        </p>
      </div>

      <DailyStatistic dateStr={selectedDateStr} memberId={memberId} />
    </section>
  );
};

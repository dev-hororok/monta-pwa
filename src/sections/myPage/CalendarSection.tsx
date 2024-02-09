import Calendar from 'react-calendar';
import { useMemo, useState } from 'react';
import { formatDateStr, formatTime } from '@/lib/date-format';

import '@/styles/calendar.css';
import { DailyStatisticSection } from './DailyStatisticSection';
import {
  useMonthlyStatisticQuery,
  useStatisticHeatMapQuery,
} from '@/apis/queries/memberQueries';

interface Props {
  memberId: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarSection = ({ memberId }: Props) => {
  const [value, onChange] = useState<Value>(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const startDate = useMemo(() => new Date(year, month - 1, 23), [year, month]);
  const endDate = useMemo(() => new Date(year, month + 1, 7), [year, month]);

  const selectedDateStr = useMemo(() => {
    if (value instanceof Date) {
      return formatDateStr(value);
    }
    return formatDateStr(new Date());
  }, [value]);

  const { data: heatMapData } = useStatisticHeatMapQuery(
    memberId,
    formatDateStr(startDate),
    formatDateStr(endDate)
  );

  const { data: monthlyStatistic } = useMonthlyStatisticQuery(
    memberId,
    year,
    month + 1
  );

  const studiedDays = useMemo(() => {
    const map = new Map<string, number>();
    if (heatMapData) {
      heatMapData.forEach((data) => {
        map.set(data.date, data.totalSeconds);
      });
    }
    return map;
  }, [heatMapData]);

  return (
    <section className="px-4">
      <div className="calendar-container py-4">
        <Calendar
          value={value}
          onChange={onChange}
          view="month"
          onActiveStartDateChange={({ action, activeStartDate }) => {
            if (
              action === 'prev' ||
              action === 'next' ||
              action === 'prev2' ||
              action === 'next2'
            ) {
              if (activeStartDate) {
                setMonth(activeStartDate.getMonth());
                setYear(activeStartDate.getFullYear());
              }
            }
          }}
          formatDay={(_locale, date) => date.getDate().toString()}
          maxDate={new Date()} // 오늘까지만 조회가능
          tileContent={({ date, view }) => {
            const dateStr = formatDateStr(date);
            return view === 'month' && studiedDays.has(dateStr) ? (
              <img src="/octopus.png" className="w-8 h-8 mx-auto" />
            ) : (
              <div className="w-8 h-8" />
            );
          }}
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

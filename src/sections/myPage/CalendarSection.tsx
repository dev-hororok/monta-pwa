import Calendar from 'react-calendar';
import '@/styles/calendar.css';
import { useMemo, useState } from 'react';
import { HeatMapData } from '@/lib/study-records';
import { formatDateStr, formatTime } from '@/lib/date-format';

interface Props {
  heatMapData: HeatMapData[];
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarSection = ({ heatMapData }: Props) => {
  const [value, onChange] = useState<Value>(new Date());
  const studiedDays = useMemo(() => {
    const map = new Map<string, number>();
    heatMapData.forEach((data) => {
      map.set(data.date, data.count);
    });
    return map;
  }, [heatMapData]);

  const selectedDateRecord = useMemo(() => {
    if (value instanceof Date) {
      const dateStr = formatDateStr(value);
      return studiedDays.get(dateStr) || 0;
    }
    return 0;
  }, [value, studiedDays]);

  const thisMonthStatistics = useMemo(() => {
    if (!(value instanceof Date)) {
      return { totalMinutes: 0, studiedDayCount: 0 };
    }
    const selectedMonth = value.getMonth();
    const selectedYear = value.getFullYear();

    const thisMonthRecords = heatMapData.filter((data) => {
      const recordDate = new Date(data.date);
      return (
        recordDate.getMonth() === selectedMonth &&
        recordDate.getFullYear() === selectedYear
      );
    });
    const totalMinutes = thisMonthRecords.reduce(
      (acc, cur) => acc + cur.count,
      0
    );
    const uniqueDays = new Set(thisMonthRecords.map((data) => data.date)).size;

    return {
      totalMinutes,
      studiedDayCount: uniqueDays,
    };
  }, [heatMapData, value]);

  return (
    <section className="px-4">
      <div className="calendar-container py-4">
        <Calendar
          value={value}
          onChange={onChange}
          view="month"
          formatDay={(_locale, date) => date.getDate().toString()}
          maxDate={new Date()} // 오늘까지만 조회가능
          tileContent={({ date, view }) => {
            const dateStr = formatDateStr(date);
            return view === 'month' && studiedDays.has(dateStr) ? (
              <img src="public/문어_1.png" className="w-8 h-8 mx-auto" />
            ) : (
              <div className="w-8 h-8" />
            );
          }}
        />
      </div>
      <div>오늘 공부 기록</div>
      {formatTime(selectedDateRecord)}
      <div>이달 통계</div>
      <p>총 공부시간: {formatTime(thisMonthStatistics.totalMinutes)}</p>
      <p>총 공부일: {thisMonthStatistics.studiedDayCount}일</p>
    </section>
  );
};

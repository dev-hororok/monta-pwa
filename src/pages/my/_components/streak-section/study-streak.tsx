import { useEffect, useMemo } from 'react';

import type { IStudyStreak } from '@/types/models/streak.model';
import type { IStatisticHeatMapData } from '@/types/models/statistic.model';
import { formatDateStr } from '@/lib/date-format';
import { StreakItem } from './streak-item';

// 1년치 날짜 생성
const generateYearDates = (): Date[] => {
  const dates = [];
  const endDate = new Date();
  const startDate = new Date(
    endDate.getFullYear() - 1,
    endDate.getMonth(),
    endDate.getDate()
  );

  for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
    dates.push(new Date(day));
  }
  return dates;
};

const groupByWeeks = (dates: Date[], heatMapData: IStatisticHeatMapData[]) => {
  const weeks: {
    dates: { date: string; value?: number }[];
    month: number;
    isFirstWeek: boolean;
  }[] = [];

  let week: { date: string; value?: number }[] = [];
  let lastMonth: number | null = null;

  dates.forEach((date, idx) => {
    const month = date.getMonth();
    const dateStr = formatDateStr(date);
    const heatMapNode = heatMapData.find((data) => data.date === dateStr);

    // 주 시작이면 week객체 푸시 후 초기화
    if (date.getDay() === 0 && 0 < week.length) {
      weeks.push({
        dates: week,
        month: month + 1,
        isFirstWeek: lastMonth !== month,
      });
      week = [];

      lastMonth = month;
    }
    week.push({
      date: dateStr,
      value: heatMapNode ? heatMapNode.totalSeconds : 0,
    });
    if (idx === dates.length - 1) {
      weeks.push({
        dates: week,
        month: month + 1,
        isFirstWeek: lastMonth !== month,
      });
    }
  });

  return weeks.reverse(); // 최신 데이터가 위로가도록 뒤집기
};

interface StudyStreakProps {
  heatMapData: IStatisticHeatMapData[];
  streakInfo?: IStudyStreak;
}

export const StudyStreak = ({ heatMapData, streakInfo }: StudyStreakProps) => {
  const dates = useMemo(generateYearDates, []);
  const weeks = useMemo(
    () => groupByWeeks(dates, heatMapData),
    [dates, heatMapData]
  );

  useEffect(() => {
    if (!streakInfo?.palette) return;

    const { light_color, normal_color, dark_color, darker_color } =
      streakInfo.palette;
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--color-scale-1', light_color);
    rootStyle.setProperty('--color-scale-2', normal_color);
    rootStyle.setProperty('--color-scale-3', dark_color);
    rootStyle.setProperty('--color-scale-4', darker_color);
  }, [streakInfo?.palette]);

  const dayHeaders = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="streak-container relative flex flex-col gap-2">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-foreground/70 text-xs text-center">
        {dayHeaders.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      {weeks.map((week, idx) => (
        <div key={idx} className="week grid grid-cols-7 gap-2">
          {/* 해당 주에 달이 바뀌면 왼쪽에 달 표시 */}
          {week.isFirstWeek ? (
            <p className="absolute -left-10 text-xs">{week.month}월</p>
          ) : null}

          {idx !== 0 && week.dates.length < 7
            ? Array(7 - week.dates.length)
                .fill(null)
                .map((_n, idx) => <div key={`null-${idx}`}></div>)
            : null}
          {week.dates.map((date) => {
            return <StreakItem key={date.date} date={date} />;
          })}
        </div>
      ))}
    </div>
  );
};

import { formatDateStr } from '@/lib/date-format';
import { IStudyStreak } from '@/models/streak.model';
import { useEffect, useMemo } from 'react';
import { StreakItem } from './StreakItem';
import { IStatisticHeatMapData } from '@/models/statistic.model';

const generateYearDates = () => {
  const dates = [];
  const endDate = new Date();
  const startDate = new Date(new Date().setFullYear(endDate.getFullYear() - 1));

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

interface Props {
  heatMapData: IStatisticHeatMapData[];
  streakInfo?: IStudyStreak;
}

export const StudyStreak = ({ heatMapData, streakInfo }: Props) => {
  const dates = useMemo(() => generateYearDates(), []); // 12달치 Date객체 생성
  const weeks = useMemo(
    () => groupByWeeks(dates, heatMapData),
    [dates, heatMapData]
  ); // 7개씩 묶기 & heatMapData 병합

  useEffect(() => {
    if (!streakInfo?.palette) return;
    document.documentElement.style.setProperty(
      '--color-scale-1',
      streakInfo.palette.light_color
    );
    document.documentElement.style.setProperty(
      '--color-scale-2',
      streakInfo.palette.normal_color
    );
    document.documentElement.style.setProperty(
      '--color-scale-3',
      streakInfo.palette.dark_color
    );
    document.documentElement.style.setProperty(
      '--color-scale-4',
      streakInfo.palette.darker_color
    );
  }, [streakInfo]);

  return (
    <div className="streak-container relative flex flex-col gap-2">
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

import { useMemo } from 'react';

const generateYearDates = () => {
  const dates = [];
  const endDate = new Date();
  const startDate = new Date(new Date().setFullYear(endDate.getFullYear() - 1));

  for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
    dates.push(new Date(day));
  }
  return dates;
};

const groupByWeeks = (dates: Date[]) => {
  const weeks: {
    dates: Date[];
    month: number;
    isFirstWeek: boolean;
  }[] = [];

  let week: Date[] = [];
  let lastMonth: number | null = null;
  dates.forEach((date, idx) => {
    const month = date.getMonth();

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
    week.push(date);
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

export const Streak = () => {
  const dates = useMemo(() => generateYearDates(), []); // 12달치 Date객체 생성 ->
  const weeks = useMemo(() => groupByWeeks(dates), [dates]); // 7개씩 묶기

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
            return (
              <div
                key={date.toISOString()}
                className="day w-full aspect-square bg-accent rounded-sm"
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

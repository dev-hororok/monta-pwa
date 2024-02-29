import * as React from 'react';
import { OnArgs, TileArgs } from 'react-calendar';

import {
  useStatisticHeatMapQuery,
  useMonthlyStatisticQuery,
} from '@/apis/queries/member-queries';
import { formatDateStr } from '@/lib/date-format';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const useCalendar = (memberId: string) => {
  const [value, setValue] = React.useState<Value>(new Date());
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [month, setMonth] = React.useState(new Date().getMonth());

  const selectedDateStr = React.useMemo(
    () => formatDateStr(value instanceof Date ? value : new Date()),
    [value]
  );

  // 날짜 범위 계산
  const { startDate, endDate } = React.useMemo(() => {
    const start = new Date(year, month - 1, 23);
    const end = new Date(year, month + 1, 7);
    return { startDate: start, endDate: end };
  }, [year, month]);

  // 날짜 선택 (react-calendar date 클릭 시 호출)
  const onChange = React.useCallback((newValue: Value) => {
    setValue(newValue);
  }, []);

  // 뷰 변경 (react-calendar 달/연도 변경 시 호출)
  const onActiveStartDateChange = React.useCallback(
    ({ action, activeStartDate }: OnArgs) => {
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
    },
    []
  );

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

  // heatMap 해시맵 (스티커 생성 시 조회용)
  const studiedDays = React.useMemo(() => {
    const map = new Map<string, number>();
    heatMapData?.forEach((data) => {
      map.set(data.date, data.totalSeconds);
    });
    return map;
  }, [heatMapData]);

  // 타일의 date값이 heatMap에 존재할 시 스티커를 붙여줌
  const tileContent = React.useCallback(
    ({ date, view }: TileArgs) => {
      if (view === 'month') {
        const dateStr = formatDateStr(date);
        if (studiedDays.has(dateStr)) {
          return <img src="/octopus.png" className="w-8 h-8 mx-auto" />;
        } else {
          return <div className="w-8 h-8" />;
        }
      }
      return null;
    },
    [studiedDays]
  );

  return {
    value,
    onChange,
    onActiveStartDateChange,
    tileContent,
    monthlyStatistic,
    selectedDateStr,
  };
};
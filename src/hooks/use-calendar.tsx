import { useState, useMemo, useCallback } from 'react';
import { OnArgs, TileArgs } from 'react-calendar';

import {
  useStatisticHeatMapQuery,
  useMonthlyStatisticQuery,
} from '@/apis/queries/member-queries';
import { formatDateStr } from '@/lib/date-format';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const useCalendar = (memberId: string) => {
  const [value, setValue] = useState<Value>(new Date());
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

  // react-calendar date 클릭 시 호출
  const onChange = useCallback((newValue: Value) => {
    setValue(newValue);
  }, []);

  // react-calendar 달/연도 변경 시 호출
  const onActiveStartDateChange = useCallback(
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

  // heatMap 해시맵 (조회용)
  const studiedDays = useMemo(() => {
    const map = new Map<string, number>();
    heatMapData?.forEach((data) => {
      map.set(data.date, data.totalSeconds);
    });
    return map;
  }, [heatMapData]);

  // 타일의 date값이 heatMap에 존재할 시 스티커 붙여줌
  const tileContent = useCallback(
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

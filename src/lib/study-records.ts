import { IStudyRecord } from '@/models/study.model';

export interface HeatMapData {
  date: string;
  count: number;
}

export const processStudyRecords = (records: IStudyRecord[]): HeatMapData[] => {
  const dailyTotals = new Map<string, number>();

  records.forEach((record) => {
    const date = new Date(record.created_at);
    const dateStr = date.toISOString().split('T')[0];

    const currentTotal = dailyTotals.get(dateStr) || 0;
    dailyTotals.set(dateStr, currentTotal + record.duration);
  });
  return Array.from(dailyTotals).map(([key, value]) => ({
    date: key,
    count: value,
  }));
};

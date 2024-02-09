export interface IDailyStatistic {
  date: string;
  totalSeconds: number;
}

export interface IMontlyStatistic {
  year: number;
  month: number;
  totalSeconds: number;
  uniqueStudyDays: number;
}

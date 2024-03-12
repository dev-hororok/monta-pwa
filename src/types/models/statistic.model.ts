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

export interface IStatisticHeatMapData {
  date: string;
  totalSeconds: number;
}

export interface IDailyStatistic {
  date: string;
  totalSeconds: number;
  totalCompleted: number;
}

export interface IMontlyStatistic {
  year: number;
  month: number;
  totalSeconds: number;
  totalCompleted: number;
  uniqueStudyDays: number;
}

export interface IStatisticHeatMapData {
  date: string;
  totalSeconds: number;
  totalCompleted: number;
}

import { HeatMapData } from '@/lib/study-records';
import { IStudyStreak } from '@/models/streak.model';
import { useEffect } from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

interface Props {
  heatMapData: HeatMapData[];
  streakInfo: IStudyStreak | null;
}

export const StudyStreak = ({ heatMapData, streakInfo }: Props) => {
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
    <ReactCalendarHeatmap
      values={heatMapData}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        const hours = value.count / 3600;
        if (hours < 2) {
          return `color-scale-1`;
        } else if (hours < 4) {
          return `color-scale-2`;
        } else if (hours < 6) {
          return `color-scale-3`;
        } else {
          return `color-scale-4`;
        }
      }}
    />
  );
};

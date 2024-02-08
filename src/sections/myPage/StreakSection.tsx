import { Streak } from '@/components/streaks/Streak';
import { HeatMapData } from '@/lib/study-records';
import { IStudyStreak } from '@/models/streak.model';

interface Props {
  heatMapData: HeatMapData[];
  streakInfo: IStudyStreak | null;
}

export const StreakSection = ({ heatMapData, streakInfo }: Props) => {
  return (
    <section className="px-4">
      <p className="text-center text-sm font-bold pb-4">스트릭</p>
      <div className="flex items-center justify-center">
        <div className="w-2/3">
          <Streak heatMapData={heatMapData} streakInfo={streakInfo} />
        </div>
      </div>
    </section>
  );
};

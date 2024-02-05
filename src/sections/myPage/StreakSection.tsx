import { StudyStreak } from '@/components/records/StudyStreak';
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
      <div className="w-full">
        <StudyStreak heatMapData={heatMapData} streakInfo={streakInfo} />
      </div>
    </section>
  );
};

import {
  useStatisticHeatMapQuery,
  useStudyStreakQuery,
} from '@/services/queries/member-queries';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDateStr } from '@/lib/date-format';
import { StreakInfo } from './streak-info';
import { StudyStreak } from './study-streak';
import { useAuthStore } from '@/stores/auth-store';

export const StreakSection = () => {
  const memberId = useAuthStore((state) => state.memberId);
  const endDate = new Date();
  const startDate = new Date(new Date().setFullYear(endDate.getFullYear() - 1));
  const { data: streakInfo, isLoading: isStreakLoading } =
    useStudyStreakQuery(memberId);
  const { data: heatMapData } = useStatisticHeatMapQuery(
    memberId,
    formatDateStr(startDate),
    formatDateStr(endDate)
  );

  return (
    <section className="px-4">
      <p className="text-center text-sm font-bold pb-4">스트릭</p>
      <div className="flex items-center justify-center">
        <div className="w-2/3 space-y-4">
          {isStreakLoading ? (
            <Skeleton className="w-32 h-6 ml-auto mt-2 mb-5" />
          ) : (
            <StreakInfo streakInfo={streakInfo} />
          )}
          <StudyStreak
            heatMapData={heatMapData || []}
            streakInfo={streakInfo}
          />
        </div>
      </div>
    </section>
  );
};

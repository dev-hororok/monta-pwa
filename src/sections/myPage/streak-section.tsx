import {
  useStatisticHeatMapQuery,
  useStudyStreakQuery,
} from '@/apis/queries/member-queries';
import StreakInfo from '@/components/streaks/streak-info';
import StudyStreak from '@/components/streaks/study-streak';
import { formatDateStr } from '@/lib/date-format';

interface Props {
  memberId: string;
}

const StreakSection = ({ memberId }: Props) => {
  const endDate = new Date();
  const startDate = new Date(new Date().setFullYear(endDate.getFullYear() - 1));
  const {
    data: streakInfo,
    isLoading: isStreakLoading,
    isError: isStreakError,
  } = useStudyStreakQuery(memberId);
  const {
    data: heatMapData,
    isLoading: isHeatMapDataLoading,
    isError: isHeatMapDataError,
  } = useStatisticHeatMapQuery(
    memberId,
    formatDateStr(startDate),
    formatDateStr(endDate)
  );

  if (isStreakLoading || isHeatMapDataLoading) {
    return <div>Loading...</div>;
  }
  if (isStreakError || isHeatMapDataError) {
    return <div>Error</div>;
  }

  return (
    <section className="px-4">
      <p className="text-center text-sm font-bold pb-4">스트릭</p>
      <div className="flex items-center justify-center">
        <div className="w-2/3">
          <StreakInfo streakInfo={streakInfo} />
          <StudyStreak
            heatMapData={heatMapData || []}
            streakInfo={streakInfo}
          />
        </div>
      </div>
    </section>
  );
};

export default StreakSection;

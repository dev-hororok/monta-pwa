import { useDailyStatisticQuery } from '@/services/queries/member-queries';
import { Skeleton } from '@/components/ui/skeleton';
import { formatTime } from '@/lib/date-format';

interface DailyStatisticProps {
  dateStr: string;
  memberId: string;
}

export const DailyStatistic = ({ memberId, dateStr }: DailyStatisticProps) => {
  const { data, isLoading, isError } = useDailyStatisticQuery(
    memberId,
    dateStr
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-4 space-y-2">
        <Skeleton className="w-24 h-5" />
        <div className="grid grid-cols-2 w-full">
          <div className="w-full flex-center flex-col space-y-2">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>
          <div className="w-full flex-center flex-col space-y-2">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>
        </div>
      </div>
    );
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-col items-center py-4">
      <p className="font-semibold pb-2">{data ? data.date : dateStr}</p>
      <div className="grid grid-cols-2 w-full">
        <div className="w-full flex-center flex-col">
          <p className="text-primary">총 공부 시간</p>
          <p className="text-lg">{data ? formatTime(data.totalSeconds) : 0}</p>
        </div>
        <div className="w-full flex-center flex-col">
          <p className="text-primary">완료한 섹션</p>
          <p className="text-lg">{data ? data.totalCompleted : 0}</p>
        </div>
      </div>
    </div>
  );
};

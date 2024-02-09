import { useDailyStatisticQuery } from '@/apis/queries/memberQueries';
import { formatTime } from '@/lib/date-format';

interface Props {
  dateStr: string;
  memberId: string;
}

export const DailyStatisticSection = ({ memberId, dateStr }: Props) => {
  const { data, isLoading, isError } = useDailyStatisticQuery(
    memberId,
    dateStr
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-col items-center py-4">
      <p className="font-semibold pb-2">{data.date}</p>
      <div className="grid grid-cols-2 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-primary">총 공부 시간</p>
          <p className="text-lg">{formatTime(data.totalSeconds)}</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-primary">완료한 섹션</p>
          <p className="text-lg">{formatTime(data.totalSeconds)}</p>
        </div>
      </div>
    </div>
  );
};

import { formatTime } from '@/lib/date-format';

interface Props {
  date: string;
  studyTime: number;
}

export const DailyStatisticSection = ({ date, studyTime }: Props) => {
  return (
    <div className="flex flex-col items-center py-4">
      <p className="font-semibold pb-2">{date}</p>
      <div className="grid grid-cols-2 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-primary">총 공부 시간</p>
          <p className="text-lg">{formatTime(studyTime)}</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-primary">완료한 섹션</p>
          <p className="text-lg">{formatTime(studyTime)}</p>
        </div>
      </div>
    </div>
  );
};

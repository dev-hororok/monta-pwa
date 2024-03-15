import { formatDateStr } from '@/lib/date-format';
import {
  useDailyStatisticQuery,
  useMonthlyStatisticQuery,
} from '@/services/queries/member-queries';
import { useAuthStore } from '@/stores/auth-store';

export const SummarySection = () => {
  const memberId = useAuthStore((state) => state.memberId);
  const curDate = new Date();
  const { data: dailyStatistic } = useDailyStatisticQuery(
    memberId,
    formatDateStr(curDate)
  );
  const { data: monthlyStatistic } = useMonthlyStatisticQuery(
    memberId,
    curDate.getFullYear(),
    curDate.getMonth() + 1
  );

  return (
    <div className="flex gap-2 items-center">
      <div className="w-full flex flex-col items-center justify-center py-2 bg-foreground text-background rounded-md">
        <p>Today Focus</p>
        <p className="text-3xl">{dailyStatistic?.totalCompleted}</p>
        <p>
          {dailyStatistic ? Math.floor(dailyStatistic.totalSeconds / 60) : 0}{' '}
          min
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center py-2 bg-background text-foreground rounded-md">
        <p>Monthly Focus</p>
        <p className="text-3xl">{monthlyStatistic?.totalCompleted}</p>
        <p>
          {monthlyStatistic
            ? Math.floor(monthlyStatistic.totalSeconds / 60)
            : 0}{' '}
          min
        </p>
      </div>
    </div>
  );
};

import { useTimer } from '@/hooks/use-timer';
import { useTimerStateStore } from '@/stores/timer-state-store';
import type { IMember } from '@/models/member.model';
import { StudyGroupTimer } from './study-group-timer';
import { RestTimer } from './rest-timer';
import { useTimerGroupSocket } from '@/hooks/use-timer-group-socket';

export interface IMemberInfo {
  member_id: IMember['member_id'];
  image_url: IMember['image_url'];
  nickname: IMember['nickname'];
  joinedAtUTC: string; // utc Date
}

const TimerModal = () => {
  useTimer(); // 타이머 작동

  const timerType = useTimerStateStore((state) => state.timerType);

  // 타이머 그룹 socket 참여
  const { members } = useTimerGroupSocket(timerType);

  return (
    <div className="absolute top-0 z-40 w-full h-full md:max-w-mobile md:max-h-mobile md:rounded-md bg-[#DAE3E1] dark:bg-background">
      <div className="pt-safe-offset-4 h-full pb-safe">
        <main className="h-full overflow-y-scroll scrollbar-hide">
          {timerType === 'Work' ? <StudyGroupTimer members={members} /> : null}
          {timerType === 'Rest' || timerType === 'LongRest' ? (
            <RestTimer />
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default TimerModal;

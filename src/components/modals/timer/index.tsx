import { useTimer } from '@/hooks/use-timer';
import { useTimerStateStore } from '@/stores/timer-state-store';
import type { IMember } from '@/types/models/member.model';
import { StudyGroupTimer } from './study-group-timer';
import { RestTimer } from './rest-timer';
import { useTimerGroupSocket } from '@/hooks/use-timer-group-socket';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { WorkTimer } from './work-timer';

export interface IMemberInfo {
  member_id: IMember['member_id'];
  image_url: IMember['image_url'];
  nickname: IMember['nickname'];
  joinedAtUTC: string; // utc Date
}

export const TimerModal = () => {
  useTimer(); // 타이머 작동

  const isTogetherEnabled = useTimerOptionsStore(
    (state) => state.isTogetherEnabled
  );
  const timerType = useTimerStateStore((state) => state.timerType);

  // 타이머 그룹 socket 참여
  const { members } = useTimerGroupSocket(timerType, isTogetherEnabled);

  return (
    <div className="absolute top-0 z-40 w-full h-full md:max-w-mobile md:max-h-mobile md:rounded-md bg-background">
      <div className="pt-safe-offset-4 h-full pb-safe">
        <main className="h-full overflow-y-scroll scrollbar-hide">
          {timerType === 'Work' && isTogetherEnabled ? (
            <StudyGroupTimer members={members} />
          ) : null}
          {timerType === 'Work' && !isTogetherEnabled ? <WorkTimer /> : null}
          {timerType === 'Rest' || timerType === 'LongRest' ? (
            <RestTimer />
          ) : null}
        </main>
      </div>
    </div>
  );
};

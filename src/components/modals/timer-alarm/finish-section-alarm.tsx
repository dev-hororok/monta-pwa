import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { formatTime } from '@/lib/date-format';

export const FinishSectionAlarm = () => {
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const pomodoroTime = useTimerOptionsStore((state) => state.pomodoroTime);
  const sectionCount = useTimerOptionsStore((state) => state.sectionCount);
  const duration = useTimerStateStore((state) => state.duration);

  const totalStudyTime =
    timerMode === 'normal' ? duration : pomodoroTime * sectionCount * 60;

  return (
    <div className={'w-full h-1/2 flex flex-col items-center justify-end'}>
      <Fireworks autorun={{ speed: 1, duration: 2000 }} />
      <img
        src={'./chicken_2.png'}
        alt="main"
        className={'w-1/2 aspect-square'}
      />
      <div className="w-2/3 mx-auto text-center">
        <p>축하합니다.</p>
        <p>총 {formatTime(totalStudyTime)} 만큼 집중했습니다.</p>
        <p>충분한 휴식을 취해주세요.</p>
      </div>
    </div>
  );
};

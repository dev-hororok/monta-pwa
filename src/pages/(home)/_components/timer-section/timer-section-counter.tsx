import { DEFAULT_STAMP_IMAGE_URL } from '@/constants/constants';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useTimerStateStore } from '@/stores/timer-state-store';

export const TimerSectionCounter = () => {
  const sectionCompleted = useTimerStateStore(
    (state) => state.sectionCompleted
  );
  const sectionCount = useTimerOptionsStore((state) => state.sectionCount);
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: sectionCount }).map((_, idx) => (
        <div key={idx}>
          {idx < sectionCompleted ? (
            <img src={DEFAULT_STAMP_IMAGE_URL} className="size-6" />
          ) : (
            <div key={idx} className="size-6 rounded-full bg-accent" />
          )}
        </div>
      ))}
    </div>
  );
};

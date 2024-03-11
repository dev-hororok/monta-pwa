import { Button } from '@/components/ui/button';
import { useTimerStateStore } from '@/stores/timer-state-store';

export const PassButton = () => {
  const nextTimer = useTimerStateStore((state) => state.nextTimer);
  return (
    <Button
      onClick={nextTimer}
      variant={'ghost'}
      className={'rounded-3xl py-6 w-40 text-xl'}
    >
      Pass
    </Button>
  );
};

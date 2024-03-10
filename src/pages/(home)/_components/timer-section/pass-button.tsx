import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useTimerStateStore } from '@/stores/timer-state-store';

export const PassButton = () => {
  const nextTimer = useTimerStateStore((state) => state.nextTimer);
  return (
    <Button onClick={nextTimer} variant={'ghost'} className={'p-2 h-auto'}>
      <Icons.stepForward className="w-10 h-10" />
    </Button>
  );
};

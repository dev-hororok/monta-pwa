import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/date-format';
import { useModalStore } from '@/stores/useModalStore';

interface Props {
  targetTime: number;
}

export const OpenTimerOptionsButton = ({ targetTime }: Props) => {
  const openModal = useModalStore((state) => state.openModal);
  const openTimerOptionsModal = () => {
    openModal('timerOptions');
  };
  return (
    <div
      className="flex flex-col items-center gap-2"
      onClick={openTimerOptionsModal}
    >
      <Button variant="ghost" className="text-6xl h-auto">
        {formatTime(targetTime)}
      </Button>
    </div>
  );
};

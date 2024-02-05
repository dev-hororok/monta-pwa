import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/date-format';
import { useTimerOptionsStore } from '@/stores/timerOptionsStore';
import { useModalStore } from '@/stores/useModalStore';

interface Props {
  memberId: string;
}

export const OpenTimerOptionsButton = ({ memberId }: Props) => {
  const timerOptions = useTimerOptionsStore((state) => state.timerOptions);
  const openModal = useModalStore((state) => state.openModal);
  const openTimerOptionsModal = () => {
    openModal('timerOptions', { memberId });
  };
  return (
    <div
      className="flex flex-col items-center gap-2"
      onClick={openTimerOptionsModal}
    >
      <Button variant="ghost" className="text-6xl h-auto">
        {formatTime(timerOptions.pomodoroTime * 60)}
      </Button>
      <Badge>
        {timerOptions.selectedCategory
          ? timerOptions.selectedCategory.subject
          : '선택 안함'}
      </Badge>
    </div>
  );
};

import { Button } from '../ui/button';

interface Props {
  count: number;
}

export const StreakItemCard = ({ count }: Props) => {
  return (
    <Button
      type="button"
      variant={'outline'}
      className="h-auto p-2 flex flex-col items-center justify-center text-xs"
    >
      <img src={'/color-palette.png'} alt={'color-palette'} className="p-4" />
      <div className="w-full flex items-center justify-between">
        <p className="overflow-hidden truncate">스트릭 변경권</p>
        <span>{count} 개</span>
      </div>
    </Button>
  );
};

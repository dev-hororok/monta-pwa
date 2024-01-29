import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/date-format';

interface Props {
  imgSrc: string;
  alt?: string;
  restSeconds: number;
}

export const EggCard = ({ imgSrc, alt = 'egg_card', restSeconds }: Props) => {
  const isActive = restSeconds === 0;
  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      className={cn(
        'h-auto p-1 flex flex-col items-center justify-center text-xs font-semibold',
        isActive && 'hover:-translate-y-1 duration-200 transition-transform'
      )}
    >
      {isActive ? <p>Open</p> : null}
      <img width={200} height={200} src={imgSrc} alt={alt} className="p-0" />
      <p>{formatTime(restSeconds)}</p>
    </Button>
  );
};

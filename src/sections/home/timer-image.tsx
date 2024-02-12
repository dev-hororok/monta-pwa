import { cn } from '@/lib/utils';

interface Props {
  src: string;
  animation?: boolean;
}

const TimerImage = ({ src, animation }: Props) => {
  return (
    <img
      onContextMenu={(e) => e.preventDefault()}
      src={src}
      alt="main-timer"
      className={cn('h-1/2 mx-auto', animation ? 'animate-soft-bounce' : null)}
    />
  );
};

export default TimerImage;

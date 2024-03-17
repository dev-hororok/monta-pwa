import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { errorIcons } from './icons';

interface NetworkErrorProps {
  onRefresh: () => void;
  className: string;
}

export const NetworkError = ({ onRefresh, className }: NetworkErrorProps) => {
  return (
    <div className={cn(`flex-center flex-col gap-2`, className)}>
      <img
        src={errorIcons.eggCracked}
        alt="egg-cracked icon"
        className="size-10"
      />
      <p>네트워크 문제가 발생했습니다.</p>
      <Button className="gap-2" onClick={onRefresh}>
        <img src={errorIcons.reload} alt="reload icon" className=" size-5" />
        새로고침
      </Button>
    </div>
  );
};

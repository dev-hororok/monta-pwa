import { cn } from '@/lib/utils';
import { loadingIcons } from './icons';

interface MobileLoadingSpinnerProps {
  isOveray?: boolean;
}

export const MobileLoadingSpinner = ({
  isOveray,
}: MobileLoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        'absolute left-0 flex flex-col justify-center items-center w-full h-full z-40',
        isOveray ? 'bottom-0' : 'bottom-14'
      )}
    >
      {isOveray ? (
        <div className="absolute top-0 left-0 w-full h-full rounded-md bg-foreground/5 z-40" />
      ) : null}
      <img
        src={loadingIcons.globalLoading}
        alt="loading img"
        className="w-10 h-10 animate-bounce text-primary z-50"
      />
      <p>로딩중...</p>
    </div>
  );
};

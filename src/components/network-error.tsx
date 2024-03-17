import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface NetworkErrorProps {
  onRefresh: () => void;
  className: string;
}

export const NetworkError = ({ onRefresh, className }: NetworkErrorProps) => {
  return (
    <div className={cn(`flex-center flex-col gap-2`, className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-egg-cracked"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19 14.083c0 4.154 -2.966 6.74 -7 6.917c-4.2 0 -7 -2.763 -7 -6.917c0 -5.538 3.5 -11.09 7 -11.083c3.5 .007 7 5.545 7 11.083z" />
        <path d="M12 3l-1.5 5l3.5 2.5l-2 3.5" />
      </svg>
      <p>네트워크 문제가 발생했닭!</p>
      <Button className="gap-2" onClick={onRefresh}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-reload size-4 stroke-primary-foreground"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
          <path d="M20 4v5h-5" />
        </svg>
        새로고침
      </Button>
    </div>
  );
};

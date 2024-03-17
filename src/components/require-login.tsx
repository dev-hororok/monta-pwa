import { Link } from 'react-router-dom';
import { commonIcons } from './icons';
import { cn } from '@/lib/utils';

interface RequireLoginProps {
  className?: string;
}

export const RequireLogin = ({ className }: RequireLoginProps) => {
  return (
    <div className={cn('flex-center flex-col gap-2', className)}>
      <img src={commonIcons.lock} alt="lock icon" className="size-10" />
      <p className="text-sm">
        <Link to="/auth/login" replace className="text-blue-600">
          로그인
        </Link>
        이 필요합니다.
      </p>
    </div>
  );
};

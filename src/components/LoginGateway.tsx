import { Link } from 'react-router-dom';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

export const LoginGateway = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 px-4 bg-primary space-y-20 rounded-md overflow-hidden">
      <div className="relative flex justify-center">
        <img
          src="/pockets/pocket_1.png"
          width={640}
          height={640}
          alt="monta-main"
        />
        <h3 className="absolute bottom-0 text-3xl font-light text-primary-foreground">
          스터디 타이머
        </h3>
      </div>

      <Link
        to="/auth/login"
        className={cn(
          buttonVariants(),
          'w-full bg-accent text-accent-foreground'
        )}
      >
        로그인
      </Link>
    </div>
  );
};

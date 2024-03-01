import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LoginGatewayPage = () => {
  return (
    <div className="w-full h-full px-4 bg-background md:rounded-md pb-safe-offset-14 pt-safe-offset-14 overflow-hidden">
      <img
        src="/fire-1.png"
        alt="monta-main"
        className="h-1/2 aspect-square mx-auto"
      />
      <div className="h-1/2 flex flex-col items-center justify-between">
        <p className="text-4xl font-semibold text-foreground tracking-wider">
          몬스터 타이머
        </p>
        <Link
          replace
          to="/auth/login"
          className={cn(buttonVariants(), 'w-4/5 h-12')}
        >
          접속하기
        </Link>
      </div>
    </div>
  );
};

export default LoginGatewayPage;

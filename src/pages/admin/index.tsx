import { Link } from 'react-router-dom';

import { PrevHeader } from '@/components/headers/prev-header';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const AdminPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-safe-offset-14 pb-safe-offset-14">
      <main className="w-full h-full overflow-y-scroll scrollbar-hide pb-10 px-4">
        <PrevHeader to="/" title="어드민 메뉴" />

        <div className="space-y-4 pt-20">
          <Link
            to="./characters"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-full py-4'
            )}
          >
            캐릭터 관리
          </Link>
        </div>
      </main>
    </div>
  );
};

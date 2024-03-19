import { useCurrentMemberQuery } from '@/services/queries/member-queries';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';
import { headerIcons } from '@/components/icons';
import { cn } from '@/lib/utils';

export const HomeHeader = () => {
  const { data } = useCurrentMemberQuery();
  return (
    <div className="flex justify-between items-end fixed top-0 left-0 right-0 md:absolute h-14 px-2 mt-safe md:rounded-t-md">
      <Link to={data ? '/shop' : '/auth/login'} replace>
        <Button
          type="button"
          variant={'ghost'}
          className={cn(
            'flex items-center px-2',
            data ? 'text-lg' : 'text-sm text-blue-600 font-normal'
          )}
          aria-label="shop"
        >
          <img src={headerIcons.feather} alt="point icon" className="size-6" />
          {data ? data.point : '로그인'}
        </Button>
      </Link>
      <Link to="/more" replace>
        <Button
          type="button"
          variant={'ghost'}
          size={'icon'}
          className="flex items-center text-lg"
          aria-label="more"
        >
          <img
            src={headerIcons.settings}
            alt="settings icon"
            className="size-6"
          />
        </Button>
      </Link>
    </div>
  );
};

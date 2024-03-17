import { useCurrentMemberQuery } from '@/services/queries/member-queries';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';
import { headerIcons } from '@/components/icons';

export const HomeHeader = () => {
  const { data } = useCurrentMemberQuery();
  return (
    <div className="flex justify-between items-end fixed top-0 left-0 right-0 md:absolute h-14 px-2 mt-safe md:rounded-t-md">
      <Link to="/shop" replace>
        <Button
          type="button"
          variant={'ghost'}
          className="flex items-center text-lg px-2"
          aria-label="shop"
        >
          <img src={headerIcons.feather} alt="point icon" className="size-6" />
          {data?.point}
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

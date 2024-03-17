import { useCurrentMemberQuery } from '@/services/queries/member-queries';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';
import { CDN_IMAGES } from '@/constants/cdn-images';

export const HomeHeader = () => {
  const { data } = useCurrentMemberQuery();
  return (
    <div className="flex justify-between items-end fixed top-0 left-0 right-0 md:absolute h-14 px-2 mt-safe md:rounded-t-md">
      <Link to="/shop" replace>
        <Button
          type="button"
          variant={'ghost'}
          className="flex items-center text-lg"
          aria-label="shop"
        >
          <img src={CDN_IMAGES.feather} alt="point" className="size-8" />
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
          <img src={CDN_IMAGES.settings} alt="settings" className="size-8" />
        </Button>
      </Link>
    </div>
  );
};

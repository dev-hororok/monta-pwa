import { useCurrentMemberQuery } from '@/services/queries/member-queries';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';

export const HomeHeader = () => {
  const { data } = useCurrentMemberQuery();
  return (
    <div className="flex items-center justify-between fixed top-0 left-0 right-0 md:absolute h-14 px-2 mt-safe md:rounded-t-md">
      <Button variant={'ghost'} className="flex items-center text-lg px-2">
        <img src="./money.png" className="w-8 h-8" /> {data?.point}
      </Button>
      <Link to="/more" replace>
        <Button variant={'ghost'} className="flex items-center text-lg p-2">
          <img src="./settings.png" className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
};

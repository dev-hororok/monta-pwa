import { useCurrentMemberQuery } from '@/apis/queries/member-queries';
import { Button } from '../ui/button';

export const HomeHeader = () => {
  const { data } = useCurrentMemberQuery();
  return (
    <div className="flex items-end fixed top-0 left-0 right-0 md:absolute h-14 px-3 mt-safe md:rounded-t-md">
      <Button variant={'ghost'} className="flex items-center gap-2 text-md">
        <img src="./coin.png" className="w-8 h-8" /> {data?.point}
      </Button>
    </div>
  );
};

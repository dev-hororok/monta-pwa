import { morePageIcons } from '@/components/icons';
import { APP_INFO } from '@/constants/app-info';
import { Link } from 'react-router-dom';

export const PlayStoreButton = () => {
  return (
    <Link
      to={APP_INFO.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
    >
      <div className="flex items-center gap-2">
        <img
          src={morePageIcons.star}
          alt="star icon"
          className="h-[1.2rem] w-[1.2rem]"
        />
        플레이스토어 이동
      </div>
    </Link>
  );
};

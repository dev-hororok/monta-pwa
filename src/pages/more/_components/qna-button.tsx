import { morePageIcons } from '@/components/icons';
import { APP_INFO } from '@/constants/app-info';
import { Link } from 'react-router-dom';

export const QnAButton = () => {
  return (
    <Link
      to={APP_INFO.QnAUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
    >
      <div className="flex items-center gap-2">
        <img
          src={morePageIcons.qna}
          alt="shield icon"
          className="h-[1.2rem] w-[1.2rem]"
        />
        자주 묻는 질문(QnA)
      </div>
    </Link>
  );
};

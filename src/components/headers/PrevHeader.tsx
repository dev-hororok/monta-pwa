import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
}

export const PrevHeader = ({ to }: Props) => {
  return (
    <div className="flex items-end fixed top-0 left-0 right-0 md:absolute h-14 px-3 mt-safe md:rounded-t-md bg-background">
      <Link to={to} replace>
        <ChevronLeftIcon className="w-8 h-8" />
      </Link>
    </div>
  );
};

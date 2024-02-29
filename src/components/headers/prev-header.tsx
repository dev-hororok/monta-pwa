import * as React from 'react';

import { Link } from 'react-router-dom';
import { Icons } from '../icons';

interface Props {
  to: string;
  rightButton?: React.ReactNode;
}

export const PrevHeader = ({ to, rightButton }: Props) => {
  return (
    <div className="flex items-end justify-between fixed top-0 left-0 right-0 md:absolute h-14 px-3 mt-safe md:rounded-t-md bg-background">
      <Link to={to} replace>
        <Icons.chevronLeft className="w-8 h-8" />
      </Link>
      {rightButton}
    </div>
  );
};

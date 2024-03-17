import * as React from 'react';

import { Link } from 'react-router-dom';
import { commonIcons } from '../icons';

interface Props {
  to: string;
  rightButton?: React.ReactNode;
  title?: string;
}

export const PrevHeader = ({ to, rightButton, title }: Props) => {
  return (
    <header className="flex items-end justify-center fixed top-0 left-0 right-0 md:absolute h-14 mt-safe md:rounded-t-md bg-background">
      <Link to={to} replace className="absolute left-3">
        <img src={commonIcons.left} alt="left icon" className="size-8" />
      </Link>
      {title ? <h2 className="text-xl">{title}</h2> : null}
      <div className="absolute right-3">{rightButton}</div>
    </header>
  );
};

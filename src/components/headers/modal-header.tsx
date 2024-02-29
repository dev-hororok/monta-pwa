import * as React from 'react';
import { Button } from '../ui/button';

interface Props {
  closeModal: () => void;
  rightButton?: React.ReactNode;
  title: string;
}

export const ModalHeader = ({ closeModal, title, rightButton }: Props) => {
  return (
    <div className="flex items-end fixed top-0 left-0 right-0 md:absolute h-14 px-6 mt-safe md:rounded-t-md bg-background z-50 text-sm font-semibold">
      <div className="flex items-center justify-between w-full">
        <Button
          type="button"
          variant={'ghost'}
          className="text-foreground/60"
          onClick={closeModal}
        >
          취소
        </Button>
        <div className="text-base">{title}</div>
        <div className="text-foreground/60">{rightButton}</div>
      </div>
    </div>
  );
};

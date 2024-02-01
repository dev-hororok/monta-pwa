import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import { EditCategoryForm } from '../forms/EditCategoryForm';
import { IStudyCategory } from '@/models/study.model';

interface Props {
  memberId: string;
  studyCategory: IStudyCategory;
  children: ReactNode;
}

export const EditCategoryDialog = ({
  memberId,
  studyCategory,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        className={cn(
          `w-full h-screen sm:max-w-[416px] sm:max-h-[736px] flex flex-col justify-start items-center pt-safe-offset-14`
        )}
      >
        <EditCategoryForm
          memberId={memberId}
          studyCategory={studyCategory}
          closeModal={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

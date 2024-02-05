import { CreateCategoryForm } from '@/components/forms/CreateCategoryForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Props {
  memberId: string;
}

export const CreateCategoryDialog = ({ memberId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen}>
      <Button onClick={() => setIsOpen(true)} variant={'ghost'}>
        추가
      </Button>
      <DialogContent
        className={cn(
          `w-full h-screen sm:max-w-[416px] sm:max-h-[736px] flex flex-col justify-start items-center pt-safe-offset-14`
        )}
      >
        <CreateCategoryForm
          memberId={memberId}
          closeModal={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

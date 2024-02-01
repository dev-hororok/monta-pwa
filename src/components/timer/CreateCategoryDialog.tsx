import { cn } from '@/lib/utils';
import { CreateCategoryForm } from '../forms/CreateCategoryForm';
import { badgeVariants } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface Props {
  memberId: string;
}

export const CreateCategoryDialog = ({ memberId }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          badgeVariants({ variant: 'destructive' }),
          'shrink-0 text-sm'
        )}
      >
        추가
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>카테고리 추가</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <CreateCategoryForm memberId={memberId} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

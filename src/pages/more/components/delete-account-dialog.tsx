import { toast } from 'sonner';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export const DeleteAccountDialog = () => {
  const handleDummyClick = () => {
    toast.error('미구현', { duration: 1000 });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm">
          <div className="flex items-center gap-2">
            <Icons.removeUser className="h-[1.2rem] w-[1.2rem]" />
            계정 삭제
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="top-[35%] md:top-[50%] gap-4">
        <DialogHeader>
          <DialogTitle>정말 계정을 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            서버에 저장된 모든 데이터가 삭제되며 데이터를 복구할 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDummyClick} className="w-full">
            확인
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="w-full">
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
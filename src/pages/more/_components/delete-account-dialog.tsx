import * as React from 'react';
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
import { Button } from '@/components/ui/button';
import { useDeleteAccountMutation } from '@/services/mutations/auth-mutations';
import { morePageIcons } from '@/components/icons';

export const DeleteAccountDialog = () => {
  const { mutateAsync: deleteAccount } = useDeleteAccountMutation();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogoutClick = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await deleteAccount();
      toast.success('성공적으로 회원탈퇴 되었습니다.');
      // ProtectedRoute에서 redirect 처리됨
    } catch (e) {
      // react-query에서 처리됨
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm">
          <div className="flex items-center gap-2">
            <img
              src={morePageIcons.userX}
              alt="userX icon"
              className="h-[1.2rem] w-[1.2rem]"
            />
            계정 삭제
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="top-[35%] md:top-[50%] gap-4">
        <DialogHeader>
          <DialogTitle>정말 계정을 삭제하시겠습니까?</DialogTitle>
          <DialogDescription className="text-destructive pt-2">
            서버에 저장된 모든 데이터가 삭제되며 데이터를 복구할 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleLogoutClick}
            className="w-full"
            disabled={isLoading}
          >
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

import { useQueryClient } from '@tanstack/react-query';

import { morePageIcons } from '@/components/icons';
import { useAuthStore } from '@/stores/auth-store';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const LogoutDialog = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  const handleLogoutClick = () => {
    queryClient.clear();
    logout();
    navigate('/', { replace: true });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm">
          <div className="flex items-center gap-2">
            <img
              src={morePageIcons.logout}
              alt="logout icon"
              className="h-[1.2rem] w-[1.2rem]"
            />
            로그아웃
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="top-[35%] md:top-[50%] gap-4">
        <DialogHeader>
          <DialogTitle>정말 로그아웃 하시겠습니까?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleLogoutClick} className="w-full">
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

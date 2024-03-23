import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
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
import { useEditItemMutation } from '@/services/admin/items.mutations';
import { IAdminItem } from '@/services/admin/types/item.model';
import { Checkbox } from '@/components/ui/checkbox';

interface EditItemIsHiddenDialogProps {
  item: IAdminItem;
  children: React.ReactNode;
}

export function EditItemIsHiddenDialog({
  children,
  item,
}: EditItemIsHiddenDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(item.is_hidden);

  const { mutateAsync: editItem } = useEditItemMutation();

  const handleSubmit = async () => {
    if (isHidden === item.is_hidden) return setIsOpen(false);
    try {
      await editItem({
        itemId: item.item_id,
        body: { is_hidden: isHidden },
      });
      toast.success('성공적으로 판매 여부를 변경했습니다.');
      setIsOpen(false);
    } catch (e) {
      // 네트워크 에러나 기타 예외 처리
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-[35%] md:top-[50%]">
        <DialogHeader className="justify-center items-center">
          <DialogTitle>판매 여부 변경</DialogTitle>
          <DialogDescription>
            변경할 판매 여부를 입력해주세요 (상점에 표시됨)
          </DialogDescription>
        </DialogHeader>
        <div className={'w-full py-4 flex-center gap-2'}>
          <p>{isHidden ? '판매 X' : '판매하기'}</p>
          <Checkbox
            checked={isHidden}
            onCheckedChange={() => setIsHidden((prev) => !prev)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="w-full">
              취소
            </Button>
          </DialogClose>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

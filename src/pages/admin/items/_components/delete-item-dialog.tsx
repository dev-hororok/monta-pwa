import * as React from 'react';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDeleteItemMutation } from '@/services/admin/items.mutations';
import { type IAdminItem } from '@/services/admin/types/item.model';

interface DeleteItemDialogProps {
  item: IAdminItem;
  children: React.ReactNode;
}

export const DeleteItemDialog = ({ children, item }: DeleteItemDialogProps) => {
  const navigate = useNavigate();
  const { mutateAsync: deleteItem } = useDeleteItemMutation();

  const handleConfirm = async () => {
    try {
      await deleteItem({ itemId: item.item_id });
      toast.success('캐릭터를 삭제했습니다.');
      navigate('/admin/items');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-full h-auto max-w-mobile max-h-mobile">
        <AlertDialogHeader>
          <AlertDialogTitle>정말 아이템을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>softDelete 처리 됨</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

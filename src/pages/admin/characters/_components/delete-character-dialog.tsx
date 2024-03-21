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
import type { IAdminCharacter } from '@/services/admin/types/characters.model';
import { useDeleteCharacterMutation } from '@/services/admin/characters.mutations';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface DeleteCharacterDialogProps {
  character: IAdminCharacter;
  children: React.ReactNode;
}

export const DeleteCharacterDialog = ({
  children,
  character,
}: DeleteCharacterDialogProps) => {
  const navigate = useNavigate();
  const { mutateAsync: deleteCharacter } = useDeleteCharacterMutation();

  const handleConfirm = async () => {
    try {
      await deleteCharacter({ characterId: character.character_id });
      toast.success('캐릭터를 삭제했습니다.');
      navigate('/admin/characters');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-full h-auto max-w-mobile max-h-mobile">
        <AlertDialogHeader>
          <AlertDialogTitle>정말 캐릭터를 삭제하시겠습니까?</AlertDialogTitle>
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

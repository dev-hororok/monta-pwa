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
import { useEditCharacterMutation } from '@/services/admin/characters.mutations';
import { type IAdminCharacter } from '@/services/admin/types/characters.model';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useUploadImage } from '../hooks/use-upload-image';
import { useApiError } from '@/hooks/use-api-error';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface EditCharacterImageDialogProps {
  character: IAdminCharacter;
  children: React.ReactNode;
}

export function EditCharacterImageDialog({
  children,
  character,
}: EditCharacterImageDialogProps) {
  const { handleError } = useApiError();
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutateAsync: editCharacter } = useEditCharacterMutation();
  const { imageFile, previewUrl, uploadImage, handleFileChange } =
    useUploadImage({
      initialUrl: character.image_url,
    });

  const handleSubmit = async () => {
    if (!imageFile) {
      return setIsOpen(false);
    }
    try {
      const imageUrl = await uploadImage();

      await editCharacter({
        characterId: character.character_id,
        body: { image_url: imageUrl },
      });
      toast.success('성공적으로 캐릭터 이미지를 변경했습니다.');
      setIsOpen(false);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-mobile">
        <DialogHeader className="justify-center items-center">
          <DialogTitle>캐릭터 이미지 변경</DialogTitle>
          <DialogDescription>변경할 이미지를 업로드 해주세요</DialogDescription>
          <DialogDescription>포맷: jpg, jpeg, png, gif</DialogDescription>
          <DialogDescription>용량: 1MB</DialogDescription>
        </DialogHeader>

        {previewUrl && (
          <Avatar className="w-40 h-40 mx-auto rounded-sm">
            <AvatarImage alt="Preview" src={previewUrl} />
          </Avatar>
        )}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">이미지</Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="w-full">
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="w-full">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

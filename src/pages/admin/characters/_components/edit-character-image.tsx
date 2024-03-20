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
import { uploadFile } from '@/services/admin/upload.api';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface EditCharacterImageDialogProps {
  character: IAdminCharacter;
  children: React.ReactNode;
}

export function EditCharacterImageDialog({
  children,
  character,
}: EditCharacterImageDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState(character.image_url);
  const { mutateAsync: editCharacter } = useEditCharacterMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      return setIsOpen(false);
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const imageUrl = await uploadFile(formData);

      await editCharacter({
        characterId: character.character_id,
        body: { image_url: imageUrl },
      });
      toast.success('성공적으로 캐릭터 이미지를 변경했습니다.');
      setIsOpen(false);
    } catch (e) {
      // 네트워크 에러나 기타 예외 처리
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
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="mx-auto"
        />

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

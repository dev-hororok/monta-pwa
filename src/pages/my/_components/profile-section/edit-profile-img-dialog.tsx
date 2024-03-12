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
import type { IMember } from '@/types/models/member.model';
import { useEditMemberMutation } from '@/services/mutations/member-mutations';
import { useCharacterInventoryQuery } from '@/services/queries/member-queries';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EditProfileImageDialogProps {
  member: IMember;
  children: React.ReactNode;
}

export function EditProfileImageDialog({
  children,
  member,
}: EditProfileImageDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = React.useState(
    member.image_url
  );

  const { data: characterInventory } = useCharacterInventoryQuery(
    member.member_id
  );

  const { mutateAsync: editMember } = useEditMemberMutation();

  const handleEditProfileClick = async () => {
    if (selectedImageUrl === member.image_url) return setIsOpen(false);
    try {
      await editMember({
        memberId: member.member_id,
        body: { image_url: selectedImageUrl },
      });
      toast.success('성공적으로 캐릭터를 변경했습니다.');
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
          <DialogTitle>캐릭터 변경</DialogTitle>
          <DialogDescription>
            선택한 캐릭터로 공부에 참여할 수 있어요
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className={'w-full h-48 p-4'}>
          <div className="grid grid-cols-3 gap-2">
            <DefaultCharacter
              onClick={() => setSelectedImageUrl('')}
              isSelected={'' === selectedImageUrl}
            />
            {characterInventory?.map((characterInventory) => {
              const isSelected =
                characterInventory.character.image_url === selectedImageUrl;
              return (
                <div
                  key={characterInventory.character_inventory_id}
                  onClick={() =>
                    setSelectedImageUrl(characterInventory.character.image_url)
                  }
                  className="relative"
                >
                  <img
                    src={characterInventory.character.image_url}
                    alt={`${characterInventory.character.name}-image`}
                    className="w-full aspect-square cursor-pointer rounded-full"
                  />
                  {isSelected ? (
                    <span className="absolute top-0 right-0 flex h-3 w-3">
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                  ) : null}
                  <p className="w-full text-xs font-semibold text-center line-clamp-2">
                    {characterInventory.character.name}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="w-full">
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleEditProfileClick} className="w-full">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DefaultCharacterProps {
  onClick: () => void;
  isSelected: boolean;
}

const DefaultCharacter = ({ onClick, isSelected }: DefaultCharacterProps) => {
  return (
    <div key={'0'} onClick={onClick} className="relative">
      <img
        src={'/octopus.png'}
        alt={`default-image`}
        className="w-full aspect-square cursor-pointer rounded-full"
      />
      {isSelected ? (
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
      ) : null}
      <p className="w-full text-xs font-semibold text-center line-clamp-2">
        기본 문어
      </p>
    </div>
  );
};

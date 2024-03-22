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
import type { IAdminCharacter } from '@/services/admin/types/character.model';
import { useEditCharacterMutation } from '@/services/admin/characters.mutations';
import { CharacterGrade } from '@/types/models/character.model';
import { Button } from '@/components/ui/button';
import { CharacterGradeBadge } from '@/components/character-grade-badge';

interface EditCharacterGradeDialogProps {
  character: IAdminCharacter;
  children: React.ReactNode;
}

export function EditCharacterGradeDialog({
  children,
  character,
}: EditCharacterGradeDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [grade, setGrade] = React.useState<CharacterGrade>(character.grade);

  const { mutateAsync: editCharacter } = useEditCharacterMutation();

  const handleSubmit = async () => {
    if (grade === character.grade) return setIsOpen(false);
    try {
      await editCharacter({
        characterId: character.character_id,
        body: { grade: grade },
      });
      toast.success('성공적으로 캐릭터 등급을 변경했습니다.');
      setIsOpen(false);
    } catch (e) {
      // 네트워크 에러나 기타 예외 처리
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="top-[35%] md:top-[50%]">
        <DialogHeader className="justify-center items-center">
          <DialogTitle>캐릭터 등급 변경</DialogTitle>
          <DialogDescription>
            변경할 캐릭터 등급을 입력해주세요
          </DialogDescription>
        </DialogHeader>
        <CharacterGradeBadge grade={grade} className="mx-auto" />
        <div className={'w-full py-4 flex items-center gap-4'}>
          <div onClick={() => setGrade('Common')}>
            <CharacterGradeBadge grade="Common" />
          </div>
          <div onClick={() => setGrade('Rare')}>
            <CharacterGradeBadge grade="Rare" />
          </div>
          <div onClick={() => setGrade('Epic')}>
            <CharacterGradeBadge grade="Epic" />
          </div>
          <div onClick={() => setGrade('Legendary')}>
            <CharacterGradeBadge grade="Legendary" />
          </div>
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

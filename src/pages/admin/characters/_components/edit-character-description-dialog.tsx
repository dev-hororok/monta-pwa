import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import type { IAdminCharacter } from '@/services/admin/types/characters.model';
import { useEditCharacterMutation } from '@/services/admin/characters.mutations';
import { Textarea } from '@/components/ui/textarea';

const editCharacterDescriptionFormSchema = z.object({
  description: z.string().min(1, { message: '최소 1자 이상이어야 합니다.' }),
});

type EditCharacterDescriptionFormValues = z.infer<
  typeof editCharacterDescriptionFormSchema
>;

interface EditCharacterDescriptionDialogProps {
  character: IAdminCharacter;
  children: React.ReactNode;
}

export function EditCharacterDescriptionDialog({
  children,
  character,
}: EditCharacterDescriptionDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<EditCharacterDescriptionFormValues>({
    resolver: zodResolver(editCharacterDescriptionFormSchema),
    defaultValues: {
      description: character.description,
    },
  });
  const { mutateAsync: editCharacter } = useEditCharacterMutation();

  const handleSubmit = async (data: EditCharacterDescriptionFormValues) => {
    if (data.description === character.description) return setIsOpen(false);
    try {
      await editCharacter({
        characterId: character.character_id,
        body: { description: data.description },
      });
      toast.success('성공적으로 캐릭터 설명을 변경했습니다.');
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
          <DialogTitle>캐릭터 설명 변경</DialogTitle>
          <DialogDescription>
            변경할 캐릭터 설명을 입력해주세요
          </DialogDescription>
        </DialogHeader>
        <div className={'w-full py-4'}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className={'space-y-8'}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="설명"
                        {...field}
                        className="w-full h-12 text-center"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="ghost" className="w-full">
                    취소
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full">
                  확인
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

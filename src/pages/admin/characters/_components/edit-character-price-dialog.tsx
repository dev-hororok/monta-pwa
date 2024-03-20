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
import { Input } from '@/components/ui/input';
import type { IAdminCharacter } from '@/services/admin/types/characters.model';
import { useEditCharacterMutation } from '@/services/admin/characters.mutations';

const editCharacterPriceFormSchema = z.object({
  price: z.coerce.number(),
});

type EditCharacterPriceFormValues = z.infer<
  typeof editCharacterPriceFormSchema
>;

interface EditCharacterPriceDialogProps {
  character: IAdminCharacter;
  children: React.ReactNode;
}

export function EditCharacterPriceDialog({
  children,
  character,
}: EditCharacterPriceDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<EditCharacterPriceFormValues>({
    resolver: zodResolver(editCharacterPriceFormSchema),
    defaultValues: {
      price: character.sell_price,
    },
  });
  const { mutateAsync: editCharacter } = useEditCharacterMutation();

  const handleSubmit = async (data: EditCharacterPriceFormValues) => {
    if (data.price === character.sell_price) return setIsOpen(false);
    try {
      await editCharacter({
        characterId: character.character_id,
        body: { sell_price: data.price },
      });
      toast.success('성공적으로 캐릭터 가격을 변경했습니다.');
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
          <DialogTitle>캐릭터 가격 변경</DialogTitle>
          <DialogDescription>변경할 가격을 입력해주세요</DialogDescription>
        </DialogHeader>
        <div className={'w-full py-4'}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className={'space-y-8'}
            >
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="가격"
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

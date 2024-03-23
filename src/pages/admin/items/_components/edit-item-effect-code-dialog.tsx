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
import { IAdminItem } from '@/services/admin/types/item.model';
import { useEditItemMutation } from '@/services/admin/items.mutations';

const editItemEffectCodeFormSchema = z.object({
  effectCode: z.coerce.number(),
});

type EditItemEffectCodeFormValues = z.infer<
  typeof editItemEffectCodeFormSchema
>;

interface EditItemEffectCodeDialogProps {
  item: IAdminItem;
  children: React.ReactNode;
}

export function EditItemEffectCodeDialog({
  children,
  item,
}: EditItemEffectCodeDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<EditItemEffectCodeFormValues>({
    resolver: zodResolver(editItemEffectCodeFormSchema),
    defaultValues: {
      effectCode: item.effect_code,
    },
  });
  const { mutateAsync: editItem } = useEditItemMutation();

  const handleSubmit = async (data: EditItemEffectCodeFormValues) => {
    if (data.effectCode === item.effect_code) return setIsOpen(false);
    try {
      await editItem({
        itemId: item.item_id,
        body: { effect_code: data.effectCode },
      });
      toast.success('성공적으로 아이템 효과를 변경했습니다.');
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
          <DialogTitle>아이템 효과 코드 변경</DialogTitle>
          <DialogDescription>변경할 효과 코드를 입력해주세요</DialogDescription>
        </DialogHeader>
        <div className={'w-full py-4'}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className={'space-y-8'}
            >
              <FormField
                control={form.control}
                name="effectCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="효과 코드"
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

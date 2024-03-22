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
import { Textarea } from '@/components/ui/textarea';
import { useEditItemMutation } from '@/services/admin/items.mutations';
import { type IAdminItem } from '@/services/admin/types/item.model';

const editItemDescriptionFormSchema = z.object({
  description: z.string().min(1, { message: '최소 1자 이상이어야 합니다.' }),
});

type EditItemDescriptionFormValues = z.infer<
  typeof editItemDescriptionFormSchema
>;

interface EditItemDescriptionDialogProps {
  item: IAdminItem;
  children: React.ReactNode;
}

export function EditItemDescriptionDialog({
  children,
  item,
}: EditItemDescriptionDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<EditItemDescriptionFormValues>({
    resolver: zodResolver(editItemDescriptionFormSchema),
    defaultValues: {
      description: item.description,
    },
  });
  const { mutateAsync: editItem } = useEditItemMutation();

  const handleSubmit = async (data: EditItemDescriptionFormValues) => {
    if (data.description === item.description) return setIsOpen(false);
    try {
      await editItem({
        itemId: item.item_id,
        body: { description: data.description },
      });
      toast.success('성공적으로 아이템 설명을 변경했습니다.');
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
          <DialogTitle>아이템 설명 변경</DialogTitle>
          <DialogDescription>
            변경할 아이템 설명을 입력해주세요
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

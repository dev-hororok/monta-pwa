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

const editItemCostFormSchema = z.object({
  cost: z.coerce.number(),
});

type EditItemCostFormValues = z.infer<typeof editItemCostFormSchema>;

interface EditItemCostDialogProps {
  item: IAdminItem;
  children: React.ReactNode;
}

export function EditItemCostDialog({
  children,
  item,
}: EditItemCostDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<EditItemCostFormValues>({
    resolver: zodResolver(editItemCostFormSchema),
    defaultValues: {
      cost: item.cost,
    },
  });
  const { mutateAsync: editItem } = useEditItemMutation();

  const handleSubmit = async (data: EditItemCostFormValues) => {
    if (data.cost === item.cost) return setIsOpen(false);
    try {
      await editItem({
        itemId: item.item_id,
        body: { cost: data.cost },
      });
      toast.success('성공적으로 아이템 가격을 변경했습니다.');
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
          <DialogTitle>아이템 가격 변경</DialogTitle>
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
                name="cost"
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

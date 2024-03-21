import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const editStatusMessageFormSchema = z.object({
  statusMessage: z
    .string()
    .max(120, { message: '상태 메세지는 최대 60자 이하입니다.' }),
});

type EditStatusMessageFormValues = z.infer<typeof editStatusMessageFormSchema>;

interface EditStatusMessageDialogProps {
  member: IMember;
  children: React.ReactNode;
}

export function EditStatusMessageDialog({
  children,
  member,
}: EditStatusMessageDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<EditStatusMessageFormValues>({
    resolver: zodResolver(editStatusMessageFormSchema),
    defaultValues: {
      statusMessage: member.status_message,
    },
  });
  const { mutateAsync: editMember } = useEditMemberMutation();

  const handleSubmit = async (data: EditStatusMessageFormValues) => {
    if (data.statusMessage === member.status_message) return setIsOpen(false);
    try {
      await editMember({
        memberId: member.member_id,
        body: { status_message: data.statusMessage },
      });
      toast.success('성공적으로 상태 메시지를 변경했습니다.');
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
          <DialogTitle>상태 메시지 변경</DialogTitle>
          <DialogDescription>
            남들에게 보여줄 상태 메시지를 작성해보세요
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
                name="statusMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        maxLength={60}
                        placeholder="상태 메시지"
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

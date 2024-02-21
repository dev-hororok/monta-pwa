import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMember } from '@/models/member.model';
import { useEditMemberMutation } from '@/apis/mutations/member-mutations';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { toast } from 'sonner';

const editStatusMessageFormSchema = z.object({
  statusMessage: z.string(),
});

type EditStatusMessageFormValues = z.infer<typeof editStatusMessageFormSchema>;

interface EditStatusMessageDialogProps {
  member: IMember;
  children: ReactNode;
}

export function EditStatusMessageDialog({
  children,
  member,
}: EditStatusMessageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
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
      toast.error('성공적으로 상태 메시지를 변경했습니다.');
      setIsOpen(false);
    } catch (e) {
      // 네트워크 에러나 기타 예외 처리
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="justify-center items-center">
          <DialogTitle>상태 메시지 변경</DialogTitle>
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
                      <Input
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

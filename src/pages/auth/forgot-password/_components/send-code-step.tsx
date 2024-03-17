import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sendCodeStepFormSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 주소입니다.' }),
});

type SendCodeStepFormValues = z.infer<typeof sendCodeStepFormSchema>;

interface SendCodeStepProps {
  onSuccess: (email: string) => void;
}

export const SendCodeStep = ({ onSuccess }: SendCodeStepProps) => {
  const form = useForm<SendCodeStepFormValues>({
    resolver: zodResolver(sendCodeStepFormSchema),
    defaultValues: { email: '' },
  });

  const handleSubmit = async (data: SendCodeStepFormValues) => {
    onSuccess(data.email);
  };

  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="pb-4">
        <h4 className="text-3xl text-primary">패스워드 재설정</h4>
      </div>
      <div className={cn('grid gap-6 bg-card w-full py-10')}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Input placeholder="이메일" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full h-12">인증코드 발송</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

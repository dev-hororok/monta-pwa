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

const resetPasswordStepFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상 입니다.' })
    .max(20, { message: '비밀번호는 최대 20자 이하 입니다.' })
    .regex(/(?=.*\d)/, {
      message: '비밀번호에는 적어도 하나의 숫자가 포함되어야 합니다.',
    })
    .regex(/(?=.*[a-z])/, {
      message: '비밀번호에는 적어도 하나의 소문자가 포함되어야 합니다.',
    })
    .regex(/(?=.*[\W])/, {
      message: '비밀번호에는 적어도 하나의 특수 문자가 포함되어야 합니다.',
    }),
});

type ResetPasswordStepFormValues = z.infer<typeof resetPasswordStepFormSchema>;

interface ResetPasswordStepProps {
  onSuccess: (password: string) => void;
}

export const ResetPasswordStep = ({ onSuccess }: ResetPasswordStepProps) => {
  const form = useForm<ResetPasswordStepFormValues>({
    resolver: zodResolver(resetPasswordStepFormSchema),
    defaultValues: { password: '' },
  });

  const handleSubmit = async (data: ResetPasswordStepFormValues) => {
    onSuccess(data.password);
  };

  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="pb-4">
        <h4 className="text-3xl text-primary">새 비밀번호 입력</h4>
      </div>
      <div className={cn('grid gap-6 bg-card w-full py-10')}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="패스워드"
                      {...field}
                      className="h-12"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full h-12">비밀번호 변경</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sendCheckEmailStepFormSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 주소입니다.' }),
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

type sendCheckEmailStepFormValues = z.infer<
  typeof sendCheckEmailStepFormSchema
>;

interface SendCheckEmailStepProps {
  onSuccess: (email: string, password: string) => void;
}

export const SendCheckEmailStep = ({ onSuccess }: SendCheckEmailStepProps) => {
  const form = useForm<sendCheckEmailStepFormValues>({
    resolver: zodResolver(sendCheckEmailStepFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleSubmit = async (data: sendCheckEmailStepFormValues) => {
    onSuccess(data.email, data.password);
  };

  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="pb-4">
        <h4 className="text-3xl text-primary">가입하기</h4>
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
            <Button className="w-full h-12">인증코드 발송</Button>
          </form>
        </Form>

        <div className="flex justify-center items-center text-sm">
          <div className="flex justify-center items-center text-sm">
            <span className="text-muted-foreground">이미 계정이 있나요?</span>
            <Link
              replace
              to="/auth/login"
              className={cn(buttonVariants({ variant: 'link' }), 'h-auto py-0')}
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

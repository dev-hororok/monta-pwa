import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
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
import { useEmailRegisterMutation } from '@/services/mutations/auth-mutations';

const registerFormSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 주소입니다.' }),
  password: z
    .string()
    .min(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' }),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RegisterForm = ({ className, ...props }: RegisterFormProps) => {
  const { mutateAsync: emailRegister } = useEmailRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { email: '', password: '' },
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: RegisterFormValues) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await emailRegister(data);
      toast.success('회원가입에 성공하였습니다.');
      // UnauthedRoute에서 redirect 처리됨
    } catch (e) {
      // react-query에서 처리됨
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn('grid gap-6 bg-card w-full py-10 px-6', className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
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
          <Button disabled={isLoading} className="w-full h-12">
            회원가입
          </Button>
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
  );
};

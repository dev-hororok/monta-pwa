import * as React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import authService from '@/apis/services/auth-service';
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

const loginFormSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 주소입니다.' }),
  password: z
    .string()
    .min(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await authService.login(data);

      if (result.success) {
        toast.success('로그인에 성공하였습니다.');
        const origin = location.state?.from?.pathname || '/';
        navigate(origin);
      } else {
        toast.error(result.error);
      }
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : '서버에 문제가 발생했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('grid gap-6 bg-card w-full', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="이메일"
                    {...field}
                    className="h-12 mb-2"
                  />
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
                    className="h-12 mb-2"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="w-full h-12">
            로그인
          </Button>
        </form>
      </Form>
      <div className="flex justify-center items-center text-sm">
        <div className="flex justify-center items-center text-sm">
          <span className="text-muted-foreground">아직 계정이 없으신가요?</span>
          <Link
            replace
            to="/auth/agree"
            className={cn(buttonVariants({ variant: 'link' }), 'h-auto py-0')}
          >
            회원가입
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center text-sm">
        <Link
          replace
          to="/auth/register"
          className={cn(
            buttonVariants({ variant: 'link' }),
            'h-auto py-0 text-foreground/50'
          )}
        >
          계정 찾기
        </Link>
        <Link
          replace
          to="/auth/register"
          className={cn(
            buttonVariants({ variant: 'link' }),
            'h-auto py-0 text-foreground/50'
          )}
        >
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

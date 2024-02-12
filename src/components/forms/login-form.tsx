import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DiscordLogoIcon,
  FigmaLogoIcon,
  GitHubLogoIcon,
} from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { z } from 'zod';

import authService from '@/apis/services/authService';
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

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (
    data: LoginFormSchemaType
  ) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await authService.login(data);

      if (result.success) {
        // 로그인 성공
        toast.success('로그인에 성공하였습니다.');
        // 전에 리다이렉팅으로 왔다면 다시 보내주기
        const origin = location.state?.from?.pathname || '/';
        navigate(origin);
      } else {
        // 로그인 실패
        toast.error('이메일 또는 패스워드가 잘못되었습니다.');
      }
    } catch (e) {
      // 네트워크 에러나 기타 예외 처리
      toast.error(
        e instanceof Error ? e.message : '서버에 문제가 발생했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={'grid gap-6 bg-card w-full py-10 px-6'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
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
          <Input placeholder="이메일" className="h-0 w-0 border-0 p-0" />
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">또는</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <Button variant={'outline'} className="w-12 h-12 p-0">
          <GitHubLogoIcon className="w-8 h-8" />
        </Button>
        <Button variant={'outline'} className="w-12 h-12 p-0">
          <DiscordLogoIcon className="w-8 h-8" />
        </Button>
        <Button variant={'outline'} className="w-12 h-12 p-0">
          <FigmaLogoIcon className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;

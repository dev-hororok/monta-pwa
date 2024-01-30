import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import authService from '@/apis/services/authService';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button, buttonVariants } from '../ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  DiscordLogoIcon,
  FigmaLogoIcon,
  GitHubLogoIcon,
} from '@radix-ui/react-icons';

const registerFormSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 주소입니다.' }),
  password: z
    .string()
    .min(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' }),
});

type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormSchemaType> = async (
    data: RegisterFormSchemaType
  ) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await authService.register(data);

      if (result.success) {
        // 회원가입 성공
        toast({ title: '회원가입에 성공하였습니다.' });
        navigate('/', { replace: true });
      } else {
        // 회원가입 실패
        toast({
          title: result.error,
          variant: 'destructive',
        });
      }
    } catch (e) {
      // 네트워크 에러나 기타 예외 처리
      toast({
        title: e instanceof Error ? e.message : '서버에 문제가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={'grid gap-6 bg-card w-full py-10 px-6'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">또는</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <Button variant={'outline'} className="w-full h-12 gap-4">
          <GitHubLogoIcon className="w-6 h-6" />
          <p>깃허브 로그인</p>
        </Button>
        <Button variant={'outline'} className="w-full h-12 gap-4">
          <DiscordLogoIcon className="w-6 h-6" />
          <p>구글 로그인</p>
        </Button>
        <Button variant={'outline'} className="w-full h-12 gap-4">
          <FigmaLogoIcon className="w-6 h-6" />
          <p>카카오 로그인</p>
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;

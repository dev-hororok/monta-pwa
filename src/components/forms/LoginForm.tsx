import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import authService from '@/apis/common/authService';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';

const loginFormSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 주소입니다.' }),
  password: z
    .string()
    .min(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' }),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (
    data: z.infer<typeof loginFormSchema>
  ) => {
    const result = await authService.login(data);
    if (result.error) {
      toast({
        title: result.error || '서버에 문제가 발생했습니다.',
        variant: 'destructive',
      });
      return;
    }
    console.log(result);

    if (result.success) {
      toast({ title: '로그인에 성공하였습니다.' });
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;

import * as React from 'react';
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
import { PrevHeader } from '@/components/headers/prev-header';
// import { useEmailLoginMutation } from '@/services/mutations/auth-mutations';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 주소입니다.' }),
});

//

type LoginFormValues = z.infer<typeof forgotPasswordSchema>;

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ForgotPasswordPage = ({ className, ...props }: LoginFormProps) => {
  //   const { mutateAsync: emailLogin } = useEmailLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });
  const [isLoading] = React.useState(false);

  const handleSubmit = async (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <div className="h-full md:rounded-md overflow-hidden pt-safe-offset-14 pb-safe-offset-14">
      <div className="pt-8 px-6">
        <h4 className="text-3xl text-primary">패스워드 찾기</h4>
      </div>
      <PrevHeader to="/" />
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

            <Button disabled={isLoading} className="w-full h-12">
              이메일 확인
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

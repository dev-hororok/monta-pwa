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
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const checkCodeStepSchema = z.object({
  code: z.string(),
});

type CheckCodeStepFormValues = z.infer<typeof checkCodeStepSchema>;

interface CheckCodeStepProps {
  onSuccess: (code: string) => void;
  reSendCode: () => void;
}

export const CheckCodeStep = ({
  onSuccess,
  reSendCode,
}: CheckCodeStepProps) => {
  const form = useForm<CheckCodeStepFormValues>({
    resolver: zodResolver(checkCodeStepSchema),
    defaultValues: { code: '' },
  });

  const handleSubmit = async (data: CheckCodeStepFormValues) => {
    onSuccess(data.code);
  };

  return (
    <div className="px-6 py-8 flex flex-col">
      <div className="pb-4">
        <h4 className="text-3xl text-primary">인증 코드 확인</h4>
      </div>
      <div className={cn('grid gap-6 bg-card w-full py-10')}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Input placeholder="인증코드" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full h-12">확인</Button>
          </form>
        </Form>

        <div className="flex justify-center items-center text-sm">
          <div className="flex justify-center items-center text-sm">
            <span className="text-muted-foreground">
              이메일이 발송되지 않았나요?
            </span>
            <p
              onClick={reSendCode}
              className={cn(buttonVariants({ variant: 'link' }), 'h-auto py-0')}
            >
              재발급 받기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

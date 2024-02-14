import * as React from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ModalHeader from '@/components/headers/modal-header';
import { useCreateStudyCategoryMutation } from '@/apis/mutations/study-category-mutations';
import { useStudyCategoriesQuery } from '@/apis/queries/study-category-queries';
import { cn } from '@/lib/utils';

const createCategoryFormSchema = z.object({
  subject: z
    .string()
    .min(1, { message: '카테고리는 최소 1자 이상이어야 합니다.' }),
});

type CreateCategoryFormValues = z.infer<typeof createCategoryFormSchema>;

interface CreateCategoryFormProps extends React.HTMLAttributes<HTMLDivElement> {
  memberId: string;
  closeModal: () => void;
}

const CreateCategoryForm = ({
  memberId,
  closeModal,
  className,
  ...props
}: CreateCategoryFormProps) => {
  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategoryFormSchema),
  });
  const { data: categories } = useStudyCategoriesQuery(memberId);
  const { mutateAsync: createCategory } = useCreateStudyCategoryMutation();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: CreateCategoryFormValues) => {
    setIsLoading(true);
    try {
      if (categories?.map((c) => c.subject).includes(data.subject)) {
        toast.warning('중복 된 카테고리가 존재합니다.');
        return;
      }
      await createCategory({ memberId, data });
      closeModal();
    } catch (e) {
      // 네트워크 에러나 기타 예외 처리
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('py-10 w-full', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <ModalHeader
            title={'카테고리 추가'}
            closeModal={closeModal}
            rightButton={
              <Button disabled={isLoading} variant={'default'} type="submit">
                완료
              </Button>
            }
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="카테고리"
                    {...field}
                    className="w-full h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CreateCategoryForm;

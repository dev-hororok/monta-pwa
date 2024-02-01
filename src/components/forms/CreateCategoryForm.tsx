import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateStudyCategoryMutation } from '@/apis/mutations/studyCategoryMutations';
import { useStudyCategoriesQuery } from '@/apis/queries/studyCategoryQueries';
import { useToast } from '../ui/use-toast';
import { ModalHeader } from '../headers/ModalHeader';

const createCategoryFormSchema = z.object({
  subject: z
    .string()
    .min(1, { message: '카테고리는 최소 1자 이상이어야 합니다.' }),
});

type CreateCategoryFormSchemaType = z.infer<typeof createCategoryFormSchema>;

interface Props {
  memberId: string;
  closeModal: () => void;
}

export const CreateCategoryForm = ({ memberId, closeModal }: Props) => {
  const { data: categories } = useStudyCategoriesQuery(memberId);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CreateCategoryFormSchemaType>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      subject: '',
    },
  });
  const { mutate: createCategory } = useCreateStudyCategoryMutation(memberId);
  const { toast } = useToast();

  const onSubmit: SubmitHandler<CreateCategoryFormSchemaType> = async (
    data: CreateCategoryFormSchemaType
  ) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (categories?.map((c) => c.subject).includes(data.subject)) {
        toast({
          title: '중복 된 카테고리가 존재합니다.',
        });
        return;
      }
      createCategory({ data });
      closeModal();
    } catch (e) {
      // 네트워크 에러나 기타 예외 처리
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 py-10 w-full"
      >
        <ModalHeader
          title={'카테고리 추가'}
          closeModal={closeModal}
          rightButton={
            <Button variant={'default'} type="submit">
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
  );
};

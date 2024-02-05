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
import { useEditStudyCategoryMutation } from '@/apis/mutations/studyCategoryMutations';
import { ModalHeader } from '../headers/ModalHeader';
import { IStudyCategory } from '@/models/study.model';
import { Trash } from 'lucide-react';
import { DeleteCategoryDialog } from '../modals/timer/DeleteCategoryDialog';

const editCategoryFormSchema = z.object({
  subject: z
    .string()
    .min(1, { message: '카테고리는 최소 1자 이상이어야 합니다.' }),
});

type EditCategoryFormSchemaType = z.infer<typeof editCategoryFormSchema>;

interface Props {
  memberId: string;
  studyCategory: IStudyCategory;
  closeModal: () => void;
}

export const EditCategoryForm = ({
  memberId,
  studyCategory,
  closeModal,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<EditCategoryFormSchemaType>({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: {
      subject: studyCategory.subject,
    },
  });
  const { mutate: editCategory } = useEditStudyCategoryMutation(
    memberId,
    studyCategory.study_category_id
  );

  const onSubmit: SubmitHandler<EditCategoryFormSchemaType> = async (
    data: EditCategoryFormSchemaType
  ) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      editCategory({ data });
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
          title={'카테고리 수정'}
          closeModal={closeModal}
          rightButton={
            <div className="flex items-center gap-4">
              <DeleteCategoryDialog
                memberId={memberId}
                studyCategory={studyCategory}
              >
                <Trash className="text-destructive" />
              </DeleteCategoryDialog>
              <Button variant={'default'} type="submit">
                완료
              </Button>
            </div>
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

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/stores/use-modal-store';
import { useEditStudyCategoryMutation } from '@/apis/mutations/study-category-mutations';
import { ModalHeader } from '@/components/headers/modal-header';
import type { IStudyCategory } from '@/models/study.model';
import { cn } from '@/lib/utils';

const editCategoryFormSchema = z.object({
  subject: z
    .string()
    .min(1, { message: '카테고리는 최소 1자 이상이어야 합니다.' }),
});

type EditCategoryFormValues = z.infer<typeof editCategoryFormSchema>;

interface EditCategoryFormFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  memberId: string;
  studyCategory: IStudyCategory;
  closeModal: () => void;
}
export const EditCategoryForm = ({
  memberId,
  studyCategory,
  closeModal,
  className,
  ...props
}: EditCategoryFormFormProps) => {
  const form = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: {
      subject: studyCategory.subject,
    },
  });
  const { mutateAsync: editCategory } = useEditStudyCategoryMutation();
  const openModal = useModalStore((state) => state.openModal);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: EditCategoryFormValues) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await editCategory({
        memberId,
        categoryId: studyCategory.study_category_id,
        data,
      });
      closeModal();
    } catch (e) {
      // 네트워크 에러나 기타 예외 처리
    } finally {
      setIsLoading(false);
    }
  };

  const onClickDeleteCategoryHandler = () => {
    openModal('deleteCategory', {
      memberId: memberId,
      category: studyCategory,
    });
  };

  return (
    <div className={cn('py-10 w-full', className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={cn('space-y-8')}
        >
          <ModalHeader
            title={'카테고리 수정'}
            closeModal={closeModal}
            rightButton={
              <div className="flex items-center gap-4">
                <Button
                  onClick={onClickDeleteCategoryHandler}
                  variant={'ghost'}
                >
                  <Trash className="text-destructive" />
                </Button>
                <Button disabled={isLoading} variant={'default'} type="submit">
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
    </div>
  );
};

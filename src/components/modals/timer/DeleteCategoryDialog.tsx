import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import { IStudyCategory } from '@/models/study.model';
import { useDeleteStudyCategoryMutation } from '@/apis/mutations/studyCategoryMutations';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props {
  memberId: string;
  studyCategory: IStudyCategory;
  children: ReactNode;
}

export const DeleteCategoryDialog = ({
  memberId,
  studyCategory,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteCategory } = useDeleteStudyCategoryMutation(
    memberId,
    studyCategory.study_category_id
  );

  const handleDelete = () => {
    deleteCategory();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent
        className={cn(
          `w-full h-screen sm:max-w-[416px] sm:max-h-[736px] flex flex-col justify-center items-center pt-safe-offset-14`
        )}
      >
        <AlertDialogTitle>정말 카테고리를 삭제하시겠습니까?</AlertDialogTitle>
        <AlertDialogFooter className="w-full">
          <AlertDialogCancel onClick={() => setIsOpen(false)} className="h-12">
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="h-12">
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

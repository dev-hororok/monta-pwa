import { cn } from '@/lib/utils';
import { useDeleteStudyCategoryMutation } from '@/apis/mutations/study-category-mutations';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useModalStore } from '@/stores/use-modal-store';

const DeleteCategoryDialog = () => {
  const { isOpen, data } = useModalStore(
    (state) => state.modals.deleteCategory
  );
  const closeModal = useModalStore((state) => state.closeModal);
  const { mutate: deleteCategory } = useDeleteStudyCategoryMutation();

  const handleDelete = () => {
    if (data) {
      deleteCategory({
        memberId: data.memberId,
        categoryId: data.category.study_category_id,
      });
    }
    closeModal('deleteCategory');
  };
  if (!isOpen || !data) {
    return null;
  }
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={cn(
          `w-full h-screen md:max-w-[416px] md:max-h-[736px] flex flex-col justify-center items-center pt-safe-offset-14`
        )}
      >
        <AlertDialogTitle>정말 카테고리를 삭제하시겠습니까?</AlertDialogTitle>
        <AlertDialogFooter className="w-full">
          <AlertDialogCancel
            onClick={() => closeModal('deleteCategory')}
            className="h-12"
          >
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

export default DeleteCategoryDialog;

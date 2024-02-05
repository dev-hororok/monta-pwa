import { cn } from '@/lib/utils';
import { EditCategoryForm } from '@/components/forms/EditCategoryForm';
import { useModalStore } from '@/stores/useModalStore';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';

export const EditCategoryDialog = () => {
  const { isOpen, data } = useModalStore((state) => state.modals.editCategory);
  const closeModal = useModalStore((state) => state.closeModal);

  if (!isOpen || !data) {
    return null;
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={cn(
          `w-full h-screen md:max-w-[416px] md:max-h-[736px] flex flex-col justify-start items-center pt-safe-offset-14`
        )}
      >
        <EditCategoryForm
          memberId={data.memberId}
          studyCategory={data.category}
          closeModal={() => closeModal('editCategory')}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

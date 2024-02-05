import { CreateCategoryForm } from '@/components/forms/CreateCategoryForm';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { useModalStore } from '@/stores/useModalStore';

export const CreateCategoryDialog = () => {
  const { isOpen, data } = useModalStore(
    (state) => state.modals.createCategory
  );
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
        <CreateCategoryForm
          memberId={data.memberId}
          closeModal={() => closeModal('createCategory')}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

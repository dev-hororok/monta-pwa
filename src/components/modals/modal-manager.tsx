import { useModalStore } from '@/stores/use-modal-store';
import TimerModal from './timer';
import CreateCategoryDialog from './categories/create-category';
import EditCategoryDialog from './categories/edit-category';
import DeleteCategoryDialog from './categories/delete-category';
import TimerAlarmDialog from './timer-alarm';
import PaletteAcquisitionDialog from './palette-acquisition';
import CharacterAcquisitionDialog from './character-acquisition';

export const ModalManager = () => {
  const { modals } = useModalStore();

  return (
    <>
      {modals.characterAcquisition.isOpen ? (
        <CharacterAcquisitionDialog />
      ) : null}
      {modals.paletteAcquisition.isOpen ? <PaletteAcquisitionDialog /> : null}

      {modals.timer.isOpen ? <TimerModal /> : null}
      {modals.timerAlarm.isOpen ? <TimerAlarmDialog /> : null}

      {modals.createCategory.isOpen ? <CreateCategoryDialog /> : null}
      {modals.editCategory.isOpen ? <EditCategoryDialog /> : null}
      {modals.deleteCategory.isOpen ? <DeleteCategoryDialog /> : null}
    </>
  );
};

import { useModalStore } from '@/stores/useModalStore';
import { TimerAlarmDialog } from './timerAlarm';
import { PuaseTimerDialog } from './puaseTimer';
import { CharacterAcquisitionDialog } from './characterAcquisition';
import { TimerModal } from './timer';
import { CreateCategoryDialog } from './categories/CreateCategoryDialog';
import { EditCategoryDialog } from './categories/EditCategoryDialog';
import { DeleteCategoryDialog } from './categories/DeleteCategoryDialog';

export const ModalManager = () => {
  const { modals } = useModalStore();

  return (
    <>
      {modals.characterAcquisition.isOpen ? (
        <CharacterAcquisitionDialog />
      ) : null}
      {modals.timer.isOpen ? <TimerModal /> : null}
      {modals.timerAlarm.isOpen ? <TimerAlarmDialog /> : null}
      {modals.pauseTimer.isOpen ? <PuaseTimerDialog /> : null}

      {modals.createCategory.isOpen ? <CreateCategoryDialog /> : null}
      {modals.editCategory.isOpen ? <EditCategoryDialog /> : null}
      {modals.deleteCategory.isOpen ? <DeleteCategoryDialog /> : null}
    </>
  );
};

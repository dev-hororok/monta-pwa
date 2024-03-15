import { useModalStore } from '@/stores/use-modal-store';
import { TimerModal } from './timer';
import { TimerAlarmDialog } from './timer-alarm';
import { PaletteAcquisitionDialog } from './palette-acquisition';
import { CharacterAcquisitionDialog } from './character-acquisition';
import { RequireLoginDialog } from './require-login';
import { ConsumableItemAcquisitionDialog } from './consumable-item-acquisition';
import { PointAcquisitionDialog } from './point-acquisition';

export const ModalManager = () => {
  const { modals } = useModalStore();

  return (
    <>
      {modals.characterAcquisition.isOpen ? (
        <CharacterAcquisitionDialog />
      ) : null}
      {modals.paletteAcquisition.isOpen ? <PaletteAcquisitionDialog /> : null}
      {modals.consumableItemAcquisition.isOpen ? (
        <ConsumableItemAcquisitionDialog />
      ) : null}
      {modals.pointAcquisition.isOpen ? <PointAcquisitionDialog /> : null}

      {modals.timer.isOpen ? <TimerModal /> : null}
      {modals.timerAlarm.isOpen ? <TimerAlarmDialog /> : null}

      {modals.requireLogin.isOpen ? <RequireLoginDialog /> : null}
    </>
  );
};

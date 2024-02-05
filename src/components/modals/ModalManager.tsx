import { useModalStore } from '@/stores/useModalStore';
import { CharacterAcquisitionModal } from './characterAcquisition';

export const ModalManager = () => {
  const { modals } = useModalStore();

  return (
    <>
      {modals.characterAcquisition.isOpen ? (
        <CharacterAcquisitionModal />
      ) : null}
    </>
  );
};

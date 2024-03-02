import { ICharacter } from '@/models/character.model';
import { IConsumableItemInventory } from '@/models/item.model';
import { IPalette } from '@/models/palette.model';
import { IStudyCategory } from '@/models/study.model';
import { create } from 'zustand';

interface ModalState<T = undefined> {
  isOpen: boolean;
  data?: T;
}

interface ModalsState {
  // 캐릭터 획득
  characterAcquisition: ModalState<ICharacter>;
  // 팔레트 획득
  paletteAcquisition: ModalState<{
    palette: IPalette;
    consumableItemInventory: IConsumableItemInventory;
  }>;
  // 타이머
  timer: ModalState;
  timerAlarm: ModalState;

  // 카테고리
  createCategory: ModalState<{ memberId: string }>;
  editCategory: ModalState<{ memberId: string; category: IStudyCategory }>;
  deleteCategory: ModalState<{ memberId: string; category: IStudyCategory }>;
}

type ModalType = keyof ModalsState;

interface ModalStore {
  modals: ModalsState;
  openModal: <T>(modalType: ModalType, data?: T) => void;
  closeModal: (modalType: ModalType) => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  modals: {
    characterAcquisition: { isOpen: false },
    paletteAcquisition: { isOpen: false },
    timerAlarm: { isOpen: false },
    timer: { isOpen: false },
    createCategory: { isOpen: false },
    editCategory: { isOpen: false },
    deleteCategory: { isOpen: false },
  },
  openModal: (modalType, data) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalType]: { isOpen: true, data },
      },
    })),
  closeModal: (modalType) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalType]: { isOpen: false, data: null },
      },
    })),
}));

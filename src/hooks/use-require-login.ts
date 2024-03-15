import { useAuthStore } from '@/stores/auth-store';
import { useModalStore } from '@/stores/use-modal-store';

export const useRequireLogin = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const openModal = useModalStore((state) => state.openModal);

  const openRequireLoginModal = () => {
    if (isLoggedIn) return;
    openModal('requireLogin');
    return;
  };

  return { isLoggedIn, openRequireLoginModal };
};

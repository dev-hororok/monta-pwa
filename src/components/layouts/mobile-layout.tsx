import { Outlet } from 'react-router-dom';
import { FooterNav } from '@/components/footer-nav';

export const MobileLayout = () => {
  return (
    <>
      <Outlet />
      <FooterNav />
    </>
  );
};

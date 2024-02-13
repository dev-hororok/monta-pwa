import { Outlet } from 'react-router-dom';
import { FooterNav } from '@/components/footer-nav';

const MobileLayout = () => {
  return (
    <>
      <Outlet />
      <FooterNav />
    </>
  );
};

export default MobileLayout;

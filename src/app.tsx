import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import MainPage from '@/pages/(home)';
import MyPage from '@/pages/my';
import ShopPage from '@/pages/shop';
import MorePage from '@/pages/more';
import InventoryPage from '@/pages/inventory';
import LoginGatewayPage from '@/pages/auth';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';
import AgreeToTermsPage from '@/pages/auth/agree';
import SettingCategoriesPage from '@/pages/categories';
import ProtectedRoute from '@/components/auth/protected-route';
import UnauthedRoute from '@/components/auth/unauthed-route';
import RootLayout from './layouts/root-layout';
import MobileLayout from './layouts/mobile-layout';
import KakaoLoginCallback from './pages/auth/login/callback/kakao';
import GoogleLoginCallback from './pages/auth/login/callback/google';
import NaverLoginCallback from './pages/auth/login/callback/naver';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          element: (
            <ProtectedRoute>
              <MobileLayout />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <MainPage /> },
            { path: 'my', element: <MyPage /> },
            { path: 'more', element: <MorePage /> },
            { path: 'inventory', element: <InventoryPage /> },
            { path: 'shop', element: <ShopPage /> },
            { path: 'categories', element: <SettingCategoriesPage /> },
          ],
        },
        {
          path: 'auth',
          element: (
            <UnauthedRoute>
              <Outlet />
            </UnauthedRoute>
          ),
          children: [
            { index: true, element: <LoginGatewayPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'agree', element: <AgreeToTermsPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'login/callback/kakao', element: <KakaoLoginCallback /> },
            { path: 'login/callback/google', element: <GoogleLoginCallback /> },
            { path: 'login/callback/naver', element: <NaverLoginCallback /> },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

export const App = () => {
  return <RouterProvider router={router} />;
};

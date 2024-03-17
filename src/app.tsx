import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import MainPage from './pages/(home)';
import MyPage from './pages/my';
import ShopPage from './pages/shop';
import MorePage from './pages/more';
import InventoryPage from './pages/inventory';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import KakaoLoginCallback from './pages/auth/login/callback/kakao';
import GoogleLoginCallback from './pages/auth/login/callback/google';
import NaverLoginCallback from './pages/auth/login/callback/naver';
import { RootLayout } from './components/layouts/root-layout';
import { MobileLayout } from './components/layouts/mobile-layout';
// import { ProtectedRoute } from './components/auth/protected-route';
import { UnauthedRoute } from './components/auth/unauthed-route';
import { NotFoundPage } from './pages/not-found';
import LoginGatewayPage from './pages/auth';
import PrivacyPolicyPage from './pages/(policy)/privacy-policy';
import TermsPage from './pages/(policy)/terms';
import { ForgotPasswordPage } from './pages/auth/forgot-password';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          element: <MobileLayout />,
          children: [
            { index: true, element: <MainPage /> },
            { path: 'my', element: <MyPage /> },
            { path: 'more', element: <MorePage /> },
            { path: 'inventory', element: <InventoryPage /> },
            { path: 'shop', element: <ShopPage /> },
            { path: '*', element: <NotFoundPage /> },
          ],
        },
        {
          path: 'privacy',
          element: <PrivacyPolicyPage />,
        },
        {
          path: 'terms',
          element: <TermsPage />,
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
            { path: 'register', element: <RegisterPage /> },
            { path: 'forgot-password', element: <ForgotPasswordPage /> },
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

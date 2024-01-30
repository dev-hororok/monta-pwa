import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { MobileLayout } from './components/layouts/MobileLayout';
import { More } from './pages/More';
import { Inventory } from './pages/Inventory';
import { Shop } from './pages/Shop';
import { LoginPage } from './pages/Login';
import { ProtectedRoute } from './components/layouts/ProtectedRoute';
import { RootLayout } from './components/layouts/RootLayout';
import { LoginGateway } from './pages/LoginGateway';
import { AgreeToTermsPage } from './pages/AgreeToTerms';
import { RegisterPage } from './pages/Register';
import { UnAuthedRoute } from './components/layouts/UnAuthedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MobileLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/more" element={<More />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/shop" element={<Shop />} />
      </Route>

      <Route
        path="/auth"
        element={
          <UnAuthedRoute>
            <LoginGateway />
          </UnAuthedRoute>
        }
      />
      <Route
        path="/auth/login"
        element={
          <UnAuthedRoute>
            <LoginPage />
          </UnAuthedRoute>
        }
      />
      <Route
        path="/auth/agree"
        element={
          <UnAuthedRoute>
            <AgreeToTermsPage />
          </UnAuthedRoute>
        }
      />
      <Route
        path="/auth/register"
        element={
          <UnAuthedRoute>
            <RegisterPage />
          </UnAuthedRoute>
        }
      />
    </Route>
  ),
  { basename: import.meta.env.BASE_URL }
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

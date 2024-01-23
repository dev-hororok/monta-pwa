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
import { Timer } from './pages/Timer';
import { LoginPage } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RootLayout } from './components/layouts/RootLayout';
import { LoginGateway } from './components/LoginGateway';
import { AgreeToTermsPage } from './pages/AgreeToTerms';

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
        <Route path="/study" element={<Timer />} />
      </Route>

      <Route path="/auth" element={<LoginGateway />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/agree" element={<AgreeToTermsPage />} />
      <Route path="/auth/register" element={<AgreeToTermsPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

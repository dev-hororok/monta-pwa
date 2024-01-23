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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MobileLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/more" element={<More />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/study" element={<Timer />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

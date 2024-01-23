import {
  BackpackIcon,
  DotsHorizontalIcon,
  HomeIcon,
  RocketIcon,
  TimerIcon,
} from '@radix-ui/react-icons';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MobileLayout } from './components/layouts/MobileLayout';
import { NavItem } from './interfaces/app.interface';

const navItems: NavItem[] = [
  {
    text: '홈',
    icon: <HomeIcon className="w-5 h-5" />,
    href: '/',
  },
  {
    text: '타이머',
    icon: <TimerIcon className="w-5 h-5" />,
    href: '/study',
  },
  {
    text: '상점',
    icon: <RocketIcon className="w-5 h-5" />,
    href: '/shop',
  },
  {
    text: '인벤토리',
    icon: <BackpackIcon className="w-5 h-5" />,
    href: '/inventory',
  },
  {
    text: '더보기',
    icon: <DotsHorizontalIcon className="w-5 h-5" />,
    href: '/more',
  },
];
function App() {
  return (
    <>
      <MobileLayout>
        <Header />
        <Footer navItems={navItems} />
      </MobileLayout>
    </>
  );
}

export default App;

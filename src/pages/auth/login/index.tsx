import LoginForm from '@/components/forms/LoginForm';
import { PrevHeader } from '@/components/headers/PrevHeader';

const LoginPage = () => {
  return (
    <div className="h-full md:rounded-md overflow-hidden pt-safe-offset-14 pb-safe-offset-14">
      <PrevHeader to="/" />
      <LoginForm />
      <div className="flex gap-2 items-center justify-center">
        <img src="/turtle.png" alt="character" className="w-1/2" />
      </div>
    </div>
  );
};

export default LoginPage;

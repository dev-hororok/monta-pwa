import LoginForm from '@/components/forms/LoginForm';
import { PrevHeader } from '@/components/headers/PrevHeader';

export const LoginPage = () => {
  return (
    <div className="h-full md:rounded-md overflow-hidden pt-14">
      <PrevHeader to="/" />
      <LoginForm />
      <div className="flex gap-2 items-center justify-center">
        <img
          src="/characters/character_3.png"
          alt="character"
          className="w-1/2"
        />
      </div>
    </div>
  );
};

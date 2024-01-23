import RegisterForm from '@/components/forms/RegisterForm';
import { PrevHeader } from '@/components/headers/PrevHeader';

export const RegisterPage = () => {
  return (
    <div className="h-full md:rounded-md overflow-hidden pt-safe-offset-14 pb-safe-offset-14">
      <div className="pt-8 px-6">
        <h4 className="text-3xl text-primary">가입하기</h4>
      </div>
      <PrevHeader to="/" />
      <RegisterForm />
    </div>
  );
};

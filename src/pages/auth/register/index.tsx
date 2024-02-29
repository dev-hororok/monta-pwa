import { RegisterForm } from '@/pages/auth/register/components/register-form';
import { PrevHeader } from '@/components/headers/prev-header';

const RegisterPage = () => {
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

export default RegisterPage;

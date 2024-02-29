import { LoginForm } from '@/pages/auth/login/components/login-form';
import { OAuthLoginList } from '@/pages/auth/login/components/oauth-login-list';
import { PrevHeader } from '@/components/headers/prev-header';

const LoginPage = () => {
  return (
    <div className="h-full md:rounded-md overflow-hidden pt-safe-offset-14 pb-safe-offset-14">
      <PrevHeader to="/" />
      <div className="py-10 px-6 space-y-4">
        <LoginForm />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              또는
            </span>
          </div>
        </div>
        <OAuthLoginList />
      </div>
    </div>
  );
};

export default LoginPage;

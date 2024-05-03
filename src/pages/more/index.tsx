import { MorePageHeader } from '@/pages/more/_components/more-page-header';
import { VibrationButton } from './_components/vibration-button';
import { DeleteAccountDialog } from './_components/delete-account-dialog';
import { LogoutDialog } from './_components/logout-dialog';
import { AppVersionView } from './_components/app-version-view';
import { PrivacyPolicyButton } from './_components/privacy-policy-button';
import { PlayStoreButton } from './_components/playstore-button';
import { useAuthStore } from '@/stores/auth-store';
import { Link } from 'react-router-dom';
import { TermsOfServiceButton } from './_components/tos-button';
import { morePageIcons } from '@/components/icons';
import { QnAButton } from './_components/qna-button';

const MorePage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return (
    <div className="h-full pt-safe-offset-14 pb-safe-offset-14">
      <MorePageHeader />

      <main className="h-full overflow-y-scroll scrollbar-hide space-y-4">
        <div className="space-y-2">
          <p className="px-6 font-semibold">시스템</p>
          {/* <DarkModeButton /> */}
          <VibrationButton />
        </div>
        <div className="space-y-2">
          <p className="px-6 font-semibold">계정</p>
          {isLoggedIn ? (
            <>
              <DeleteAccountDialog />
              <LogoutDialog />
            </>
          ) : (
            <Link
              to="/auth/login"
              className="flex items-center w-full py-4 px-6 hover:bg-accent cursor-pointer text-sm"
            >
              <div className="flex items-center gap-2">
                <img
                  src={morePageIcons.login}
                  alt="login icon"
                  className="h-[1.2rem] w-[1.2rem]"
                />
                로그인
              </div>
            </Link>
          )}
        </div>

        <div className="space-y-2">
          <p className="px-6 font-semibold">앱 정보</p>
          <AppVersionView />
          <TermsOfServiceButton />
          <PrivacyPolicyButton />
          <QnAButton />
          <PlayStoreButton />
        </div>
      </main>
    </div>
  );
};

export default MorePage;

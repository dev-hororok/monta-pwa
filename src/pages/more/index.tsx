import { MorePageHeader } from '@/components/headers/more-page-header';
import { DarkModeButton } from './components/darkmode-button';
import { VibrationButton } from './components/vibration-button';
import { DeleteAccountDialog } from './components/delete-account-dialog';
import { LogoutDialog } from './components/logout-dialog';
import { AppVersionView } from './components/app-version-view';
import { TermsOfServiceButton } from './components/tos-button';
import { PrivacyPolicyButton } from './components/privacy-policy-button';
import { ReviewButton } from './components/review-button';

const MorePage = () => {
  return (
    <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe-offset-14">
      <MorePageHeader />

      <main className="h-full overflow-y-scroll scrollbar-hide space-y-4">
        <div className="space-y-2">
          <p className="px-6 font-semibold">시스템</p>
          <DarkModeButton />
          <VibrationButton />
        </div>
        <div className="space-y-2">
          <p className="px-6 font-semibold">계정</p>
          <DeleteAccountDialog />
          <LogoutDialog />
        </div>

        <div className="space-y-2">
          <p className="px-6 font-semibold">앱 정보</p>
          <AppVersionView />
          <TermsOfServiceButton />
          <PrivacyPolicyButton />
          <ReviewButton />
        </div>
      </main>
    </div>
  );
};

export default MorePage;

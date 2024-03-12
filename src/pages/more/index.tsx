import { MorePageHeader } from '@/pages/more/_components/more-page-header';
import { VibrationButton } from './_components/vibration-button';
import { DeleteAccountDialog } from './_components/delete-account-dialog';
import { LogoutDialog } from './_components/logout-dialog';
import { AppVersionView } from './_components/app-version-view';
import { TermsOfServiceButton } from './_components/tos-button';
import { PrivacyPolicyButton } from './_components/privacy-policy-button';
import { ReviewButton } from './_components/review-button';

const MorePage = () => {
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

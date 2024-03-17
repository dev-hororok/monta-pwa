import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCheckForgotPasswordMutation,
  useForgotPasswordCodeEmailMutation,
  useResetPasswordMutation,
} from '@/services/mutations/auth-mutations';
import { toast } from 'sonner';
import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import { BackStepHeader } from './_components/back-step-header';
import { SendCodeStep } from './_components/send-code-step';
import { CheckCodeStep } from './_components/check-code-step';
import { ResetPasswordStep } from './_components/reset-password-step';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: sendEmail, isPending: isPendingSendEmail } =
    useForgotPasswordCodeEmailMutation();
  const { mutateAsync: checkCode, isPending: isPendingCheckCode } =
    useCheckForgotPasswordMutation();
  const { mutateAsync: resetPassword, isPending: isPendingResetPassword } =
    useResetPasswordMutation();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  // 뒤로가기
  const handleBackStepClick = () => {
    if (step === 1) {
      navigate('/auth/login', { replace: true });
      return;
    }
    setStep((step) => step - 1);
  };

  // 1 단계
  const handleCodeSuccess = async (email: string) => {
    await sendEmail(
      { email },
      {
        onSuccess: () => {
          toast.success('성공적으로 이메일이 발송되었습니다.');
          setEmail(email);
          setStep(2);
        }, // default onError에서 처리
      }
    );
  };

  // 2 단계
  const handleCheckCodeSuccess = async (code: string) => {
    await checkCode(
      { email, code },
      {
        onSuccess: (result) => {
          toast.success('새 비밀번호를 입력해주세요.');
          setToken(result.hash);
          setStep(3);
        }, // default onError에서 처리
      }
    );
  };

  const reSendCode = async () => {
    await handleCodeSuccess(email);
  };

  // 3 단계
  const handleResetPasswordSuccess = async (password: string) => {
    await resetPassword(
      { hash: token, password },
      {
        onSuccess: () => {
          toast.success('성공적으로 패스워드를 변경했습니다.');
          navigate('/auth/login');
        }, // default onError에서 처리
      }
    );
  };

  return (
    <div className="h-full md:rounded-md overflow-hidden pt-safe-offset-14 pb-safe-offset-14">
      <BackStepHeader onClick={handleBackStepClick} />
      {isPendingSendEmail || isPendingCheckCode || isPendingResetPassword ? (
        <MobileLoadingSpinner isOveray />
      ) : null}
      {step === 1 ? <SendCodeStep onSuccess={handleCodeSuccess} /> : null}
      {step === 2 ? (
        <CheckCodeStep
          onSuccess={handleCheckCodeSuccess}
          reSendCode={reSendCode}
        />
      ) : null}
      {step === 3 ? (
        <ResetPasswordStep onSuccess={handleResetPasswordSuccess} />
      ) : null}
    </div>
  );
};

export default ForgotPasswordPage;

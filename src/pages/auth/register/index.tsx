import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackStepHeader } from './_components/back-step-header';
import {
  useEmailRegisterMutation,
  useSendCheckEmailMutation,
} from '@/services/mutations/auth-mutations';
import { toast } from 'sonner';
import { AgreeToPolicyStep } from './_components/agree-to-policy-step';
import { SendCheckEmailStep } from './_components/send-check-email-step';
import { EmailRegisterStep } from './_components/email-register-step';
import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: sendCheckEmail, isPending: isPendingSendEmail } =
    useSendCheckEmailMutation();
  const { mutateAsync: emailRegister, isPending: isPendingEmailRegister } =
    useEmailRegisterMutation();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 뒤로가기
  const handleBackStepClick = () => {
    if (step === 1) {
      navigate('/auth/login', { replace: true });
      return;
    }

    if (step === 2) {
      setEmail('');
      setPassword('');
    }

    setStep((step) => step - 1);
  };

  const handlePolicyAgreeSuccess = () => {
    setStep(2);
  };

  const handleSendEmailSuccess = async (email: string, password: string) => {
    await sendCheckEmail(
      { email },
      {
        onSuccess: () => {
          toast.success('성공적으로 이메일이 발송되었습니다.');
          setEmail(email);
          setPassword(password);
          setStep(3);
        }, // default onError에서 처리
      }
    );
  };

  const reSendCode = async () => {
    await handleSendEmailSuccess(email, password);
  };

  const handleRegisterSuccess = async (code: string) => {
    await emailRegister({ email, password, code });
    toast.success('회원가입에 성공하였습니다.');
    setEmail('');
    setPassword('');
    navigate('/');
  };

  return (
    <div className="h-full md:rounded-md overflow-hidden pt-safe-offset-14 pb-safe-offset-14">
      <BackStepHeader onClick={handleBackStepClick} />
      {isPendingEmailRegister || isPendingSendEmail ? (
        <MobileLoadingSpinner isOveray />
      ) : null}
      {step === 1 ? (
        <AgreeToPolicyStep onSuccess={handlePolicyAgreeSuccess} />
      ) : null}
      {step === 2 ? (
        <SendCheckEmailStep onSuccess={handleSendEmailSuccess} />
      ) : null}
      {step === 3 ? (
        <EmailRegisterStep
          onSuccess={handleRegisterSuccess}
          reSendCode={reSendCode}
        />
      ) : null}
    </div>
  );
};

export default RegisterPage;

import { useToast } from '@/components/ui/use-toast';
import { useCallback, useMemo } from 'react';
import axios from 'axios';

const useApiError = () => {
  const { toast } = useToast();

  const defaultHandler = useCallback(
    (httpMessage: string) => {
      toast({
        variant: 'destructive',
        title: httpMessage,
      });
    },
    [toast]
  );

  const handler500 = useCallback(() => {
    toast({
      variant: 'destructive',
      title: '서버에서 알 수 없는 문제가 발생하였습니다.',
    });
  }, [toast]);

  const handlers = useMemo(() => {
    return {
      default: defaultHandler,
      500: {
        default: handler500,
      },
    };
  }, [defaultHandler, handler500]);

  const handleError = useCallback(
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const httpStatus = error.response?.status; // axios 에러 코드
        const httpMessage = error.response?.data?.message; // 응답 메시지
        const serverError = error.response?.data;
        if (httpStatus === 500) {
          handlers[500].default();
        } else if (serverError && serverError.status === 'error') {
          handlers.default(httpMessage || 'An unexpected error occurred.');
        } else {
          handlers.default('An unexpected error occurred.');
        }
      } else {
        handlers.default('An unexpected error occurred.');
      }
    },
    [handlers]
  );

  return { handleError };
};

export default useApiError;

import { Button } from '@/components/ui/button';
import useBoundStore from '@/stores/useBoundStore';

export const More = () => {
  const logout = useBoundStore((state) => state.logout);
  return (
    <div>
      <Button type="button" onClick={logout}>
        로그아웃
      </Button>
    </div>
  );
};

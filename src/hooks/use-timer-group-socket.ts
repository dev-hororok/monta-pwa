import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_URL_NEST } from '@/constants/constants';
import { useAuthStore } from '@/stores/auth-store';
import { type TimerType } from '@/stores/timer-state-store';
import type { IMemberInfo } from '@/components/modals/timer';
import { toast } from 'sonner';
import { useTimerOptionsStore } from '@/stores/timer-options-store';

export const useTimerGroupSocket = (timerType: TimerType, active: boolean) => {
  const accessToken = useAuthStore((state) => state.tokens.accessToken);
  const [members, setMembers] = useState<IMemberInfo[]>([]);

  const toggleIsTogetherEnabled = useTimerOptionsStore(
    (state) => state.toggleIsTogetherEnabled
  );

  useEffect(() => {
    if (timerType !== 'Work' || !active) {
      setMembers([]);
      return;
    }

    const socket = io(`${API_URL_NEST}/study-group`, {
      auth: {
        token: accessToken,
      },

      transports: ['websocket'],
    });

    socket.on('error', (data) => {
      toast.error(data);
    });

    // 어드민이 방을 폭파하면 함께 공부하기 모드 꺼짐
    socket.on('explodeGroup', () => {
      toast.error(
        '문제가 생겨서 방이 폭파되었습니다 ㅜㅜ. 시간은 계속 기록됩니다!',
        {
          duration: Infinity,
        }
      );
      toggleIsTogetherEnabled();
      socket.disconnect();
    });

    socket.on('connect', () => {
      console.log('Connected to socket server');
      socket.emit('joinGroup', { jwtToken: accessToken });
    });

    socket.on('groupInfo', (data) => {
      setMembers(data.members);
      socket.off('groupInfo');
    });

    socket.on('newMember', (data) => {
      setMembers((prevMembers) => [
        ...prevMembers.filter((m) => m.member_id !== data.member_id),
        data,
      ]);
    });

    socket.on('memberLeft', (data) => {
      setMembers((prevMembers) =>
        prevMembers.filter((m) => m.member_id !== data.memberId)
      );
    });

    return () => {
      console.log('Disconnecting from socket server');
      socket.disconnect();
    };
  }, [accessToken, timerType, active, toggleIsTogetherEnabled]);

  return { members };
};

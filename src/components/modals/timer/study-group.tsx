import { IMemberInfo } from '.';

export const StudyGroup = ({ members }: { members: IMemberInfo[] }) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-3/5 p-4">
      {Array.from({ length: 9 }).map((_, index) => {
        // 중앙 셀(모닥불 이미지)을 위한 조건
        if (index === 4) {
          return (
            <img
              key="fire"
              src="./fire-1.png"
              alt="모닥불"
              className="w-full aspect-square"
            />
          );
        }
        const member = members[4 <= index ? index - 1 : index];
        // 멤버 정보가 있을 경우 이미지와 이름 표시
        if (member) {
          return (
            <div
              key={member.member_id}
              className="relative flex flex-col items-center justify-center hover:bg-accent cursor-pointer py-2"
            >
              <span className="absolute top-1 text-xs font-semibold text-foreground/70">
                01:02:24(임시)
              </span>

              <img
                src={member.image_url}
                alt={member.nickname}
                className="w-4/5 aspect-square"
              />
              <span className="absolute bottom-1 text-sm antialiased font-semibold">
                {member.nickname}
              </span>
            </div>
          );
        }
        // 빈 셀 처리
        return (
          <img
            key={`empty-${index}`}
            src={'./chair.png'}
            alt={'chair'}
            className="w-full aspect-square"
          />
        );
      })}
    </div>
  );
};

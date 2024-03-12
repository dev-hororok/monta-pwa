export const EndRestAlarm = () => {
  return (
    <div className={'w-full h-1/2 flex flex-col items-center justify-end'}>
      <img
        src={'./chicken_1.png'}
        alt="main"
        className={'w-1/2 aspect-square'}
      />
      <div className="w-2/3 mx-auto text-center">
        <p>쉬는 시간이 끝났습니다.</p>
        <p>다시 집중해주세요.</p>
      </div>
    </div>
  );
};

export const EndWorkAlarm = () => {
  return (
    <div className={'w-full h-1/2 flex flex-col items-center justify-end'}>
      <img
        src={'./chicken_exhausted.png'}
        alt="main"
        className={'w-1/2 aspect-square'}
      />

      <div className="w-2/3 mx-auto text-center">
        <p>닭이 지쳤습니다.</p>
        <p>조금 휴식을 취해주세요.</p>
      </div>
    </div>
  );
};

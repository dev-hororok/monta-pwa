## 완료된 기능

- 인증

  - 회원가입
  - 로그인
  - 토큰 리프레시
  - 구글 간편로그인

- 유저
  - 이름, 상태 메시지 수정
  - 보유중인 캐릭터 장착 (프로필 이미지를 사용한 수정)
  - 캘린더
    - 공부 기록이 존재하는 날짜에 스티커 표시
    - 달력 오른쪽 밑에 현재 달에 공부한 날과 총 시간 표시 (월 통계)
    - 하단에 현재 선택 된 날짜의 총 공부시간 표시 (일 통계)
  - 스트릭(잔디)
    - 1년치 잔디 표시 (왼쪽에 월 표시)
    - heatMap 데이터를 바탕으로 잔디 표시
    - 현재 유저의 팔레트 표시 (딸기우유 팔레트, 민트초코 팔레트)
    - 팔레트 색상에 맞게 잔디 색칠 (null이면 default 초록색)
    - 잔디 클릭 시 일 통계 표시
- 스터디 타이머

  - 타이머 시작 (공부 타이머라면 서버에 기록)
  - 타이머 중단 (공부 타이머라면 서버에 기록)
  - 타이머 종료 시 알림(진동)
  - 섹션 사이클 기능 - ex. 집중횟수 3 = 공부-휴식-공부-휴식-공부-긴휴식
  - 휴식시간 넘기기 기능

  - 타이머 옵션 설정
    - 공부, 휴식, 긴휴식 시간
    - 한 섹션당 집중 횟수 수
    - 설정 변경 시 현재 기록중인 섹션 초기화 (2 집중에서 0으로 초기화됨)

- 공부 같이하기 (최대 8명)

  - 공부 타이머 시작 시 그룹 참여 (소켓 통신)
  - 종료 시 그룹에서 나가짐
  - 각자 공부중인 시간 표시
  - 유저의 프로필 이미지를 캐릭터 장착 개념으로 사용

- 상점
  - 아이템/음식 구매
- 인벤토리

  - 사용 아이템 소모 - 각 아이템에 맞는 효과 실행
    - 음식 - 랜덤 캐릭터 획득
    - 스트릭 변경권 - 랜덤 팔레트 변경
      - 등급에 따라 종이 폭죽 터지는 기능
    - ... 추가 예정
  - 캐릭터 판매 - 캐릭터 가치에 따라 포인트 획득

- 설정

  - 진동 on/off 기능 (모바일 지원)
  - 다크 모드
  - 로그아웃

### 📱 PWA - 모바일 흉내

- 모바일 안전영역(safe area) 고려
  - tailwindcss-safe-area 플러그인 사용
- 스크롤바 감추기
  - tailwind-scrollbar-hide 플러그인 사용
- 모바일 앱종료 구현

  - 첫 접속 시 `dummy history` 생성
  - 라우터 이동 간 `history` 저장 X
  - `global state`로 `backButtonPressed` 생성
  - 로직 (`use-close-app-handler.ts`)
    - 1. 뒤로가기 혹은 이전 키 누를 시 `dummy history` 제거(못막음) 후 즉시 `dummy history` 추가
    - 2. `backButtonPressed` 상태에 따라 분기
      - false: `backButtonPressed`를 true로 변경하고 false로 변경하는 로직을 `setTimeout`으로 이벤트큐에 담고 `toast UI` 표시 (한번더 누르면 종료됩니다.)
        - `setTimeout`은 `dealy`초 후 실행, `toast`는 `delay`초 후 사라짐
      - true: `window.history.go(-(window.history.length + 2))`로 앱 종료

### ⚡️ 성능 개선

- 같이 공부하기에서 타이머 증가 event 줄이기 (최대 8명 + 내 타이머 까지 동일한 이벤트 9개가 리스너에 등록됨)
  - 내 타이머를 글로벌로 설정
  - 그룹 입장 시 유저 첫 렌더링에서 기준시간 계산
    - 렌더링 된 시간 - 글로벌 duration = 내가 그룹에 입장한 시간
    - 내가 그룹에 입장한 시간 - 렌더링할 유저의 입장시간 = 내가 입장한 시간과 해당 유저의 차이
      (먼저 들어온 유저면 플러스, 이후에 들어온 유저면 마이너스)
    - 내가 입장한 시간과 해당 유저의 차이 + 글로벌 duration = 각 유저의 공부중인 시간
- 타이머 이벤트의 상태변화에 의해 매초 발생하는 컴포넌트 리렌더링 줄이기 (타이머 모달에 영향받는 컴포넌트만)
  - React.memo로 리렌더링 전파 줄이기
  - zustand에서 객체로 관리하던 상태를 펼쳐서 값으로 관리 (매초 업데이트되는 duration과 다른 값들을 같은 참조로 묶지 않기)
  - zustand 사용시 구조분해 할당 대신 필요한 데이터만 조회 - useTimerStateStore(state => state.timerType)
  - 값을 실제로 사용하는 컴포넌트를 분리하여 해당 컴포넌트만 리렌더링 (TimerDisplay, TimerPauseButton 등등)

### ⚙️ 환경

- 배포 - `Vercel`
- Core
  - `react v18.2.x`
  - `vite v5.0.x`
  - `vite-plugin-pwa v0.17.x`
- 라우팅
  - `react-router-dom v6.22.x` (많이 변함 v5기준)
- 상태 관리
  - `react-query v5.17.x` (조금 변함 v4기준)
  - `zustand v4.5.x` (별로 안변함 v3기준)
- 스타일링
  - `tailwind v3.4.x`
  - `shadcn/ui`
- 통신
  - `axios v1.6.x`
  - `socket.io-client v4.7.x`
- Validation
  - `zod v3.22.x`

### 👨‍🌾 Task

- [ ] 타이머를 `ServiceWorker`에서 업데이트 하기
  - PWA앱이 크롬 브라우저를 기반으로 동작하기 때문에 탭을 사용하지 않으면 cpu를 거의 할당받지 않아 타이머가 돌지 않거나 느리게 돔
  - 진동도 `ServiceWorker`에서 실행하기 (위와 마찬가지)
- [x] 구글 간편로그인 기능
- [ ] 카카오 간편로그인 기능
- [ ] Color Theme 작업 (가시성 향상, 브랜드 색 결정)
- [ ] 타이머 중단 Dialog 디자인 수정
- [ ] 로그아웃 확인 Dialog 작업
- [ ] 계정 삭제 기능
- [ ] 공부 그룹에서 다른 유저 클릭 시 간단한 정보 보기 (이름, 상태메세지, 잔디)
- [ ] 프로필 사진 없을 때 기본 이미지 적용
- [ ] 안쓰는 디펜던시 정리
- [ ] 잔디 위에 요일 표시

### 🚨 TroubleShooting

#### 1. Shadcn/ui - Toast + reactQuery 사용시 충돌

sonner 라이브러리로 교체함

[https://stackoverflow.com/questions/77923557]("https://stackoverflow.com/questions/77923557/why-does-my-shadcn-ui-datatable-not-reload-on-invalidating-query")

#### 2. OAuth 간편로그인 시 리다이렉트로 구현하여 모바일 종료 동작 X

##### 문제

브라우저 정책이 많이 강화되어서 window.close()도 안되고 여러 꼼수들이 전부 막혔음

pwa앱을 종료하기 위해서는 최상위 history에서 pop이 수행되어야함

유일하게 남은 방법이 위에서 기술한 방법인데 간편로그인을 redirect uri를 통해 구현하니 중간에 외부 history가 낑김

window.history.go(-100)을 하더라도 같은 도메인 까지만 이동하고 중간에 다른 도메인이 껴있으면 해당 페이지로 이동함

##### 해결책

- oauth 구현시 history가 쌓이지 않도록 redirect 대신 popup 방식으로 구현

#### Task

- Shadcn/ui Drawer 제거 (버그 존재)
  - 구매/판매 모달 작업
- zustand - slice 패턴 -> 개별 스토어 (관련 상태 집중화)
- react-query
  - 캐시처리 정리 (모듈화)
- serviceWorker
  - 알람
  - 진동
  - 푸시메세지
- 타이머
  - 긴 쉬는시간 적용
  - 섹션 횟수 적용
  - 접속 시 최근 접속시간 & 0시 기준으로 timerType = Work, sectionCount = 0 처리
  - 하루 완료한 sectionCount / 목표 sectionCount 표시
  - 뽀모도로 옵션 변경 시 sectionCount 초기화
- 글로벌 Loading 스피너

- Card 컴포넌트류

  - 클릭 시 옵션 Dropdown or Modal 컴포넌트
  - 여러장 있을 시 겹친 카드모양 or 표시

- 상점페이지 개선

  - 이벤트 or 추천아이템 섹션 고려

- 설정 페이지

  - 뽀모도로 타이머 설정
  - 다크모드
  - 로그아웃
  - 계정 삭제
  - 휴식/집중 자동시작
  - 언어설정(추후 i18n 지원 시)

- 통계/스트릭 데이터 api로 처리

  - (현재 모든 studyRecords 조회 후 가공하여 사용중)
  - (-> 서버 배치작업으로 한달 or 2주 새벽마다 통계 계산해두기)
  - 통계
    - 스트릭 조회 (6개월치)
    - 캘린더 조회 (월, 하루)
    - 총 공부시간 / 카테고리 별 공부시간 / 완료한 섹션 수
  - 스트릭

    - react-calendar-heatmap 제거 (커스텀 제한)
    - 커스텀 스트릭 컴포넌트 작업 다시만들기
    - 현재 스트릭 정보, 팔레트 정보 표시

- 사용성

  - 모바일 앱종료 구현(history 체크, toast->반투명 안내메세지로 처리)
  - 카테고리 Picker 개선
  - 모든 컴포넌트 skeleton ui 작업
  - 아이템(뽑기 류) 사용 시 즉각적인 반응 (로딩을 느끼지 않도록 하는법 고안)
  - Color Theme 작업 (가시성 향상, 브랜드 색 결정)

#### 이미지 업로드 (Hororok 서버)

- S3, cloudFront

### TroubleShooting

#### 1. Shadcn/ui - Toast + reactQuery 사용시 충돌

sonner 라이브러리로 교체함

[https://stackoverflow.com/questions/77923557]("https://stackoverflow.com/questions/77923557/why-does-my-shadcn-ui-datatable-not-reload-on-invalidating-query")

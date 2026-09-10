# 🇰🇷 Scheduly

**Scheduly**는 카카오톡 채팅방에서 약속 날짜와 시간을 간편하게 정할 수 있도록 도와주는 모바일 전용 투표 서비스입니다.  
참가자들이 가능한 날짜를 고르고 우선순위를 매기면, 실시간으로 집계된 결과를 한눈에 확인할 수 있습니다.

> 🚧 **현재 카카오 챗봇 심사 진행 중입니다.** 심사가 완료되면 카카오톡 채널을 통해 서비스를 이용할 수 있습니다.

---

## 🚀 주요 기능

- 📅 **날짜 투표 (`/v/:code`)**
  - 공유 코드로 투표 참여, 이름 입력 또는 기존 참가자 선택
  - 캘린더에서 날짜별 **점심 / 저녁** 슬롯 선택
  - 바텀시트 UI로 **1~3순위 우선순위** 지정
  - 기존 선택 내역 자동 불러오기 및 수정
- ⏰ **시간 투표 (`/time/:pollId`)**
  - 확정된 날짜 기준으로 점심 / 저녁 시간대 선택
  - 30분 단위 기본 시간 + 직접 시간 추가
  - 투표 종료(FINALIZED) 시 결과 고정
- 📊 **실시간 현황 보기**
  - 날짜별 득표 수 및 우선순위 점수 순위
  - 참가자별 선택 내역 펼쳐 보기
- 💬 **카카오톡 연동**
  - `botUserKey` 파라미터로 카카오 사용자 식별
  - 저장 완료 후 카카오톡으로 바로 복귀
- 📱 **모바일 전용 UX**
  - PC 접속 시 모바일 이용 안내 페이지로 리다이렉트
  - 브라우저 뒤로가기로 단계 이동 (참가자 선택 ↔ 날짜 선택)

---

## 🛠️ 사용 기술 스택

### 📚 Frontend

- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
- ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge)
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)

### 💄 스타일링

- ![Vanilla Extract](https://img.shields.io/badge/Vanilla_Extract-FF8FB1?style=for-the-badge&logoColor=white): **타입 안전한 CSS-in-JS**
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white): **모달 / 바텀시트 애니메이션**
- ![Material Design Icons](https://img.shields.io/badge/MDI_Icons-2196F3?style=for-the-badge&logo=materialdesignicons&logoColor=white)

### 📦 번들링

- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
- ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

---

## 📁 프로젝트 구조

```
src/
├── api/                 # axios 클라이언트 및 API (vote, participant, timePoll)
├── context/             # 참가자 표시 이름 전역 상태
├── pages/               # 라우트 페이지 (User, Time, Desktop)
├── components/
│   ├── header/          # 상단 헤더
│   ├── user/            # 날짜 투표 흐름
│   │   └── interface/
│   │       ├── Step1/   # 이름 입력 / 참가자 선택
│   │       └── Step2/   # 캘린더, 우선순위 바텀시트, 현황 모달
│   ├── time/            # 시간 투표 흐름
│   └── MobileOnlyModal/ # PC 접속 안내
├── style/               # 색상, 타이포그래피 토큰
└── utils/               # 디바이스 판별
```

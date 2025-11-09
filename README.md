# Whendy

약속 일정 잡기 서비스

## 기술 스택

- React + TypeScript
- Vite
- Vanilla Extract (CSS-in-JS)
- Framer Motion (애니메이션)

## 개발 환경 설정

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드

```bash
pnpm build
```


## 프로젝트 구조

```
src/
├── components/
│   ├── admin/          # 관리자 인터페이스
│   │   └── interface/
│   │       ├── Edit/   # 투표 생성/수정
│   │       └── Recent/ # 최근 약속 내역
│   └── home/           # 홈 화면
├── style/              # 공통 스타일 (색상, 타이포그래피)
└── App.tsx
```

## 개발 정보

This project uses:
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) for Fast Refresh
- [Vanilla Extract](https://vanilla-extract.style/) for type-safe CSS
- [Framer Motion](https://www.framer.com/motion/) for animations

import { style } from '@vanilla-extract/css'
import { labelLarge, bodyLarge } from '../../../../../style/typography.css'
import { accent, primaryMain1, primaryWhite } from '../../../../../style/color.css'

export const nameModalOverlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
})

export const nameModalContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // 중앙 정렬
  width: '90%',
  maxWidth: '340px',
  height: '100%', // 화면 전체 높이 기준으로 중앙
})

export const nameIcon = style({
  width: '40px',
  height: '40px',
  marginBottom: '20px',
})

export const bubble = style({
  width: '100%',
  borderRadius: '20px',
  backgroundColor: 'rgba(60, 60, 64, 1)', // 더 밝은 매트한 회색 배경
  border: `1px solid rgba(255, 255, 255, 0.6)`,
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  position: 'relative',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
  selectors: {
    '&::before': {
      // 말풍선 테두리 색상의 꼬리 외곽선
      content: '',
      position: 'absolute',
      top: '-11px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '11px solid transparent',
      borderRight: '11px solid transparent',
      borderBottom: '11px solid rgba(255, 255, 255, 0.6)', // 말풍선 테두리 색상
    },
    '&::after': {
      // 말풍선 배경색의 실제 꼬리
      content: '',
      position: 'absolute',
      top: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '10px solid rgba(60, 60, 64, 1)', // 말풍선 배경과 동일
    },
  },
})

export const bubbleText = style([
  labelLarge,
  {
    color: primaryWhite,
    whiteSpace: 'pre-line',
  },
])

export const nameInput = style([
  bodyLarge,
  {
    marginTop: '24px', // 말풍선과 간격만 두고, 컨테이너 중앙 정렬에 맞춤
    width: "165px",
    textAlign: 'center',
    borderRadius: '8.5px',
    border: `1px solid ${primaryMain1}`,
    padding: '10px 12px',
    outline: 'none',
    color: primaryMain1,
    backgroundColor: primaryWhite,
    boxSizing: 'border-box',
    selectors: {
      '&::placeholder': {
        color: primaryMain1,
        opacity: 0.7,
      },
    },
  },
])

export const saveButton = style([
  labelLarge,
  {
    position: 'absolute',
    bottom: '60px',
    marginTop: '32px',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '12px 0',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: accent,
    color: primaryWhite,
    cursor: 'pointer',
  },
])

export const saveButtonDisabled = style([
  saveButton,
  {
    opacity: 0.6,
    cursor: 'default',
  },
])

export const saveButtonIcon = style({
  width: '20px',
  height: '20px',
})


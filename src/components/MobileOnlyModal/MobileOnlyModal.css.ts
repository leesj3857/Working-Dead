import { style } from '@vanilla-extract/css'
import { titleLarge, titleMedium, bodyLarge } from '../../style/typography.css'
import {
  background,
  subtle1,
  primaryBlack,
  primaryWhite,
  primaryMain1,
  primaryMain3,
} from '../../style/color.css'

export const modalOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '20px',
})

export const modalContent = style({
  backgroundColor: primaryWhite,
  borderRadius: '16px',
  padding: '20px',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
})

export const headerLogo = style({
  width: '100px',
  height: 'auto',
  objectFit: 'contain',
})

export const closeButton = style({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: background,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0,
})

export const closeIcon = style({
  color: subtle1,
})

export const title = style([
  titleLarge,
  {
    color: primaryBlack,
    marginTop: '20px',
    textAlign: 'left',
  },
])

export const divider = style({
  width: '100%',
  height: '8px',
  backgroundColor: background,
  marginTop: '12px',
  border: 'none',
})

export const description = style([
  bodyLarge,
  {
    color: primaryBlack,
    marginTop: '20px',
    textAlign: 'left',
    whiteSpace: 'pre-line',
    wordBreak: 'keep-all',
  },
])

export const phoneContainer = style({
  width: '100%',
  backgroundColor: primaryMain3,
  borderRadius: '10px',
  padding: '24px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '40px',
  boxSizing: 'border-box',
})

export const phoneImage = style({
  width: '64px',
  height: '64px',
  objectFit: 'contain',
})

export const confirmButton = style([
  titleMedium,
  {
    width: '100%',
    backgroundColor: primaryMain1,
    color: primaryWhite,
    borderRadius: '10px',
    border: 'none',
    padding: '14px 0',
    marginTop: '27px',
    cursor: 'pointer',
  },
])

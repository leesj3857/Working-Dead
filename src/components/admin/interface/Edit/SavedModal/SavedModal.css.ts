import { style } from '@vanilla-extract/css'
import { titleLarge, labelLarge, headlineSmall } from '../../../../../style/typography.css'
import { subtle1, accent } from '../../../../../style/color.css'

export const modalOverlay = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
})

export const modalContent = style({
    backgroundColor: subtle1,
    borderRadius: '20px',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '18px',
    maxWidth: '400px',
    width: '90%',
})

export const checkIconWrapper = style({
    width: '67px',
    height: '67px',
    borderRadius: '50%',
    backgroundColor: '#CEFAFE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

export const checkIcon = style({
    color: '#0092B9',
})

export const modalTitle = style([
    titleLarge,
    {
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: '12px',
    }
])

export const shareSection = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #AFB1B6',
    borderRadius: '15px',
    padding: '24px'
})

export const shareTitle = style([
    headlineSmall,
    {
        color: accent,
        textAlign: 'left',
    }
])

export const linkContainer = style({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    borderRadius: '8.5px',
    border: '1px solid #D1D5DB',
    backgroundColor: '#FFFFFF',
    minWidth: 0,
    maxWidth: '100%',
})

export const copyIcon = style({
    color: '#000000',
})

export const linkText = style({
    color: '#9CA3AF',
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    minWidth: 0,
})

export const shareButton = style({
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: accent,
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    ':hover': {
        opacity: 0.9,
    },
    ':active': {
        transform: 'scale(0.95)',
    }
})

export const shareIcon = style({
    width: '20px',
    height: 'auto',
})

export const buttonContainer = style({
    display: 'flex',
    gap: '20px',
    width: '100%',
    justifyContent: 'center',
    marginTop: '10px',
})

export const editButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    backgroundColor: accent,
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    width: '130px',
    height: '56px',
})

export const homeButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    backgroundColor: '#FF8904',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    height: '56px',
    width: '130px',
})

export const buttonIcon = style({
    color: '#FFFFFF',
})

export const buttonText = style([
    labelLarge,
    {
        color: '#FFFFFF',
    }
])


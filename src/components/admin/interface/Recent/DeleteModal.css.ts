import { style } from '@vanilla-extract/css'
import { titleLarge, labelLarge } from '../../../../style/typography.css'
import { subtle1, accent } from '../../../../style/color.css'

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
    gap: '10px',
    maxWidth: '320px',
    width: '90%',
})

export const deleteIcon = style({
    width: '24px',
    height: 'auto',
})

export const modalTitle = style([
    titleLarge,
    {
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: '12px',
    }
])

export const buttonContainer = style({
    display: 'flex',
    gap: '20px',
    width: '100%',
    justifyContent: 'center',
})

export const cancelButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    backgroundColor: accent,
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    width: '120px',
    height: '50px'
})

export const confirmButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    backgroundColor: '#FF8904',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    height: '50px',
    width: '120px'
})
export const buttonIcon = style({
    width: '20px',
    height: 'auto',
})

export const buttonText = style([
    labelLarge,
    {
        color: '#FFFFFF',
    }
])


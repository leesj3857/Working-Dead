import { style } from '@vanilla-extract/css'
import { labelLarge } from '../../../../../style/typography.css'

export const saveButton = style({
    width: '130px',
    height: '56px',
    borderRadius: '16px',
    backgroundColor: '#F64900',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    cursor: 'pointer',
    margin: '0 auto',
    transition: 'all 0.2s ease',
    color: '#FFFFFF',
    ':hover': {
        backgroundColor: '#FFEDD4',
        color: '#F64900'
    },
    ':active': {
        transform: 'scale(0.98)'
    }
})

export const buttonIcon = style({
    width: '24px',
    height: 'auto',
})

export const buttonText = style([
    labelLarge,
])


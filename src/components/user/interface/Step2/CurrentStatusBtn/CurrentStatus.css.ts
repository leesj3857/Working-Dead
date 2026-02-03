import { style } from '@vanilla-extract/css'
import { labelMedium } from '../../../../../style/typography.css'
import { accent } from '../../../../../style/color.css'

export const currentStatusButton = style({
    position: 'fixed',
    width: 'fit-content',
    whiteSpace: 'nowrap',
    bottom: '60px',
    right: '50%',
    transform: 'translateX(50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '12px 20px',
    borderRadius: '23px',
    height: '42px',
    backgroundColor: accent,
    border: 'none',
    boxShadow: '0px 3px 7px 0px rgba(0, 0, 0, 0.2)',
})

export const currentStatusIcon = style({
    width: '20px',
    height: 'auto',
})

export const currentStatusText = style([
    labelMedium,
    {
        color: '#FFFFFF',
    }
])

export const currentStatusDivider = style({
    width: '1px',
    height: '100%',
    backgroundColor: '#FFFFFF',
    margin: '0 10px',
})

export const saveButtonIcon = style({
    width: '20px',
    height: '20px',
})

export const currentStatusSection = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
})
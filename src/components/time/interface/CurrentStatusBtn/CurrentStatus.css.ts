import { style } from '@vanilla-extract/css'
import { labelMedium } from '../../../../style/typography.css'
import { accent } from '../../../../style/color.css'

export const currentStatusButton = style({
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '12px 20px',
    borderRadius: '23px',
    backgroundColor: accent,
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    boxShadow: '0px 3px 7px 0px rgba(0, 0, 0, 0.2)',
    marginTop: '30px',
    marginLeft: 'auto',
    ':hover': {
        transform: 'translateY(-2px)',
    },
    ':active': {
        transform: 'translateY(0px)',
    }
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


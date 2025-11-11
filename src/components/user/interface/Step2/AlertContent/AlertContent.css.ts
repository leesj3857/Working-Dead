import { style } from '@vanilla-extract/css'
import { labelMedium } from '../../../../../style/typography.css'

export const alertContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#FFE5E5',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #FF2F2F',
})

export const alertIcon = style({
    width: '20px',
    height: 'auto',
})

export const alertText = style([
    labelMedium,
    {
        color: '#FF2F2F',
    }
])


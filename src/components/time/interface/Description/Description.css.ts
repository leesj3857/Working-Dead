import { style } from '@vanilla-extract/css'
import { headlineMedium } from '../../../../style/typography.css'
import { accent } from '../../../../style/color.css'

export const descriptionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
})

export const descriptionTitle = style([
    headlineMedium,
    {
        color: accent,
    }
])

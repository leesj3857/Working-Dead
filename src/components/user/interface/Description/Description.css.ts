import { style } from '@vanilla-extract/css'
import { headlineMedium, labelMedium } from '../../../../style/typography.css'
import { accent, subtle1 } from '../../../../style/color.css'

export const descriptionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '0 17px',
    marginBottom: '30px',
})

export const descriptionTitle = style([
    headlineMedium,
    {
        color: accent,
    }
])

export const descriptionDescription = style([
    labelMedium,
    {
        color: subtle1,
    }
])
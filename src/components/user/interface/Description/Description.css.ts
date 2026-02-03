import { style } from '@vanilla-extract/css'
import { headlineMedium, labelMedium } from '../../../../style/typography.css'
import { accent, subtle1 } from '../../../../style/color.css'
import { primaryMain1, primarySub1, primarySub3, primaryMain3 } from '../../../../style/color.css'

export const descriptionContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
})

export const descriptionTitleContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
})

export const descriptionTabDateButton = style([
    labelMedium,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 10px',
        gap: '3px',
        borderRadius: '7px',
        backgroundColor: primaryMain1,
        color: primaryMain3,
        border: `none`,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: primaryMain3,
            color: primaryMain1,
        }
    }
])
export const descriptionTabPriorityButton = style([
    labelMedium,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 10px',
        gap: '3px',
        borderRadius: '7px',
        backgroundColor: primarySub1,
        color: primarySub3,
        border: `none`,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: primarySub3,
            color: primarySub1,
        }
    }
])
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
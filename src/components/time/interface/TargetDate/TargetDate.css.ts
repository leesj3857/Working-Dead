import { style } from '@vanilla-extract/css'
import { headlineSmall, labelMedium, bodySmall } from '../../../../style/typography.css'
import { accent, subtle1, subtle2, primaryMain1, primaryMain3, primarySub1, primarySub3 } from '../../../../style/color.css'

export const targetDateContainer = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 0',
    borderTop: `1px solid ${subtle2}`,
    borderBottom: `1px solid ${subtle2}`,
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
})

export const targetDateRow = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
})

export const targetDateInfo = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
})

export const targetDateTitle = style([
    headlineSmall,
    {
        color: accent,
    },
])

export const badgeContainer = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 5px',
    borderRadius: '7px',
})

export const badgeTextLunch = style([
    bodySmall,
    {
        color: primaryMain1,
    },
])

export const badgeTextDinner = style([
    bodySmall,
    {
        color: primarySub1,
    },
])

export const badgeLunch = style({
    backgroundColor: primaryMain3,
})

export const badgeDinner = style({
    backgroundColor: primarySub3,
})

export const descriptionText = style([
    labelMedium,
    {
        color: subtle1,
    },
])


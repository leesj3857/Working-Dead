import { style } from '@vanilla-extract/css'
import { subtle2, accent } from '../../../../style/color.css'
import { caption, labelMedium } from '../../../../style/typography.css'

export const topNav = style({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    height: '30px',
    gap: '10px',
    paddingBottom: '5px',
    marginBottom: '20px',
})

export const topNavEditing = style({
    borderBottom: `1px solid ${subtle2}`,
})

export const topNavIcon = style({
    height: '30px',
})

export const topNavAdminText = style([
    caption,
    { color: accent },
])

export const topNavBackText = style([
    labelMedium,
    { color: accent },
])

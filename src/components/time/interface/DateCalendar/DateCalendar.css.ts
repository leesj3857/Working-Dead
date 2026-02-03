import { style } from '@vanilla-extract/css'
import { labelLarge } from '../../../../style/typography.css'
import { subtle3, accent, primaryWhite, primaryMain1, primaryMain3, primarySub3, primarySub1 } from '../../../../style/color.css'

export const dateCalendarContainer = style({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
})

export const dateCalendarHeader = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '10px',
})

export const dateCalendarTitle = style([
    labelLarge,
    {
        color: primaryMain1,
    },
])

export const calendarBox = style({
    backgroundColor: subtle3,
    borderRadius: '12px',
    padding: '16px 20px',
})

export const timeGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: '10px',
    rowGap: '10px',
})

export const timeButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primaryWhite,
    borderRadius: '7px',
    border: 'none',
    padding: '10px 0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
})

export const timeButtonText = style([
    labelLarge,
    {
        color: accent,
    },
])

export const timeButtonSelectedLunch = style({
    backgroundColor: primaryMain3,
})

export const timeButtonSelectedDinner = style({
    backgroundColor: primarySub3,
})

export const timeButtonTextSelectedLunch = style({
    color: primaryMain1,
})
export const timeButtonTextSelectedDinner = style({
    color: primarySub1,
})

export const plusButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '7px',
    border: 'none',
    padding: '10px 0',
    cursor: 'pointer',
})


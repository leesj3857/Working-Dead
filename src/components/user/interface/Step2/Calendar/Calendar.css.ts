import { style } from '@vanilla-extract/css'
import { subtle2, subtle1, accent } from '../../../../../style/color.css'
import { labelSmall, bodySmall } from '../../../../../style/typography.css'

export const calendarContainer = style({
    width: '100%',
    borderTop: `1px solid ${subtle2}`,
    borderBottom: `1px solid ${subtle2}`,
    padding: '10px 17px',
    marginBottom: '20px',
})

export const dateContainer = style({
    maxHeight: '50dvh',
    overflowY: 'auto',
    overflowX: 'auto',
    position: 'relative',
    width: '100%',
    paddingBottom: '10px',
})

export const weekdayHeader = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 70px)',
    gap: '2px',
    marginBottom: '10px',
    overflowX: 'hidden',
    overflowY: 'hidden',
})

export const weekdayLabel = style([
    labelSmall,
    {
        color: subtle1,
        textAlign: 'center',
        width: '70px',
    }
])

export const datesGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 70px)',
    gap: '2px',
    minWidth: 'fit-content',
})

export const dateColumn = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    width: '70px',
})

export const emptyBox = style({
    border: `1px solid ${subtle2}`,
    borderRadius: '7px',
    width: '70px',
    height: '180px', // 36 + 70 + 70 = 176px (날짜 + 점심 + 저녁)
})

export const dateLabel = style([
    bodySmall,
    {
        borderRadius: '7px',
        backgroundColor: subtle1,
        color: '#FFFFFF',
        textAlign: 'center',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70px',
    }
])

export const mealSlot = style([
    bodySmall,
    {
        border: `1px solid ${subtle2}`,
        borderRadius: '7px',
        color: accent,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 4px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: '70px',
        height: '70px',
        gap: '7px',
        ':hover': {
            // Will be overridden by inline style
        }
    }
])

export const mealSlotLunch = style({
    ':hover': {
        backgroundColor: '#FFD6A8',
    }
})

export const mealSlotDinner = style({
    ':hover': {
        backgroundColor: '#CEFAFE',
    }
})

export const mealSlotSelected = style({
    backgroundColor: `${accent} !important`,
    color: '#FFFFFF !important',
})

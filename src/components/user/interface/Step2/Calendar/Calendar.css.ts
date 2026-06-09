import { style } from '@vanilla-extract/css'
import { subtle2, subtle1, subtle3, accent } from '../../../../../style/color.css'
import { labelSmall, bodySmall } from '../../../../../style/typography.css'

export const calendarContainer = style({
    width: '100%',
    borderTop: `1px solid ${subtle2}`,
    padding: '10px 17px',
    boxSizing: 'border-box',
})

export const dateContainer = style({
    maxHeight: '50dvh',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    width: '100%',
    paddingBottom: '10px',
})

export const weekdayHeader = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px',
    marginBottom: '10px',
    width: '100%',
})

export const weekdayLabel = style([
    labelSmall,
    {
        color: subtle1,
        textAlign: 'center',
    }
])

export const datesGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px',
    width: '100%',
})

export const dateColumn = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    minWidth: 0,
})

export const emptyBox = style({
    border: `1px solid ${subtle2}`,
    borderRadius: '7px',
    width: '100%',
    height: '160px', // 36 + 2 + 60 + 2 + 60
})

export const dateLabel = style({
    position: 'relative',
    borderRadius: '7px',
    backgroundColor: subtle1,
    color: '#FFFFFF',
    height: '36px',
    width: '100%',
})

export const dateMonth = style([
    bodySmall,
    {
        position: 'absolute',
        top: '3px',
        left: '6px',
        color: '#FFFFFF',
        lineHeight: 1,
    }
])

export const dateSlash = style({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(135deg)',
    width: '20px',
    height: 0,
    borderTop: '0.5px solid #FFFFFF',
})

export const dateDay = style([
    bodySmall,
    {
        position: 'absolute',
        bottom: '3px',
        right: '6px',
        color: '#FFFFFF',
        lineHeight: 1,
    }
])

export const mealSlot = style([
    bodySmall,
    {
        border: `1px solid ${subtle2}`,
        backgroundColor: subtle3,
        borderRadius: '7px',
        color: accent,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: '100%',
        height: '60px',
        gap: '7px',
        boxSizing: 'border-box',
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

import { style } from '@vanilla-extract/css'
import { titleLarge, labelMedium, caption, bodyLarge } from '../../../../../style/typography.css'
import { accent, subtle1, subtle3 } from '../../../../../style/color.css'

export const dateContainer = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '17px',
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
})

export const dateTitleContainer = style({
    display: 'flex',
    alignItems: 'start',
})

export const dateTitle = style([
    titleLarge,
    { color: accent, marginBottom: '5px' }
])

export const dateDescription = style([
    labelMedium,
    { color: subtle1, marginBottom: '20px' }
])

export const calendar = style({
    backgroundColor: accent,
    borderRadius: '20px',
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box',
})

export const calendarHeader = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    position: 'relative',
})

export const arrowButton = style({
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    ':hover': {
        opacity: 0.8,
    }
})

export const monthSelector = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    position: 'static',
    ':hover': {
        opacity: 0.8,
    }
})

export const monthDropdown = style({
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: '8px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #DBD8D3',
    borderRadius: '8px',
    maxHeight: '200px',
    overflowY: 'auto',
    zIndex: 10,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    minWidth: '150px',
})

export const monthOption = style([
    labelMedium,
    {
        padding: '12px 16px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    }
])

export const monthOptionSelected = style({
    backgroundColor: '#CEFAFE',
    fontWeight: 600,
})

export const monthOptionHover = style({
    ':hover': {
        backgroundColor: '#F5F5F5',
    }
})

export const monthText = style([
    labelMedium,
    {
        color: '#FFFFFF',
        fontSize: '18px',
        fontWeight: 500,
    }
])

export const calendarGrid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    columnGap: '0px',
    rowGap: '6px',
    width: '100%',
})

export const weekdayRow = style({
    display: 'contents',
})

export const weekday = style([
    caption,
    {
        color: subtle1,
        textAlign: 'center',
    }
])

export const dateCell = style({
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minWidth: 0,
})

export const dateCellText = style([
    bodyLarge,
    {
        zIndex: 1,
    }
])

export const dateCellInRange = style({
    backgroundColor: subtle3,
})

export const dateCellRangeStart = style({
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
})

export const dateCellRangeEnd = style({
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
})


import { style } from '@vanilla-extract/css'
import { titleLarge, labelMedium, labelLarge, bodySmall } from '../../../../../style/typography.css'
import { accent, subtle1, subtle2, subtle3 } from '../../../../../style/color.css'

export const setOrderContainer = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '17px',
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
})

export const orderIcon = style({
    width: '20px',
    height: 'auto',
})

export const orderTitle = style([
    titleLarge,
    { color: accent, marginLeft: '10px', marginBottom: '5px' }
])

export const orderDescription = style([
    labelMedium,
    { color: subtle1, marginBottom: '15px' }
])

export const orderTitleContainer = style({
    display: 'flex',
    alignItems: 'start',
})

export const priorityList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '15px',
})

export const priorityItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
})

export const priorityNumber = style([
    labelLarge,
    {
        width: '20px',
        height: '20px',
        borderRadius: '3.5px',
        backgroundColor: accent,
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    }
])

export const prioritySlot = style({
    flex: 1,
    height: '30px',
    borderRadius: '7px',
    border: `1px solid ${subtle2}`,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
    gap: '8px',
})

export const divider = style({
    width: '100%',
    height: '1px',
    backgroundColor: subtle3,
    marginBottom: '15px',
})

export const datesList = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    width: '100%',
    justifyContent: 'center',
    maxHeight: '30dvh',
    overflowY: 'auto',
})

export const dateChip = style([
    bodySmall,
    {
        borderRadius: '7px',
        border: `1px solid ${subtle2}`,
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        color: subtle1,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: '#FFFFFF',
        width: '80%',
        minWidth: '200px',
    }
])

export const dateChipSelected = style({
    backgroundColor: accent,
    color: '#FFFFFF',
    border: `1px solid ${accent}`,
})

export const closeIcon = style({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
})

export const dateText = style([
    bodySmall,
    {
        color: subtle1,
        textAlign: 'center',
    }
])
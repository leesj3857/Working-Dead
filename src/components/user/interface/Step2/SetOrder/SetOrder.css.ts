import { style } from '@vanilla-extract/css'
import { labelMedium, labelLarge, bodySmall, titleMedium } from '../../../../../style/typography.css'
import { accent, subtle1, subtle2, subtle3, primarySub1, background } from '../../../../../style/color.css'

export const setOrderContainer = style({
    position: 'absolute',
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: background,
    boxSizing: 'border-box',
    transition: 'top 0.3s ease, transform 0.3s ease, border-radius 0.3s ease, border-top 0.3s ease, box-shadow 0.3s ease',
})

export const setOrderCollapsed = style({
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    borderTop: 'none',
    padding: '16px 20px 4px',
    boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.12)',
    top: 'calc(100% - 65px)',
})

export const setOrderExpanded = style({
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderTop: `1px solid ${subtle2}`,
    padding: '16px 20px 24px',
    boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.08)',
    top: '160px',
})

export const sheetHandle = style({
    width: '40px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: subtle2,
    alignSelf: 'center',
    marginBottom: '12px',
    flexShrink: 0,
})

export const orderTitle = style([
    titleMedium,
    { color: accent, marginBottom: '5px' }
])

export const orderHighlight = style([
    labelMedium,
    { color: primarySub1, marginBottom: '5px' }
])

export const orderDescription = style([
    labelMedium,
    { color: subtle1, marginBottom: '30px' }
])

export const orderTitleContainer = style({
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
})

export const orderStar = style([
    labelMedium,
    {
        fontSize: "20px",
        color: primarySub1,
        alignSelf: 'flex-end',
        transform: 'translateY(-6px)',
        marginBottom: '5px',
    }
])

export const priorityList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '15px',
})

export const priorityItem = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    maxWidth: '260px',
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
        backgroundColor: 'transparent',
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
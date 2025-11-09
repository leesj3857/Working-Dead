import { style } from '@vanilla-extract/css'
import { titleLarge, labelSmall, labelMedium, bodyMedium } from '../../../../style/typography.css'
import { accent, subtle1, background, primaryMain3 } from '../../../../style/color.css'

export const recentContainer = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 16px',
})

export const recentTitle = style([
    titleLarge,
    { color: accent, marginBottom: '10px' },
])

export const recentSubtitle = style([
    labelSmall,
    { color: subtle1, marginBottom: '30px' },
])

export const eventTitle = style([
    labelMedium,
    { color: subtle1, marginBottom: '5px' },
])

export const eventContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
})

export const eventItemWrapper = style({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '10px',
    height: '65px',
    boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, 0.1)',
})

export const eventItem = style({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: '10px',
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    ':hover': {
        backgroundColor: primaryMain3,
    }
})

export const eventItemContent = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
})

export const eventIndex = style([
    labelMedium, 
    { color: accent, height: '20px' },
])

export const eventName = style([
    bodyMedium,
    { color: accent },
])

export const eventCreatedAt = style([
    labelSmall,
    { color: subtle1, backgroundColor: background, 
        height: '20px', padding: '2px 10px', borderRadius: '5px',
        display: 'flex', alignItems: 'center' },
])

export const actionButton = style([
    labelMedium,
    {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '75px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        cursor: 'pointer',
    }
])

export const editButton = style({
    right: '75px',
    backgroundColor: subtle1,
})

export const deleteButton = style({
    right: 0,
    backgroundColor: '#FF2F2F',
})
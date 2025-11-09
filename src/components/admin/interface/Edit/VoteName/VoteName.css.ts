import { style } from '@vanilla-extract/css'
import {titleLarge, labelMedium, labelSmall, bodyLarge} from '../../../../../style/typography.css'
import { accent, subtle1, subtle2 } from '../../../../../style/color.css'

export const voteNameContainer = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '17px',
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
})

export const voteIcon = style({
    width: '20px',
    height: 'auto',
})

export const voteTitle = style([
    titleLarge,
    { color: accent, marginLeft: '5px', marginBottom: '5px' }
])

export const voteDescription = style([
    labelMedium,
    { color: subtle1, marginBottom: '20px' }
])

export const voteInput = style({
    width: '100%',
    height: '64px',
    borderRadius: '10px',
    border: `1px solid ${subtle2}`,
    padding: '8px 12px 10px 12px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
})

export const voteLabel = style([
    labelSmall,
    { 
        color: subtle2,
        position: 'absolute',
        left: '12px',
        pointerEvents: 'none',
        transformOrigin: 'left top',
    }
])

export const voteInputField = style([
    bodyLarge,
    { 
        color: subtle1, 
        border: 'none', 
        outline: 'none',
        backgroundColor: 'transparent',
        marginTop: 'auto',
    }
])

export const voteTitleContainer = style({
    display: 'flex',
    alignItems: 'start',
})
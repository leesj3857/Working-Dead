import { style } from '@vanilla-extract/css'
import { titleLarge, labelMedium, labelSmall, bodyLarge } from '../../../../../style/typography.css'
import { accent, subtle1, subtle2 } from '../../../../../style/color.css'

export const participantContainer = style({
    display: 'flex',
    flexDirection: 'column',
    padding: '17px',
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
})

export const participantTitleContainer = style({
    display: 'flex',
    alignItems: 'start',
})

export const participantTitle = style([
    titleLarge,
    { color: accent, marginBottom: '5px' }
])

export const participantDescription = style([
    labelMedium,
    { color: subtle1, marginBottom: '20px' }
])

export const participantList = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '15px',
})

export const participantItem = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
})

export const participantChip = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px',
    height: '34px',
    borderRadius: '7px',
    padding: '0 12px',
    boxSizing: 'border-box',
})

export const participantChipText = style([
    bodyLarge,
    {
        fontWeight: 500,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textAlign: 'center',
    }
])

export const participantActions = style({
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
})

export const iconButton = style({
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    ':active': {
        transform: 'scale(0.9)',
    }
})

export const participantInputWrapper = style({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
})

export const participantInput = style({
    width: '200px',
    height: '34px',
    borderRadius: '7px',
    border: `1px solid ${subtle2}`,
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
})

export const saveButton = style({
    width: '34px',
    height: '34px',
    borderRadius: '7px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    ':active': {
        transform: 'scale(0.9)',
    }
})

export const participantLabel = style([
    labelSmall,
    { color: subtle2 }
])

export const participantInputField = style([
    bodyLarge,
    { 
        color: subtle1, 
        border: 'none', 
        outline: 'none',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        fontWeight: 500,
    }
])

export const addButton = style([
    labelMedium,
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        width: '100%',
        height: '48px',
        borderRadius: '10px',
        border: `1px dashed ${subtle2}`,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        color: subtle1,
        ':hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            borderColor: subtle1,
        },
        ':active': {
            transform: 'scale(0.98)',
        }
    }
])

export const addButtonIcon = style({
    width: '20px',
    height: 'auto',
})

export const addButtonText = style([
    labelMedium,
    { color: subtle1 }
])


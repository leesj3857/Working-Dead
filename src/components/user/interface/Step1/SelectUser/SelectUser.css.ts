import { style } from '@vanilla-extract/css'
import { subtle3, subtle1, subtle2 } from '../../../../../style/color.css'
import { labelLarge, bodyLarge } from '../../../../../style/typography.css'
export const selectUserContainer = style({
    display: 'flex',
    gap: '10px',
    padding: '0 17px',
    alignItems: 'center',
})

export const userSelectBox = style({
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    padding: '12px',
    borderRadius: '10px',
    border: '2px solid ' + subtle3,
    position: 'relative',
    height: '62px',
})

export const userSelectBoxContent = style({
    display: 'flex',
    alignItems: 'center',
})

export const userNamePlaceHolder = style([
    labelLarge,
    {
        color: subtle1,
        marginLeft: '8px',
    }
])

export const goContainer = style({
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: subtle2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':active': {
        backgroundColor: subtle3,
    }
})

export const dropDownContainer = style({
    position: 'absolute',
    top: '115%',
    left: 0,
    width: '100%',
    zIndex: 1000,
    backgroundColor: '#FFFFFF',
    border: '2px solid ' + subtle3,
    padding: '16px',
    borderRadius: '10px',
    display: 'flex',
    maxHeight: '50dvh',
})

export const dropDownContent = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
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
    flexShrink: 0,
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

export const userSelectButton = style({
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
})
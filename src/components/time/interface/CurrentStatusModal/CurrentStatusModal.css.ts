import { style } from '@vanilla-extract/css'
import { subtle3, subtle1, accent } from '../../../../style/color.css'
import { headlineSmall, titleMedium, labelLarge, labelSmall, labelMedium, bodyLarge } from '../../../../style/typography.css'

export const modalOverlay = style({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
})

export const modalContainer = style({
    backgroundColor: '#FFFFFF',
    border: '2px solid ' + subtle3,
    borderRadius: '15px',
    width: '90%',
    maxWidth: '400px',
    overflow: 'hidden',
    maxHeight: '90dvh',
    display: 'flex',
    flexDirection: 'column',
})

export const modalHeader = style({
    backgroundColor: subtle1,
    padding: '17px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
})

export const modalTitle = style([
    headlineSmall,
    {
        color: '#FFFFFF',
    }
])

export const closeButton = style({
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

export const modalContent = style({
    padding: '17px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    overflowY: 'auto',
    flex: 1,
})

export const voteItem = style({
    border: '1px solid #FFEDD4',
    borderRadius: '12.5px',
    backgroundColor: subtle3,
    padding: '18px 18px 0 18px',
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    flexDirection: 'column',
})

export const voteItemContent = style({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',    
    paddingBottom: '18px',
    width: '100%',
})


export const voteIndex = style([

    labelLarge,
    {
        color: accent,
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        backgroundColor: '#FFEDD4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    }
])

export const voteInfo = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
})

export const voteDate = style([
    titleMedium,
    {
        color: accent,
    }
])

export const voteMealType = style([
    labelMedium,
    {
        color: subtle1,
    }
])

export const voteStats = style({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
})

export const participantCount = style([
    labelLarge,
    {
        color: subtle1,
        marginRight: '7px',
    }
])

export const moreButtonContainer = style({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '7px',
})

export const moreButton = style({
    // width: '88px',
    height: '36px',
    border: '1.5px solid #F64900',
    borderRadius: '10px',
    padding: '10px 16px',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    cursor: 'pointer',
})

export const moreButtonText = style([
    labelSmall,
    {
        color: '#F64900',
    }
])

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

export const participantsContainer = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    paddingBottom: '18px',
})


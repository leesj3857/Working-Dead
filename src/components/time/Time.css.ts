import { style } from '@vanilla-extract/css'
import { labelLarge } from '../../style/typography.css'
import { subtle2, primaryWhite, primaryMain1, primarySub1 } from '../../style/color.css'

export const timeContainer = style({
    display: 'flex',
    flexDirection: 'column',
})

export const saveSection = style({
    marginTop: '30px',
})

export const saveButtonDisabled = style([
    labelLarge,
    {
        width: '100%',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: subtle2,
        color: primaryWhite,
        cursor: 'default',
    },
])

export const saveButtonEnabledLunch = style([
    labelLarge,
    {
        width: '100%',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: primaryMain1,
        color: primaryWhite,
        cursor: 'pointer',
    },
])

export const saveButtonEnabledDinner = style([
    labelLarge,
    {
        width: '100%',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: primarySub1,
        color: primaryWhite,
        cursor: 'pointer',
    },
])

export const saveButtonIcon = style({
    width: '20px',
    height: '20px',
})


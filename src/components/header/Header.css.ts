import { style } from '@vanilla-extract/css'
import { primaryMain1 } from '../../style/color.css'
import { bodyLarge } from '../../style/typography.css'
export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '24px',
  boxSizing: 'border-box',
  marginBottom: '30px',
})

export const logo = style({
  width: '112px',
  height: 'auto',
})

export const nameContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

export const name = style([
  bodyLarge,
  {
    color: primaryMain1,
  }
])

export const icon = style({
  width: '24px',
  height: 'auto',
})


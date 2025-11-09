import { style } from '@vanilla-extract/css'

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',
  marginBottom: '20px',
})

export const logo = style({
  width: '140px',
  height: 'auto',
})

export const icon = style({
  width: '40px',
  height: 'auto',
})


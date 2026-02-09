import { style } from '@vanilla-extract/css'

export const appContainer = style({
  height: '100dvh',
  width: '100%',
  transition: "background-color 0.3s ease",
  padding: "40px 32px",
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
});

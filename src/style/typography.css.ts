import { fontFace, globalStyle, style } from '@vanilla-extract/css';
import PretendardVariable from './PretendardVariable.woff2';

export const pretendard = fontFace({
  src: `url(${PretendardVariable}) format('woff2-variations')`,
  fontWeight: '45 920',
  fontStyle: 'normal',
  fontDisplay: 'swap',
});

globalStyle('body', {
  fontFamily: pretendard,
});

// Display 스타일
export const displayLarge = style({
  fontFamily: pretendard,
  fontSize: '64px',
  lineHeight: '72px',
  letterSpacing: '0px',
  fontWeight: 400,
});

export const displayMedium = style({
  fontFamily: pretendard,
  fontSize: '48px',
  lineHeight: '56px',
  letterSpacing: '0px',
  fontWeight: 400,
});

export const displaySmall = style({
  fontFamily: pretendard,
  fontSize: '40px',
  lineHeight: '48px',
  letterSpacing: '0px',
  fontWeight: 400,
});

// Headline 스타일
export const headlineLarge = style({
  fontFamily: pretendard,
  fontSize: '32px',
  lineHeight: '40px',
  letterSpacing: '0px',
  fontWeight: 700,
});

export const headlineMedium = style({
  fontFamily: pretendard,
  fontSize: '28px',
  lineHeight: '36px',
  letterSpacing: '0px',
  fontWeight: 700,
});

export const headlineSmall = style({
  fontFamily: pretendard,
  fontSize: '24px',
  lineHeight: '32px',
  letterSpacing: '0px',
  fontWeight: 600,
});

// Title 스타일
export const titleLarge = style({
  fontFamily: pretendard,
  fontSize: '22px',
  lineHeight: '28px',
  letterSpacing: '+0.4px',
  fontWeight: 600,
});

export const titleMedium = style({
  fontFamily: pretendard,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '+0.16px',
  fontWeight: 500,
});

export const titleSmall = style({
  fontFamily: pretendard,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '+0.12px',
  fontWeight: 500,
});

// Label 스타일
export const labelLarge = style({
  fontFamily: pretendard,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '+0.2px',
  fontWeight: 500,
});

export const labelMedium = style({
  fontFamily: pretendard,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '+0.4px',
  fontWeight: 500,
});

export const labelSmall = style({
  fontFamily: pretendard,
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: '+0.6px',
  fontWeight: 500,
});

// Body 스타일
export const bodyLarge = style({
  fontFamily: pretendard,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '+0.16px',
  fontWeight: 400,
});

export const bodyMedium = style({
  fontFamily: pretendard,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '+0.24px',
  fontWeight: 400,
});

export const bodySmall = style({
  fontFamily: pretendard,
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: '+0.4px',
  fontWeight: 400,
});

// Overline 스타일
export const overline = style({
  fontFamily: pretendard,
  fontSize: '10px',
  lineHeight: '16px',
  letterSpacing: '+1px',
  fontWeight: 500,
});

// Caption 스타일
export const caption = style({
  fontFamily: pretendard,
  fontSize: '11px',
  lineHeight: '16px',
  letterSpacing: '+0.5px',
  fontWeight: 400,
});


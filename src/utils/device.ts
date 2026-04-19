export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return true

  const ua = navigator.userAgent || navigator.vendor || ''
  const mobileUARegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i
  const isMobileUA = mobileUARegex.test(ua.toLowerCase())

  const isTouch =
    'ontouchstart' in window ||
    (navigator.maxTouchPoints !== undefined && navigator.maxTouchPoints > 0)

  const isNarrow = window.matchMedia('(max-width: 768px)').matches

  return isMobileUA || (isTouch && isNarrow)
}

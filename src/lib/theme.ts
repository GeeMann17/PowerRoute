export const THEMES = {
  light: {
    id: 'light',
    name: 'Industrial Light',
    description: 'Off-white surfaces, black borders, electric yellow accents',
  },
  dark: {
    id: 'dark',
    name: 'Terminal Dark',
    description: 'Black surfaces, white borders, neon green accents',
  },
  corporate: {
    id: 'corporate',
    name: 'Navy Command',
    description: 'Navy borders, orange accents, structured and bold',
  },
} as const

export type ThemeId = keyof typeof THEMES

export const DEFAULT_THEME: ThemeId = 'light'

export const THEME_STORAGE_KEY = 'powerroute-theme'

export function getStoredTheme(): ThemeId {
  if (typeof window === 'undefined') return DEFAULT_THEME
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored && stored in THEMES) return stored as ThemeId
  return DEFAULT_THEME
}

export function setStoredTheme(theme: ThemeId) {
  if (typeof window === 'undefined') return
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

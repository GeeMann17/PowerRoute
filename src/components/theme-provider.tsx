'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { type ThemeId, DEFAULT_THEME, getStoredTheme, setStoredTheme } from '@/lib/theme'

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedTheme = getStoredTheme()
    // Sync theme from storage on mount
    requestAnimationFrame(() => {
      setThemeState(storedTheme)
      setMounted(true)
    })
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme, mounted])

  const setTheme = useCallback((newTheme: ThemeId) => {
    setThemeState(newTheme)
    setStoredTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }, [])

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: DEFAULT_THEME, setTheme }}>
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

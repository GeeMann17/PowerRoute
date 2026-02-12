'use client'

import { useState } from 'react'
import { Palette, X } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { THEMES, type ThemeId } from '@/lib/theme'

const themeColors: Record<ThemeId, string> = {
  light: '#FFE600',
  dark: '#39FF14',
  corporate: '#FF6B35',
}

export function DevThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {isOpen ? (
        <div className="bg-card border-2 border-border brutal-shadow p-4 min-w-[200px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground">Theme</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-1.5">
            {(Object.keys(THEMES) as ThemeId[]).map((id) => {
              const t = THEMES[id]
              const isActive = theme === id
              return (
                <button
                  key={id}
                  onClick={() => setTheme(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm font-bold transition-all border-2 ${
                    isActive
                      ? 'border-border bg-accent text-accent-foreground brutal-shadow-sm'
                      : 'border-transparent hover:border-border text-foreground'
                  }`}
                >
                  <div
                    className="w-3 h-3 border-2 border-border flex-shrink-0"
                    style={{ backgroundColor: themeColors[id] }}
                  />
                  {t.name}
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-accent text-accent-foreground border-2 border-border brutal-shadow px-3 py-2 text-xs font-bold uppercase tracking-wider hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--brutal-shadow)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          title="Switch theme"
        >
          <Palette className="h-3.5 w-3.5" />
          {THEMES[theme].name}
        </button>
      )}
    </div>
  )
}

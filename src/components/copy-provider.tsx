'use client'

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
} from 'react'
import {
  type CopyPersona,
  type CopySet,
  DEFAULT_PERSONA,
  COPY_SETS,
  detectPersona,
  persistPersona,
  COPY_PERSONA_STORAGE_KEY,
} from '@/lib/copy'

// =============================================================================
// Context
// =============================================================================

interface CopyContextValue {
  persona: CopyPersona
  copy: CopySet
  setPersona: (persona: CopyPersona) => void
}

const CopyContext = createContext<CopyContextValue>({
  persona: DEFAULT_PERSONA,
  copy: COPY_SETS[DEFAULT_PERSONA],
  setPersona: () => {},
})

// =============================================================================
// External store for persona state
// =============================================================================

let currentPersona: CopyPersona = DEFAULT_PERSONA
const listeners = new Set<() => void>()

function notifyListeners() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): CopyPersona {
  return currentPersona
}

function getServerSnapshot(): CopyPersona {
  return DEFAULT_PERSONA
}

function setExternalPersona(persona: CopyPersona) {
  if (persona === currentPersona) return
  currentPersona = persona
  persistPersona(persona)
  notifyListeners()
}

// Initialize on first client-side load
if (typeof window !== 'undefined') {
  currentPersona = detectPersona()
  persistPersona(currentPersona)

  // Re-detect on popstate (back/forward navigation)
  window.addEventListener('popstate', () => {
    const detected = detectPersona()
    setExternalPersona(detected)
  })

  // Re-detect on storage changes from other tabs
  window.addEventListener('storage', (e) => {
    if (e.key === COPY_PERSONA_STORAGE_KEY && e.newValue) {
      const newPersona = e.newValue as CopyPersona
      if (newPersona in COPY_SETS) {
        currentPersona = newPersona
        notifyListeners()
      }
    }
  })
}

// =============================================================================
// Provider
// =============================================================================

export function CopyProvider({ children }: { children: React.ReactNode }) {
  const persona = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setPersona = useCallback((newPersona: CopyPersona) => {
    setExternalPersona(newPersona)
  }, [])

  const copy = COPY_SETS[persona]

  return (
    <CopyContext.Provider value={{ persona, copy, setPersona }}>
      {children}
    </CopyContext.Provider>
  )
}

// =============================================================================
// Hook
// =============================================================================

/**
 * Access the current copy persona and its copy set.
 *
 * @example
 * ```tsx
 * const { copy, persona } = useCopy()
 * return <h1>{copy.heroHeadline}</h1>
 * ```
 */
export function useCopy() {
  return useContext(CopyContext)
}

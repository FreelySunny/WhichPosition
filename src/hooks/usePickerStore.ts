import { create } from 'zustand'
import { defaultCandidatesZh } from '@/data/candidates-zh'
import { defaultCandidatesEn } from '@/data/candidates-en'
import { candidatesDescriptionsZh } from '@/data/candidates-zh'
import { candidatesDescriptionsEn } from '@/data/candidates-en'

export interface HistoryRecord {
  result: string
  timestamp: number
}

interface PickerState {
  candidates: string[]
  history: HistoryRecord[]
  language: 'zh' | 'en'
  isRolling: boolean
  result: string | null

  setLanguage: (lang: 'zh' | 'en') => void
  addCandidate: (item: string) => void
  removeCandidate: (index: number) => void
  updateCandidate: (index: number, value: string) => void
  clearCandidates: () => void
  setRolling: (rolling: boolean) => void
  setResult: (result: string | null) => void
  addHistory: (record: HistoryRecord) => void
  clearHistory: () => void
}

export function getDescription(name: string, lang: 'zh' | 'en'): string | null {
  if (lang === 'zh') return candidatesDescriptionsZh[name] ?? null
  return candidatesDescriptionsEn[name] ?? null
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  return a.every((v, i) => v === b[i])
}

function getInitialLanguage(): 'zh' | 'en' {
  const stored = localStorage.getItem('wp_language')
  if (stored === 'zh' || stored === 'en') return stored
  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('zh') ? 'zh' : 'en'
}

function getInitialCandidates(lang: 'zh' | 'en'): string[] {
  const stored = localStorage.getItem('wp_candidates')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch {
      // ignore
    }
  }
  return lang === 'zh' ? defaultCandidatesZh : defaultCandidatesEn
}

function getInitialHistory(): HistoryRecord[] {
  const stored = localStorage.getItem('wp_history')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed
    } catch {
      // ignore
    }
  }
  return []
}

const initialLang = getInitialLanguage()

export const usePickerStore = create<PickerState>((set, get) => ({
  candidates: getInitialCandidates(initialLang),
  history: getInitialHistory(),
  language: initialLang,
  isRolling: false,
  result: null,

  setLanguage: (lang) => {
    localStorage.setItem('wp_language', lang)
    const current = get().candidates
    const currentLang = get().language
    const isUsingDefaults =
      arraysEqual(current, currentLang === 'zh' ? defaultCandidatesZh : defaultCandidatesEn)
    const newCandidates =
      isUsingDefaults
        ? (lang === 'zh' ? defaultCandidatesZh : defaultCandidatesEn)
        : current
    if (isUsingDefaults) {
      localStorage.removeItem('wp_candidates')
    }
    set({ language: lang, candidates: newCandidates })
  },

  addCandidate: (item) => {
    const trimmed = item.trim()
    if (!trimmed) return
    const candidates = [...get().candidates, trimmed]
    localStorage.setItem('wp_candidates', JSON.stringify(candidates))
    set({ candidates })
  },

  removeCandidate: (index) => {
    const candidates = get().candidates.filter((_, i) => i !== index)
    localStorage.setItem('wp_candidates', JSON.stringify(candidates))
    set({ candidates })
  },

  updateCandidate: (index, value) => {
    const trimmed = value.trim()
    if (!trimmed) return
    const candidates = get().candidates.map((item, i) =>
      i === index ? trimmed : item
    )
    localStorage.setItem('wp_candidates', JSON.stringify(candidates))
    set({ candidates })
  },

  clearCandidates: () => {
    localStorage.setItem('wp_candidates', '[]')
    set({ candidates: [] })
  },

  setRolling: (rolling) => set({ isRolling: rolling }),

  setResult: (result) => set({ result }),

  addHistory: (record) => {
    const history = [record, ...get().history].slice(0, 20)
    localStorage.setItem('wp_history', JSON.stringify(history))
    set({ history })
  },

  clearHistory: () => {
    localStorage.setItem('wp_history', '[]')
    set({ history: [] })
  },
}))

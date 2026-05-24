import { useState } from 'react'
import { usePickerStore } from '@/hooks/usePickerStore'
import { t } from '@/utils/i18n'
import { Plus, X, Upload, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

export default function CandidateManager() {
  const {
    candidates,
    language,
    addCandidate,
    removeCandidate,
    clearCandidates,
  } = usePickerStore()

  const [inputValue, setInputValue] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [importText, setImportText] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const handleAdd = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) {
      showToast(t('app.emptyInput', language))
      return
    }
    if (candidates.includes(trimmed)) {
      showToast(t('app.duplicate', language))
      return
    }
    addCandidate(trimmed)
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  const handleImport = () => {
    const lines = importText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !candidates.includes(l))
    lines.forEach((line) => addCandidate(line))
    setImportText('')
    setShowImport(false)
    showToast(t('app.importDone', language))
  }

  const handleClear = () => {
    if (window.confirm(t('app.clearConfirm', language))) {
      clearCandidates()
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2.5
          text-sm text-gray-400 hover:text-gray-300
          border border-gray-800 hover:border-gray-700 rounded-lg
          bg-gray-900/50 hover:bg-gray-900/80
          transition-all duration-200"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          {t('app.candidates', language)}
          <span className="text-gray-600">({candidates.length})</span>
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-2 p-4 rounded-lg border border-gray-800 bg-gray-900/30 backdrop-blur-sm">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('app.addPlaceholder', language)}
              className="flex-1 px-3 py-2 text-sm
                bg-gray-800/80 border border-gray-700 rounded-lg
                text-gray-200 placeholder-gray-500
                focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30
                transition-all duration-200"
            />
            <button
              onClick={handleAdd}
              className="px-3 py-2 text-sm font-medium
                bg-purple-600/40 hover:bg-purple-600/60
                border border-purple-500/30 rounded-lg
                text-purple-200 hover:text-white
                transition-all duration-200
                flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              {t('app.add', language)}
            </button>
          </div>

          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setShowImport(!showImport)}
              className="px-3 py-1.5 text-xs
                text-gray-400 hover:text-gray-200
                border border-gray-700 hover:border-gray-600 rounded-lg
                bg-gray-800/50 hover:bg-gray-800
                transition-all duration-200
                flex items-center gap-1"
            >
              <Upload className="w-3 h-3" />
              {t('app.importCandidates', language)}
            </button>
            {candidates.length > 0 && (
              <button
                onClick={handleClear}
                className="px-3 py-1.5 text-xs
                  text-red-400 hover:text-red-300
                  border border-red-900/30 hover:border-red-800/50 rounded-lg
                  bg-red-950/20 hover:bg-red-950/40
                  transition-all duration-200
                  flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                {t('app.clear', language)}
              </button>
            )}
          </div>

          {showImport && (
            <div className="mb-3">
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder={t('app.importPlaceholder', language)}
                rows={4}
                className="w-full px-3 py-2 text-sm
                  bg-gray-800/80 border border-gray-700 rounded-lg
                  text-gray-200 placeholder-gray-500
                  focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30
                  transition-all duration-200 resize-none"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleImport}
                  className="px-3 py-1.5 text-xs
                    bg-purple-600/40 hover:bg-purple-600/60
                    border border-purple-500/30 rounded-lg
                    text-purple-200 hover:text-white
                    transition-all duration-200"
                >
                  {t('app.confirm', language)}
                </button>
                <button
                  onClick={() => {
                    setShowImport(false)
                    setImportText('')
                  }}
                  className="px-3 py-1.5 text-xs
                    text-gray-400 hover:text-gray-200
                    border border-gray-700 hover:border-gray-600 rounded-lg
                    bg-gray-800/50 hover:bg-gray-800
                    transition-all duration-200"
                >
                  {t('app.cancel', language)}
                </button>
              </div>
            </div>
          )}

          {candidates.length === 0 ? (
            <p className="text-sm text-gray-600 text-center py-3">
              {t('app.noCandidates', language)}
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {candidates.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs
                    bg-gray-800/60 border border-gray-700/50 rounded-full
                    text-gray-300
                    group/candidate hover:border-purple-500/30 hover:bg-purple-950/30
                    transition-all duration-200"
                >
                  <span className="max-w-[120px] truncate">{item}</span>
                  <button
                    onClick={() => removeCandidate(index)}
                    className="opacity-0 group-hover/candidate:opacity-100
                      text-gray-500 hover:text-red-400
                      transition-all duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
            px-4 py-2 text-sm rounded-lg
            bg-gray-900/90 border border-gray-700 text-gray-200
            shadow-lg backdrop-blur-sm
            animate-toast-in"
        >
          {toast}
        </div>
      )}
    </div>
  )
}

import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { usePickerStore, getDescription } from '@/hooks/usePickerStore'
import { t } from '@/utils/i18n'
import { X } from 'lucide-react'

interface ResultModalProps {
  open: boolean
  onClose: () => void
}

export default function ResultModal({ open, onClose }: ResultModalProps) {
  const { result, language } = usePickerStore()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  if (!open || !result) return null

  const congratsText = t('modal.congrats', language).replace('{result}', result)
  const description = getDescription(result, language)
    ?? t('modal.description.fallback', language)

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t('modal.title', language)}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-modal-fade-in"
        onClick={onClose}
      />

      <div
        className={`
          relative w-full max-w-sm
          bg-gray-900/95 border border-purple-500/30 rounded-2xl
          shadow-[0_0_60px_rgba(124,58,237,0.2),0_0_120px_rgba(124,58,237,0.1)]
          overflow-hidden
          animate-modal-scale-in
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-amber-500/5 pointer-events-none" />

        <button
          onClick={onClose}
          className={`
            absolute top-3 right-3 z-10
            w-8 h-8 flex items-center justify-center rounded-full
            text-gray-500 hover:text-gray-200
            bg-gray-800/60 hover:bg-gray-700
            border border-gray-700 hover:border-gray-600
            transition-all duration-200
          `}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative p-6 md:p-8 flex flex-col items-center text-center gap-4">
          <div className="text-sm font-display tracking-widest uppercase text-purple-400/80">
            {t('modal.title', language)}
          </div>

          <div
            className="text-3xl md:text-4xl font-display font-bold
              text-amber-300 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]
              animate-result-reveal break-all"
          >
            {result}
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            {congratsText}
          </p>

          <p className="text-xs text-gray-500 leading-relaxed max-w-[280px]">
            {description}
          </p>

          <button
            onClick={onClose}
            className={`
              mt-2 px-8 py-2.5 text-sm font-display font-bold tracking-wider uppercase
              bg-purple-600/60 hover:bg-purple-500/70
              border border-purple-400/30 hover:border-purple-300/50
              text-white rounded-xl
              shadow-[0_0_20px_rgba(124,58,237,0.2)]
              hover:shadow-[0_0_35px_rgba(124,58,237,0.4)]
              transition-all duration-300
            `}
          >
            {t('modal.close', language)}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

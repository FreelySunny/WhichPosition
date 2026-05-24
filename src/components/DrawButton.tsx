import { usePickerStore } from '@/hooks/usePickerStore'
import { t } from '@/utils/i18n'
import { Zap } from 'lucide-react'

interface DrawButtonProps {
  onDraw: () => void
  canDraw: boolean
}

export default function DrawButton({ onDraw, canDraw }: DrawButtonProps) {
  const { isRolling, language, candidates } = usePickerStore()

  const disabled = !canDraw
  const notEnough = candidates.length < 2

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onDraw}
        disabled={disabled}
        className={`
          relative group
          px-10 py-4 md:px-14 md:py-5
          text-lg md:text-xl font-display font-bold tracking-[0.2em] uppercase
          rounded-xl
          transition-all duration-300
          ${disabled
            ? 'bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed'
            : `
              bg-purple-600/80 text-white
              border border-purple-400/50
              shadow-[0_0_30px_rgba(124,58,237,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
              hover:bg-purple-500/80
              hover:border-purple-300/60
              hover:shadow-[0_0_50px_rgba(124,58,237,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]
              hover:scale-105
              active:scale-95
              cursor-pointer
            `
          }
        `}
        aria-label={t('app.draw', language)}
      >
        {disabled ? (
          <span className="flex items-center gap-2">
            <Zap className="w-5 h-5 opacity-50" />
            {isRolling ? t('app.drawing', language) : t('app.draw', language)}
          </span>
        ) : (
          <span className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-amber-400 group-hover:animate-pulse" />
            {t('app.draw', language)}
            <Zap className="w-5 h-5 text-amber-400 group-hover:animate-pulse" />
          </span>
        )}

        {!disabled && (
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
              bg-gradient-to-r from-purple-500/20 via-cyan-500/10 to-purple-500/20
              transition-opacity duration-300 pointer-events-none"
          />
        )}
      </button>

      {notEnough && !isRolling && (
        <p className="text-xs text-gray-500 mt-1">
          {t('app.cannotDraw', language)}
        </p>
      )}
    </div>
  )
}

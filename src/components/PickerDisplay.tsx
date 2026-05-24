import { useMemo } from 'react'
import { usePickerStore } from '@/hooks/usePickerStore'
import { t } from '@/utils/i18n'

interface PickerDisplayProps {
  stripRef: (el: HTMLDivElement | null) => void
  containerRef: (el: HTMLDivElement | null) => void
}

export default function PickerDisplay({ stripRef, containerRef }: PickerDisplayProps) {
  const { candidates, result, isRolling, language } = usePickerStore()

  const reelItems = useMemo(
    () => Array.from({ length: 5 }, () => candidates).flat(),
    [candidates],
  )

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div
        className={`
          relative border rounded-2xl bg-black/40 backdrop-blur-sm
          transition-all duration-500
          ${result
            ? 'border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.15),0_0_80px_rgba(245,158,11,0.05)]'
            : 'border-purple-500/20 shadow-[0_0_30px_rgba(124,58,237,0.1)]'
          }
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none rounded-2xl" />

        {/* Side notches */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500/30 border border-purple-400/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500/30 border border-purple-400/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500/30 border border-purple-400/20" />
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500/30 border border-purple-400/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500/30 border border-purple-400/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500/30 border border-purple-400/20" />
        </div>

        {/* Top gradient overlay */}
        <div
          className="absolute top-0 left-0 right-0 h-16 md:h-20 z-10
            bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/85 to-transparent
            pointer-events-none rounded-t-2xl"
        />

        {/* Bottom gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 md:h-20 z-10
            bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/85 to-transparent
            pointer-events-none rounded-b-2xl"
        />

        {/* Center slot highlight lines */}
        <div className="absolute left-8 right-8 top-[calc(33.333%+0.5rem)] md:top-[calc(33.333%+0.75rem)] h-px z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-sm" />
        </div>
        <div className="absolute left-8 right-8 top-[calc(66.667%-0.5rem)] md:top-[calc(66.667%-0.75rem)] h-px z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-sm" />
        </div>

        {/* Reel window */}
        <div
          ref={containerRef}
          className="overflow-hidden h-[240px] md:h-[288px]"
        >
          <div
            ref={stripRef}
            className="will-change-transform"
          >
            {reelItems.map((item, i) => (
              <div
                key={`${item}-${i}`}
                data-reel-item
                className="h-20 md:h-24 flex items-center justify-center"
              >
                <span
                  className="text-3xl md:text-5xl font-display font-bold
                    text-gray-200/90 select-none px-4 truncate max-w-full"
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {!result && !isRolling && candidates.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <span className="text-gray-600 text-xs md:text-sm font-display tracking-widest uppercase opacity-30">
              {t('app.subtitle', language)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

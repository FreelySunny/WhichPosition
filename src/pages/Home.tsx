import { useState, useEffect, useRef } from 'react'
import { usePickerStore } from '@/hooks/usePickerStore'
import { usePicker } from '@/hooks/usePicker'
import { t } from '@/utils/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import PickerDisplay from '@/components/PickerDisplay'
import DrawButton from '@/components/DrawButton'
import CandidateManager from '@/components/CandidateManager'
import HistoryPanel from '@/components/HistoryPanel'
import ResultModal from '@/components/ResultModal'

export default function Home() {
  const { language, result, isRolling } = usePickerStore()
  const { startRoll, canDraw, stripRef, containerRef } = usePicker()
  const [showModal, setShowModal] = useState(false)
  const prevResultRef = useRef<string | null>(null)

  useEffect(() => {
    if (result && result !== prevResultRef.current && !isRolling) {
      setShowModal(true)
    }
    prevResultRef.current = result
  }, [result, isRolling])

  useEffect(() => {
    if (isRolling) {
      setShowModal(false)
    }
  }, [isRolling])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-6 md:py-10">
        <header className="w-full max-w-lg flex items-center justify-between mb-6 md:mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500
              flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
              <span className="text-white text-sm font-display font-bold">W</span>
            </div>
            <div>
              <h1 className="text-sm md:text-base font-display font-bold tracking-wider text-gray-200">
                {t('app.title', language)}
              </h1>
              <p className="text-[10px] text-gray-600 tracking-wider">
                {t('app.subtitle', language)}
              </p>
            </div>
          </div>
          <LanguageSwitcher />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center w-full gap-4 md:gap-6">
          <PickerDisplay stripRef={stripRef} containerRef={containerRef} />
          <DrawButton onDraw={startRoll} canDraw={canDraw} />
          <CandidateManager />
        </main>

        <footer className="w-full mt-6 md:mt-8">
          <HistoryPanel />
        </footer>
      </div>

      <ResultModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

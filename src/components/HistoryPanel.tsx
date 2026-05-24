import { usePickerStore } from '@/hooks/usePickerStore'
import { t } from '@/utils/i18n'
import { Clock, Trash2 } from 'lucide-react'

export default function HistoryPanel() {
  const { history, language, clearHistory } = usePickerStore()

  if (history.length === 0) {
    return (
      <div className="w-full max-w-lg mx-auto mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="text-xs text-gray-600 uppercase tracking-wider">
            {t('app.history', language)}
          </span>
        </div>
        <p className="text-xs text-gray-700 text-center py-4">
          {t('app.noHistory', language)}
        </p>
      </div>
    )
  }

  const formatTime = (ts: number) => {
    const d = new Date(ts)
    const h = d.getHours().toString().padStart(2, '0')
    const m = d.getMinutes().toString().padStart(2, '0')
    const s = d.getSeconds().toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="text-xs text-gray-600 uppercase tracking-wider">
            {t('app.history', language)}
          </span>
          <span className="text-xs text-gray-700">({history.length})</span>
        </div>
        <button
          onClick={clearHistory}
          className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-400
            transition-colors duration-200"
        >
          <Trash2 className="w-3 h-3" />
          {t('app.clearHistory', language)}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {history.map((record, index) => (
          <div
            key={`${record.timestamp}-${index}`}
            className={`
              flex-shrink-0 px-3 py-2 rounded-lg border text-xs
              ${index === 0
                ? 'border-amber-500/20 bg-amber-500/5 text-amber-300'
                : 'border-gray-800 bg-gray-900/30 text-gray-400'
              }
            `}
          >
            <div className="font-medium truncate max-w-[120px]">
              {record.result}
            </div>
            <div className="text-[10px] opacity-50 mt-0.5">
              {formatTime(record.timestamp)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

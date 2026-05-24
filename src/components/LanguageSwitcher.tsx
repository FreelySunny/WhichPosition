import { usePickerStore } from '@/hooks/usePickerStore'
import { t } from '@/utils/i18n'

export default function LanguageSwitcher() {
  const { language, setLanguage } = usePickerStore()

  const toggle = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh')
  }

  return (
    <button
      onClick={toggle}
      className="relative px-3 py-1.5 text-xs font-medium tracking-wider uppercase
        border border-purple-500/30 rounded-full
        text-purple-300 bg-purple-500/5
        hover:bg-purple-500/15 hover:border-purple-400/50 hover:text-purple-200
        hover:shadow-[0_0_12px_rgba(124,58,237,0.3)]
        transition-all duration-300"
      aria-label={t('lang.switch', language)}
    >
      {t('lang.switch', language)}
    </button>
  )
}

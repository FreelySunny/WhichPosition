export type Locale = 'zh' | 'en'

type Messages = Record<string, string>

const zh: Messages = {
  'app.title': '今晚用什么姿势？',
  'app.subtitle': '随机抽取一个姿势',
  'app.draw': '抽 取',
  'app.drawing': '抽取中...',
  'app.candidates': '候选列表',
  'app.addCandidate': '添加候选',
  'app.addPlaceholder': '输入候选项...',
  'app.add': '添加',
  'app.clear': '清空全部',
  'app.clearConfirm': '确定要清空所有候选项吗？',
  'app.history': '抽取历史',
  'app.noHistory': '暂无抽取记录',
  'app.noCandidates': '暂无候选项，请先添加',
  'app.cannotDraw': '至少需要2个候选项才能抽取',
  'app.result': '抽取结果',
  'app.emptyInput': '请输入内容',
  'app.duplicate': '候选项已存在',
  'app.clearHistory': '清空历史',
  'app.importCandidates': '批量导入',
  'app.importPlaceholder': '每行一个候选项...',
  'app.importDone': '导入完成',
  'app.confirm': '确定',
  'app.cancel': '取消',
  'modal.title': '🎉 抽中啦！',
  'modal.congrats': '恭喜你抽中了 "{result}"',
  'modal.description.fallback': '命运选择了它，今晚就交给感觉吧！放松身心，尽情享受。',
  'modal.close': '知道了',
  'lang.switch': 'EN',
}

const en: Messages = {
  'app.title': 'Which Position Tonight?',
  'app.subtitle': 'Randomly pick a position',
  'app.draw': 'DRAW',
  'app.drawing': 'Drawing...',
  'app.candidates': 'Candidates',
  'app.addCandidate': 'Add Candidate',
  'app.addPlaceholder': 'Enter a candidate...',
  'app.add': 'Add',
  'app.clear': 'Clear All',
  'app.clearConfirm': 'Are you sure you want to clear all candidates?',
  'app.history': 'History',
  'app.noHistory': 'No records yet',
  'app.noCandidates': 'No candidates, please add some first',
  'app.cannotDraw': 'At least 2 candidates needed',
  'app.result': 'Result',
  'app.emptyInput': 'Please enter content',
  'app.duplicate': 'Candidate already exists',
  'app.clearHistory': 'Clear History',
  'app.importCandidates': 'Batch Import',
  'app.importPlaceholder': 'One candidate per line...',
  'app.importDone': 'Import complete',
  'app.confirm': 'Confirm',
  'app.cancel': 'Cancel',
  'modal.title': '🎉 You Got It!',
  'modal.congrats': 'The picker chose "{result}"',
  'modal.description.fallback': 'Fate has spoken! Go with the flow and enjoy the moment.',
  'modal.close': 'Got it',
  'lang.switch': '中文',
}

const messagesMap: Record<Locale, Messages> = { zh, en }

export function t(key: string, locale: Locale): string {
  return messagesMap[locale]?.[key] ?? key
}

# 🎰 WhichPosition

随机抽取今晚要使用的姿势网站。

## 🔗 在线使用

[WhichPosition](https://FreelySunny.github.io/WhichPosition/)

## 🚀 快速开始

```bash
npm install
npm run dev        # 开发服务器 → http://localhost:5173
npm run build      # 生产构建 → dist/
npm run preview    # 预览生产构建
```

## 🛠 技术栈

| 层    | 方案                                     |
| ---- | -------------------------------------- |
| 框架   | React 18 + TypeScript                  |
| 状态管理 | Zustand                                |
| 样式   | Tailwind CSS                           |
| 构建   | Vite                                   |
| 字体   | Google Fonts (Orbitron + Noto Sans SC) |
| 图标   | Lucide React                           |

## 📂 项目结构

```
src/
├── components/          # UI 组件
│   ├── PickerDisplay    # 老虎机卷轴视窗
│   ├── DrawButton       # 抽取按钮
│   ├── CandidateManager # 候选列表管理
│   ├── HistoryPanel     # 历史记录
│   ├── LanguageSwitcher # 语言切换
│   └── ResultModal      # 结果弹窗
├── hooks/
│   ├── usePickerStore   # Zustand 全局状态
│   └── usePicker        # 抽取动画引擎
├── data/
│   ├── candidates-zh    # 中文默认候选 + 描述
│   └── candidates-en    # 英文默认候选 + 描述
├── utils/
│   └── i18n             # 国际化翻译
└── pages/
    └── Home             # 主页面
```

## ⚙️ 数据自定义

编辑 `src/data/candidates-zh.ts` 和 `src/data/candidates-en.ts` 即可修改默认候选列表和对应描述文案。格式：

```typescript
{ name: "姿势名称", description: "抽取结果的具体描述" }
```

用户自定义的候选会在 localStorage 中持久化，语言切换时不会覆盖。

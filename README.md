# 🎰 WhichPosition

一个带有老虎机翻滚特效的随机抽取网站。按下按钮，卷轴旋转，停下来就是命运的选择。

## 🚀 快速开始

```bash
npm install
npm run dev        # 开发服务器 → http://localhost:5173
npm run build      # 生产构建 → dist/
npm run preview    # 预览生产构建
```

## ✨ 特性

- **🎰 老虎机翻滚动画** — requestAnimationFrame 驱动的五阶段物理仿真（加速 → 匀速 → 减速 → 着陆 → 结束），带运动模糊与缓出回弹
- **🌍 中英双语** — 自动检测浏览器语言，一键切换，全部 UI 文案 + 默认候选列表即时更新
- **📋 候选管理** — 增删改查 + 批量导入，数据通过 localStorage 持久化
- **📜 抽取历史** — 保留最近 20 条记录，可清空
- **🪟 结果弹窗** — 抽取结束后弹出模态框，展示对应专属描述文案，支持 4 种关闭方式
- **📱 响应式** — 桌面 / 平板 / 移动端自适应布局
- **🎨 Neo-Retro Arcade 设计** — 深色背景 + 霓虹紫/青色主色调 + 琥珀金高亮，Orbitron 科幻字体

## 🛠 技术栈

| 层 | 方案 |
|---|------|
| 框架 | React 18 + TypeScript |
| 状态管理 | Zustand |
| 样式 | Tailwind CSS |
| 构建 | Vite |
| 字体 | Google Fonts (Orbitron + Noto Sans SC) |
| 图标 | Lucide React |

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

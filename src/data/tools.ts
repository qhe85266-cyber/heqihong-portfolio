// 工具栈轮播数据。
export interface Tool {
  name: string
  category: string
  description: string
  isSample: boolean
  href?: string
}

export const tools: Tool[] = [
  {
    name: 'Grok Bot',
    category: 'AI 智能体 · xAI',
    description:
      'xAI 推出的"AI 队友"：Bot 能登录你的工具、像人一样操作网页和应用，把任务从头做到尾，需要时再回来找你确认。可以示范一次流程让它学成例程，多个 Bot 还能并行协作、持续积累上下文。',
    isSample: false,
    href: 'https://x.ai/bot',
  },
  {
    name: 'Muse',
    category: 'AI 智能体 · Meta',
    description: 'Meta 的个人 AI 智能体，帮助处理日常的各类任务，把零散事务交给 AI 完成。',
    isSample: false,
    href: 'https://ai.meta.com/muse',
  },
  {
    name: 'Gemini',
    category: '大模型 · Google',
    description: 'Google 的多模态大模型助手，支持长上下文、图文理解与深度研究，适合资料梳理和方案推演。',
    isSample: false,
    href: 'https://gemini.google.com',
  },
  {
    name: 'Pi',
    category: 'AI 编程 · 终端 Agent',
    description: '极简的终端编程智能体（agent harness），可自由切换模型、支持 Skills 与 AGENTS.md，能回溯和分支会话，按自己的工作流定制。',
    isSample: false,
    href: 'https://pi.dev',
  },
  { name: 'Cursor', category: 'AI 编程', description: 'AI 代码编辑器，用于快速搭建与迭代可运行的产品原型。', isSample: false },
  { name: 'ChatGPT / Claude', category: '大模型', description: '用于研究、写作、Prompt 设计与方案推演。', isSample: false },
  { name: 'Figma', category: '设计', description: '界面与交互设计、原型表达。', isSample: false },
  { name: 'Notion / 飞书', category: '协作', description: '文档沉淀、PRD 撰写与团队协作。', isSample: false },
]

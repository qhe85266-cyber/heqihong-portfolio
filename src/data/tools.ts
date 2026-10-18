// 工具栈轮播数据。以下为常见工具的占位示例，请按真实使用情况增删。
export interface Tool {
  name: string
  category: string
  description: string
  isSample: boolean
  href?: string
}

export const tools: Tool[] = [
  { name: 'Cursor', category: 'AI 编程', description: '说明待补充：你如何使用它构建与迭代原型。', isSample: true },
  { name: 'ChatGPT / Claude', category: '大模型', description: '说明待补充：在研究、写作与方案推演中的用法。', isSample: true },
  { name: 'Figma', category: '设计', description: '说明待补充：在界面与交互设计中的用法。', isSample: true },
  { name: 'Notion / 飞书', category: '协作', description: '说明待补充：知识沉淀与团队协作方式。', isSample: true },
  { name: 'Python / SQL', category: '数据', description: '说明待补充：数据分析与验证中的用法。', isSample: true },
]

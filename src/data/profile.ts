// 个人资料：所有首页与关于页文案集中在这里，后续补充真实内容只需修改本文件。
// 标记为 "待补充" 的字段表示尚无真实信息，页面会如实显示，而不会编造。

export const TBD = '待补充'

export const profile = {
  name: '何棋宏',
  role: 'AI产品经理',
  tagline: '让复杂的 AI，成为简单好用的产品。',
  siteTitle: '何棋宏 | AI产品经理',
  heroAside: ['产品研究', '交互设计', '原型验证'],
  // 首屏底部关键词条（能力关键词，不是客户 Logo）。可自由增删。
  keywords: [
    'AI 产品设计',
    '用户研究',
    '需求分析',
    '交互设计',
    '原型验证',
    '提示词工程',
    '数据分析',
    '产品增长',
  ],
  positioning: {
    title: '个人定位',
    statement: '让复杂的 AI，成为简单好用的产品。',
    intro: '个人介绍待补充：在这里写下你关注的问题、做事的方式，以及你想与谁一起做什么。',
    skills: ['AI 产品', '用户研究', '交互设计', '原型验证', '需求分析'],
  },
  about: {
    intro: [
      '个人介绍待补充：可以从你的背景、关注的 AI 产品方向、以及你如何做判断开始写。',
      '教育与工作经历待补充：请只填写真实、可核实的信息。',
    ],
    skills: ['AI 产品', '用户研究', '交互设计', '原型验证', '需求分析', '数据分析'],
    abilities: [
      {
        title: '理解问题',
        description: '说明待补充：描述你如何通过研究与访谈，把模糊的需求拆成清晰的问题。',
      },
      {
        title: '设计方案',
        description: '说明待补充：描述你如何把 AI 能力转化为用户能理解、愿意使用的产品体验。',
      },
      {
        title: '验证迭代',
        description: '说明待补充：描述你如何通过原型和数据验证假设，并持续迭代。',
      },
    ],
  },
  // 联系方式：只有填写了真实地址才会显示对应操作。
  // email 留空则页面显示“联系方式待补充”，不会生成假 mailto 或复制按钮。
  contact: {
    email: '' as string,
    socials: [] as { label: string; href: string }[],
    // 例：socials: [{ label: 'GitHub', href: 'https://github.com/your-name' }]
  },
}

export const navItems = [
  { label: '作品', hash: 'work' },
  { label: '思考', hash: 'research' },
  { label: '工具栈', hash: 'capabilities' },
  { label: '关于', hash: 'about' },
  { label: '联系', hash: 'contact' },
] as const

export const methodSteps = [
  { title: '发现问题', description: '通过研究与观察，找到真正值得解决的问题。' },
  { title: '设计方案', description: '把 AI 能力转化为清晰、可理解的产品体验。' },
  { title: '构建原型', description: '用最小可行的原型，尽早让想法可被体验。' },
  { title: '验证迭代', description: '用反馈与数据验证假设，持续打磨。' },
]

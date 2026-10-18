// 代表项目数据。以下全部为“示例 / 待替换”，不包含任何真实成果或数字。
// 替换时：修改字段内容并把 isSample 设为 false；没有的外链请删除对应字段（页面不会显示空按钮）。

export interface ProjectLink {
  label: string
  href: string
  kind: 'demo' | 'source' | 'download' | 'other'
}

export interface Project {
  slug: string
  title: string
  category: string
  problem: string
  role: string
  result: string
  isSample: boolean
  /** 封面渐变色（无真实封面图时使用）；有真实图片时设置 cover。 */
  coverTone: [string, string]
  cover?: { src: string; alt: string; width: number; height: number }
  overview: string
  goals: string[]
  contribution: string[]
  process: { title: string; description: string }[]
  screenshots: { label: string; src?: string; alt?: string }[]
  validation: string
  limitations: string[]
  links?: ProjectLink[]
}

export const projects: Project[] = [
  {
    slug: 'sample-ai-assistant',
    title: '示例项目 A：AI 助手产品',
    category: 'AI 产品 · 示例',
    problem: '示例：用户不知道如何向 AI 提出有效问题，导致使用门槛高、结果不稳定。',
    role: '产品负责人（示例，待替换）',
    result: '结果待补充（请填写真实的验证结论，勿使用未经证实的数字）。',
    isSample: true,
    coverTone: ['#1d3a8a', '#956BFF'],
    overview:
      '这是一个用于展示详情页结构的示例模板。请把此处替换为项目背景、目标用户和你所处的场景，用 2–3 句话讲清楚这个项目是什么。',
    goals: ['示例目标：降低首次使用 AI 的门槛', '示例目标：让输出结果更可预期', '示例目标：建立可验证的体验指标'],
    contribution: ['示例：定义问题与产品范围', '示例：设计核心交互流程', '示例：搭建可交互原型并组织测试'],
    process: [
      { title: '发现', description: '示例：访谈与观察，整理用户的主要障碍。' },
      { title: '设计', description: '示例：梳理关键流程，确定信息架构与交互。' },
      { title: '原型', description: '示例：搭建可点击原型，快速验证关键假设。' },
      { title: '迭代', description: '示例：根据反馈调整方案，记录取舍。' },
    ],
    screenshots: [{ label: '截图占位 1（待替换）' }, { label: '截图占位 2（待替换）' }],
    validation: '验证说明待补充：请描述你如何验证方案、得到了什么结论。没有真实数据时请保持留空。',
    limitations: ['示例：样本量有限，结论仅供参考', '示例：部分场景尚未覆盖'],
  },
  {
    slug: 'sample-workflow-tool',
    title: '示例项目 B：工作流自动化工具',
    category: '工具 · 示例',
    problem: '示例：重复性的信息整理工作耗时，且容易出错。',
    role: '产品与原型设计（示例，待替换）',
    result: '结果待补充。',
    isSample: true,
    coverTone: ['#0e5c7a', '#69D5FF'],
    overview: '示例项目，用于展示作品卡片与详情页的第二种内容形态。请替换为真实项目。',
    goals: ['示例目标：减少重复操作', '示例目标：让流程可视化'],
    contribution: ['示例：梳理流程', '示例：设计交互与原型'],
    process: [
      { title: '发现', description: '示例描述。' },
      { title: '设计', description: '示例描述。' },
      { title: '原型', description: '示例描述。' },
      { title: '迭代', description: '示例描述。' },
    ],
    screenshots: [{ label: '截图占位（待替换）' }],
    validation: '验证说明待补充。',
    limitations: ['示例：待补充'],
  },
  {
    slug: 'sample-research-product',
    title: '示例项目 C：用户研究平台',
    category: '研究 · 示例',
    problem: '示例：研究资料分散，难以沉淀成可复用的洞察。',
    role: '产品研究（示例，待替换）',
    result: '结果待补充。',
    isSample: true,
    coverTone: ['#3b1d7a', '#c04ad6'],
    overview: '示例项目，用于展示作品列表的多个卡片。请替换为真实项目。',
    goals: ['示例目标：沉淀洞察', '示例目标：便于检索与复用'],
    contribution: ['示例：研究框架设计', '示例：信息架构'],
    process: [
      { title: '发现', description: '示例描述。' },
      { title: '设计', description: '示例描述。' },
      { title: '原型', description: '示例描述。' },
      { title: '迭代', description: '示例描述。' },
    ],
    screenshots: [{ label: '截图占位（待替换）' }],
    validation: '验证说明待补充。',
    limitations: ['示例：待补充'],
  },
]

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)

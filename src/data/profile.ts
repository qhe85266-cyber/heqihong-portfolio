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
    intro:
      '我的 AI 产品经历覆盖多模态生成（百度曦灵数字人）、智能体平台（字节 Coze）与跨境电商 SaaS 的 AI 落地（领星：多模态商品内容工作台、RAG 智能支持助手）。我擅长的不是"接一个大模型"，而是把模型的不确定性拆成可定义、可评测、可兜底的产品问题，再用评测和对照证明它真的变好了。',
    skills: ['AI 评测与失败样本归因', 'RAG 与知识库设计', '多模态内容生成', 'Agent / Function Calling', 'Prompt 工程', 'PRD 与验收标准'],
  },
  about: {
    intro: [
      '我是何棋宏，AI 产品经理。我在 AI 产品的几个关键位置上都做过事：在百度做"模型输出好不好"的评测与反馈，在 Coze 做"模型能不能正确调用工具"的平台能力，在领星做"模型能不能真正进入业务流程"的落地——让 AI 生成可以直接上架的商品内容，让知识库回答用户的真实问题。',
      '这让我形成一个判断：AI 产品的核心竞争力，往往不在模型本身，而在模型之外——问题如何定义、生成如何被事实约束、失败如何被发现、答不了时如何交给人。',
      '工作之外，我习惯亲手把想法做成可运行的 Demo，作品区的项目都是这样来的。',
    ],
    skills: ['AI 产品', '评测体系', 'RAG', '多模态生成', 'Agent 设计', 'Prompt 工程'],
    facts: [
      { label: '经历', value: '百度 · 字节跳动 · 领星' },
      { label: '方向', value: '多模态 · 智能体 · RAG' },
      { label: '城市', value: '广州 / 深圳' },
    ],
    abilities: [
      { title: '定义问题', description: '把"效果不好"拆成可分类、可评测的质量维度，先确定"怎样算好"，再讨论怎么做。' },
      { title: '设计边界', description: '清楚哪些交给模型生成与理解，哪些由商品事实、知识库与 Schema 兜底；答不了的问题，及时带着上下文转给人。' },
      { title: '用评测闭环', description: '评测集先行、前后对照验证，上线后结合真实反馈持续优化，在质量、时延与成本之间找到平衡。' },
    ],
  },
  // 联系方式：只有填写了真实信息才会显示对应操作。
  contact: {
    email: 'q807135203@163.com' as string,
    phone: '18926603771',
    socials: [{ label: 'heqihong.com', href: 'https://heqihong.com' }] as { label: string; href: string }[],
  },
}

export const navItems = [
  { label: '经历', hash: 'experience' },
  { label: '作品', hash: 'work' },
  { label: '思考', hash: 'research' },
  { label: '工具栈', hash: 'capabilities' },
  { label: '关于', hash: 'about' },
  { label: '联系', hash: 'contact' },
] as const

export interface MethodStep {
  title: string
  principle: string
  description: string
  evidence: { company: string; text: string }[]
}

export const methodSteps: MethodStep[] = [
  {
    title: '拆解失败样本',
    principle: '先定义"坏"，才能定义"好"',
    description: '模型问题往往很模糊。我先把失败样本分类、命名、找出发生在哪个环节，让问题变得可标注、可评测、可分工。',
    evidence: [
      { company: '百度', text: '口型问题四分类，配合时间轴标记与结构化反馈' },
      { company: 'Coze', text: '参数缺失、提取错误、跨轮遗漏三类场景复盘' },
      { company: '领星', text: '事实准确、外观一致、图文一致分维度评测' },
    ],
  },
  {
    title: '划定模型边界',
    principle: '模型负责表达，事实负责底线',
    description: '不把所有事交给 LLM。语义理解与内容生成交给模型，事实、知识与参数校验交给约束和规则，答不了的交给人。',
    evidence: [
      { company: 'Coze', text: '基于参数 Schema 校验，再决定是否追问' },
      { company: '领星', text: '以商品事实和原图约束生成，不编造卖点' },
      { company: '领星', text: '明确回答范围，答不了附摘要转人工' },
    ],
  },
  {
    title: '评测集先行',
    principle: '没有测试集的优化都是感觉',
    description: '方案落地前先建专项评测集，覆盖边界场景，用不同方案的对比实验做决策，而不是凭单个样例判断。',
    evidence: [
      { company: '百度', text: '语速、数字、停顿等场景专项验证' },
      { company: 'Coze', text: '跨轮补充等场景对比不同 Prompt 方案' },
      { company: '领星', text: '分场景评测集，围绕正确性、引用与解决率迭代' },
    ],
  },
  {
    title: '反馈闭环',
    principle: '上线是开始，不是结束',
    description: '选对能反映用户价值的指标，用前后对照证明效果，再把真实反馈回流为新的策略、知识与 Prompt。',
    evidence: [
      { company: '百度', text: '跟踪提交、修复到复测的完整状态' },
      { company: 'Coze', text: '前后对照验证参数补全效果' },
      { company: '领星', text: '结合审核反馈平衡质量、时延与成本' },
    ],
  },
]

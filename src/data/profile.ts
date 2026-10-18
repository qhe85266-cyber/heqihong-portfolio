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
      '三段 AI 产品经历，覆盖多模态生成（百度曦灵数字人）、智能体平台（字节 Coze）与垂直行业 Agent（晓多 AI 营销）。我擅长的不是"接一个大模型"，而是把模型的不确定性拆成可定义、可评测、可兜底的产品问题——再用数据证明它变好了。',
    skills: ['AI 评测与 Bad Case 归因', 'Agent / Function Calling', 'LLM + 规则协同', 'Prompt 工程', 'A/B 测试', 'PRD 与验收标准'],
  },
  about: {
    intro: [
      '我是何棋宏，AI 产品经理。过去三年，我分别站在 AI 产品的三个位置上：在百度做"模型输出好不好"的评测，在 Coze 做"模型能不能正确调用工具"的平台能力，在晓多做"模型能不能带来生意"的行业落地。',
      '这让我形成一个判断：AI 产品的核心竞争力，往往不在模型本身，而在模型之外——问题如何定义、失败如何被发现、风险如何被兜住、效果如何被证明。',
      '工作之外，我习惯亲手把想法做成可运行的 Demo，作品区的 7 个项目都是这样来的。',
    ],
    skills: ['AI 产品', '评测体系', 'Agent 设计', 'Prompt 工程', '数据分析', '原型验证'],
    facts: [
      { label: '经历', value: '百度 · 字节跳动 · 晓多科技' },
      { label: '方向', value: '多模态 · 智能体 · 行业 Agent' },
      { label: '城市', value: '广州 / 深圳' },
    ],
    abilities: [
      { title: '定义问题', description: '把"效果不好"拆成可分类、可标注的 Bad Case，先确定"怎样算好"，再讨论怎么做。' },
      { title: '设计边界', description: '清楚哪些交给模型判断、哪些交给规则与 Schema 兜底，在体验与风险之间做取舍。' },
      { title: '用数据闭环', description: '评测集先行、A/B 对照验证，上线后持续跟踪指标并回流优化 Prompt 与规则。' },
    ],
  },
  // 联系方式：只有填写了真实信息才会显示对应操作。
  contact: {
    email: '' as string,
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
    title: '拆解 Bad Case',
    principle: '先定义"坏"，才能定义"好"',
    description: '模型问题往往很模糊。我先把失败样本分类、命名、找出发生在哪个环节，让问题变得可标注、可统计、可分工。',
    evidence: [
      { company: '百度', text: '口型问题四分类，划清 TTS / 唇形驱动 / 渲染排查边界' },
      { company: 'Coze', text: '参数缺失、提取错误、多轮遗漏三类场景归因' },
      { company: '晓多', text: '误触达、重复触达 Bad Case 归因并调阈值' },
    ],
  },
  {
    title: '划定模型边界',
    principle: '模型负责理解，规则负责底线',
    description: '不把所有事交给 LLM。语义理解交给模型，确定性校验、频控与合规交给规则或 Schema，用结构兜住不确定性。',
    evidence: [
      { company: 'Coze', text: '基于参数 Schema 的三态校验，再决定是否追问' },
      { company: '晓多', text: 'LLM 意图识别 + 规则引擎频控，杜绝虚构优惠' },
    ],
  },
  {
    title: '评测集先行',
    principle: '没有测试集的优化都是感觉',
    description: '方案落地前先建专项测试集，覆盖边界场景，用多版本 Prompt 对比实验做决策，而不是凭单个样例判断。',
    evidence: [
      { company: '百度', text: '语速、数字、英文缩写、停顿专项评测' },
      { company: 'Coze', text: '单/多参数缺失、跨轮补充、主动取消测试集' },
      { company: '晓多', text: '典型触达场景用例，多版本 Prompt 对比' },
    ],
  },
  {
    title: '指标闭环',
    principle: '上线是开始，不是结束',
    description: '选对能反映用户价值的指标，用 A/B 或前后对照证明效果，再把线上反馈回流为新的规则与 Prompt。',
    evidence: [
      { company: '百度', text: '跟踪定位耗时、反馈完整率、复测通过率' },
      { company: 'Coze', text: '前后对照参数补全成功率与任务完成率' },
      { company: '晓多', text: 'A/B 对照人工规则，跟踪转化、采纳与人工修改率' },
    ],
  },
]

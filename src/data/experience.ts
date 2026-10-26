// 个人经历：依据简历整理。数字只使用简历中的数据，目标值用 target 标注，页面会显示“目标”。
// 客户只写泛称（如“大型跨境品牌”），不出现具体客户名称。

export type OutcomeGroup = '客户价值' | 'AI 质量' | '商业经营' | '能力沉淀'

export interface Outcome {
  group: OutcomeGroup
  /** 数字结果；没有数字时只展示文字 */
  value?: string
  label: string
  /** 目标值，而非已达成的结果 */
  target?: boolean
}

export interface Experience {
  id: string
  company: string
  product: string
  role: string
  period: string
  city: string
  project: string
  /** 客户、商业模式等案例信息 */
  meta?: { label: string; value: string }[]
  /** 一句话：面试官最该记住的东西 */
  headline: string
  context: string
  /** 关键判断：我把问题定义成了什么 */
  insight: string
  stages: { title: string; body: string }[]
  outcomes: Outcome[]
  skills: string[]
}

export const experiences: Experience[] = [
  {
    id: 'lingxing-content',
    company: '领星',
    product: '多模态商品内容定制工作台',
    role: 'AI 产品经理',
    period: '2025.07 — 2026.09',
    city: '深圳',
    project: '面向大型品牌的多模态商品内容定制工作台',
    meta: [
      { label: '客户', value: '使用领星 ERP 的大型跨境品牌' },
      { label: '模式', value: '单独收费的 AI 增值服务' },
    ],
    headline: '把“AI 能生成”，做成品牌愿意单独付费的内容服务。',
    context:
      '大型跨境品牌上新时，商品文案、营销图与多语言内容要在多个工具和多轮修改之间来回流转。我负责一款面向使用领星 ERP 的大型品牌、单独收费的多模态商品内容定制工作台，从需求筛选、方案设计，到定价、交付与增购。',
    insight:
      '客户买的不是“生成”，而是“可以直接用的合格内容”。所以先锁定商品事实与参考图再生成；同时把标准功能、专属配置与变更范围写进服务边界，按实施、运维、算力和人工审核投入定价——既做得出来，也交付得起。',
    stages: [
      {
        title: '需求与方案',
        body: '拆解商品文案、营销图与多语言内容的生产流程，筛选需求，定义试点范围与验收标准；区分标准能力、会员基线定制与客户专属配置的边界。',
      },
      {
        title: 'AI 方案',
        body: '用 LangGraph 编排事实核查、图文生成、局部修改与审核节点；以商品事实与参考图约束生成，配合 Prompt 模板与模型路由平衡质量和成本。',
      },
      {
        title: '服务与定价',
        body: '按类目、站点与流程复杂度设计服务与报价；写清标准功能、专属配置、变更范围与会员权益，把实施、运维、算力、重试、人工审核与修改投入计入成本。',
      },
      {
        title: '交付与增购',
        body: '推进样例确认、灰度交付、培训与验收，跟踪采纳，承接新需求并推动增购；离线评测覆盖事实准确、商品保真与图文一致。',
      },
    ],
    outcomes: [
      { group: '客户价值', value: '90 → 20 分钟', label: '商品内容制作时长，缩短约 78%' },
      { group: '客户价值', value: '−30%', label: '合格内容综合成本' },
      { group: 'AI 质量', value: '80%', label: '首轮可用率', target: true },
      { group: '商业经营', value: '−35%', label: '单位合格内容模型成本（较首版 AI 方案）' },
      { group: '商业经营', value: '−20%', label: '同范围直接交付成本' },
    ],
    skills: ['需求筛选与拆解', '服务边界与定价', 'LangGraph 编排', '模型路由', '离线评测', '交付与增购'],
  },
  {
    id: 'lingxing-rag',
    company: '领星',
    product: '企业知识与业务 SOP 助手',
    role: 'AI 产品经理',
    period: '2025.07 — 2026.09',
    city: '深圳',
    project: '基于 RAG 的企业知识与业务 SOP 助手',
    meta: [
      { label: '客户', value: '业务复杂的 ERP 企业客户' },
      { label: '模式', value: '知识整理 + 部署配置 + 持续维护' },
    ],
    headline: '让知识助手成为一项能验收、能维护、会续费的服务。',
    context:
      '业务复杂的 ERP 客户，运营、采购、售后各有一套流程；ERP 手册、制度与业务案例分散在各处，员工遇到问题往往只能找人问。我负责基于 RAG 的企业知识与业务 SOP 助手，从流程梳理、方案设计到服务定价与续费。',
    insight:
      '知识助手难的不是“能回答”，而是“答得对、有出处、能持续维护”。先梳理业务流程与知识归属，再做检索；把知识整理、部署配置与持续维护分别定价，写清验收与培训、服务额度、知识更新责任与扩展边界。',
    stages: [
      {
        title: '流程与知识',
        body: '梳理运营、采购、售后流程，整合 ERP 手册、制度与业务案例，建立知识分类与更新责任。',
      },
      {
        title: 'RAG 方案',
        body: '混合检索与重排序、引用溯源、按组织与角色控制权限；问题不清楚时追问，知识冲突时提示，答不了时生成摘要转人工。',
      },
      {
        title: '服务与定价',
        body: '知识整理、部署配置与持续维护分别定价；约定验收与培训、服务额度、知识更新责任与扩展边界。',
      },
      {
        title: '评测与续费',
        body: '跟踪回答正确率、引用有效率、问题解决率、维护投入、采纳与续费，持续迭代知识覆盖与检索策略。',
      },
    ],
    outcomes: [
      { group: '客户价值', value: '18 → 12 分钟', label: '转人工后的处理时长' },
      { group: '客户价值', value: '65%', label: '问题自助解决率', target: true },
      { group: 'AI 质量', value: '93%', label: 'ERP 咨询评测准确率' },
      { group: 'AI 质量', value: '95%', label: '引用有效率' },
      { group: '商业经营', value: '30%', label: '验收后三个月内新增 AI 服务的客户占比', target: true },
    ],
    skills: ['RAG', '混合检索与重排序', '权限与引用溯源', '知识治理', '服务定价', '人机协同'],
  },
  {
    id: 'coze',
    company: '字节跳动',
    product: 'Coze 扣子',
    role: 'AI 产品经理实习生',
    period: '2024.06 — 2025.03',
    city: '广州',
    project: '插件必填参数缺失场景下的智能追问优化',
    meta: [{ label: '场景', value: '智能体调用插件' }],
    headline: '在调用插件之前，先判断“信息够不够”。',
    context:
      'Coze 智能体调用插件时，需要从对话中提取必填参数；用户信息不完整时，会出现无效调用或反复追问，影响使用体验。',
    insight:
      '把“模型提取失败”拆成参数缺失、类型错误与上下文遗漏三类问题：先基于参数 Schema 校验，确实缺失时才用自然语言追问，并优先复用历史对话里已经给出的信息，用户补充后再次校验。',
    stages: [
      { title: '问题拆解', body: '拆解参数缺失、类型错误与上下文遗漏三类失败，明确参数校验与追问的完整流程。' },
      { title: '方案设计', body: '设计 Schema 校验、多轮追问、历史信息复用，以及用户补充后再次校验的完整流程。' },
      { title: '验证复盘', body: '验证方案效果，对失败样本逐一归因，确定下一步的优化方向。' },
    ],
    outcomes: [{ group: 'AI 质量', value: '75% → 82%', label: '插件必填参数补全成功率，提升 7 个百分点' }],
    skills: ['Function Calling', 'Schema 校验', '多轮对话设计', '失败样本分析'],
  },
  {
    id: 'baidu',
    company: '百度',
    product: '需求分析与模型评测',
    role: 'AI 产品助理实习生',
    period: '2023.06 — 2023.09',
    city: '广州',
    project: '需求分析、PRD 与模型评测',
    headline: '先定义“怎样算好”，再讨论怎么做。',
    context: '参与需求分析与竞品研究，撰写 PRD、梳理产品流程，并参与制定验收标准与测试样本。',
    insight:
      '模型效果不能只凭感觉评价。把“好”拆成准确性、完整性、相关性等可评测的维度，配合测试样本与验收标准，产品、算法与研发才能对齐同一个目标。',
    stages: [
      { title: '需求与竞品', body: '参与需求分析与竞品研究，梳理用户场景与功能差异。' },
      { title: 'PRD 与流程', body: '撰写 PRD、梳理产品流程，明确功能边界与验收标准。' },
      { title: '样本与评测', body: '整理测试样本，从准确性、完整性与相关性评估模型输出。' },
    ],
    outcomes: [
      { group: '能力沉淀', label: '需求分析、竞品研究与 PRD 撰写' },
      { group: '能力沉淀', label: '验收标准与测试样本设计' },
      { group: '能力沉淀', label: '模型准确性、完整性与相关性评测' },
    ],
    skills: ['需求分析', '竞品研究', 'PRD 与验收标准', '模型评测'],
  },
]

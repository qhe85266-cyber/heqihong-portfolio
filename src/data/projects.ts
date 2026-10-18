// 代表项目数据。文案依据各 GitHub 仓库 README 与用户提供的项目说明整理，
// 不包含未经核实的上线状态、用户规模或效率数字。

export interface ProjectLink {
  label: string
  href: string
  kind: 'demo' | 'source' | 'download' | 'other'
}

export interface Project {
  slug: string
  title: string
  /** 英文名，用于封面排版 */
  nameEn: string
  /** 一句话主张，用于封面 */
  tagline: string
  /** 一句话说清：谁、在什么场景、遇到什么问题、它怎么帮忙 */
  pitch: string
  category: string
  problem: string
  role: string
  result: string
  isSample: boolean
  /** 封面主色 / 辅色 */
  coverTone: [string, string]
  cover?: { src: string; alt: string; width: number; height: number; position?: string }
  /** 封面图本身已含标题排版时为 true，不再叠加文字 */
  coverHasText?: boolean
  overview: string
  goals: string[]
  contribution: string[]
  process: { title: string; description: string }[]
  screenshots: { label: string; src?: string; alt?: string }[]
  validation: string
  limitations: string[]
  links?: ProjectLink[]
}

const gh = (repo: string): ProjectLink => ({
  label: 'GitHub 源码',
  href: `https://github.com/qhe85266-cyber/${repo}`,
  kind: 'source',
})
const img = (file: string, alt: string, position?: string) => ({
  src: `/images/projects/${file}`,
  alt,
  width: 1280,
  height: 853,
  position,
})

export const projects: Project[] = [
  {
    slug: 'zhangxiaoge',
    pitch: '社区居民想报名 AI 夜校却不知道学什么、怎么报——问章小阁一句，就能得到课程推荐和报名步骤。',
    title: '章小阁',
    nameEn: 'Zhang Xiaoge',
    tagline: '社区 AI 夜校智能客服',
    category: 'AI 智能客服 · 对话体验',
    problem: '社区 AI 夜校的居民咨询集中在课程内容、报名方式与上课地点，重复问题多，信息分散，居民不易快速找到答案。',
    role: '智能客服模块的设计与搭建（对话流程、快捷提问、界面原型）',
    result: '完成可交互的智能客服 Demo，把课程咨询、报名指引与常见问题整合进一个对话入口。',
    isSample: false,
    coverTone: ['#1f5a3c', '#f2a65a'],
    cover: { src: '/images/projects/zhangxiaoge.png', alt: '章小阁社区 AI 夜校智能客服概念展示图', width: 1672, height: 941 },
    coverHasText: true,
    overview:
      '面向章阁社区 AI 夜校，设计并搭建「章小阁」智能客服 Demo，将课程咨询、报名指引与常见问题整合为对话式入口，探索 AI 在社区服务中的落地方式。',
    goals: ['让居民用一句话就能问到课程与报名信息', '用快捷提问降低零基础居民的提问门槛', '用亲切的角色形象拉近社区服务的距离'],
    contribution: [
      '梳理课程、报名、上课地点等高频咨询问题',
      '设计快捷提问入口与对话引导（AI 办公 / AI 设计 / AI 视频）',
      '设计「章小阁」角色形象与对话界面，完成可交互原型',
    ],
    process: [
      { title: '梳理场景', description: '从居民视角整理咨询问题，按课程、报名、常见问题归类。' },
      { title: '设计对话', description: '设计欢迎语、快捷提问和多轮引导，让零基础用户也能开口问。' },
      { title: '搭建原型', description: '基于对话式 AI 平台搭建客服，并嵌入夜校网站。' },
      { title: '呈现与复盘', description: '整理界面与示例对话，记录尚待验证的问答效果。' },
    ],
    screenshots: [],
    validation: '已完成可交互 Demo 与界面展示。自由问答的准确性、平台内部配置效果尚未系统验证，因此不声称上线规模或准确率。',
    limitations: ['展示图为概念呈现，非真实产品截图', '个人贡献范围为客服模块，不包括整站制作', '自由问答效果待进一步测试'],
    links: [{ label: '在线体验', href: 'https://494b836b7a9c48dfaf105e9b30e97ba4.app.workbuddy.host/#home', kind: 'demo' }],
  },
  {
    slug: 'xunlan-ai',
    pitch: 'AI 产品经理每天被海量重复资讯淹没——讯澜 AI 把同一事件归到一起、配上中文摘要，十分钟看完当天要点。',
    title: '讯澜 AI',
    nameEn: 'Xunlan AI',
    tagline: '从信息浪潮里，看清产品动向',
    category: 'AI 资讯 · 信息聚合',
    problem: 'AI 产品经理每天要在大量信源间来回切换，同一事件被反复报道，筛选与整理耗费大量时间。',
    role: '产品定制与品牌重塑（信源扩充、命名、视觉、文档）',
    result: '形成面向 AI 产品经理的资讯聚合与日报演示，新增 9 个产品与 AI 应用相关信源。',
    isSample: false,
    coverTone: ['#0d2a33', '#5fd4d0'],
    cover: img('xunlan-ai-news.jpg', '讯澜 AI 品牌插图：信息流经棱镜后变为清晰卡片', '40% 50%'),
    overview:
      '基于开源项目 AIHOT 改编，面向 AI 产品经理的资讯聚合与日报演示。通过筛选、评分、中文摘要与事件归组，让同一事件的报道集中阅读，减少重复浏览与手工整理。',
    goals: ['把分散信源收拢到一处', '同一事件只读一次', '提供日报、主题与搜索等多种阅读方式'],
    contribution: [
      '新增 9 个与产品管理、AI 应用相关的信息源',
      '完成「讯澜 AI」命名、字标、图标与原创品牌封面',
      '重写 README，移除上游宣传内容，保留许可与 MCP 接入兼容',
    ],
    process: [
      { title: '选型', description: '评估开源资讯框架，选择具备事件归组与摘要能力的 AIHOT。' },
      { title: '信源', description: '围绕产品经理关注点补充信源，保留原有业务流程。' },
      { title: '品牌', description: '统一站名、导航字标、元信息与抓取标识。' },
      { title: '文档', description: '重写说明，明确来源、许可与能力边界。' },
    ],
    screenshots: [],
    validation: '能力来自开源框架与本仓库配置；内容质量、在线采集与模型调用需部署后单独验证。',
    limitations: ['引擎与大量源码由上游提供（MIT）', '历史截图可能仍显示旧站名', '不代表 AIHOT 官方服务'],
    links: [gh('xunlan-ai-news')],
  },
  {
    slug: 'yunjian-profile',
    pitch: '想要个人主页却不会搭网站——改几行文字、直接打开文件，就有一张可分享的个人名片。',
    title: '云笺名片',
    nameEn: 'Yunjian Profile',
    tagline: '一张轻量名片，连接想法与合作',
    category: '个人主页 · 静态模板',
    problem: '想快速拥有一个个人主页，但不想引入框架和构建流程。',
    role: '模板定制与品牌视觉',
    result: '一个打开 index.html 即可浏览的个人名片模板，包含介绍、技能、联系方式与主题切换。',
    isSample: false,
    coverTone: ['#3a3f5c', '#c9b8ff'],
    cover: img('yunjian-profile.jpg', '云笺名片品牌插图'),
    overview: '用 HTML、CSS 与 JavaScript 编写的静态个人名片模板，零依赖、即开即用，适合快速搭建个人主页。',
    goals: ['零构建、直接打开即可使用', '内容结构清晰：介绍、技能、联系', '支持明暗主题切换'],
    contribution: ['设计品牌插图与独立 SVG 图标', '整理页面结构与主题切换', '编写品牌更新记录'],
    process: [
      { title: '结构', description: '确定名片的三段式信息结构。' },
      { title: '视觉', description: '生成品牌插图，绘制独立 SVG 图标。' },
      { title: '交互', description: '实现主题切换，保证静态可用。' },
    ],
    screenshots: [],
    validation: '本地直接打开 index.html 可浏览全部内容。',
    limitations: ['示例邮箱需使用者自行填写', '保留原有许可证与版权声明，未知上游不作原创代码声明'],
    links: [gh('yunjian-profile')],
  },
  {
    slug: 'chudian-marketing',
    pitch: '营销运营在手机上做活动要来回切多个系统——触点营销把圈人群、定方案、走审批、看数据串成一条流程。',
    title: '触点营销',
    nameEn: 'Chudian Marketing',
    tagline: '人群、方案、审批与数据的 iOS 演示',
    category: 'iOS · SwiftUI · 营销流程',
    problem: '智能营销产品流程长、模块多，需要一个可点击的原生演示，让团队并行补充各模块。',
    role: '演示工程搭建与品牌定制',
    result: '建立人群、方案、发送审批、数据四大模块的 iPhone 演示骨架，人群模块支持本地编辑。',
    isSample: false,
    coverTone: ['#3b1d4a', '#ff8fb1'],
    cover: img('chudian-marketing-ios.jpg', '触点营销品牌插图'),
    overview:
      '基于 SwiftUI 的 iOS 营销流程演示，覆盖人群管理、营销方案、发送审批与数据模块。纯系统框架实现，无第三方依赖与网络请求，便于多人协作补全。',
    goals: ['让营销全流程可点击演示', '四个模块可由不同开发者并行推进', '共享会话、版本快照与统一重置'],
    contribution: ['搭建四模块首页与详情占位页骨架', '实现人群模块可编辑的本地演示', '完成命名、图标与封面品牌更新'],
    process: [
      { title: '骨架', description: '按模块拆分页面，建立共享 Scheme 与工程结构。' },
      { title: '人群', description: '接入 DemoSession 与版本快照，实现本地编辑。' },
      { title: '品牌', description: '更新显示名称「触点营销」、图标与封面。' },
    ],
    screenshots: [],
    validation: 'Simulator SDK 构建通过，纯逻辑检查通过；UI 运行验收尚未完成。',
    limitations: ['尚未接入真实发送与 AI 服务', '方案、审批、数据模块仍为只读骨架'],
    links: [gh('chudian-marketing-ios')],
  },
  {
    slug: 'tulan-diagram-editor',
    pitch: '画流程图拖拽连线太费时，英文工具又难上手——在图澜里用中文界面写几行文字，就能自动生成图表并导出。',
    title: '图澜编辑器',
    nameEn: 'Tulan Diagrams',
    tagline: '用文字梳理图表',
    category: '工具 · 图表 · 本地化',
    problem: 'Mermaid 在线编辑器功能完整，但默认英文界面，且依赖在线服务，中文用户上手成本高。',
    role: '中文本地化与品牌定制',
    result: '本地一键运行的中文版 Mermaid 编辑器，支持实时预览、深浅主题与 PNG/SVG 导出。',
    isSample: false,
    coverTone: ['#123047', '#7cc4ff'],
    cover: img('tulan-diagram-editor.jpg', '图澜编辑器品牌插图'),
    overview: '基于 Mermaid Live Editor 改编的简体中文图表工具：左侧写文字，右侧即时出图，让流程与结构更易表达。',
    goals: ['中文用户零门槛上手', '本地运行、不依赖外网', '保留导出与主题能力'],
    contribution: ['汉化菜单、按钮、导出等主要界面文案', '整理 zh-cn.patch 便于对照与还原', '完成图澜品牌与封面'],
    process: [
      { title: '本地化', description: '集中修改界面组件文案，不改变渲染逻辑。' },
      { title: '补丁', description: '输出上游 develop 到中文版的完整差异。' },
      { title: '品牌', description: '设计封面插图，撰写品牌说明。' },
    ],
    screenshots: [],
    validation: 'pnpm install 后可在本地开发服务器预览与构建。',
    limitations: ['上游为 mermaid-js/mermaid-live-editor（MIT）', '封面为插图，非运行截图'],
    links: [gh('tulan-diagram-editor')],
  },
  {
    slug: 'zhilan-notes',
    pitch: '想用笔记沉淀知识却总是记完就忘——知澜笔记带新手用中文 Logseq 把日记、关联和复习串起来。',
    title: '知澜笔记',
    nameEn: 'Zhilan Notes',
    tagline: '把日记、引用和复习接成一条线',
    category: '知识管理 · Logseq',
    problem: '想搭建本地知识库，却被英文界面与复杂配置劝退，日记、双链、标签与复习难以串联。',
    role: '入门配套设计与文档编写',
    result: '一套 Logseq 中文入门配套：启动脚本、中文设置、操作指南与验收图谱。',
    isSample: false,
    coverTone: ['#1d3b36', '#9be3c4'],
    cover: img('zhilan-notes-kit.jpg', '知澜笔记品牌插图'),
    overview: '面向中文用户的 Logseq 本地知识库入门配套，串联日记、双链、标签与复习清单，默认中文界面。',
    goals: ['一键启动，降低安装门槛', '用中文指南讲清核心工作流', '提供可复现的验收样例'],
    contribution: ['编写启动脚本与中文使用说明', '整理验收图谱备份与截图', '撰写本机运行方案摘录'],
    process: [
      { title: '方案', description: '比较官方桌面包，确定本机运行方式。' },
      { title: '配套', description: '编写启动脚本与中文设置说明。' },
      { title: '验收', description: '用测试图谱跑通日记、双链、标签、复习。' },
    ],
    screenshots: [],
    validation: '附带验收图谱与中文界面截图，可按指南复现。',
    limitations: ['不分发 Logseq 安装包，需从官方获取', '数据库版功能可能仍为 Beta'],
    links: [gh('zhilan-notes-kit')],
  },
  {
    slug: 'jinglan-insight',
    pitch: '做竞品分析要翻大量网页、结论还找不到出处——输入竞品名，竞澜研究自动生成带来源的对比报告。',
    title: '竞澜研究',
    nameEn: 'Jinglan Insight',
    tagline: '从竞品资料到可核实的对比线索',
    category: 'AI Agent · 竞品调研',
    problem: '竞品调研需要手动搜集大量公开资料，结论常缺少出处，难以核实。',
    role: '产品设计与开发（输入校验、证据匹配、报告输出）',
    result: '本地单页竞品调研工具：输入主题与 2–3 个竞品，输出带来源的三维度对比报告，可下载 Markdown。',
    isSample: false,
    coverTone: ['#1c2a52', '#e8b45a'],
    cover: img('jinglan-insight-agent.jpg', '竞澜研究品牌插图：放大镜审视三份竞品卡片'),
    overview:
      '结合 Streamlit、GPT Researcher 与 DeepSeek 的竞品调研工具。围绕产品定位与功能、定价与商业模式、差异化特点三个维度整理证据，缺少证据的字段保留「待核实」。',
    goals: ['每条结论都能追溯来源', '结构化输出可直接对比', '控制调用成本与错误暴露'],
    contribution: [
      '研究 CLI、配置检查与超时控制',
      '输入校验、运行状态与错误提示',
      '逐项摘录匹配、结构校验、对比表与下载',
    ],
    process: [
      { title: 'G1 引擎', description: '接入 GPT Researcher，提供 CLI 与配置检查。' },
      { title: 'G2 交互', description: '输入校验与运行状态，修改输入即清除旧结果。' },
      { title: 'G3 证据', description: '逐项摘录匹配，生成对比表与 Markdown。' },
      { title: 'G4 实测', description: '记录实测结果与环境限制。' },
    ],
    screenshots: [],
    validation: '各阶段结果记录在仓库 reports 目录；在线研究需配置凭证且可能产生费用。',
    limitations: ['AI 推断建议需人工复核', '依赖未完全锁定，新环境可能解析出不同版本'],
    links: [gh('jinglan-insight-agent')],
  },
]

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)

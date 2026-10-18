// 各项目的产品演示流程。界面均为代码绘制的示意图，用于讲清流程，不是真实运行截图。

type Frame = { frame?: 'browser' | 'phone' }
export type DemoScreen = Frame &
  (
    | { type: 'chat'; messages: { from: 'bot' | 'user'; text: string }[]; chips?: string[]; input?: string }
    | { type: 'list'; title?: string; tabs?: string[]; items: { title: string; meta?: string; badge?: string; highlight?: boolean }[] }
    | { type: 'form'; title?: string; fields: { label: string; value: string }[]; button: string; note?: string }
    | { type: 'table'; title?: string; columns: string[]; rows: string[][]; footer?: string }
    | { type: 'editor'; code: string[]; nodes: string[]; toolbar?: string[] }
    | { type: 'doc'; title: string; sidebar: string[]; lines: string[] }
    | { type: 'card'; name: string; role: string; skills: string[]; contacts: string[]; dark?: boolean }
  )

export interface DemoStep {
  title: string
  description: string
  screen: DemoScreen
}

export interface ProjectDemo {
  /** 窗口标题 / 地址栏 */
  app: string
  intro: string
  /** 顶部三个关键操作 */
  highlights: { label: string; value: string }[]
  steps: DemoStep[]
}

export const demos: Record<string, ProjectDemo> = {
  zhangxiaoge: {
    app: '章阁社区 · AI 夜校',
    intro: '一位零基础居民从打开网站到弄清"学什么、怎么报、去哪上课"的完整路径。',
    highlights: [
      { label: '入口', value: '网站右下角' },
      { label: '快捷提问', value: '3 类' },
      { label: '对话', value: '多轮引导' },
    ],
    steps: [
      {
        title: '打开网站，章小阁主动问好',
        description: '居民进入夜校网站后点开客服，章小阁先自我介绍，并给出课程咨询、报名指引、常见问题三个入口，不用想好问题也能开始。',
        screen: {
          type: 'chat',
          messages: [{ from: 'bot', text: '你好，我是章小阁\n有问题，问章小阁，一起在社区学更多。' }],
          chips: ['课程咨询', '报名指引', '常见问题'],
          input: '输入你的问题…',
        },
      },
      {
        title: '说出顾虑，按兴趣推荐方向',
        description: '居民问"零基础可以来学吗？"，章小阁先给出安心的回答，再用 AI 办公、AI 设计、AI 视频三个方向帮对方缩小选择。',
        screen: {
          type: 'chat',
          messages: [
            { from: 'user', text: '零基础可以来学吗？' },
            { from: 'bot', text: '可以从入门课程了解起。\n你更想学习 AI 办公、设计，还是视频？' },
          ],
          chips: ['AI 办公', 'AI 设计', 'AI 视频'],
        },
      },
      {
        title: '选定方向，查看课程信息',
        description: '点选"AI 办公"后，章小阁列出对应课程的内容、适合人群与上课安排，让居民判断是否适合自己。',
        screen: {
          type: 'chat',
          messages: [
            { from: 'user', text: 'AI 办公' },
            { from: 'bot', text: '「AI 办公入门」\n· 内容：用 AI 写通知、做表格、整理资料\n· 适合：零基础居民\n· 时间与地点：以夜校公告为准' },
          ],
          chips: ['怎么报名？', '上课地点在哪？'],
        },
      },
      {
        title: '一步步完成报名指引',
        description: '居民追问"怎么报名"，章小阁把报名步骤拆成清单，并提示常见注意事项，从咨询自然过渡到行动。',
        screen: {
          type: 'chat',
          messages: [
            { from: 'user', text: '怎么报名？' },
            { from: 'bot', text: '报名分三步：\n① 在网站选择课程\n② 填写姓名与联系方式\n③ 留意社区通知确认名额' },
          ],
          chips: ['常见问题', '换个课程看看'],
          input: '还有其他问题吗？',
        },
      },
    ],
  },
  'xunlan-ai': {
    app: 'xunlan.ai / 今日精选',
    intro: '产品经理早上打开讯澜 AI，十分钟看完当天值得关注的 AI 动态。',
    highlights: [
      { label: '新增信源', value: '9 个' },
      { label: '阅读方式', value: '精选 · 日报 · 主题' },
      { label: '出口', value: 'RSS / API / MCP' },
    ],
    steps: [
      {
        title: '打开精选，先看高分内容',
        description: '多源资讯经过筛选和评分，精选页只留下与 AI 产品相关的条目，每条附中文摘要与来源。',
        screen: {
          type: 'list',
          tabs: ['精选', '热点', '日报', '主题'],
          items: [
            { title: '某大模型发布新版本，支持更长上下文', meta: '中文摘要 · 3 个来源', badge: '92 分', highlight: true },
            { title: 'AI 编程助手推出团队协作功能', meta: '中文摘要 · 2 个来源', badge: '87 分' },
            { title: '多模态检索产品更新定价策略', meta: '中文摘要 · 1 个来源', badge: '81 分' },
          ],
        },
      },
      {
        title: '同一事件，归成一组阅读',
        description: '点开一条新闻，不同媒体对同一事件的报道被归到一起，只读一次就能看到全貌，不再重复刷。',
        screen: {
          type: 'list',
          title: '事件：新版本发布',
          items: [
            { title: '官方博客 · 发布说明', meta: '原始来源', badge: '首发' },
            { title: '科技媒体 A · 解读报道', meta: '已合并到本事件' },
            { title: '社区讨论 · 开发者反馈', meta: '已合并到本事件' },
          ],
        },
      },
      {
        title: '按主题订阅关注方向',
        description: '在主题页选择"AI 应用""产品管理"等方向，或用搜索回溯某个话题的全部动态。',
        screen: {
          type: 'list',
          title: '主题',
          tabs: ['AI 应用', '产品管理', '模型', '融资'],
          items: [
            { title: 'AI 应用 · 本周 24 条', meta: '客服、办公、教育场景更新' },
            { title: '产品管理 · 本周 11 条', meta: '新增信源带来的方法论与案例' },
          ],
        },
      },
      {
        title: '生成日报，接入自己的工具',
        description: '每天自动汇总一份中文日报；也可以通过 RSS、API 或 MCP 把资讯接进阅读器或 AI 助手。',
        screen: {
          type: 'doc',
          title: 'AI 产品日报 · 今日',
          sidebar: ['日报', 'RSS', 'API', 'MCP'],
          lines: ['今日要点 3 条 #模型 #应用', '值得试用：团队协作版编程助手', '定价变化：关注 [[多模态检索]] 的商业模式', '原文链接均保留来源'],
        },
      },
    ],
  },
  'yunjian-profile': {
    app: 'index.html · 云笺名片',
    intro: '不装任何依赖，十分钟把一张模板改成自己的个人名片。',
    highlights: [
      { label: '依赖', value: '零' },
      { label: '技术', value: 'HTML / CSS / JS' },
      { label: '主题', value: '浅色 · 深色' },
    ],
    steps: [
      {
        title: '双击 index.html 打开',
        description: '下载仓库后直接用浏览器打开，名片立即可见：头像、身份、技能与联系方式一屏呈现。',
        screen: { type: 'card', name: '你的名字', role: '产品经理 · AI 应用', skills: ['需求分析', '原型设计', 'AI 工具'], contacts: ['✉ name@example.com', '⌂ 城市 · 远程'] },
      },
      {
        title: '改写介绍与技能',
        description: '在 HTML 中替换姓名、简介与技能列表，刷新页面即可看到更新，无需构建。',
        screen: {
          type: 'form',
          title: '编辑内容',
          fields: [
            { label: '姓名', value: '何棋宏' },
            { label: '一句话介绍', value: '把 AI 能力做成好用的产品' },
            { label: '技能', value: 'AI 产品 · 原型 · 数据分析' },
          ],
          button: '保存并刷新',
        },
      },
      {
        title: '一键切换深色主题',
        description: '点击主题按钮在浅色与深色间切换，适配不同场景与偏好。',
        screen: { type: 'card', name: '何棋宏', role: 'AI 产品经理', skills: ['AI 产品', '原型', '数据分析'], contacts: ['✉ 填写你的邮箱', '⌂ 城市'], dark: true },
      },
      {
        title: '填好联系方式，发布上线',
        description: '把示例邮箱换成真实联系方式，放到任意静态托管即可分享链接。',
        screen: {
          type: 'list',
          title: '发布检查',
          items: [
            { title: '替换示例邮箱', badge: '必做', highlight: true },
            { title: '确认头像与配色', badge: '完成' },
            { title: '上传到静态托管并分享链接', badge: '完成' },
          ],
        },
      },
    ],
  },
  'chudian-marketing': {
    app: '触点营销',
    intro: '营销运营在 iPhone 上走完"圈人群 → 定方案 → 提审批 → 看数据"的流程。',
    highlights: [
      { label: '平台', value: 'iOS 17+' },
      { label: '模块', value: '4 个' },
      { label: '依赖', value: '仅系统框架' },
    ],
    steps: [
      {
        title: '圈选目标人群',
        description: '在人群模块按条件组合筛选用户，可在本地新增、编辑并保存版本快照，随时一键重置。',
        screen: {
          frame: 'phone',
          type: 'list',
          title: '人群',
          items: [
            { title: '近 30 天活跃新用户', meta: '条件：注册 < 30 天 · 活跃', badge: '编辑中', highlight: true },
            { title: '沉睡老用户', meta: '条件：90 天未登录', badge: 'v2' },
            { title: '高价值会员', meta: '条件：会员等级 ≥ 3', badge: 'v1' },
          ],
        },
      },
      {
        title: '为人群配置营销方案',
        description: '选择人群后设置触达渠道、内容与时间，形成一份待审批的方案。',
        screen: {
          frame: 'phone',
          type: 'form',
          fields: [
            { label: '目标人群', value: '近 30 天活跃新用户' },
            { label: '渠道', value: '站内消息' },
            { label: '发送时间', value: '周五 19:00' },
          ],
          button: '提交审批',
        },
      },
      {
        title: '发送前走审批',
        description: '方案进入审批队列，审批人查看人群规模与内容后决定通过或退回。',
        screen: {
          frame: 'phone',
          type: 'list',
          title: '审批',
          items: [
            { title: '新用户周末唤醒', meta: '提交人：运营 · 待审批', badge: '待审', highlight: true },
            { title: '会员日专属福利', meta: '已通过', badge: '通过' },
          ],
        },
      },
      {
        title: '查看发送数据',
        description: '在数据模块回看各方案的触达与转化表现，指导下一轮人群与方案调整（当前为演示骨架）。',
        screen: {
          frame: 'phone',
          type: 'list',
          title: '数据',
          items: [
            { title: '新用户周末唤醒', meta: '触达 · 打开 · 转化（示意）', badge: '示意' },
            { title: '会员日专属福利', meta: '触达 · 打开 · 转化（示意）', badge: '示意' },
          ],
        },
      },
    ],
  },
  'tulan-diagram-editor': {
    app: 'localhost:3000 · 图澜编辑器',
    intro: '用几行文字画出一张流程图，并导出到文档里。',
    highlights: [
      { label: '界面', value: '简体中文' },
      { label: '预览', value: '实时' },
      { label: '导出', value: 'PNG / SVG' },
    ],
    steps: [
      {
        title: '本地启动，打开中文编辑器',
        description: 'pnpm install 与 pnpm dev 之后，在浏览器打开本地地址，左侧是代码区，右侧是预览区。',
        screen: { type: 'editor', code: ['flowchart TD', '  A[开始]'], nodes: ['开始'] },
      },
      {
        title: '写文字，右侧即时出图',
        description: '用 Mermaid 语法描述步骤与连线，每输入一行，右侧图表实时更新。',
        screen: { type: 'editor', code: ['flowchart TD', '  A[需求] --> B[设计]', '  B --> C[开发]', '  C --> D[上线]'], nodes: ['需求', '设计', '开发', '上线'] },
      },
      {
        title: '切换深浅主题',
        description: '在顶部切换深色或浅色主题，让图表适配演示文稿或文档底色。',
        screen: { type: 'editor', code: ['%% 主题：深色', 'flowchart LR', '  A[输入] --> B[处理]', '  B --> C[输出]'], nodes: ['输入', '处理', '输出'], toolbar: ['浅色', '● 深色'] },
      },
      {
        title: '导出 PNG / SVG',
        description: '点击导出，选择 PNG 用于聊天与文档，或选择 SVG 保持矢量清晰。',
        screen: { type: 'editor', code: ['flowchart TD', '  A[需求] --> B[设计]', '  B --> C[开发]'], nodes: ['需求', '设计', '开发'], toolbar: ['导出 PNG', '导出 SVG', '复制链接'] },
      },
    ],
  },
  'zhilan-notes': {
    app: 'Logseq · 知澜笔记',
    intro: '新手第一天就跑通"记日记 → 建双链 → 打标签 → 定期复习"。',
    highlights: [
      { label: '启动', value: '启动.sh' },
      { label: '界面', value: '简体中文' },
      { label: '数据', value: '本地存储' },
    ],
    steps: [
      {
        title: '运行启动脚本',
        description: '把官方 AppImage 放进 app 目录，执行启动脚本即可打开中文界面的 Logseq。',
        screen: {
          type: 'list',
          title: '启动检查',
          items: [
            { title: '从官方 Releases 下载 AppImage', badge: '完成' },
            { title: '放入 app/ 并赋予执行权限', badge: '完成' },
            { title: '运行 ./启动.sh', badge: '启动中', highlight: true },
          ],
        },
      },
      {
        title: '在今日日记里随手记',
        description: '每天打开都会进入当天日记页，想到什么就记一条，不用先想好放在哪里。',
        screen: { type: 'doc', title: '今日日记', sidebar: ['日记', '所有页面', '图谱', '复习'], lines: ['读完一篇关于 AI 客服的文章', '会议：讨论下周原型评审', '灵感：用对话引导零基础用户'] },
      },
      {
        title: '用双链和标签把笔记连起来',
        description: '用 [[页面]] 引用相关主题、用 #标签 归类，笔记之间自动产生关联。',
        screen: { type: 'doc', title: '今日日记', sidebar: ['日记', '所有页面', '图谱', '复习'], lines: ['读完一篇关于 [[AI 客服]] 的文章 #阅读', '会议：讨论下周 [[原型评审]] #工作', '灵感：用对话引导零基础用户 #灵感'] },
      },
      {
        title: '按复习清单回顾',
        description: '把需要巩固的内容标为复习，在清单页集中回看，形成"记录—连接—复习"的闭环。',
        screen: {
          type: 'list',
          title: '复习清单',
          items: [
            { title: 'AI 客服设计要点', meta: '来自 3 篇日记', badge: '今日', highlight: true },
            { title: '原型评审 checklist', meta: '来自 2 篇日记', badge: '明天' },
          ],
        },
      },
    ],
  },
  'jinglan-insight': {
    app: 'localhost:8501 · 竞澜研究',
    intro: '输入一个主题和几个竞品，得到一份每条结论都有出处的对比报告。',
    highlights: [
      { label: '竞品数', value: '2–3 个' },
      { label: '维度', value: '3 个' },
      { label: '输出', value: 'Markdown' },
    ],
    steps: [
      {
        title: '输入主题与竞品',
        description: '填写调研主题和 2–3 个竞品名称，系统先校验输入；修改输入会清除旧结果，避免混淆。',
        screen: {
          type: 'form',
          title: '新建调研',
          fields: [
            { label: '调研主题', value: 'AI 笔记应用' },
            { label: '竞品', value: '竞品 A、竞品 B、竞品 C' },
          ],
          note: '✓ 输入有效',
          button: '开始研究',
        },
      },
      {
        title: '研究引擎检索公开资料',
        description: '手动点击后调用 GPT Researcher 检索公开网页，界面实时显示运行状态与超时控制。',
        screen: {
          type: 'list',
          title: '运行状态',
          items: [
            { title: '检索公开资料', meta: 'DuckDuckGo · 关键词过滤', badge: '完成' },
            { title: '摘录证据并匹配维度', meta: '逐项匹配来源', badge: '进行中', highlight: true },
            { title: '生成对比与建议', badge: '等待' },
          ],
        },
      },
      {
        title: '三维度对比，缺证据标"待核实"',
        description: '按产品定位与功能、定价与商业模式、差异化特点生成对比表；找不到依据的字段不臆测，直接标注待核实。',
        screen: {
          type: 'table',
          title: '竞品对比',
          columns: ['维度', '竞品 A', '竞品 B', '竞品 C'],
          rows: [
            ['定位与功能', 'AI 摘要 · 双链', '协作文档', '本地优先'],
            ['定价模式', '订阅制', '免费增值', '待核实'],
            ['差异化', '模型能力', '团队协作', '隐私'],
          ],
        },
      },
      {
        title: '查看建议并下载报告',
        description: '附 2–3 条 AI 推断建议与来源列表，一键下载 UTF-8 Markdown，方便放进文档继续加工。',
        screen: {
          type: 'table',
          title: 'AI 推断建议（需人工复核）',
          columns: ['#', '建议', '依据'],
          rows: [
            ['1', '强化本地优先卖点', '来源 3、5'],
            ['2', '定价对标免费增值', '来源 2'],
          ],
          footer: '共 8 条来源',
        },
      },
    ],
  },
}

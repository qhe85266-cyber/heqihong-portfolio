// 思考与研究：基于个人项目经历的方法总结。
export interface Source {
  label: string
  href?: string
}

export interface Article {
  slug: string
  title: string
  summary: string
  isSample: boolean
  date?: string
  /** 一句话核心观点，用于首页展开预览 */
  thesis: string
  tags: string[]
  sections: { heading: string; body: string[] }[]
  sources: Source[]
}

export const articles: Article[] = [
  {
    slug: 'accuracy-is-not-experience',
    title: '高准确率之后：AI 产品的体验藏在长尾里',
    summary: '平均准确率回答"模型好不好"，Bad Case 分布才回答"用户会不会离开"。',
    thesis: '与其追问平均分，不如把失败样本分类、定位到环节，让"不好"变成团队能分工解决的问题。',
    tags: ['评测体系', 'Bad Case', '多模态'],
    isSample: false,
    sections: [
      {
        heading: '平均数掩盖了用户真正遇到的问题',
        body: [
          '曦灵数字人的口型合成准确率已经很高，但用户不会感知"平均值"。他们记住的是那一段英文缩写念出来时嘴型对不上，或者停顿时数字人还在张嘴。',
          '对 AI 产品来说，体验的分水岭往往在长尾：复杂发音、语速变化、多轮对话里遗漏的一句话。',
        ],
      },
      {
        heading: '把"不准"拆成可以分工的问题',
        body: [
          '我把口型不同步拆成音画时序偏移、口型与发音不匹配、停顿异常、快速语音不连贯四类，并明确 TTS、唇形驱动、视频渲染各自的排查边界。',
          '分类的意义不在于好看，而在于让质检知道标什么、算法知道改哪里、研发知道查哪段链路。',
        ],
      },
      {
        heading: '评测工具本身就是产品',
        body: [
          '时间轴定位、问题标签、严重程度与处理状态，这些字段决定了反馈能否被复用。结构化之后，质检定位更快，反馈也更完整、可复用。',
          '好的评测体系，会让团队对"什么叫变好"达成共识。',
        ],
      },
    ],
    sources: [{ label: '百度曦灵数字人项目实践' }],
  },
  {
    slug: 'model-understands-rules-protect',
    title: '模型负责理解，规则负责底线',
    summary: '在行业 Agent 里，LLM 与规则引擎不是替代关系，而是分工关系。',
    thesis: '把"需要理解"的部分交给模型，把"不能出错"的部分交给规则——这是 Agent 能在商业场景里被信任的前提。',
    tags: ['Agent', '规则引擎', '风控'],
    isSample: false,
    sections: [
      {
        heading: '全交给模型，风险不可控',
        body: [
          '复购营销里，模型可以读懂聊天记录中的购买意图，但它也可能编造一个不存在的优惠，或者对同一个客户一周发三次消息。',
          '对商家而言，一次虚构优惠带来的投诉，可能抵消十次精准触达的收益。',
        ],
      },
      {
        heading: '按"不确定性"分配职责',
        body: [
          '我把复购拆成三层：人群识别用 LLM 意图识别结合订单数据；触达决策用规则引擎做频控与异常过滤；内容生成用 Prompt，但优惠信息必须来自活动规则而非模型生成。',
          '在 A/B 对照中，这种分工比纯人工规则触达更准，也更少打扰客户。',
        ],
      },
      {
        heading: '验收标准要写进"不能发生什么"',
        body: ['PRD 里除了功能逻辑，我会单独写异常兜底：优惠与活动规则一致、话术不出现虚构优惠、触达频次有上限。这些"负面清单"往往比功能列表更重要。'],
      },
    ],
    sources: [{ label: '晓多科技 AI 营销智能体项目实践' }],
  },
  {
    slug: 'asking-is-a-product-capability',
    title: '追问，是智能体最被低估的能力',
    summary: 'Function Calling 的失败，很多时候不是模型不会调用，而是信息本来就不够。',
    thesis: '与其让模型"猜"出参数，不如在调用前判断信息是否完整，并用一句自然的追问把它补上。',
    tags: ['Function Calling', '多轮对话', 'Coze'],
    isSample: false,
    sections: [
      {
        heading: '用户不会按 Schema 说话',
        body: [
          '"明天要带伞吗？"——这句话里没有城市。模型要么调用失败，要么猜一个城市，要么反复追问。三种结果都在消耗用户的耐心。',
        ],
      },
      {
        heading: '先判断状态，再决定动作',
        body: [
          '我基于插件参数 Schema 设计三态校验：缺失、类型错误、已完整。只有确认完整才调用插件；缺失时生成自然语言追问，并优先从历史对话里补全，避免重复问用户已经说过的信息。',
          '用户补充后重新校验，形成闭环。',
        ],
      },
      {
        heading: '用测试集决定 Prompt 怎么写',
        body: [
          '单参数缺失、多参数缺失、跨轮补充、用户主动取消——每类场景都有专项样本。不同参数描述写法的对比实验，比任何直觉都可靠。',
          '前后对照下，参数补全和任务完成都有明显改善。',
        ],
      },
    ],
    sources: [{ label: '字节跳动 Coze 插件调用项目实践' }],
  },
]

export const getArticle = (slug: string | undefined) => articles.find((a) => a.slug === slug)

// 思考与研究文章。以下为“示例 / 待替换”。
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
  sections: { heading: string; body: string[] }[]
  sources: Source[]
}

export const articles: Article[] = [
  {
    slug: 'sample-ai-product-thinking',
    title: '示例文章：如何判断一个 AI 功能值不值得做',
    summary: '示例摘要：用问题、用户和可验证性三个角度，评估一个 AI 功能是否值得投入。',
    isSample: true,
    sections: [
      {
        heading: '问题是否真实',
        body: ['示例正文：请在此写下你的真实观点。本段仅用于展示文章页面的排版与结构。'],
      },
      {
        heading: '用户是否在意',
        body: ['示例正文：可写多个段落，也可补充列表、引用等内容。'],
      },
      {
        heading: '是否可以验证',
        body: ['示例正文：说明你如何通过原型与实验验证假设。'],
      },
    ],
    sources: [{ label: '来源待补充（请填写真实参考资料，没有链接可不填 href）' }],
  },
  {
    slug: 'sample-prompt-as-interface',
    title: '示例文章：把提示词当作产品界面来设计',
    summary: '示例摘要：待替换。',
    isSample: true,
    sections: [{ heading: '章节标题', body: ['示例正文：待替换。'] }],
    sources: [{ label: '来源待补充' }],
  },
  {
    slug: 'sample-prototype-validation',
    title: '示例文章：原型验证的最小路径',
    summary: '示例摘要：待替换。',
    isSample: true,
    sections: [{ heading: '章节标题', body: ['示例正文：待替换。'] }],
    sources: [{ label: '来源待补充' }],
  },
]

export const getArticle = (slug: string | undefined) => articles.find((a) => a.slug === slug)

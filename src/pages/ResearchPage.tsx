import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getArticle } from '../data/research'
import { profile } from '../data/profile'
import NotFound from './NotFound'

export default function ResearchPage() {
  const { slug } = useParams()
  const article = getArticle(slug)

  useEffect(() => {
    document.title = article ? `${article.title} | ${profile.siteTitle}` : `页面未找到 | ${profile.siteTitle}`
  }, [article])

  if (!article) return <NotFound />

  return (
    <article className="container-x max-w-[44rem]" style={{ paddingTop: 'calc(var(--header-h) + 32px)', paddingBottom: 96 }}>
      <Link to={{ pathname: '/', hash: 'research' }} className="btn mb-8 !px-4">
        <ArrowLeft size={16} aria-hidden /> 返回思考与研究
      </Link>
      <header>
        {article.isSample && <span className="tag tag-sample">示例文章 / 待替换</span>}
        <h1 className="mt-5 mb-0 font-serif text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-tight">{article.title}</h1>
        <p className="lead mt-4">{article.summary}</p>
        {article.date && <p className="mt-2 text-sm text-muted">{article.date}</p>}
      </header>

      <div className="mt-10">
        {article.sections.map((s) => (
          <section key={s.heading} className="border-t border-line py-8">
            <h2 className="m-0 mb-4 font-serif text-2xl font-bold">{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p} className="m-0 mb-4 leading-[1.9] text-soft">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      <section className="border-t border-line py-8">
        <h2 className="m-0 mb-4 font-serif text-2xl font-bold">来源</h2>
        <ul className="m-0 list-disc space-y-1 pl-5 text-muted">
          {article.sources.map((s) => (
            <li key={s.label}>
              {s.href ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
                  {s.label}
                </a>
              ) : (
                s.label
              )}
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

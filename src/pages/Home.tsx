import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Copy } from 'lucide-react'
import { Hero } from '../components/Hero'
import { Reveal } from '../components/Reveal'
import { Cover } from '../components/Cover'
import { ToolCarousel } from '../components/ToolCarousel'
import { methodSteps, profile, TBD } from '../data/profile'
import { projects } from '../data/projects'
import { articles } from '../data/research'
import { tools } from '../data/tools'

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead mt-4">{lead}</p>}
    </Reveal>
  )
}

function Positioning() {
  const p = profile.positioning
  return (
    <section id="positioning" aria-labelledby="positioning-title" className="section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">POSITIONING</p>
          <h2 id="positioning-title" className="h2 max-w-[18em] !text-[clamp(2rem,5vw,3.5rem)]">
            {p.statement}
          </h2>
          <p className="lead mt-6">{p.intro}</p>
          <ul className="m-0 mt-8 flex list-none flex-wrap gap-2 p-0" aria-label="技能标签">
            {p.skills.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section border-t border-line">
      <div className="container-x">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow">SELECTED WORK</p>
          <h2 id="work-title" className="h2">
            代表项目
          </h2>
          <p className="lead mt-4">以下均为示例项目，用于展示结构，待替换为真实作品。</p>
        </Reveal>
        <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 80} className="h-full">
                <article className="card card-hover relative flex h-full flex-col overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    <Cover project={p} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="tag">{p.category}</span>
                      {p.isSample && <span className="tag tag-sample">示例 / 待替换</span>}
                    </div>
                    <h3 className="m-0 mt-4 text-xl font-bold leading-snug">
                      <Link
                        to={`/projects/${p.slug}`}
                        className="text-white no-underline after:absolute after:inset-0 after:content-['']"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <dl className="mt-4 space-y-2 text-sm text-muted">
                      <div>
                        <dt className="inline text-white/80">问题：</dt>
                        <dd className="inline m-0">{p.problem}</dd>
                      </div>
                      <div>
                        <dt className="inline text-white/80">角色：</dt>
                        <dd className="inline m-0">{p.role}</dd>
                      </div>
                      <div>
                        <dt className="inline text-white/80">结果：</dt>
                        <dd className="inline m-0">{p.result}</dd>
                      </div>
                    </dl>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-cyan">
                      查看详情 <ArrowUpRight size={16} aria-hidden />
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Method() {
  return (
    <section id="method" aria-labelledby="method-title" className="section border-t border-line">
      <div className="container-x">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow">METHOD</p>
          <h2 id="method-title" className="h2">
            工作方法
          </h2>
        </Reveal>
        <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 80} className="h-full">
                <div className="card h-full p-6">
                  <span className="text-sm font-semibold tabular-nums text-violet">0{i + 1}</span>
                  <h3 className="m-0 mt-3 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-muted">{s.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="section border-t border-line">
      <div className="container-x">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow">THINKING</p>
          <h2 id="research-title" className="h2">
            思考与研究
          </h2>
        </Reveal>
        <ol className="m-0 list-none p-0">
          {articles.map((a, i) => (
            <li key={a.slug} className="border-t border-line last:border-b">
              <Reveal delay={i * 60}>
                <Link
                  to={`/research/${a.slug}`}
                  className="group grid min-h-11 grid-cols-[auto_1fr_auto] items-start gap-4 py-6 text-inherit no-underline md:gap-8"
                >
                  <span className="pt-1 text-sm font-semibold tabular-nums text-violet">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-semibold text-white md:text-xl">{a.title}</span>
                      {a.isSample && <span className="tag tag-sample">示例 / 待替换</span>}
                    </span>
                    <span className="mt-2 block text-[0.9375rem] text-muted">{a.summary}</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden
                    className="mt-1 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="section border-t border-line">
      <div className="container-x">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow">TOOLKIT</p>
          <h2 id="capabilities-title" className="h2">
            工具栈
          </h2>
          <p className="lead mt-4">可通过按钮、圆点、左右方向键或滑动切换。示例内容待替换为真实使用的工具。</p>
        </Reveal>
        <Reveal>
          <ToolCarousel tools={tools} />
        </Reveal>
      </div>
    </section>
  )
}

function About() {
  const a = profile.about
  return (
    <section id="about" aria-label="关于" className="section border-t border-line">
      <div className="container-x">
        <SectionHead eyebrow="ABOUT" title="关于" />
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            {a.intro.map((t) => (
              <p key={t} className="lead mt-0 mb-5 !text-[#d0d0dc]">
                {t}
              </p>
            ))}
            <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0" aria-label="能力标签">
              {a.skills.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <ul className="m-0 grid list-none gap-4 p-0">
            {a.abilities.map((ab, i) => (
              <li key={ab.title}>
                <Reveal delay={i * 80}>
                  <div className="card p-6">
                    <h3 className="m-0 text-lg font-bold">{ab.title}</h3>
                    <p className="mt-2 text-[0.9375rem] text-muted">{ab.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { email, socials } = profile.contact
  const [copied, setCopied] = useState(false)
  const hasAny = Boolean(email) || socials.length > 0

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section border-t border-line">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">CONTACT</p>
          <h2 id="contact-title" className="h2">
            联系
          </h2>
          {hasAny ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {email && (
                <>
                  <a className="btn btn-primary" href={`mailto:${email}`}>
                    {email}
                  </a>
                  <button type="button" className="btn" onClick={copy}>
                    <Copy size={16} aria-hidden /> {copied ? '已复制' : '复制邮箱'}
                  </button>
                </>
              )}
              {socials.map((s) => (
                <a key={s.href} className="btn" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} <ArrowUpRight size={16} aria-hidden />
                </a>
              ))}
              <span className="sr-only" aria-live="polite">
                {copied ? '邮箱已复制到剪贴板' : ''}
              </span>
            </div>
          ) : (
            <p className="lead mt-4">联系方式{TBD}</p>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = profile.siteTitle
  }, [])
  return (
    <>
      <Hero />
      <Positioning />
      <Work />
      <Method />
      <Research />
      <Capabilities />
      <About />
      <Contact />
    </>
  )
}

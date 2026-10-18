import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Copy, Phone } from 'lucide-react'
import { Experience } from '../components/Experience'
import { Hero } from '../components/Hero'
import { Reveal } from '../components/Reveal'
import { ProjectRing } from '../components/ProjectRing'
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
          <p className="lead mt-4">从 AI 客服、资讯聚合到竞品研究——拖动或点击，浏览七个亲手打磨的作品。</p>
        </Reveal>
        <Reveal>
          <ProjectRing projects={projects} />
        </Reveal>
      </div>
    </section>
  )
}

function Method() {
  const [active, setActive] = useState(0)
  const step = methodSteps[active]
  return (
    <section id="method" aria-labelledby="method-title" className="section border-t border-line">
      <div className="container-x">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow">METHOD</p>
          <h2 id="method-title" className="h2">
            工作方法
          </h2>
          <p className="lead mt-4">四个习惯，在三段经历里反复验证过。选择一项，查看它在项目中的证据。</p>
        </Reveal>
        <Reveal>
          <div role="tablist" aria-label="工作方法" className="grid gap-3 md:grid-cols-4">
            {methodSteps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`card group relative overflow-hidden p-5 text-left transition-colors ${i === active ? '!border-violet/60 bg-violet/10' : 'hover:bg-white/[0.03]'}`}
              >
                <span className="text-sm font-semibold tabular-nums text-violet">0{i + 1}</span>
                <span className="mt-2 block text-lg font-bold text-white">{s.title}</span>
                <span className="mt-1 block text-sm text-muted">{s.principle}</span>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px] bg-violet transition-all duration-500"
                  style={{ width: i === active ? '100%' : '0%' }}
                />
              </button>
            ))}
          </div>
          <div role="tabpanel" key={active} className="card mt-4 grid animate-[fadeUp_.4s_ease] gap-6 p-6 md:grid-cols-[1fr_1.2fr] md:p-8">
            <div>
              <p className="m-0 text-2xl font-extrabold leading-snug">“{step.principle}”</p>
              <p className="m-0 mt-3 text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
            </div>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {step.evidence.map((e) => (
                <li key={e.company} className="flex gap-3 rounded-xl border border-line p-3">
                  <span className="shrink-0 rounded-md bg-white/10 px-2 py-0.5 text-xs font-semibold text-white">{e.company}</span>
                  <span className="text-sm text-[#d0d0dc]">{e.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Research() {
  const [open, setOpen] = useState(0)
  return (
    <section id="research" aria-labelledby="research-title" className="section border-t border-line">
      <div className="container-x">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow">THINKING</p>
          <h2 id="research-title" className="h2">
            思考与研究
          </h2>
          <p className="lead mt-4">从项目里长出来的三个判断。</p>
        </Reveal>
        <ol className="m-0 list-none p-0">
          {articles.map((a, i) => {
            const isOpen = i === open
            return (
              <li key={a.slug} className="border-t border-line last:border-b" onMouseEnter={() => setOpen(i)}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`thesis-${a.slug}`}
                  onClick={() => setOpen(i)}
                  className="grid w-full grid-cols-[auto_1fr] items-start gap-4 bg-transparent py-6 text-left md:gap-8"
                >
                  <span className="pt-1 text-sm font-semibold tabular-nums text-violet">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className={`block text-lg font-semibold transition-colors md:text-2xl ${isOpen ? 'text-white' : 'text-white/60'}`}>{a.title}</span>
                    <span className="mt-2 block text-[0.9375rem] text-muted">{a.summary}</span>
                  </span>
                </button>
                <div
                  id={`thesis-${a.slug}`}
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="mb-6 ml-8 flex flex-col gap-4 border-l-2 border-violet pl-5 md:ml-14 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="m-0 max-w-2xl text-[1.0625rem] leading-relaxed text-[#e4e4ee]">{a.thesis}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {a.tags.map((t) => (
                            <span key={t} className="tag">{t}</span>
                          ))}
                        </div>
                      </div>
                      <Link to={`/research/${a.slug}`} className="btn shrink-0 !px-4" tabIndex={isOpen ? 0 : -1}>
                        阅读全文 <ArrowUpRight size={16} aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
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
          <p className="lead mt-4">日常在用的 AI 工具与智能体。可通过按钮、圆点、左右方向键或滑动切换。</p>
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
            <dl className="m-0 mt-8 grid gap-3 sm:grid-cols-3">
              {a.facts.map((f) => (
                <div key={f.label} className="border-t border-line pt-3">
                  <dt className="text-xs tracking-wider text-muted">{f.label}</dt>
                  <dd className="m-0 mt-1 text-sm font-semibold text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <ul className="m-0 grid list-none gap-4 p-0">
            {a.abilities.map((ab, i) => (
              <li key={ab.title}>
                <Reveal delay={i * 80}>
                  <div className="card card-hover p-6">
                    <span className="text-sm font-semibold tabular-nums text-violet">0{i + 1}</span>
                    <h3 className="m-0 mt-2 text-lg font-bold">{ab.title}</h3>
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

function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section border-t border-line">
      <div className="container-x">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow">EXPERIENCE</p>
          <h2 id="experience-title" className="h2">
            个人经历
          </h2>
          <p className="lead mt-4">从模型评测，到智能体平台，再到行业 Agent 落地。每段经历：一个关键判断，一条完整链路，一组清晰的成果。</p>
        </Reveal>
        <Reveal>
          <Experience />
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  const { email, phone, socials } = profile.contact
  const [copied, setCopied] = useState(false)
  const hasAny = Boolean(email) || Boolean(phone) || socials.length > 0

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email || phone)
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
              {!email && phone && (
                <>
                  <a className="btn btn-primary" href={`tel:${phone}`}>
                    <Phone size={16} aria-hidden /> {phone}
                  </a>
                  <button type="button" className="btn" onClick={copy}>
                    <Copy size={16} aria-hidden /> {copied ? '已复制' : '复制号码'}
                  </button>
                </>
              )}
              {socials.map((s) => (
                <a key={s.href} className="btn" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} <ArrowUpRight size={16} aria-hidden />
                </a>
              ))}
              <span className="sr-only" aria-live="polite">
                {copied ? '已复制到剪贴板' : ''}
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
      <ExperienceSection />
      <Work />
      <Method />
      <Research />
      <Capabilities />
      <About />
      <Contact />
    </>
  )
}

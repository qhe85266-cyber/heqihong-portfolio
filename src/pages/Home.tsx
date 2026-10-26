import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BadgeCheck, Check, Copy, Globe, Mail, Phone } from 'lucide-react'
import { CommercialLoop } from '../components/CommercialLoop'
import { Experience } from '../components/Experience'
import { Hero } from '../components/Hero'
import { Reveal } from '../components/Reveal'
import { ProjectRing } from '../components/ProjectRing'
import { ToolCarousel } from '../components/ToolCarousel'
import { profile, TBD } from '../data/profile'
import { projects } from '../data/projects'
import { articles } from '../data/research'
import { tools } from '../data/tools'

// 区块节奏：实底（surface）承载密集文字；开窗（window）透出 Agent Wave 背景。

function SectionHead({ id, eyebrow, title, lead }: { id: string; eyebrow: string; title: string; lead?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h2">
        {title}
      </h2>
      {lead && <p className="lead mt-5">{lead}</p>}
    </Reveal>
  )
}

function Positioning() {
  const p = profile.positioning
  const last = p.statement.length - 1
  return (
    <section id="positioning" aria-labelledby="positioning-title" className="window section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Positioning</p>
          {/* 短语已控制断行，关闭 .h2 的 balance，保证宽屏为“……不是上线，/ 而是续费。” */}
          <h2
            id="positioning-title"
            className="h2 max-w-[13em] !text-[clamp(2.25rem,5.6vw,4.25rem)] !leading-[1.15] !text-wrap"
          >
            {p.statement.map((phrase, i) => (
              <span key={phrase} className={i === last ? 'inline-block text-accent' : 'inline-block'}>
                {phrase}
              </span>
            ))}
          </h2>
          <p className="lead mt-8 !text-fg/85">{p.intro}</p>
        </Reveal>
        <ul className="m-0 mt-14 grid list-none gap-4 p-0 md:mt-20 md:grid-cols-3">
          {p.pillars.map((x, i) => (
            <li key={x.title}>
              <Reveal delay={i * 80} className="h-full">
                <div className="card h-full p-6 md:p-8">
                  <p className="m-0 flex items-center justify-between text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                    {x.en}
                    <span className="tabular-nums text-accent">0{i + 1}</span>
                  </p>
                  <h3 className="m-0 mt-4 font-serif text-[1.375rem] font-bold">{x.title}</h3>
                  <p className="m-0 mt-3 text-[0.9375rem] leading-[1.8] text-soft">{x.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Loop() {
  return (
    <section id="loop" aria-labelledby="loop-title" className="surface section">
      <div className="container-x">
        <SectionHead
          id="loop-title"
          eyebrow="AI Commercialization"
          title="AI 商业化闭环"
          lead="从筛选需求到续费增购，每一步都要回答一个商业问题。选择一步，查看要做什么、交付什么、看哪些指标，以及我在领星的实践。"
        />
        <CommercialLoop />
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="surface section">
      <div className="container-x">
        <SectionHead
          id="experience-title"
          eyebrow="Experience"
          title="项目经历"
          lead="在领星，把多模态生成与 RAG 做成大型品牌付费的 AI 服务；在字节跳动 Coze，优化智能体调用插件时的追问；在百度，做需求分析与模型评测。"
        />
        <Reveal>
          <Experience />
        </Reveal>
      </div>
    </section>
  )
}

function Work() {
  return (
    // 两侧卡片会伸出容器：在通栏 section 上裁切，避免移动端横向溢出撑宽视口
    <section id="work" aria-labelledby="work-title" className="window section overflow-x-clip">
      <div className="container-x">
        <SectionHead
          id="work-title"
          eyebrow="Side Projects"
          title="个人作品"
          lead="工作之外，我习惯把想法亲手做成可运行的 Demo：从 AI 客服、资讯聚合到竞品研究。拖动或点击，浏览七个作品。"
        />
        <Reveal>
          <ProjectRing projects={projects} />
        </Reveal>
      </div>
    </section>
  )
}

function Research() {
  const [open, setOpen] = useState(0)
  return (
    <section id="research" aria-labelledby="research-title" className="surface section">
      <div className="container-x">
        <SectionHead id="research-title" eyebrow="Thinking" title="思考与研究" lead="从项目里长出来的三个判断。" />
        <ol className="m-0 list-none p-0">
          {articles.map((a, i) => {
            const isOpen = i === open
            return (
              <li key={a.slug} className="border-t border-line last:border-b">
                <h3 className="m-0">
                  <button
                    id={`thesis-btn-${a.slug}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`thesis-${a.slug}`}
                    onClick={() => setOpen(i)}
                    className="grid w-full grid-cols-[auto_1fr] items-start gap-4 bg-transparent py-7 text-left md:gap-10"
                  >
                    <span className={`pt-1.5 text-sm font-semibold tabular-nums ${isOpen ? 'text-accent' : 'text-muted'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span
                        className={`block font-serif text-xl leading-snug font-bold transition-colors md:text-[1.75rem] ${
                          isOpen ? 'text-fg' : 'text-soft hover:text-fg'
                        }`}
                      >
                        {a.title}
                      </span>
                      <span className="mt-2 block text-[0.9375rem] font-normal text-muted">{a.summary}</span>
                    </span>
                  </button>
                </h3>
                <div
                  id={`thesis-${a.slug}`}
                  role="region"
                  aria-labelledby={`thesis-btn-${a.slug}`}
                  inert={!isOpen}
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="mb-8 ml-8 flex flex-col gap-5 border-l-2 border-accent pl-5 md:ml-14 md:flex-row md:items-end md:justify-between md:gap-10">
                      <div>
                        <p className="m-0 max-w-2xl text-[1.0625rem] leading-[1.85] text-fg">{a.thesis}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {a.tags.map((t) => (
                            <span key={t} className="tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link to={`/research/${a.slug}`} className="btn shrink-0 !px-5">
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
    <section id="capabilities" aria-labelledby="capabilities-title" className="window section">
      <div className="container-x">
        <SectionHead
          id="capabilities-title"
          eyebrow="Toolkit"
          title="工具栈"
          lead="日常在用的 AI 工具与智能体。可通过按钮、圆点、左右方向键或滑动切换。"
        />
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
    <section id="about" aria-labelledby="about-title" className="surface section">
      <div className="container-x">
        <SectionHead id="about-title" eyebrow="About" title="关于我" />
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <Reveal>
            {a.intro.map((t) => (
              <p key={t} className="lead m-0 mb-6 last:mb-0">
                {t}
              </p>
            ))}
          </Reveal>
          <Reveal delay={80}>
            <dl className="m-0 grid gap-x-6 sm:grid-cols-2 sm:gap-y-5">
              {a.facts.map((f) => (
                <div key={f.label} className="flex items-baseline gap-4 border-t border-line py-3 sm:block sm:pb-0">
                  <dt className="w-10 shrink-0 text-xs tracking-[0.16em] text-muted sm:w-auto">{f.label}</dt>
                  <dd className="m-0 font-semibold text-fg sm:mt-1">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="card mt-8 p-6">
              <p className="m-0 text-xs font-semibold tracking-[0.2em] text-accent">证书</p>
              <ul className="m-0 mt-4 flex list-none flex-col gap-4 p-0">
                {a.certifications.map((c) => (
                  <li key={c.name} className="flex items-start gap-3">
                    <BadgeCheck size={18} aria-hidden className="mt-1 shrink-0 text-accent" />
                    <span>
                      <span className="block font-semibold text-fg">{c.name}</span>
                      {c.issuer && <span className="block text-sm text-muted">{c.issuer}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: typeof Mail
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <li className="border-t border-line last:border-b">
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group flex min-h-16 items-center gap-4 py-3 no-underline"
      >
        <Icon size={18} aria-hidden className="shrink-0 text-accent" />
        {/* 窄屏把标签放到值上方，让邮箱等长值整行显示 */}
        <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-4">
          <span className="text-xs text-muted sm:w-9 sm:shrink-0 sm:text-sm">{label}</span>
          <span className="min-w-0 text-[1.0625rem] font-semibold break-all text-fg tabular-nums">{value}</span>
        </span>
        <ArrowUpRight size={16} aria-hidden className="shrink-0 text-muted transition-colors group-hover:text-accent" />
      </a>
    </li>
  )
}

function Contact() {
  const { pitch, email, phone, socials } = profile.contact
  const [copied, setCopied] = useState(false)
  const hasAny = Boolean(email) || Boolean(phone) || socials.length > 0
  // 显示时按 3-4-4 分组，tel: 链接保持无空格
  const phoneDisplay = phone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1 $2 $3')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="window section">
      <div className="container-x">
        <Reveal>
          <div className="card grid gap-10 p-6 sm:p-10 md:p-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 id="contact-title" className="h2">
                联系我
              </h2>
              <p className="lead mt-5">{pitch}</p>
              {email && (
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a className="btn btn-primary" href={`mailto:${email}`}>
                    <Mail size={16} aria-hidden /> 发邮件给我
                  </a>
                  <button type="button" className="btn" onClick={copyEmail}>
                    {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                    {copied ? '已复制' : '复制邮箱'}
                  </button>
                  <span className="sr-only" aria-live="polite">
                    {copied ? '邮箱已复制到剪贴板' : ''}
                  </span>
                </div>
              )}
            </div>
            {hasAny ? (
              <ul className="m-0 flex list-none flex-col p-0 lg:self-end">
                {email && <ContactRow icon={Mail} label="邮箱" value={email} href={`mailto:${email}`} />}
                {phone && <ContactRow icon={Phone} label="电话" value={phoneDisplay} href={`tel:${phone.replace(/\s/g, '')}`} />}
                {socials.map((s) => (
                  <ContactRow key={s.href} icon={Globe} label="网站" value={s.label} href={s.href} external />
                ))}
              </ul>
            ) : (
              <p className="lead m-0">联系方式{TBD}</p>
            )}
          </div>
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
      <Loop />
      <ExperienceSection />
      <Work />
      <Research />
      <Capabilities />
      <About />
      <Contact />
    </>
  )
}

import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Code2, Download, ExternalLink } from 'lucide-react'
import { getProject } from '../data/projects'
import type { ProjectLink } from '../data/projects'
import { Cover } from '../components/Cover'
import { ProductDemo } from '../components/demo/ProductDemo'
import { demos } from '../data/demos'
import NotFound from './NotFound'
import { profile } from '../data/profile'

const linkMeta: Record<ProjectLink['kind'], { icon: typeof Code2 }> = {
  demo: { icon: ExternalLink },
  source: { icon: Code2 },
  download: { icon: Download },
  other: { icon: ArrowUpRight },
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10 md:py-14">
      <h2 className="m-0 mb-5 font-serif text-2xl font-bold">{title}</h2>
      {children}
    </section>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    document.title = project ? `${project.title} | ${profile.siteTitle}` : `页面未找到 | ${profile.siteTitle}`
  }, [project])

  if (!project) return <NotFound />

  return (
    <article className="container-x max-w-[56rem]" style={{ paddingTop: 'calc(var(--header-h) + 32px)', paddingBottom: 96 }}>
      <Link to={{ pathname: '/', hash: 'work' }} className="btn mb-8 !px-4">
        <ArrowLeft size={16} aria-hidden /> 返回项目区
      </Link>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag">{project.category}</span>
          {project.isSample && <span className="tag tag-sample">示例模板 / 待替换</span>}
        </div>
        <h1 className="mt-5 mb-0 font-serif text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">{project.title}</h1>
        <p className="mt-5 mb-0 border-l-2 border-accent pl-4 text-[clamp(1.05rem,2vw,1.3rem)] font-semibold leading-relaxed text-fg">
          {project.pitch}
        </p>
        <p className="lead mt-4">{project.overview}</p>
        {demos[project.slug] && (
          <a href="#demo" className="btn mt-6 !px-4">
            查看演示流程 ↓
          </a>
        )}
      </header>

      <div className="card mt-10 aspect-[16/9] overflow-hidden text-[clamp(14px,2.4vw,22px)]">
        <Cover project={project} />
      </div>

      {demos[project.slug] && <ProductDemo demo={demos[project.slug]} accent={project.coverTone[1]} />}

      <Block title="概览">
        <dl className="m-0 grid gap-4 sm:grid-cols-2">
          <div className="card p-5">
            <dt className="text-sm text-muted">我的角色</dt>
            <dd className="m-0 mt-1">{project.role}</dd>
          </div>
          <div className="card p-5">
            <dt className="text-sm text-muted">结果</dt>
            <dd className="m-0 mt-1">{project.result}</dd>
          </div>
        </dl>
      </Block>

      <Block title="问题与目标">
        <p className="m-0 text-soft">{project.problem}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-muted">
          {project.goals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </Block>

      <Block title="个人贡献">
        <ul className="m-0 list-disc space-y-1 pl-5 text-soft">
          {project.contribution.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Block>

      <Block title="方案与过程">
        <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {project.process.map((s, i) => (
            <li key={s.title} className="card p-5">
              <span className="text-sm font-semibold tabular-nums text-accent">0{i + 1}</span>
              <h3 className="m-0 mt-2 text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-[0.9375rem] text-muted">{s.description}</p>
            </li>
          ))}
        </ol>
      </Block>

      {project.screenshots.length > 0 && (
      <Block title="截图">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {project.screenshots.map((s) => (
            <li key={s.label} className="card flex aspect-[16/10] items-center justify-center overflow-hidden text-sm text-muted">
              {s.src ? (
                <img src={s.src} alt={s.alt ?? s.label} loading="lazy" decoding="async" width={1280} height={800} className="h-full w-full object-cover" />
              ) : (
                s.label
              )}
            </li>
          ))}
        </ul>
      </Block>
      )}

      <Block title="结果与验证">
        <p className="m-0 text-soft">{project.validation}</p>
      </Block>

      <Block title="限制">
        <ul className="m-0 list-disc space-y-1 pl-5 text-muted">
          {project.limitations.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </Block>

      {project.links && project.links.length > 0 && (
        <Block title="相关链接">
          <div className="flex flex-wrap gap-3">
            {project.links.map((l) => {
              const Icon = linkMeta[l.kind].icon
              return (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn">
                  <Icon size={16} aria-hidden /> {l.label}
                </a>
              )
            })}
          </div>
        </Block>
      )}
    </article>
  )
}

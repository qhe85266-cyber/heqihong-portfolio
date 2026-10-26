import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { profile } from '../data/profile'
import { HeroMedia } from './HeroMedia'

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col overflow-hidden bg-bg lg:block"
    >
      {/* 文字层：始终位于左侧，人物头部与眼睛不被遮挡 */}
      <div
        className="container-x relative z-10 flex flex-col lg:min-h-svh lg:justify-center"
        style={{ paddingTop: 'calc(var(--header-h) + 40px)' }}
      >
        <div className="hero-copy max-w-[44rem] pb-10 lg:pb-32">
          <p className="eyebrow">{profile.heroEyebrow}</p>
          <h1 id="hero-title" className="hero-title">
            {profile.name}
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-tagline">{profile.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to={{ pathname: '/', hash: 'loop' }} className="btn btn-primary">
              AI 商业化闭环 <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to={{ pathname: '/', hash: 'experience' }} className="btn">
              项目经历
            </Link>
            <Link to={{ pathname: '/', hash: 'contact' }} className="btn">
              联系我
            </Link>
          </div>
        </div>
      </div>

      {/* 动态肖像：桌面为首屏背景层，移动端为文字下方的独立画面 */}
      <HeroMedia className="relative order-3 aspect-[4/5] w-full sm:aspect-[16/10] lg:absolute lg:inset-0 lg:z-0 lg:aspect-auto" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgb(12 10 8 / 0.78) 0%, rgb(12 10 8 / 0.52) 26%, rgb(12 10 8 / 0.12) 46%, rgb(12 10 8 / 0) 56%), linear-gradient(0deg, var(--color-bg) 0%, rgb(12 10 8 / 0.6) 12%, rgb(12 10 8 / 0) 32%), linear-gradient(180deg, rgb(12 10 8 / 0.6) 0%, rgb(12 10 8 / 0) 14%)',
        }}
      />
      {/* 履历摘要 + 能力关键词 */}
      <div className="relative z-10 order-4 lg:absolute lg:inset-x-0 lg:bottom-0">
        <div className="container-x pb-8 pt-6 lg:pt-0">
          <ul
            aria-label="履历摘要"
            className="m-0 mb-5 flex list-none flex-col gap-1.5 p-0 text-sm text-soft md:flex-row md:flex-wrap md:items-center md:gap-x-4 lg:justify-end"
          >
            {profile.heroAside.map((t, i) => (
              <li key={t} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden className="hidden h-3 w-px bg-line-strong md:block" />}
                {t}
              </li>
            ))}
          </ul>
          <ul
            aria-label="能力关键词"
            className="m-0 flex list-none flex-wrap gap-2 p-0 lg:border-t lg:border-line lg:pt-5"
          >
            {profile.keywords.map((k) => (
              <li key={k} className="tag">
                {k}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

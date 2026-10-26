import { useState } from 'react'
import { Repeat } from 'lucide-react'
import { loopSteps, pricing, serviceTiers } from '../data/profile'
import { handleTabKeys } from '../lib/tabs'
import { Reveal } from './Reveal'

/** AI 商业化闭环：五步切换 + 定价公式 + 服务边界。 */
export function CommercialLoop() {
  const [active, setActive] = useState(0)
  const step = loopSteps[active]

  return (
    <>
      <Reveal>
        <div
          role="tablist"
          aria-label="AI 商业化闭环的五个步骤"
          onKeyDown={(e) => handleTabKeys(e, loopSteps.length, active, setActive)}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-10 md:px-10 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {loopSteps.map((s, i) => {
            const selected = i === active
            return (
              <button
                key={s.title}
                id={`loop-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="loop-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative min-w-[176px] shrink-0 rounded-2xl border p-4 text-left transition-colors lg:min-w-0 lg:rounded-none lg:border-0 lg:border-t-2 lg:bg-transparent lg:px-0 lg:pt-5 lg:pr-6 lg:pb-3 lg:hover:bg-transparent ${
                  selected
                    ? 'border-accent/50 bg-accent/[0.08] lg:border-accent'
                    : 'border-line bg-panel/70 hover:bg-panel lg:border-line-strong lg:hover:border-fg/40'
                }`}
              >
                <span className={`text-sm font-semibold tabular-nums ${selected ? 'text-accent' : 'text-muted'}`}>
                  0{i + 1}
                </span>
                <span className={`mt-1 block font-serif text-lg leading-snug font-bold ${selected ? 'text-fg' : 'text-soft'}`}>
                  {s.title}
                </span>
                <span className="mt-1 block text-sm text-muted">{s.short}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <div
        id="loop-panel"
        role="tabpanel"
        aria-labelledby={`loop-tab-${active}`}
        key={active}
        className="card mt-6 grid animate-[fadeUp_.4s_ease] gap-8 p-6 md:p-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14"
      >
        <div className="flex flex-col">
          <p className="m-0 text-xs font-semibold tracking-[0.2em] text-accent">要回答的问题</p>
          <p className="m-0 mt-3 font-serif text-[clamp(1.375rem,2.4vw,1.875rem)] leading-snug font-bold text-balance">
            {step.question}
          </p>
          <div className="mt-6 border-t border-line pt-5 lg:mt-auto">
            <p className="m-0 text-xs font-semibold tracking-[0.2em] text-muted">在领星的实践</p>
            <p className="m-0 mt-2 text-[0.9375rem] leading-[1.8] text-soft">{step.proof}</p>
          </div>
        </div>
        <div>
          <p className="m-0 text-xs font-semibold tracking-[0.2em] text-muted">怎么做</p>
          <ul className="m-0 mt-3 flex list-none flex-col gap-3 p-0">
            {step.actions.map((a) => (
              <li key={a} className="flex gap-3 text-[0.9375rem] leading-[1.75] text-soft">
                <span aria-hidden className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {a}
              </li>
            ))}
          </ul>
          <dl className="m-0 mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold tracking-[0.2em] text-muted">交付物</dt>
              <dd className="m-0 mt-2 text-[0.9375rem] text-fg">{step.deliverable}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.2em] text-muted">看什么</dt>
              <dd className="m-0 mt-2 flex flex-wrap gap-2">
                {step.metrics.map((m) => (
                  <span key={m} className="tag">
                    {m}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <p className="m-0 mt-4 flex items-center gap-2 text-sm text-soft">
        <Repeat size={16} aria-hidden className="shrink-0 text-accent" />
        续费与增购带来新需求，闭环回到第一步。
      </p>

      <div className="mt-16 grid gap-4 md:mt-24 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="h-full">
          <div className="card flex h-full flex-col p-6 md:p-10">
            <p className="eyebrow">Pricing</p>
            <h3 className="m-0 font-serif text-2xl font-bold">报价，先算清交付成本</h3>
            <p className="m-0 mt-8 font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-bold">
              <span className="text-accent">报价</span> = {pricing.base.join(' + ')}
            </p>
            <p className="m-0 mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-serif text-[clamp(1.125rem,2vw,1.375rem)] font-bold text-soft">
                + {pricing.hidden.join(' · ')}
              </span>
              <span className="text-xs tracking-[0.12em] text-muted">最容易漏算的投入</span>
            </p>
            <div className="mt-8 border-t border-line pt-6 lg:mt-auto">
              <p className="m-0 text-xs tracking-[0.12em] text-muted">报价依据</p>
              <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
                {pricing.factors.map((f) => (
                  <li key={f} className="tag">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-5 text-[0.9375rem] leading-[1.8] text-soft">{pricing.note}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={90} className="h-full">
          <div className="card h-full p-6 md:p-10">
            <p className="eyebrow">Service boundary</p>
            <h3 className="m-0 font-serif text-2xl font-bold">三条服务边界</h3>
            <ol className="m-0 mt-6 list-none p-0">
              {serviceTiers.map((t, i) => (
                <li key={t.name} className="grid gap-1 border-t border-line py-4 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-5">
                  <span className="font-semibold text-fg">
                    <span className="mr-2 text-xs tabular-nums text-accent">0{i + 1}</span>
                    {t.name}
                  </span>
                  <span className="text-[0.9375rem] leading-[1.75] text-soft">
                    {t.scope}
                    <span className="mt-1 block text-sm text-muted">{t.billing}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </>
  )
}

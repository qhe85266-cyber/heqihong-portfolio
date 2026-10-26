import { useState } from 'react'
import { Check } from 'lucide-react'
import { experiences, type Outcome, type OutcomeGroup } from '../data/experience'
import { handleTabKeys } from '../lib/tabs'

const GROUP_ORDER: OutcomeGroup[] = ['客户价值', 'AI 质量', '商业经营', '能力沉淀']

function groupOutcomes(outcomes: Outcome[]) {
  return GROUP_ORDER.map((name) => ({ name, items: outcomes.filter((o) => o.group === name) })).filter(
    (g) => g.items.length > 0,
  )
}

/** 个人经历：左侧切换经历，右侧案例面板：“客户与模式 → 关键判断 → 阶段 → 分组成果”。 */
export function Experience() {
  const [active, setActive] = useState(0)
  const [stage, setStage] = useState(0)
  const e = experiences[active]
  const groups = groupOutcomes(e.outcomes)
  const selectExperience = (i: number) => {
    setActive(i)
    setStage(0)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[272px_1fr] lg:gap-10">
      <div
        role="tablist"
        aria-label="工作经历"
        onKeyDown={(ev) => handleTabKeys(ev, experiences.length, active, selectExperience)}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-10 md:px-10 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {experiences.map((x, i) => {
          const selected = i === active
          return (
            <button
              key={x.id}
              id={`exp-tab-${x.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`exp-${x.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectExperience(i)}
              className={`relative min-w-[220px] shrink-0 rounded-2xl border py-4 pr-4 pl-5 text-left transition-colors lg:min-w-0 ${
                selected ? 'border-line-strong bg-raised' : 'border-line bg-panel/60 hover:bg-panel'
              }`}
            >
              <span
                aria-hidden
                className="absolute top-4 bottom-4 left-0 w-[3px] rounded-full bg-accent transition-opacity"
                style={{ opacity: selected ? 1 : 0 }}
              />
              <span className="block text-xs tabular-nums text-muted">{x.period}</span>
              <span className={`mt-1 block text-lg font-bold ${selected ? 'text-fg' : 'text-soft'}`}>{x.company}</span>
              <span className="block text-sm text-soft">{x.product}</span>
              <span className="block text-xs text-muted">{x.role}</span>
            </button>
          )
        })}
      </div>

      <div
        id={`exp-${e.id}`}
        role="tabpanel"
        aria-labelledby={`exp-tab-${e.id}`}
        key={e.id}
        className="card animate-[fadeUp_.5s_ease] p-6 md:p-10"
      >
        <p className="m-0 text-sm text-muted">
          {e.company} · {e.role} · {e.city}
        </p>
        {e.meta && (
          <dl className="m-0 mt-4 flex flex-wrap gap-2">
            {e.meta.map((m) => (
              <div key={m.label} className="tag gap-2">
                <dt className="text-muted">{m.label}</dt>
                <dd className="m-0 text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <h3 className="m-0 mt-6 font-serif text-[clamp(1.5rem,2.8vw,2.125rem)] font-bold leading-snug text-balance">
          {e.headline}
        </h3>
        <p className="m-0 mt-4 text-[0.9375rem] leading-[1.85] text-soft">{e.context}</p>

        <div className="mt-7 rounded-2xl border border-accent/30 bg-accent/[0.07] p-5 md:p-6">
          <p className="m-0 text-xs font-semibold tracking-[0.2em] text-accent">关键判断</p>
          <p className="m-0 mt-2 leading-[1.85] text-fg">{e.insight}</p>
        </div>

        <div className="mt-8">
          <div
            role="tablist"
            aria-label="项目阶段"
            onKeyDown={(ev) => handleTabKeys(ev, e.stages.length, stage, setStage)}
            className="flex flex-wrap gap-2"
          >
            {e.stages.map((s, i) => (
              <button
                key={s.title}
                id={`exp-stage-tab-${e.id}-${i}`}
                role="tab"
                type="button"
                aria-selected={i === stage}
                aria-controls={`exp-stage-${e.id}`}
                tabIndex={i === stage ? 0 : -1}
                onClick={() => setStage(i)}
                className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
                  i === stage
                    ? 'border-accent bg-accent font-semibold text-bg'
                    : 'border-line-strong text-soft hover:border-fg/40 hover:text-fg'
                }`}
              >
                <span className="tabular-nums">0{i + 1}</span> {s.title}
              </button>
            ))}
          </div>
          <p
            id={`exp-stage-${e.id}`}
            role="tabpanel"
            aria-labelledby={`exp-stage-tab-${e.id}-${stage}`}
            key={stage}
            className="m-0 mt-4 min-h-[5.5rem] animate-[fadeUp_.35s_ease] text-[0.9375rem] leading-[1.85] text-soft"
          >
            {e.stages[stage].body}
          </p>
        </div>

        <div className="mt-6 border-t border-line pt-6">
          <p className="m-0 text-xs font-semibold tracking-[0.2em] text-muted">成果</p>
          <div className={`mt-4 grid gap-x-8 gap-y-6 ${groups.length > 1 ? 'md:grid-cols-3' : ''}`}>
            {groups.map((g) => (
              <div key={g.name}>
                <p className="m-0 text-sm font-semibold text-accent">{g.name}</p>
                <ul className="m-0 mt-3 flex list-none flex-col gap-4 p-0">
                  {g.items.map((o) =>
                    o.value ? (
                      <li key={o.label} className="border-t border-line pt-3">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-[1.625rem] leading-tight font-light tracking-tight text-fg tabular-nums">
                            {o.value}
                          </span>
                          {o.target && <span className="tag-target">目标</span>}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-soft">{o.label}</span>
                      </li>
                    ) : (
                      <li key={o.label} className="flex gap-2 border-t border-line pt-3 text-sm leading-relaxed text-soft">
                        <Check size={16} aria-hidden className="mt-1 shrink-0 text-accent" />
                        {o.label}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
          {e.outcomes.some((o) => o.target) && (
            <p className="m-0 mt-5 text-xs text-muted">标注“目标”的为项目设定的目标值，不是已达成的结果。</p>
          )}
        </div>

        <ul className="m-0 mt-8 flex list-none flex-wrap gap-2 p-0" aria-label="能力标签">
          {e.skills.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Check } from 'lucide-react'
import { experiences } from '../data/experience'

const accents = ['#956BFF', '#3fd0c9', '#5b8cff', '#f2a65a']

/** 个人经历：左侧公司时间线切换，右侧展开"关键判断 → 过程 → 结果"。 */
export function Experience() {
  const [active, setActive] = useState(0)
  const [stage, setStage] = useState(0)
  const e = experiences[active]
  const accent = accents[active % accents.length]

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
      <div role="tablist" aria-label="工作经历" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {experiences.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`exp-${x.id}`}
            onClick={() => {
              setActive(i)
              setStage(0)
            }}
            className={`relative min-w-[200px] shrink-0 rounded-2xl border p-4 text-left transition-colors lg:min-w-0 ${
              i === active ? 'border-white/25 bg-white/[0.06]' : 'border-line bg-transparent hover:bg-white/[0.03]'
            }`}
          >
            <span
              className="absolute top-4 bottom-4 left-0 w-[3px] rounded-full transition-opacity"
              style={{ background: accents[i % accents.length], opacity: i === active ? 1 : 0 }}
            />
            <span className="block text-xs tabular-nums text-muted">{x.period}</span>
            <span className="mt-1 block text-lg font-bold text-white">{x.company}</span>
            <span className="block text-sm text-muted">
              {x.product} · {x.role}
            </span>
          </button>
        ))}
      </div>

      <div id={`exp-${e.id}`} role="tabpanel" key={e.id} className="animate-[fadeUp_.5s_ease]">
        <p className="m-0 text-sm text-muted">
          {e.project} · {e.city}
        </p>
        <h3 className="m-0 mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-tight">{e.headline}</h3>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{e.context}</p>

        <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: `${accent}55`, background: `${accent}12` }}>
          <p className="m-0 text-xs font-semibold tracking-[0.2em]" style={{ color: accent }}>
            关键判断
          </p>
          <p className="m-0 mt-2 leading-relaxed text-[#e4e4ee]">{e.insight}</p>
        </div>

        <div className="mt-8">
          <div role="tablist" aria-label="项目阶段" className="flex flex-wrap gap-2">
            {e.stages.map((s, i) => (
              <button
                key={s.title}
                role="tab"
                type="button"
                aria-selected={i === stage}
                onClick={() => setStage(i)}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors"
                style={
                  i === stage
                    ? { borderColor: accent, background: accent, color: '#0b0b12', fontWeight: 600 }
                    : { borderColor: 'rgba(255,255,255,.12)', color: '#d0d0dc' }
                }
              >
                <span className="tabular-nums">0{i + 1}</span> {s.title}
              </button>
            ))}
          </div>
          <p key={stage} className="m-0 mt-4 min-h-[4.5rem] animate-[fadeUp_.35s_ease] text-[0.9375rem] leading-relaxed text-[#d0d0dc]">
            {e.stages[stage].body}
          </p>
        </div>

        <div className="mt-6">
          <p className="m-0 text-xs font-semibold tracking-[0.2em] text-muted">成果</p>
          <ul className="m-0 mt-3 grid list-none gap-3 p-0 sm:grid-cols-3">
            {e.outcomes.map((o) => (
              <li key={o} className="card flex gap-3 p-4 text-sm leading-relaxed text-[#d0d0dc]">
                <Check size={16} aria-hidden className="mt-0.5 shrink-0" style={{ color: accent }} />
                {o}
              </li>
            ))}
          </ul>
        </div>
        <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0" aria-label="能力标签">
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

import type { ProjectDemo } from '../../data/demos'
import { DemoScreen } from './DemoScreen'

export function ProductDemo({ demo, accent }: { demo: ProjectDemo; accent: string }) {
  return (
    <section id="demo" className="scroll-mt-24 border-t border-line py-12 md:py-16">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="m-0 text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: accent }}>
            Product demo
          </p>
          <h2 className="m-0 mt-3 text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-none tracking-tight">从输入到结果</h2>
        </div>
        <p className="m-0 max-w-sm text-sm text-muted">{demo.intro}</p>
      </div>

      <dl className="m-0 mb-8 grid grid-cols-3 gap-3">
        {demo.highlights.map((h) => (
          <div key={h.label} className="card p-4">
            <dt className="text-[11px] tracking-wider text-muted">{h.label}</dt>
            <dd className="m-0 mt-1 text-base font-bold sm:text-lg">{h.value}</dd>
          </div>
        ))}
      </dl>

      <ol className="m-0 flex list-none flex-col gap-6 p-0">
        {demo.steps.map((s, i) => (
          <li key={s.title} className="card grid overflow-hidden lg:grid-cols-[0.36fr_0.64fr]">
            <div className="flex flex-col justify-between border-b border-line p-6 lg:border-b-0 lg:border-r lg:p-8">
              <span className="text-5xl font-extrabold italic leading-none tabular-nums" style={{ color: accent }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mt-8 lg:mt-20">
                <p className="m-0 text-[10px] tracking-[0.18em] text-muted uppercase">Step {String(i + 1).padStart(2, '0')}</p>
                <h3 className="m-0 mt-2 text-xl font-bold leading-snug">{s.title}</h3>
                <p className="m-0 mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
              </div>
            </div>
            <figure
              className="m-0 flex min-h-[300px] items-center justify-center p-5 sm:p-8"
              style={{ background: `radial-gradient(circle at center, ${accent}2e, transparent 70%)` }}
            >
              <div className="w-full max-w-[560px]">
                <DemoScreen screen={s.screen} accent={accent} app={demo.app} />
              </div>
              <figcaption className="sr-only">{s.title}（示意界面）</figcaption>
            </figure>
          </li>
        ))}
      </ol>
      <p className="m-0 mt-4 text-xs text-muted">以上界面为根据产品流程绘制的示意图，非真实运行截图。</p>
    </section>
  )
}

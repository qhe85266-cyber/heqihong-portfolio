import type { DemoScreen as Screen } from '../../data/demos'

/** 用代码绘制的示意界面（非真实截图），按项目主色着色。 */
export function DemoScreen({ screen, accent, app }: { screen: Screen; accent: string; app: string }) {
  const body = <Body screen={screen} accent={accent} />
  if (screen.frame === 'phone') {
    return (
      <div className="mx-auto w-[min(260px,70%)] rounded-[34px] border border-white/15 bg-[#0b0b12] p-2 shadow-2xl">
        <div className="overflow-hidden rounded-[27px] bg-[#f6f6f9] text-[#16161d]">
          <div className="flex items-center justify-between px-5 pt-3 pb-2 text-[10px] font-semibold">
            <span>9:41</span>
            <span className="h-4 w-16 rounded-full bg-black" />
            <span>100%</span>
          </div>
          <div className="px-4 pb-1 text-[15px] font-bold">{app}</div>
          <div className="min-h-[360px] px-3 pb-4">{body}</div>
        </div>
      </div>
    )
  }
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#f7f7fa] text-[#16161d] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-black/5 bg-white px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-black/5 px-3 py-1 text-[10px] text-black/50">{app}</span>
      </div>
      <div className="min-h-[280px] p-4 text-[12px] sm:min-h-[320px] sm:p-5">{body}</div>
    </div>
  )
}

const soft = (c: string) => `${c}26`

function Body({ screen, accent }: { screen: Screen; accent: string }) {
  switch (screen.type) {
    case 'chat':
      return (
        <div className="flex flex-col gap-2.5">
          {screen.messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[80%] whitespace-pre-line rounded-2xl px-3 py-2 text-[12px] leading-relaxed"
                style={m.from === 'user' ? { background: accent, color: '#fff' } : { background: '#fff', border: '1px solid #0000000f' }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {screen.chips && (
            <div className="mt-1 flex flex-wrap gap-2">
              {screen.chips.map((c) => (
                <span key={c} className="rounded-full px-3 py-1 text-[11px] font-medium" style={{ background: soft(accent), color: accent }}>
                  {c}
                </span>
              ))}
            </div>
          )}
          {screen.input && (
            <div className="mt-2 flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-[11px] text-black/40">
              <span className="flex-1">{screen.input}</span>
              <span className="h-5 w-5 rounded-full" style={{ background: accent }} />
            </div>
          )}
        </div>
      )
    case 'list':
      return (
        <div>
          {screen.title && <p className="m-0 mb-2 text-[13px] font-bold">{screen.title}</p>}
          {screen.tabs && (
            <div className="mb-3 flex gap-1.5">
              {screen.tabs.map((t, i) => (
                <span key={t} className="rounded-full px-2.5 py-1 text-[10px] font-medium" style={i === 0 ? { background: accent, color: '#fff' } : { background: '#0000000a' }}>
                  {t}
                </span>
              ))}
            </div>
          )}
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {screen.items.map((it, i) => (
              <li key={i} className="rounded-lg border border-black/5 bg-white p-2.5" style={it.highlight ? { borderColor: accent, boxShadow: `0 0 0 2px ${soft(accent)}` } : undefined}>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[12px] font-semibold leading-snug">{it.title}</span>
                  {it.badge && (
                    <span className="shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold" style={{ background: soft(accent), color: accent }}>
                      {it.badge}
                    </span>
                  )}
                </div>
                {it.meta && <p className="m-0 mt-1 text-[10px] leading-snug text-black/50">{it.meta}</p>}
              </li>
            ))}
          </ul>
        </div>
      )
    case 'form':
      return (
        <div className="flex flex-col gap-2.5">
          {screen.title && <p className="m-0 text-[13px] font-bold">{screen.title}</p>}
          {screen.fields.map((f) => (
            <label key={f.label} className="block">
              <span className="text-[10px] text-black/50">{f.label}</span>
              <span className="mt-1 block rounded-md border border-black/10 bg-white px-2.5 py-1.5 text-[12px]">{f.value}</span>
            </label>
          ))}
          {screen.note && <p className="m-0 text-[10px]" style={{ color: accent }}>{screen.note}</p>}
          <span className="mt-1 self-start rounded-md px-4 py-1.5 text-[12px] font-semibold text-white" style={{ background: accent }}>
            {screen.button}
          </span>
        </div>
      )
    case 'table':
      return (
        <div>
          {screen.title && <p className="m-0 mb-2 text-[13px] font-bold">{screen.title}</p>}
          <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-left text-[10px]">
            <thead>
              <tr style={{ background: soft(accent) }}>
                {screen.columns.map((c) => (
                  <th key={c} className="px-2 py-1.5 font-semibold">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {screen.rows.map((r, i) => (
                <tr key={i} className="border-t border-black/5">
                  {r.map((c, j) => (
                    <td key={j} className={`px-2 py-1.5 align-top ${c === '待核实' ? 'text-[#c2410c]' : ''} ${j === 0 ? 'font-semibold' : 'text-black/70'}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {screen.footer && (
            <div className="mt-3 flex items-center justify-between text-[10px] text-black/50">
              <span>{screen.footer}</span>
              <span className="rounded-md px-3 py-1 font-semibold text-white" style={{ background: accent }}>下载 .md</span>
            </div>
          )}
        </div>
      )
    case 'editor':
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <pre className="m-0 overflow-hidden rounded-lg bg-[#1b1d2a] p-3 font-mono text-[10.5px] leading-relaxed text-[#cfd3ff]">
            {screen.code.join('\n')}
          </pre>
          <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-black/5 bg-white p-3">
            {screen.nodes.map((n, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                {i > 0 && <span className="h-3 w-px bg-black/30" />}
                <span className="rounded-md border px-3 py-1 text-[11px] font-medium" style={{ borderColor: accent, background: i === screen.nodes.length - 1 ? soft(accent) : '#fff' }}>
                  {n}
                </span>
              </div>
            ))}
            {screen.toolbar && (
              <div className="mt-2 flex gap-1.5">
                {screen.toolbar.map((t) => (
                  <span key={t} className="rounded bg-black/5 px-2 py-0.5 text-[9px]">{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )
    case 'doc':
      return (
        <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
          <aside className="hidden flex-col gap-1 sm:flex">
            {screen.sidebar.map((s, i) => (
              <span key={s} className="rounded px-2 py-1 text-[10px]" style={i === 0 ? { background: soft(accent), color: accent, fontWeight: 600 } : { color: '#0008' }}>
                {s}
              </span>
            ))}
          </aside>
          <div className="rounded-lg border border-black/5 bg-white p-3">
            <p className="m-0 mb-2 text-[13px] font-bold">{screen.title}</p>
            <ul className="m-0 flex list-disc flex-col gap-1.5 pl-4 text-[11px] leading-relaxed">
              {screen.lines.map((l, i) => (
                <li key={i}>
                  {l.split(/(\[\[[^\]]+\]\]|#\S+)/).map((part, k) =>
                    /^(\[\[|#)/.test(part) ? (
                      <span key={k} className="rounded px-1 font-medium" style={{ background: soft(accent), color: accent }}>
                        {part}
                      </span>
                    ) : (
                      part
                    ),
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    case 'card':
      return (
        <div className={`flex items-center justify-center rounded-lg p-4 ${screen.dark ? 'bg-[#15151f]' : ''}`}>
          <div className={`w-full max-w-[300px] rounded-2xl p-5 shadow-lg ${screen.dark ? 'bg-[#22222f] text-white' : 'bg-white'}`}>
            <div className="flex items-center gap-3">
              <span className="h-12 w-12 rounded-full" style={{ background: `linear-gradient(135deg, ${accent}, #fff)` }} />
              <div>
                <p className="m-0 text-[14px] font-bold">{screen.name}</p>
                <p className="m-0 text-[10px] opacity-60">{screen.role}</p>
              </div>
              <span className="ml-auto rounded-full border px-2 py-0.5 text-[9px] opacity-70">{screen.dark ? '深色' : '浅色'}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {screen.skills.map((s) => (
                <span key={s} className="rounded-full px-2 py-0.5 text-[10px]" style={{ background: soft(accent), color: screen.dark ? '#fff' : accent }}>
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-1 text-[10px] opacity-70">
              {screen.contacts.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      )
  }
}

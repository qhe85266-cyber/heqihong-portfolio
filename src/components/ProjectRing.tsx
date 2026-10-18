import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { Cover } from './Cover'

const AUTOPLAY_MS = 4500

/** 3D 环形转盘：拖拽 / 方向键 / 按钮切换，正面卡片可进入详情。 */
export function ProjectRing({ projects }: { projects: Project[] }) {
  const n = projects.length
  const step = 360 / n
  const [index, setIndex] = useState(0) // 不取模，保证旋转方向连续
  const [drag, setDrag] = useState(0) // 拖拽中的额外角度
  const [paused, setPaused] = useState(false)
  const [radius, setRadius] = useState(420)
  const start = useRef<{ x: number; moved: boolean } | null>(null)
  const reduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const active = ((index % n) + n) % n
  const go = useCallback((d: number) => setIndex((i) => i + d), [])

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const card = w < 640 ? 260 : 340
      // 半径由卡片宽度和数量决定，留出间距
      setRadius(Math.round((card / 2 / Math.tan(Math.PI / n)) * 1.15))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [n])

  useEffect(() => {
    if (paused || reduced.current) return
    const t = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(t)
  }, [paused, go])

  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    if (Math.abs(dx) > 6 && !start.current.moved) {
      start.current.moved = true
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    }
    if (start.current.moved) setDrag(dx * 0.25)
  }
  const endDrag = () => {
    if (!start.current) return
    if (start.current.moved) {
      const shift = Math.round(drag / step)
      if (shift) go(-shift)
    }
    setDrag(0)
    setTimeout(() => (start.current = null), 0)
  }

  const rotation = -index * step + drag

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1)
        if (e.key === 'ArrowRight') go(1)
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="代表项目转盘"
    >
      <div
        className="relative mx-auto h-[460px] cursor-grab touch-pan-y active:cursor-grabbing sm:h-[520px]"
        style={{ perspective: '1600px' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* 地面光晕 */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-[50%] bg-violet/25 blur-3xl"
        />
        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(${-radius}px) rotateY(${rotation}deg)`,
            transition: drag ? 'none' : 'transform 900ms cubic-bezier(.2,.8,.2,1)',
          }}
        >
          {projects.map((p, i) => {
            const isActive = i === active
            return (
              <article
                key={p.slug}
                aria-hidden={!isActive}
                className="absolute w-[260px] -translate-x-1/2 -translate-y-1/2 sm:w-[340px]"
                style={{
                  transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                }}
                onClick={(e) => {
                  if (start.current?.moved) return e.preventDefault()
                  if (!isActive) {
                    e.preventDefault()
                    let d = i - active
                    if (d > n / 2) d -= n
                    if (d < -n / 2) d += n
                    go(d)
                  }
                }}
              >
                <div
                  className={`card relative flex flex-col overflow-hidden transition-[opacity,filter,box-shadow] duration-700 ${
                    isActive ? 'opacity-100 shadow-[0_30px_80px_-20px_rgba(149,107,255,.55)]' : 'opacity-50 brightness-75'
                  }`}
                >
                  <div className="pointer-events-none aspect-[16/10] overflow-hidden text-[11px] sm:text-[14px]">
                    <Cover project={p} />
                  </div>
                  <div className="flex flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="tag">{p.category}</span>
                      {p.isSample && <span className="tag tag-sample">示例</span>}
                    </div>
                    <h3 className="m-0 mt-3 text-lg font-bold leading-snug">
                      <Link
                        to={`/projects/${p.slug}`}
                        draggable={false}
                        tabIndex={isActive ? 0 : -1}
                        className="text-white no-underline after:absolute after:inset-0 after:content-['']"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <p className="m-0 mt-2 line-clamp-3 text-sm leading-relaxed text-[#d0d0dc]">{p.pitch}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan">
                      查看详情 <ArrowUpRight size={16} aria-hidden />
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button type="button" onClick={() => go(-1)} aria-label="上一个项目" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-black/40 text-white backdrop-blur transition hover:border-violet hover:text-violet">
          <ChevronLeft size={20} aria-hidden />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="选择项目">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={p.title}
              onClick={() => {
                let d = i - active
                if (d > n / 2) d -= n
                if (d < -n / 2) d += n
                go(d)
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === active ? 'w-8 bg-violet' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="下一个项目" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-black/40 text-white backdrop-blur transition hover:border-violet hover:text-violet">
          <ChevronRight size={20} aria-hidden />
        </button>
      </div>
      <p className="mt-3 text-center text-xs tabular-nums text-muted" aria-live="polite">
        {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {projects[active].title}
      </p>
    </div>
  )
}

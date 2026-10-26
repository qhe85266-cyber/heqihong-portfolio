import { useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Tool } from '../data/tools'

const SWIPE_THRESHOLD = 40

/**
 * 工具栈轮播：中心卡片突出，两侧缩小后退。
 * 按钮 / 圆点 / 键盘 / 触摸滑动 / 点击两侧卡片共用同一个 index 状态；
 * 边界处不循环，上一张 / 下一张在首尾禁用。不自动轮播。
 */
export function ToolCarousel({ tools }: { tools: Tool[] }) {
  const [index, setIndex] = useState(Math.min(1, tools.length - 1))
  const start = useRef<{ x: number; y: number; id: number } | null>(null)
  const swiped = useRef(false)
  const last = tools.length - 1

  const go = (i: number) => setIndex(Math.max(0, Math.min(last, i)))
  const step = (d: number) => setIndex((c) => Math.max(0, Math.min(last, c + d)))

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      go(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      go(last)
    }
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId }
    swiped.current = false
  }
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const s = start.current
    start.current = null
    if (!s) return
    const dx = e.clientX - s.x
    const dy = e.clientY - s.y
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true
      step(dx < 0 ? 1 : -1)
    }
  }

  if (tools.length === 0) return null

  return (
    <div>
      <div
        role="group"
        aria-roledescription="轮播"
        aria-label="工具栈"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (start.current = null)}
        className="relative mx-auto h-[380px] w-full max-w-5xl overflow-hidden select-none sm:h-[360px]"
        style={{ touchAction: 'pan-y' }}
      >
        {tools.map((tool, i) => {
          const offset = i - index
          const abs = Math.abs(offset)
          const active = offset === 0
          return (
            <div
              key={tool.name}
              role="group"
              aria-roledescription="幻灯片"
              aria-label={`${i + 1} / ${tools.length}`}
              aria-hidden={!active}
              onClick={() => {
                if (swiped.current) {
                  swiped.current = false
                  return
                }
                if (!active) go(i)
              }}
              className="card absolute left-1/2 top-1/2 w-[68%] max-w-[380px] cursor-pointer p-6 sm:p-8"
              style={{
                transform: `translate(calc(-50% + ${offset * 72}%), -50%) scale(${active ? 1 : 1 - 0.14 * abs})`,
                opacity: abs > 2 ? 0 : active ? 1 : 0.45 - (abs - 1) * 0.2,
                zIndex: 10 - abs,
                pointerEvents: abs > 2 ? 'none' : 'auto',
                transition: 'transform 0.45s cubic-bezier(.2,.7,.2,1), opacity 0.45s ease, border-color 0.25s',
                borderColor: active ? 'rgb(212 163 115 / 0.5)' : undefined,
                boxShadow: active ? '0 20px 60px -24px rgb(212 163 115 / 0.3)' : undefined,
              }}
            >
              <span className="tag">{tool.category}</span>
              <h3 className="m-0 mt-5 text-2xl font-bold">{tool.name}</h3>
              <p className="mt-3 text-[0.9375rem] text-muted">{tool.description}</p>
              {tool.isSample && <span className="tag tag-sample mt-4">示例 / 待替换</span>}
              {tool.href && active && (
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent no-underline"
                >
                  官网 ↗
                </a>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          className="btn !px-0 w-11 shrink-0 disabled:cursor-not-allowed disabled:opacity-35"
          aria-label="上一个工具"
          disabled={index === 0}
          onClick={() => step(-1)}
        >
          <ChevronLeft size={20} aria-hidden />
        </button>
        <div className="flex items-center" role="group" aria-label="选择工具">
          {tools.map((tool, i) => (
            <button
              key={tool.name}
              type="button"
              aria-label={`第 ${i + 1} 个：${tool.name}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
              className="inline-flex h-11 w-6 items-center justify-center sm:w-8"
            >
              <span
                className="block h-2 rounded-full transition-all"
                style={{
                  width: i === index ? 24 : 8,
                  background: i === index ? 'var(--color-accent)' : 'rgb(243 238 230 / 0.28)',
                }}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn !px-0 w-11 shrink-0 disabled:cursor-not-allowed disabled:opacity-35"
          aria-label="下一个工具"
          disabled={index === last}
          onClick={() => step(1)}
        >
          <ChevronRight size={20} aria-hidden />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        当前：{tools[index].name}，第 {index + 1} 个，共 {tools.length} 个
      </p>
    </div>
  )
}

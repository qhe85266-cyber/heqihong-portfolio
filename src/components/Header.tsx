import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navItems } from '../data/profile'

const SECTION_IDS = navItems.map((item) => item.hash)

/** 首页滚动高亮：返回与视口上部"阅读带"相交的导航区块；首屏与定位区不高亮任何一项。 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        setActive(SECTION_IDS.find((id) => visible.has(id)) ?? null)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [enabled])
  return enabled ? active : null
}

// 注意：页头左上角刻意不放姓名、Logo 或任何品牌文字。
export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const active = useActiveSection(location.pathname === '/')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = useCallback((returnFocus = true) => {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }, [])

  // 路由 / 锚点变化后关闭菜单
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  // 滚动锁定、Esc、焦点管理与焦点陷阱
  useEffect(() => {
    if (!open) return
    document.body.classList.add('scroll-locked')
    const links = panelRef.current?.querySelectorAll<HTMLElement>('a,button')
    links?.[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = [
        buttonRef.current,
        ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a,button') ?? []),
      ].filter(Boolean) as HTMLElement[]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    // 桌面宽度下自动关闭
    const mq = window.matchMedia('(min-width: 768px)')
    const onMq = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onMq)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('scroll-locked')
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open, close])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50" style={{ height: 'var(--header-h)' }}>
      <div className="container-x relative z-10 flex h-full items-center justify-end md:justify-center">
        {/* 桌面：悬浮胶囊导航 */}
        <nav aria-label="主导航" className="pointer-events-auto hidden md:block">
          <ul
            className={`m-0 flex list-none items-center gap-0.5 rounded-full border p-1 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${
              scrolled
                ? 'border-line-strong bg-panel/85 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.7)]'
                : 'border-line bg-bg/45'
            }`}
          >
            {navItems.map((item) => {
              const current = active === item.hash
              return (
                <li key={item.hash}>
                  <Link
                    to={{ pathname: '/', hash: item.hash }}
                    aria-current={current ? 'location' : undefined}
                    className={`inline-flex min-h-10 items-center rounded-full px-4 text-[0.9375rem] no-underline transition-colors ${
                      current ? 'bg-fg/10 text-fg' : 'text-soft hover:text-fg'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg/60 text-fg backdrop-blur-md md:hidden"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => (open ? close(false) : setOpen(true))}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="pointer-events-auto fixed inset-0 overflow-y-auto bg-bg md:hidden"
          style={{ paddingTop: 'var(--header-h)' }}
        >
          <nav aria-label="移动端导航" className="container-x pt-4 pb-10">
            <ul className="m-0 flex list-none flex-col p-0">
              {navItems.map((item, i) => {
                const current = active === item.hash
                return (
                  <li key={item.hash} className="border-b border-line">
                    <Link
                      to={{ pathname: '/', hash: item.hash }}
                      aria-current={current ? 'location' : undefined}
                      className="flex min-h-14 items-center gap-4 font-serif text-xl font-bold text-fg no-underline"
                      onClick={() => setOpen(false)}
                    >
                      <span className={`font-sans text-xs font-semibold tabular-nums ${current ? 'text-accent' : 'text-muted'}`}>
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

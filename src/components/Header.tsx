import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navItems } from '../data/profile'

// 注意：页头左上角刻意不放姓名、Logo 或任何品牌文字。
export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
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

  const bg = scrolled || open ? 'bg-bg/80 backdrop-blur-xl border-b border-line' : 'border-b border-transparent'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${bg}`} style={{ height: 'var(--header-h)' }}>
      <div className="container-x flex h-full items-center justify-end md:justify-center">
        <nav aria-label="主导航" className="hidden md:block">
          <ul className="m-0 flex list-none items-center gap-2 p-0">
            {navItems.map((item) => (
              <li key={item.hash}>
                <Link
                  to={{ pathname: '/', hash: item.hash }}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] text-[#d0d0dc] no-underline transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-black/30 text-white md:hidden"
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
          className="fixed inset-x-0 bottom-0 bg-bg/95 backdrop-blur-xl md:hidden"
          style={{ top: 'var(--header-h)' }}
        >
          <nav aria-label="移动端导航" className="container-x pt-6">
            <ul className="m-0 flex list-none flex-col p-0">
              {navItems.map((item) => (
                <li key={item.hash} className="border-b border-line">
                  <Link
                    to={{ pathname: '/', hash: item.hash }}
                    className="flex min-h-14 items-center text-xl font-semibold text-white no-underline"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

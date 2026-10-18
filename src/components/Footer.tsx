import { ArrowUp } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-wrap items-center justify-end gap-4">
        <button
          type="button"
          className="btn"
          onClick={() => {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
          }}
        >
          返回顶部 <ArrowUp size={16} aria-hidden />
        </button>
      </div>
    </footer>
  )
}

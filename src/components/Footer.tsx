import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-wrap items-center justify-between gap-4">
        <p className="m-0 text-sm text-muted">
          © {new Date().getFullYear()} {profile.name} · {profile.role}
        </p>
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

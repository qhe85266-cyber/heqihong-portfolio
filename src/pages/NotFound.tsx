import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../data/profile'

export default function NotFound() {
  useEffect(() => {
    document.title = `页面未找到 | ${profile.siteTitle}`
  }, [])
  return (
    <section
      className="container-x flex min-h-svh flex-col items-start justify-center"
      style={{ paddingTop: 'var(--header-h)' }}
    >
      <p className="eyebrow">404</p>
      <h1 className="h2 !text-[clamp(2.25rem,6vw,4rem)]">页面未找到</h1>
      <p className="lead mt-4">你访问的页面不存在，或者内容已被移动。</p>
      <Link to="/" className="btn btn-primary mt-8">
        返回首页
      </Link>
    </section>
  )
}

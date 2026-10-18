import { useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const positions = new Map<string, number>()

/**
 * 路由滚动管理：
 * - 带 hash：滚动到对应锚点（页头偏移由 CSS scroll-padding-top 处理）
 * - 前进 / 后退（POP）：恢复该历史记录的滚动位置
 * - 其他：回到顶部
 */
export function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  // 记录当前历史记录的滚动位置
  useEffect(() => {
    const key = location.key
    const onScroll = () => positions.set(key, window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.key])

  useLayoutEffect(() => {
    const instant = (top: number) => window.scrollTo({ top, left: 0, behavior: 'instant' })

    if (navType === 'POP' && positions.has(location.key)) {
      instant(positions.get(location.key)!)
      return
    }
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
        return
      }
    }
    instant(0)
  }, [location.key, location.hash, navType])

  return null
}

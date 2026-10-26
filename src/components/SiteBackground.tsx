import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// Agent Wave：本地 H.264 循环视频（暖焦糖双色调，约 1.2 MB）与同色调静态封面
const VIDEO = '/videos/agent-wave.mp4'
const POSTER = '/images/agent-wave-poster.jpg'

/**
 * 全站氛围背景，固定在最底层：
 * - 首屏与实底区块会盖住它，只在首页的"开窗"区块中透出；
 * - 始终叠加压暗与暗角，文字对比度不依赖视频本身的明暗；
 * - 页面加载完成后才挂载视频，不与首屏肖像视频争抢带宽；
 * - 减少动态模式与内页只显示静态封面。
 */
export function SiteBackground() {
  const reduced = usePrefersReducedMotion()
  const { pathname } = useLocation()
  const [pageLoaded, setPageLoaded] = useState(() => document.readyState === 'complete')
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (pageLoaded) return
    const onLoad = () => setPageLoaded(true)
    window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [pageLoaded])

  const isHome = pathname === '/'
  const playVideo = isHome && pageLoaded && !reduced && !failed

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <img
        src={POSTER}
        alt=""
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {playVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          onError={() => setFailed(true)}
        />
      )}
      <div className={isHome ? 'site-bg-scrim' : 'site-bg-scrim site-bg-scrim--quiet'} />
    </div>
  )
}

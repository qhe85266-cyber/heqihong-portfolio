import { useCallback, useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const POSTER = '/images/personal-hero-v4-caramel.jpg'
const VIDEO = '/videos/personal-hero.mp4'

type Intent = 'auto' | 'play' | 'pause'

/**
 * 首屏动态肖像：视频已包含人物与黑白粒子背景，整段作为首屏画面使用。
 * 循环播放；首屏保持实底，不显示全站的 Agent Wave 动态背景。
 * 先显示静态封面，视频开始播放后淡入；缺失 / 失败 / 自动播放被拦截时保留封面。
 */
export function HeroMedia({ className = '' }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced = usePrefersReducedMotion()

  const [intent, setIntent] = useState<Intent>('auto')
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    // 部分内嵌浏览器从后台切到前台时不派发 visibilitychange，用 focus / pageshow 兜底
    const onVis = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('focus', onVis)
    window.addEventListener('pageshow', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('focus', onVis)
      window.removeEventListener('pageshow', onVis)
    }
  }, [])

  // 用户主动选择优先；减少动态模式默认显示静态封面
  const wantPlay = intent === 'play' ? true : intent === 'pause' ? false : !reduced
  const shouldPlay = wantPlay && inView && pageVisible && !failed && !ended

  useEffect(() => {
    const v = videoRef.current
    if (!v || failed) return
    if (shouldPlay) {
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => setPlaying(false))
    } else if (!v.paused) {
      v.pause()
    }
  }, [shouldPlay, failed, loaded])

  const replay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    setEnded(false)
    setIntent('play')
  }, [])

  const toggle = useCallback(() => {
    if (ended) return replay()
    setIntent(playing ? 'pause' : 'play')
  }, [ended, playing, replay])

  // 未开始播放前（含减少动态模式）显示封面；播放过之后停留在视频当前帧 / 尾帧
  const showVideo = loaded && !failed && started

  const label = ended ? '重新播放首屏动画' : playing ? '暂停首屏动画' : '播放首屏动画'

  return (
    <div ref={wrapRef} className={`overflow-hidden pointer-events-none ${className}`}>
      <img
        src={POSTER}
        alt="何棋宏的肖像：戴眼镜，身穿焦糖棕色衬衫外套与白色圆领 T 恤，背景为黑白粒子波浪"
        width={1672}
        height={941}
        fetchPriority="high"
        decoding="async"
        className="hero-media-el"
      />
      {!failed && (
        <video
          ref={videoRef}
          className="hero-media-el"
          style={{ opacity: showVideo ? 1 : 0, transition: 'opacity 0.6s ease' }}
          poster={POSTER}
          muted
          loop
          playsInline
          preload={reduced ? 'metadata' : 'auto'}
          tabIndex={-1}
          aria-hidden="true"
          onLoadedData={() => setLoaded(true)}
          onPlaying={() => {
            setStarted(true)
            setPlaying(true)
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false)
            setEnded(true)
          }}
          onError={() => setFailed(true)}
        >
          <source src={VIDEO} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      )}
      {/* 移动端：画面上下与背景融合（桌面端由 Hero 的渐变层负责） */}
      <div
        aria-hidden
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--color-bg) 0%, rgb(12 10 8 / 0) 18%, rgb(12 10 8 / 0) 72%, rgb(12 10 8 / 0.6) 100%)',
        }}
      />
      {loaded && !failed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={label}
          title={label}
          data-state={ended ? 'ended' : playing ? 'playing' : 'paused'}
          className="pointer-events-auto absolute bottom-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg/60 text-fg backdrop-blur hover:bg-bg/80 lg:bottom-auto lg:top-24 lg:right-10"
        >
          {ended ? <RotateCcw size={18} aria-hidden /> : playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
        </button>
      )}
    </div>
  )
}

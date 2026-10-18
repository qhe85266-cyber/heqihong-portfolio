import { useCallback, useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'

const POSTER = '/images/personal-hero-v4-caramel.jpg'
const VIDEO = '/videos/personal-hero.mp4'

type Intent = 'auto' | 'play' | 'pause'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/**
 * 首屏动态肖像：视频已包含人物与黑白粒子背景，整段作为首屏画面使用。
 * 视频是转头开场、首尾姿态不一致，因此只播放一次并停留在尾帧，不循环。
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
          background: 'linear-gradient(180deg, #000 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 72%, #07070C 100%)',
        }}
      />
      {loaded && !failed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={label}
          title={label}
          data-state={ended ? 'ended' : playing ? 'playing' : 'paused'}
          className="pointer-events-auto absolute bottom-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur hover:bg-black/70 lg:bottom-auto lg:top-24 lg:right-10"
        >
          {ended ? <RotateCcw size={18} aria-hidden /> : playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
        </button>
      )}
    </div>
  )
}

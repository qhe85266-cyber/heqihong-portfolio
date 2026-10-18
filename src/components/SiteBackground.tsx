import { useEffect, useState } from 'react'

// Agent Wave 动态背景：全站固定在最底层，替换原来的纯黑底色。100% 不透明、无遮罩。
const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4'

export function SiteBackground() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-black">
      <video
        className="h-full w-full object-cover"
        src={BG_VIDEO}
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
      />
    </div>
  )
}

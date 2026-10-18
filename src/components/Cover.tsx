import type { Project } from '../data/projects'

/** 项目封面：有真实图片则展示图片（含尺寸、懒加载），否则显示渐变占位。 */
export function Cover({ project, className = '' }: { project: Project; className?: string }) {
  if (project.cover) {
    const { src, alt, width, height } = project.cover
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  const [a, b] = project.coverTone
  return (
    <div
      role="img"
      aria-label={`${project.title} 的封面占位图`}
      className={`relative h-full w-full ${className}`}
      style={{ background: `radial-gradient(120% 120% at 20% 10%, ${b}66, transparent 60%), linear-gradient(135deg, ${a}, #07070C)` }}
    >
      <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white/80">
        封面待替换
      </span>
    </div>
  )
}

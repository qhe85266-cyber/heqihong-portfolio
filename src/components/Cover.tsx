import { projects, type Project } from '../data/projects'

/**
 * 项目封面：统一的海报式排版——原图作底，叠加品牌色渐变、编号、中英文标题与主张。
 * 原图已含标题排版（coverHasText）时只展示原图。
 */
export function Cover({ project, className = '' }: { project: Project; className?: string }) {
  const [a, b] = project.coverTone
  const no = String(projects.indexOf(project) + 1).padStart(2, '0')

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#07070C] ${className}`}>
      {project.cover ? (
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
          style={{ objectPosition: project.cover.position ?? 'center' }}
        />
      ) : (
        <div className="h-full w-full" style={{ background: `linear-gradient(135deg, ${a}, #07070C)` }} />
      )}

      {!project.coverHasText && (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `linear-gradient(100deg, ${a}f2 0%, ${a}b3 38%, transparent 72%), linear-gradient(0deg, #07070Ccc, transparent 45%)`,
            }}
          />
          <div aria-hidden className="absolute inset-0 flex flex-col justify-between p-[7%] text-white">
            <div className="flex items-center gap-3 text-[0.7em] tracking-[0.25em] uppercase opacity-80">
              <span className="tabular-nums" style={{ color: b }}>
                {no}
              </span>
              <span className="h-px w-8" style={{ background: b }} />
              <span>{project.nameEn}</span>
            </div>
            <div className="max-w-[62%]">
              <p className="m-0 text-[2.1em] font-extrabold leading-none tracking-tight">{project.title}</p>
              <p className="m-0 mt-[0.6em] text-[0.85em] leading-snug text-white/80">{project.tagline}</p>
              <span className="mt-[0.9em] block h-[3px] w-10 rounded-full" style={{ background: b }} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

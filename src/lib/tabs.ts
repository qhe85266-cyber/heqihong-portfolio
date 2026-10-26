import type { KeyboardEvent } from 'react'

const STEP: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

/**
 * WAI-ARIA 标签页键盘交互：方向键切换（首尾循环），Home / End 跳到首尾，并把焦点移到新标签。
 * 挂在 role="tablist" 元素的 onKeyDown 上；标签使用 roving tabindex（选中项 0，其余 -1）。
 */
export function handleTabKeys(
  e: KeyboardEvent<HTMLElement>,
  count: number,
  current: number,
  select: (index: number) => void,
) {
  let next: number
  if (e.key in STEP) next = (current + STEP[e.key] + count) % count
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = count - 1
  else return
  e.preventDefault()
  select(next)
  e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus()
}

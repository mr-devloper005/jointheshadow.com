'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

/*
  Wraps the page content so two premium motion layers run:

  1. The "page open" entry animation (`.editable-enter`, defined in
     editable-global.css) replays on every navigation. Keying on the pathname
     remounts the region per route, which restarts the CSS animation.

  2. A site-wide scroll-reveal: any element tagged with `data-reveal` fades and
     slides into place as it enters the viewport. This is purely progressive
     enhancement — the hidden start state only applies once we add the
     `reveal-ready` class to <html>, so if JavaScript never runs the content
     stays fully visible. Reduced-motion users skip the animation via CSS.
*/
export function EditablePageMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('reveal-ready')

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!targets.length) return

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            obs.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )

    targets.forEach((el) => {
      // Anything already in view on load reveals immediately (no flash).
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed')
      } else {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [pathname])

  return (
    <div key={pathname} className="editable-enter min-h-0 flex-1">
      {children}
    </div>
  )
}

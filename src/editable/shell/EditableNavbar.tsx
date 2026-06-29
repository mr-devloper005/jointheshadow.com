'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, LogOut, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  // Curated public navigation — essential pages only, centered on bookmarks.
  // Raw task-archive links are intentionally not exposed here.
  const primaryNav = useMemo(() => globalContent.nav.primaryLinks, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={`sticky top-0 z-50 bg-[var(--editable-nav-bg)]/85 text-[var(--editable-nav-text)] backdrop-blur-xl transition-[box-shadow,border-color] duration-300 ${
        scrolled ? 'border-b border-[var(--editable-border)] shadow-[0_10px_30px_-22px_rgba(14,15,26,0.5)]' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[72px] w-full max-w-[var(--editable-container)] items-center gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)] shadow-[0_8px_22px_-8px_rgba(91,61,245,0.8)] transition group-hover:scale-105">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="editable-display block max-w-[200px] truncate text-[17px] font-bold leading-none tracking-[-0.02em]">{SITE_CONFIG.name}</span>
            <span className="mt-1 block max-w-[200px] truncate text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-2 hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                  active
                    ? 'text-[var(--slot4-accent)]'
                    : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
                {active ? <span className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-[var(--slot4-accent)]" /> : null}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="ml-auto hidden min-w-0 items-center md:flex">
          <label className="group flex w-[230px] items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2 transition focus-within:border-[var(--slot4-accent)] focus-within:bg-[var(--slot4-surface-bg)] lg:w-[200px] xl:w-[240px]">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)] transition group-focus-within:text-[var(--slot4-accent)]" />
            <input
              name="q"
              type="search"
              placeholder="Search"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
          </label>
        </form>

        <div className="flex shrink-0 items-center gap-2 md:ml-2">
          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-1.5 rounded-full bg-[var(--slot4-accent)] px-4 py-2 text-[13px] font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_26px_-12px_rgba(91,61,245,0.9)] transition hover:bg-[var(--slot4-accent-strong)] hover:-translate-y-0.5 sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <span className="hidden items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-3.5 py-2 lg:inline-flex">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-[11px] font-bold text-[var(--slot4-on-accent)]">
                  {(session.name || 'U').charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[120px] truncate text-[13px] font-semibold text-[var(--slot4-page-text)]">{session.name}</span>
              </span>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)] sm:inline-flex"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-1.5 rounded-full bg-[var(--slot4-accent)] px-4 py-2 text-[13px] font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_26px_-12px_rgba(91,61,245,0.9)] transition hover:bg-[var(--slot4-accent-strong)] hover:-translate-y-0.5 sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex items-center justify-center rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2.5 text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="lg:hidden">
          <div className="mx-auto w-full max-w-[var(--editable-container)] px-5 pb-6 pt-1 sm:px-6">
            <form action="/search" className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3">
              <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
              <input name="q" type="search" placeholder="Search posts, listings, topics" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
            </form>
            <div className="mt-3 grid gap-1">
              {[{ label: 'Home', href: '/' }, ...primaryNav].map((item) => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-semibold transition ${
                      active
                        ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                        : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
                    }`}
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 opacity-50" />
                  </Link>
                )
              })}
            </div>
            <div className="mt-4 grid gap-2 border-t border-[var(--editable-border)] pt-4">
              {session ? (
                <>
                  <Link href="/create" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-sm font-semibold text-[var(--slot4-on-accent)]">
                    <PlusCircle className="h-4 w-4" /> Create a post
                  </Link>
                  <button type="button" onClick={() => { logout(); setOpen(false) }} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-semibold text-[var(--slot4-muted-text)]">
                    <LogOut className="h-4 w-4" /> Logout {session.name ? `(${session.name})` : ''}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/signup" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-3 text-sm font-semibold text-[var(--slot4-on-accent)]">
                    <UserPlus className="h-4 w-4" /> Sign up
                  </Link>
                  <Link href="/login" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-semibold text-[var(--slot4-page-text)]">
                    <LogIn className="h-4 w-4" /> Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

'use client'

import Link from 'next/link'
import { ArrowUpRight, ArrowRight, Mail, MapPin, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const footer = globalContent.footer

  const accountLinks = session
    ? [['Create a post', '/create'] as const]
    : [
        ['Sign in', '/login'] as const,
        ['Sign up', '/signup'] as const,
      ]

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      {/* CTA band */}
      <div className="mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="relative -mb-px overflow-hidden rounded-[var(--editable-radius-lg)] bg-[var(--slot4-dark-raised)] px-7 py-12 sm:px-12 sm:py-14 lg:px-16"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--slot4-accent)] opacity-25 blur-[90px]" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="editable-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
                Got something worth discovering?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/65">
                {footer?.description || `Publish a listing, share a story, or add your business to ${SITE_CONFIG.name}.`}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_14px_36px_-12px_rgba(91,61,245,0.9)] transition hover:bg-[var(--slot4-accent-strong)] hover:-translate-y-0.5"
              >
                <PlusCircle className="h-4 w-4" /> Create a post
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-0.5"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Link grid */}
      <div className="mx-auto grid w-full max-w-[var(--editable-container)] gap-10 px-5 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] lg:px-8 lg:py-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent)] text-[var(--slot4-on-accent)]">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
            </span>
            <span className="editable-display text-lg font-bold tracking-[-0.02em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/55">{footer?.tagline ? `${footer.tagline}.` : SITE_CONFIG.description}</p>
          <div className="mt-6 space-y-2.5 text-sm text-white/55">
            <Link href="/contact" className="inline-flex items-center gap-2 transition hover:text-white">
              <Mail className="h-4 w-4 text-[var(--slot4-accent)]" /> Get in touch
            </Link>
            <p className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--slot4-accent)]" /> {SITE_CONFIG.domain}
            </p>
          </div>
        </div>

        {footer.columns.map((column) => (
          <FooterColumn key={column.title} title={column.title} links={column.links.map((link) => [link.label, link.href] as const)} />
        ))}

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">Account</h3>
          <div className="mt-5 grid gap-3">
            {accountLinks.map(([label, href]) => (
              <Link key={href} href={href} className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/65 transition hover:text-white">
                {label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={logout} className="inline-flex w-fit items-center gap-1.5 text-left text-sm font-medium text-white/65 transition hover:text-white">
                Logout <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[var(--editable-container)] flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/45 sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="text-white/40">{footer?.bottomNote || 'Built for clean discovery and connected publishing.'}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: ReadonlyArray<readonly [string, string]> }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">{title}</h3>
      <div className="mt-5 grid gap-3">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white/65 transition hover:text-white">
            {label} <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, LogIn } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

const loginHighlights = [
  'Pick up exactly where you left off',
  'Manage submissions and saved content',
  'One account across the whole platform',
]

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-panel-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-stretch gap-8 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div
            data-reveal
            className="relative overflow-hidden rounded-[var(--editable-radius-lg)] bg-[var(--slot4-dark-bg)] p-8 text-white shadow-[0_24px_70px_-24px_rgba(14,15,26,0.45)] sm:p-12"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--slot4-accent)] opacity-25 blur-[100px]" />
            <div className="relative flex h-full flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.auth.login.badge}</p>
              <h1 className="editable-display mt-6 max-w-md text-4xl font-bold leading-[1.06] tracking-[-0.02em] sm:text-5xl">{pagesContent.auth.login.title}</h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">{pagesContent.auth.login.description}</p>
              <ul className="mt-auto space-y-3 pt-10">
                {loginHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-medium text-white/80">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            data-reveal
            style={{ ['--reveal-delay' as string]: '120ms' }}
            className="flex items-center"
          >
            <div className="w-full rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 shadow-[0_1px_2px_rgba(14,15,26,0.05),0_12px_32px_-12px_rgba(14,15,26,0.12)] sm:p-10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                <LogIn className="h-5 w-5" />
              </span>
              <h2 className="editable-display mt-6 text-2xl font-bold tracking-[-0.02em]">{pagesContent.auth.login.formTitle}</h2>
              <EditableLocalLoginForm />
              <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

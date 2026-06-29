import Link from 'next/link'
import { ArrowRight, BookOpen, Layers, ShieldCheck, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'
const valueIcons = [BookOpen, Layers, ShieldCheck]

const highlights = [
  { value: `${CATEGORY_OPTIONS.length}+`, label: 'Curated collections' },
  { value: 'One', label: 'Unified discovery experience' },
  { value: 'Daily', label: 'Fresh resources added' },
  { value: '100%', label: 'Free to browse' },
]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[var(--slot4-accent)] opacity-[0.07] blur-[120px]" />
          <div className="pointer-events-none absolute -right-32 top-40 h-[360px] w-[360px] rounded-full bg-[var(--slot4-accent)] opacity-[0.06] blur-[120px]" />
          <div className={`${container} pb-12 pt-12 sm:pt-16 lg:pb-16 lg:pt-24`}>
            <div data-reveal className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
                <Sparkles className="h-3.5 w-3.5" /> {pagesContent.about.badge}
              </span>
              <h1 className="editable-display mt-6 text-balance text-[2.75rem] font-bold leading-[1.04] tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-6xl lg:text-[4.25rem]">
                About {SITE_CONFIG.name}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">
                {pagesContent.about.description}
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-[var(--slot4-surface-bg)]">
          <div className={`${container} py-16 sm:py-20 lg:py-24`}>
            <div data-reveal className="mx-auto max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.about.title}</p>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[var(--slot4-panel-bg)]">
          <div className={`${container} py-16 sm:py-20 lg:py-24`}>
            <div data-reveal className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">What we value</p>
              <h2 className="editable-display mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">The principles behind the experience</h2>
              <p className="mt-3 text-base text-[var(--slot4-muted-text)]">A few commitments that shape every surface of {SITE_CONFIG.name}.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pagesContent.about.values.map((value, i) => {
                const Icon = valueIcons[i % valueIcons.length]
                return (
                  <div
                    key={value.title}
                    data-reveal
                    style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
                    className="rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_1px_2px_rgba(14,15,26,0.05),0_12px_32px_-12px_rgba(14,15,26,0.12)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-28px_rgba(14,15,26,0.5)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="editable-display mt-5 text-xl font-bold tracking-[-0.01em]">{value.title}</h3>
                    <p className="mt-2.5 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Highlights / stats band */}
        <section className="bg-[var(--slot4-surface-bg)]">
          <div className={`${container} pb-16 sm:pb-20 lg:pb-24`}>
            <div data-reveal className="grid grid-cols-2 gap-4 rounded-[var(--editable-radius-lg)] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 sm:grid-cols-4 sm:p-8">
              {highlights.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
                  <p className="editable-display text-3xl font-bold tracking-[-0.02em] text-[var(--slot4-page-text)]">{stat.value}</p>
                  <p className="text-[13px] font-medium text-[var(--slot4-muted-text)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing dark CTA band */}
        <section className="bg-[var(--slot4-surface-bg)] pb-16 sm:pb-20 lg:pb-24">
          <div className={container}>
            <div data-reveal className="relative overflow-hidden rounded-[var(--editable-radius-lg)] bg-[var(--slot4-dark-bg)] px-7 py-16 text-center text-white shadow-[0_24px_70px_-24px_rgba(14,15,26,0.45)] sm:px-12 sm:py-20">
              <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--slot4-accent)] opacity-25 blur-[100px]" />
              <div className="relative mx-auto max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> Join {SITE_CONFIG.name}
                </span>
                <h2 className="editable-display mt-6 text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
                  Start exploring, or share something of your own.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                  Browse connected stories, visuals and resources — or publish your own and reach the community.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/create"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_16px_40px_-14px_rgba(91,61,245,0.9)] transition hover:bg-[var(--slot4-accent-strong)] hover:-translate-y-0.5"
                  >
                    Create a post <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-0.5"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

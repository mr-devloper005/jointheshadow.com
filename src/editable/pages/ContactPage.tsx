'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark, ShieldCheck, Clock, MessageCircle } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

const reassurance = [
  { icon: Clock, title: 'Fast response', body: 'We read every message and route it to the right person quickly.' },
  { icon: ShieldCheck, title: 'No spam, ever', body: 'Your details are only used to reply to your request.' },
  { icon: MessageCircle, title: 'Real humans', body: 'Thoughtful answers from the team behind the platform.' },
]

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
      { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
      { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
      { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
      { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
      { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
      { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
    { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
    { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
  ]
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)

  return (
    <EditableSiteShell>
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[var(--slot4-accent)] opacity-[0.06] blur-[120px]" />
        <div className={`${container} py-16 sm:py-20 lg:py-24`}>
          <section className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            {/* Left: intro + lanes */}
            <div data-reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
              <h1 className="editable-display mt-4 text-[2.5rem] font-bold leading-[1.06] tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-5xl lg:text-[3.5rem]">
                {pagesContent.contact.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {lanes.map((lane, i) => (
                  <div
                    key={lane.title}
                    data-reveal
                    style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
                    className="rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_1px_2px_rgba(14,15,26,0.05),0_12px_32px_-12px_rgba(14,15,26,0.12)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-28px_rgba(14,15,26,0.5)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                      <lane.icon className="h-5 w-5" />
                    </span>
                    <h2 className="editable-display mt-5 text-lg font-bold tracking-[-0.01em]">{lane.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {reassurance.map((item) => (
                  <span key={item.title} className="inline-flex items-center gap-2.5 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2 text-sm font-medium text-[var(--slot4-muted-text)]">
                    <item.icon className="h-4 w-4 text-[var(--slot4-accent)]" /> {item.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: form card */}
            <div
              data-reveal
              style={{ ['--reveal-delay' as string]: '120ms' }}
              className="rounded-[var(--editable-radius-lg)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_1px_2px_rgba(14,15,26,0.05),0_24px_70px_-24px_rgba(14,15,26,0.45)] sm:p-9 lg:sticky lg:top-24"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-soft)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">
                <Mail className="h-3.5 w-3.5" /> Get in touch
              </span>
              <h2 className="editable-display mt-5 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{pagesContent.contact.formTitle}</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">Share a few details and we will get back to you.</p>
              <EditableContactLeadForm />
            </div>
          </section>
        </div>
      </main>
    </EditableSiteShell>
  )
}

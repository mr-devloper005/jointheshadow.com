import Link from 'next/link'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import type { SitePost, SiteFeedPagination } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { ArticleListCard, postHref } from '@/editable/cards/PostCards'

export function EditableArticleArchive({ posts, pagination, category = 'all', basePath = '/article' }: { posts: SitePost[]; pagination: SiteFeedPagination; category?: string; basePath?: string }) {
  const voice = taskPageVoices.article
  const page = pagination.page || 1
  const pageHref = (nextPage: number) => `${basePath}?${new URLSearchParams({ ...(category && category !== 'all' ? { category } : {}), page: String(nextPage) }).toString()}`
  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-12 sm:pt-16 lg:pt-20`}>
        <div data-reveal className={`rounded-[var(--editable-radius-lg)] border ${pal.darkBorder} bg-[var(--slot4-dark-bg)] p-7 text-white ${pal.shadowStrong} sm:p-10 lg:p-14`}>
          <p className={`${dc.type.eyebrow} ${pal.accentSoftText}`}>{voice.eyebrow}</p>
          <h1 className={`${dc.type.heroTitle} mt-5 max-w-5xl`}>{voice.headline}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">{voice.description}</p>
          <form action={basePath} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <select name="category" defaultValue={category || 'all'} className="min-w-0 flex-1 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-3 text-sm font-semibold text-[var(--slot4-page-text)] outline-none transition focus:border-[var(--slot4-accent)]">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="inline-flex items-center justify-center rounded-full bg-[var(--slot4-accent)] px-7 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_30px_-10px_rgba(91,61,245,0.7)] transition hover:bg-[var(--slot4-accent-strong)] hover:-translate-y-0.5">Filter</button>
          </form>
        </div>
      </section>

      <section className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        {posts.length ? (
          <div className="grid gap-5">
            {posts.map((post, index) => <ArticleListCard key={post.id} post={post} href={postHref('article', post, basePath)} index={index + (page - 1) * pagination.limit} />)}
          </div>
        ) : (
          <div data-reveal className={`${dc.surface.soft} p-8 text-center`}>
            <h2 className="editable-display text-3xl font-bold tracking-[-0.02em]">No articles found</h2>
            <p className={`mt-3 text-sm leading-7 ${pal.softMutedText}`}>Try another category or return to all articles.</p>
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {pagination.hasPrevPage ? <Link href={pageHref(page - 1)} className={`rounded-full border ${pal.border} bg-[var(--slot4-surface-bg)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]`}>Previous</Link> : null}
          <span className="rounded-full bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-semibold text-white">Page {page} of {pagination.totalPages || 1}</span>
          {pagination.hasNextPage ? <Link href={pageHref(page + 1)} className={`rounded-full border ${pal.border} bg-[var(--slot4-surface-bg)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]`}>Next</Link> : null}
        </div>
      </section>
    </main>
  )
}

export function EditableArticleDetailShell({ slug, post }: { slug: string; post: SitePost | null }) {
  const voice = taskPageVoices.article
  return (
    <main className={dc.shell.page}>
      <section className={`${dc.shell.section} pt-10 sm:pt-14 lg:pt-16`}>
        <div data-reveal className={`grid gap-6 rounded-[var(--editable-radius-lg)] border ${pal.border} bg-[var(--slot4-surface-bg)] p-6 ${pal.shadow} lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10`}>
          <div className="min-w-0">
            <Link href="/article" className={`inline-flex items-center gap-2 rounded-full border ${pal.border} bg-[var(--slot4-surface-bg)] px-4 py-2 text-sm font-semibold ${pal.panelText} transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]`}><ChevronLeft className="h-4 w-4" /> Articles</Link>
            <p className={`${dc.type.eyebrow} mt-8 ${pal.accentText}`}>{voice.eyebrow}</p>
            <h1 className={`editable-display mt-4 max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.02em] ${pal.panelText} sm:text-5xl lg:text-6xl`}>{post?.title || pagesContent.detailPages.article.fallbackTitle}</h1>
          </div>
          <aside className="min-w-0 rounded-[var(--editable-radius)] bg-[var(--slot4-dark-bg)] p-6 text-white">
            <p className={`${dc.type.eyebrow} ${pal.accentSoftText}`}>Reading note</p>
            <p className="mt-4 text-sm leading-7 text-white/65">{voice.secondaryNote}</p>
            <Link href="/contact" className={`mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold ${pal.panelText} transition hover:-translate-y-0.5`}>Contact <ArrowRight className="h-4 w-4" /></Link>
          </aside>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
        <div data-reveal className={`rounded-[var(--editable-radius)] border ${pal.border} bg-[var(--slot4-surface-bg)] p-6 ${pal.shadow} sm:p-8 lg:p-10`}>
          <p className={`text-sm leading-8 ${pal.softMutedText}`}>{post?.summary || `Article detail content for ${slug} will render through the editable detail page.`}</p>
        </div>
      </section>
    </main>
  )
}

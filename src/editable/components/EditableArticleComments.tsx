'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { MessageCircle, Send } from 'lucide-react'

type Comment = { id: string; name: string; comment: string; createdAt: string }

const storageKey = (slug: string) => `editable:article-comments:${slug}`

function timeAgo(value?: string) {
  if (!value) return ''
  const then = new Date(value).getTime()
  if (Number.isNaN(then)) return ''
  const mins = Math.max(1, Math.floor((Date.now() - then) / 60000))
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} ${days === 1 ? 'day' : 'days'} ago`
  return new Date(then).toLocaleDateString()
}

function initial(name: string) {
  return (name.trim()[0] || 'G').toUpperCase()
}

export function EditableArticleComments({ slug, comments = [] }: { slug: string; comments?: Comment[] }) {
  const [stored, setStored] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  // Load this article's comments after mount (initial render stays in sync with
  // the server so there's no hydration mismatch).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(slug))
      setStored(raw ? (JSON.parse(raw) as Comment[]) : [])
    } catch {
      setStored([])
    }
  }, [slug])

  const persist = (next: Comment[]) => {
    setStored(next)
    try {
      window.localStorage.setItem(storageKey(slug), JSON.stringify(next))
    } catch {
      /* storage unavailable — keep the in-memory list */
    }
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = text.trim()
    if (!body) return
    const entry: Comment = {
      id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim() || 'Guest',
      comment: body,
      createdAt: new Date().toISOString(),
    }
    persist([entry, ...stored])
    setText('')
  }

  // User comments (newest first) sit above any existing comments.
  const all = useMemo(() => [...stored, ...comments], [stored, comments])

  return (
    <section data-reveal className="mt-14 border-t border-[var(--editable-border)] pt-10">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
          <MessageCircle className="h-5 w-5" />
        </span>
        <div>
          <h2 className="editable-display text-2xl font-bold tracking-[-0.02em] text-[var(--slot4-page-text)]">Comments</h2>
          <p className="text-sm text-[var(--slot4-muted-text)]">{all.length} {all.length === 1 ? 'response' : 'responses'}</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 shadow-[0_1px_2px_rgba(14,15,26,0.05),0_12px_32px_-12px_rgba(14,15,26,0.12)] sm:p-6">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name (optional)"
          maxLength={60}
          className="h-12 w-full rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 text-sm text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-soft-muted-text)] focus:border-[var(--slot4-accent)]"
        />
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Share your thoughts…"
          rows={3}
          maxLength={1500}
          className="mt-3 w-full resize-y rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm leading-6 text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-soft-muted-text)] focus:border-[var(--slot4-accent)]"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={!text.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_30px_-10px_rgba(91,61,245,0.7)] transition hover:bg-[var(--slot4-accent-strong)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <Send className="h-4 w-4" /> Post comment
          </button>
        </div>
      </form>

      <div className="mt-6 grid gap-4">
        {all.map((comment) => (
          <div key={comment.id} className="rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 shadow-[0_1px_2px_rgba(14,15,26,0.05),0_12px_32px_-12px_rgba(14,15,26,0.12)] sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-sm font-bold text-[var(--slot4-accent)]">
                {initial(comment.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--slot4-page-text)]">{comment.name || 'Guest'}</p>
                {comment.createdAt ? <p className="text-xs text-[var(--slot4-soft-muted-text)]">{timeAgo(comment.createdAt)}</p> : null}
              </div>
            </div>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[var(--slot4-muted-text)]">{comment.comment}</p>
          </div>
        ))}
        {!all.length ? <p className="text-sm text-[var(--slot4-muted-text)]">Be the first to comment.</p> : null}
      </div>
    </section>
  )
}

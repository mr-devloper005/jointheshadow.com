import type { CSSProperties } from 'react'

/*
  Jointheshadow premium design system.

  Inspired by modern fintech reference layouts (Flock/Ramp): a light-led canvas
  with deep "ink" sections punctuating the rhythm, one confident indigo accent,
  generous whitespace, large rounded surfaces, pill actions and refined layered
  shadows. Every visible surface consumes these CSS variables, so a single
  palette edit here re-themes the entire site.
*/

export const editableRootStyle = {
  // Core surfaces — clean, contained, premium.
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#0e0f1a',
  '--slot4-panel-bg': '#f6f6fa',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5b6172',
  '--slot4-soft-muted-text': '#8a90a1',
  // Single brand accent — readable as text, strong as a fill (white on top).
  '--slot4-accent': '#5b3df5',
  '--slot4-accent-fill': '#5b3df5',
  '--slot4-accent-strong': '#4a2fe0',
  '--slot4-accent-soft': '#ecebfe',
  '--slot4-on-accent': '#ffffff',
  // Deep ink sections (hero overlays, CTA bands, footer).
  '--slot4-dark-bg': '#0e0f1a',
  '--slot4-dark-raised': '#191b2c',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#eceef3',
  // Legacy aliases kept so older consumers stay valid.
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f6f6fa',
  '--slot4-lavender': '#f3f2fe',
  '--slot4-gray': '#f6f6fa',
  '--slot4-body-gradient': 'none',
  '--editable-page-bg': '#ffffff',
  '--editable-page-text': '#0e0f1a',
  '--editable-container': '1240px',
  '--editable-border': '#e8e8f0',
  '--editable-nav-bg': '#ffffff',
  '--editable-nav-text': '#0e0f1a',
  '--editable-nav-active': '#5b3df5',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#5b3df5',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#0e0f1a',
  '--editable-footer-text': '#ffffff',
  // Shared radii + soft layered shadow primitives.
  '--editable-radius': '1.5rem',
  '--editable-radius-lg': '2rem',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_2px_rgba(14,15,26,0.05),0_12px_32px_-12px_rgba(14,15,26,0.12)]',
  shadowStrong: 'shadow-[0_24px_70px_-24px_rgba(14,15,26,0.45)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(14,15,26,0.05),rgba(14,15,26,0.78))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-28',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[150px] shrink-0 snap-start sm:w-[170px]',
  },
  type: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]',
    heroTitle: 'editable-display text-[2.75rem] font-bold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]',
    sectionTitle: 'editable-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]',
    body: 'text-base leading-relaxed text-[var(--slot4-muted-text)]',
  },
  surface: {
    card: `rounded-[var(--editable-radius)] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[var(--editable-radius)] border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-[var(--editable-radius)] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-on-accent)] shadow-[0_10px_30px_-10px_rgba(91,61,245,0.7)] transition duration-300 hover:bg-[var(--slot4-accent-strong)] hover:-translate-y-0.5 active:translate-y-0`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-7 py-3.5 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] hover:-translate-y-0.5`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.accentBg} px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:bg-[var(--slot4-accent-strong)] hover:-translate-y-0.5`,
  },
  media: {
    frame: `relative overflow-hidden rounded-[var(--editable-radius)] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-28px_rgba(14,15,26,0.5)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site palette in editableRootStyle first; every section consumes those CSS variables.',
  'Keep home structure in src/editable/sections/HomeSections.tsx so the whole home experience is editable in one file.',
  'Use contained max-width sections; never stretch content edge-to-edge or create skinny paragraph columns.',
  'Punctuate the light canvas with deep ink sections (hero overlay, CTA, footer) for a premium fintech rhythm.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
  'Add data-reveal to sections/cards for the site-wide scroll-reveal motion.',
] as const

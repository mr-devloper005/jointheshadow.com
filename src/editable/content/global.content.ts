import { slot4BrandConfig } from '@/editable/theme/brand.config'

/*
  Tasks that stay fully functional — routes, pages and data fetching are
  preserved and reachable by direct URL — but are intentionally hidden from
  every public UI surface (navigation, footer, category lists, search filters
  and result links). Add a task key here to remove it from the UI without
  disabling the underlying feature.
*/
export const uiHiddenTaskKeys = ['profile'] as const
export const isUiHiddenTask = (key: string) => (uiHiddenTaskKeys as readonly string[]).includes(key)

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent reading platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated bookmarks & resources',
    // Focused public navigation — essential pages only, centered on the
    // bookmarks/collections experience. Raw task-archive links are not exposed.
    primaryLinks: [
      { label: 'Collection', href: '/sbm' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start exploring', href: '/sbm' },
      secondary: { label: 'Submit a resource', href: '/create' },
    },
  },
  footer: {
    tagline: 'Curated bookmarks, collections & resources',
    description: 'A calmer home for the bookmarks, collections, and resources worth saving — organized for easy discovery.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Bookmarks', href: '/sbm' },
          { label: 'Search', href: '/search' },
          { label: 'Submit a resource', href: '/create' },
        ],
      },
      {
        title: 'Collections',
        links: [
          { label: 'Business', href: '/sbm?category=business' },
          { label: 'Technology', href: '/sbm?category=technology' },
          { label: 'Finance', href: '/sbm?category=finance' },
          { label: 'Lifestyle', href: '/sbm?category=lifestyle' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean discovery and curated collections.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const

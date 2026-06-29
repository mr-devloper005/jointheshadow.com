// ✏️ EDITABLE — theme the ads to match this site. Devs own this file.
// You control the LOOK here (radius, border, shadow, background, label color).
// You CANNOT change the ad's shape/fit from here — that stays locked in
// src/lib/ad-slots.ts, so the ad always displays correctly no matter what.

import type { AdSkin } from '@/lib/ads/ad-frame'

// Site-wide default skin — tune to your brand.
export const adSkin: AdSkin = {
  radius: '24px',
  border: '1px solid #e8e8f0',
  shadow: '0 18px 50px -28px rgba(14,15,26,0.35)',
  background: '#ffffff',
  labelClassName: 'bg-[#5b3df5] text-white',
}

// Optional per-slot overrides — adjust only where you need to.
export const adSkinBySlot: Partial<Record<string, AdSkin>> = {
  sidebar: { radius: '20px', shadow: 'none', border: '1px solid #e8e8f0' },
  popup: { radius: '28px' },
  header: { radius: '24px', background: '#f6f6fa' },
}

/** Merge site default + per-slot override for a slot. */
export function skinFor(slot: string): AdSkin {
  return { ...adSkin, ...(adSkinBySlot[slot] ?? {}) }
}
// junior tweak

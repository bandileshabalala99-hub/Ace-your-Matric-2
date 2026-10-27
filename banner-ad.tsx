"use client"

import { useSyncExternalStore } from "react"
import { BANNER_AD_ID } from "@/lib/ads"
import { isNativeApp } from "@/lib/native"

const subscribe = () => () => {}

export function BannerAd() {
  const native = useSyncExternalStore(subscribe, isNativeApp, () => false)

  if (native) {
    // The native AdMob banner is drawn over this reserved space.
    return <div aria-hidden="true" className="h-[60px] bg-background pb-[env(safe-area-inset-bottom)]" />
  }

  return (
    <aside
      aria-label="Advertisement"
      className="flex h-[60px] flex-col items-center justify-center border-t border-border bg-card/95 px-4 text-center backdrop-blur"
    >
      <span className="text-xs font-semibold text-muted-foreground">Ad · AdMob Banner</span>
      <span className="font-mono text-[10px] text-muted-foreground/70">{BANNER_AD_ID}</span>
    </aside>
  )
}

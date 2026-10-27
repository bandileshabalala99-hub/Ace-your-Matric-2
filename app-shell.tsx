"use client"

import { useEffect } from "react"
import { BannerAd } from "@/components/banner-ad"
import { BottomNav } from "@/components/bottom-nav"
import { showBannerAd } from "@/lib/ads"
import { verifyDownloads } from "@/lib/downloads"
import { touchStreak } from "@/lib/progress"

export function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    touchStreak()
    verifyDownloads().catch(() => {})
    showBannerAd().catch((error) => console.log("[v0] Banner ad failed:", error))
  }, [])

  return (
    <div className="min-h-dvh bg-[radial-gradient(120%_60%_at_100%_0%,oklch(0.3_0.07_262)_0%,transparent_60%)]">
      <div className="mx-auto w-full max-w-md px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-40">{children}</div>
      <div className="fixed inset-x-0 bottom-0 z-40">
        <BottomNav />
        <BannerAd />
      </div>
    </div>
  )
}

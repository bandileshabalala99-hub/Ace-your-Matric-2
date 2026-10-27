"use client"

import Image from "next/image"
import { progressStore, rankFor } from "@/lib/progress"

export function AppHeader({ subtitle = "Past Papers + Explain Like I'm 5" }: { subtitle?: string }) {
  const progress = progressStore.useValue()

  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Image
          src="/icon.jpg"
          alt="Ace Your Matric app icon"
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-full ring-2 ring-primary"
          priority
        />
        <div className="min-w-0">
          <h1 className="text-lg leading-tight font-bold text-balance">{"Matric High Flyers - All In One 🚀"}</h1>
          <p className="text-sm text-primary">{subtitle}</p>
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-2 text-center text-xs font-bold" aria-label="Your progress">
        <li className="rounded-full bg-card px-2 py-2">{`⭐ ${progress.xp} XP`}</li>
        <li className="rounded-full bg-card px-2 py-2">{`🔥 ${Math.max(progress.streak, 1)} Day Streak`}</li>
        <li className="rounded-full bg-primary px-2 py-2 text-primary-foreground">{`🏅 ${rankFor(progress.xp)}`}</li>
      </ul>
    </header>
  )
}

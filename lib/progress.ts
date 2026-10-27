"use client"

import { createPersistentStore } from "./persistent-store"

export interface Progress {
  xp: number
  streak: number
  lastActiveDay: string | null
}

export const progressStore = createPersistentStore<Progress>("aym-progress", {
  xp: 0,
  streak: 0,
  lastActiveDay: null,
})

export const unlockedMemosStore = createPersistentStore<Record<string, true>>("aym-unlocked-memos", {})

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

export function touchStreak() {
  const today = dayKey(new Date())
  const yesterday = dayKey(new Date(Date.now() - 86_400_000))
  progressStore.set((prev) => {
    if (prev.lastActiveDay === today) return prev
    const streak = prev.lastActiveDay === yesterday ? prev.streak + 1 : 1
    return { ...prev, streak, lastActiveDay: today }
  })
}

export function addXp(amount: number) {
  progressStore.set((prev) => ({ ...prev, xp: prev.xp + amount }))
}

export function rankFor(xp: number) {
  if (xp >= 500) return "Matric Legend"
  if (xp >= 200) return "Distinction Chaser"
  if (xp >= 50) return "Rising Star"
  return "High Flyer"
}

"use client"

import { useState } from "react"
import { Loader2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PaperFileRow } from "@/components/paper-file-row"
import { RewardedAdDialog } from "@/components/rewarded-ad-dialog"
import { showNativeRewardedAd } from "@/lib/ads"
import { isNativeApp } from "@/lib/native"
import type { PaperFile } from "@/lib/papers"
import { addXp, unlockedMemosStore } from "@/lib/progress"

export function PaperCard({ paper, memo }: { paper: PaperFile; memo: PaperFile }) {
  const unlocked = Boolean(unlockedMemosStore.useValue()[memo.id])
  const [webAdOpen, setWebAdOpen] = useState(false)
  const [loadingAd, setLoadingAd] = useState(false)
  const [adError, setAdError] = useState<string | null>(null)

  function unlock() {
    unlockedMemosStore.set((prev) => ({ ...prev, [memo.id]: true }))
    addXp(5)
  }

  async function handleUnlock() {
    setAdError(null)
    if (!isNativeApp()) {
      setWebAdOpen(true)
      return
    }
    setLoadingAd(true)
    try {
      if (await showNativeRewardedAd()) unlock()
    } catch {
      setAdError("No ad available right now. Check your connection and try again.")
    } finally {
      setLoadingAd(false)
    }
  }

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4">
      <h3 className="text-base font-bold text-balance">
        {paper.subjectName} P{paper.paper} - {paper.year}
      </h3>

      <PaperFileRow file={paper} />

      <div className="h-px bg-border" />

      {unlocked ? (
        <PaperFileRow file={memo} />
      ) : (
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="h-11 rounded-xl border-primary/60 bg-transparent font-bold text-primary hover:bg-primary/10 hover:text-primary"
            onClick={handleUnlock}
            disabled={loadingAd}
          >
            {loadingAd ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Lock aria-hidden="true" />}
            Watch Ad to Unlock Memo
          </Button>
          {adError && (
            <p className="text-xs text-destructive" role="alert">
              {adError}
            </p>
          )}
        </div>
      )}

      <RewardedAdDialog open={webAdOpen} onOpenChange={setWebAdOpen} onRewarded={unlock} />
    </article>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { REWARDED_AD_ID } from "@/lib/ads"

const AD_SECONDS = 5

interface RewardedAdDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRewarded: () => void
}

/** Browser stand-in for the native AdMob rewarded ad, used when not running inside the Android app. */
export function RewardedAdDialog({ open, onOpenChange, onRewarded }: RewardedAdDialogProps) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!open) return
    setElapsed(0)
    const timer = window.setInterval(() => setElapsed((s) => Math.min(s + 1, AD_SECONDS)), 1000)
    return () => window.clearInterval(timer)
  }, [open])

  const done = elapsed >= AD_SECONDS

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Rewarded Ad</DialogTitle>
          <DialogDescription>Watch this short ad to unlock the memo. Ads keep Ace Your Matric free!</DialogDescription>
        </DialogHeader>
        <div className="flex aspect-video flex-col items-center justify-center gap-1 rounded-xl bg-muted text-center">
          <span className="font-heading text-lg font-bold">Your ad plays here</span>
          <span className="font-mono text-[10px] text-muted-foreground">{REWARDED_AD_ID}</span>
        </div>
        <Progress value={(elapsed / AD_SECONDS) * 100} aria-label="Ad progress" />
        <Button
          className="h-11 rounded-xl font-bold"
          disabled={!done}
          onClick={() => {
            onRewarded()
            onOpenChange(false)
          }}
        >
          {done ? "Claim reward — Unlock Memo" : `Reward in ${AD_SECONDS - elapsed}s…`}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

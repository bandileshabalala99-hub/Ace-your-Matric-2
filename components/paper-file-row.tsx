"use client"

import { useState } from "react"
import { CheckCircle2, Download, ExternalLink, FileText, Loader2, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { downloadPaper, downloadsStore, formatBytes, openPaper, viewedOnlineStore } from "@/lib/downloads"
import type { PaperFile } from "@/lib/papers"

type DownloadState = { status: "idle" } | { status: "downloading"; progress: number | null } | { status: "error"; message: string }

export function PaperFileRow({ file }: { file: PaperFile }) {
  const record = downloadsStore.useValue()[file.id]
  const viewedOnline = Boolean(viewedOnlineStore.useValue()[file.id])
  const [opening, setOpening] = useState(false)
  const [download, setDownload] = useState<DownloadState>({ status: "idle" })

  const label = file.kind === "paper" ? "Question Paper" : "Memo"

  async function handleView() {
    setOpening(true)
    try {
      await openPaper(file)
    } catch (error) {
      setDownload({ status: "error", message: error instanceof Error ? error.message : "Couldn't open this paper." })
    } finally {
      setOpening(false)
    }
  }

  async function handleDownload() {
    setDownload({ status: "downloading", progress: 0 })
    try {
      await downloadPaper(file, (progress) => setDownload({ status: "downloading", progress }))
      setDownload({ status: "idle" })
    } catch (error) {
      setDownload({ status: "error", message: error instanceof Error ? error.message : "Download failed." })
    }
  }

  const showDownloadButton = viewedOnline && !record && file.isDirectPdf

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-sm font-semibold">
          <FileText className="size-4 text-muted-foreground" aria-hidden="true" />
          {label}
        </span>
        {record ? (
          <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-bold text-success">
            {"Offline - No data needed ✅"}
          </span>
        ) : viewedOnline ? (
          <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-bold text-primary">
            <Wifi className="size-3" aria-hidden="true" />
            Using data - first viewing
          </span>
        ) : null}
      </div>

      <Button
        variant={record ? "default" : "secondary"}
        className={record ? "h-11 rounded-xl bg-success text-success-foreground hover:bg-success/90" : "h-11 rounded-xl"}
        onClick={handleView}
        disabled={opening}
      >
        {opening ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : record ? (
          <CheckCircle2 aria-hidden="true" />
        ) : (
          <ExternalLink aria-hidden="true" />
        )}
        {record ? `Open from Phone · ${formatBytes(record.size)}` : file.isDirectPdf ? `View ${label}` : "View on DBE website"}
      </Button>

      {!record && !viewedOnline && (
        <p className="text-xs text-muted-foreground">
          {file.isDirectPdf
            ? "First view opens the official DBE PDF online (uses data)."
            : "Exact PDF not listed — opens the official DBE past papers page."}
        </p>
      )}

      {showDownloadButton && download.status !== "downloading" && (
        <Button
          size="lg"
          className="h-14 rounded-xl bg-success text-base font-bold text-success-foreground hover:bg-success/90"
          onClick={handleDownload}
        >
          <Download className="size-5" aria-hidden="true" />
          Download to My Phone for Offline
        </Button>
      )}

      {download.status === "downloading" && (
        <div className="flex flex-col gap-1.5 rounded-xl bg-success/10 p-3" role="status" aria-live="polite">
          <div className="flex items-center justify-between text-xs font-semibold text-success">
            <span className="flex items-center gap-1.5">
              <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
              Saving to Documents/AceYourMatric…
            </span>
            <span>{download.progress === null ? "…" : `${Math.round(download.progress * 100)}%`}</span>
          </div>
          <Progress
            value={download.progress === null ? null : Math.round(download.progress * 100)}
            className="[&_[data-slot=progress-indicator]]:bg-success [&_[data-slot=progress-track]]:h-2"
            aria-label="Download progress"
          />
        </div>
      )}

      {download.status === "error" && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive" role="alert">
          {download.message}
        </p>
      )}
    </div>
  )
}

"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { FileText, FolderDown, HardDrive, Loader2, Trash2 } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import {
  DOWNLOAD_FOLDER,
  deleteDownload,
  downloadsStore,
  formatBytes,
  openDownload,
  type DownloadRecord,
} from "@/lib/downloads"

export function DownloadsView() {
  const downloads = downloadsStore.useValue()
  const records = useMemo(
    () => Object.values(downloads).sort((a, b) => b.year - a.year || a.subjectName.localeCompare(b.subjectName) || a.title.localeCompare(b.title)),
    [downloads],
  )
  const totalBytes = records.reduce((sum, r) => sum + r.size, 0)

  return (
    <main className="flex flex-col gap-6">
      <AppHeader subtitle="My Downloads · study with no data" />

      <section aria-labelledby="storage-heading" className="flex items-center gap-4 rounded-2xl bg-card p-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success">
          <HardDrive className="size-6" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 id="storage-heading" className="text-sm text-muted-foreground">
            Total storage used
          </h2>
          <p className="font-heading text-2xl font-bold">{formatBytes(totalBytes)}</p>
          <p className="text-xs text-muted-foreground">
            {records.length} {records.length === 1 ? "file" : "files"} in Documents/{DOWNLOAD_FOLDER}
          </p>
        </div>
      </section>

      {records.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-8 text-center">
          <FolderDown className="size-10 text-muted-foreground" aria-hidden="true" />
          <p className="font-bold">No papers downloaded yet</p>
          <p className="text-sm text-muted-foreground text-pretty">
            Open a paper once online, then tap &ldquo;Download to My Phone for Offline&rdquo; to keep it forever.
          </p>
          <Button render={<Link href="/" />} nativeButton={false} className="h-11 rounded-xl font-bold">
            Browse past papers
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col gap-2" aria-label="Downloaded papers">
          {records.map((record) => (
            <DownloadItem key={record.id} record={record} />
          ))}
        </ul>
      )}
    </main>
  )
}

function DownloadItem({ record }: { record: DownloadRecord }) {
  const [busy, setBusy] = useState<"open" | "delete" | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function run(action: "open" | "delete") {
    setBusy(action)
    setError(null)
    try {
      if (action === "open") await openDownload(record)
      else await deleteDownload(record)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.")
    } finally {
      setBusy(null)
    }
  }

  return (
    <li className="flex flex-col gap-2 rounded-2xl bg-card p-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => run("open")}
          disabled={busy !== null}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/15 text-success">
            {busy === "open" ? <Loader2 className="size-5 animate-spin" aria-hidden="true" /> : <FileText className="size-5" aria-hidden="true" />}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold">{record.title}</span>
            <span className="block text-xs text-muted-foreground">
              {formatBytes(record.size)} · {"Offline ✅"}
            </span>
          </span>
        </button>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => {
            if (window.confirm(`Delete "${record.title}" from your phone?`)) run("delete")
          }}
          disabled={busy !== null}
          aria-label={`Delete ${record.title}`}
        >
          {busy === "delete" ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Trash2 aria-hidden="true" />}
        </Button>
      </div>
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </li>
  )
}

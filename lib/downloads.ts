"use client"

import { Browser } from "@capacitor/browser"
import { Directory, Filesystem } from "@capacitor/filesystem"
import { FileOpener } from "@capacitor-community/file-opener"
import { isNativeApp } from "./native"
import type { PaperFile } from "./papers"
import { createPersistentStore } from "./persistent-store"
import { addXp } from "./progress"

export const DOWNLOAD_FOLDER = "AceYourMatric"

export interface DownloadRecord {
  id: string
  title: string
  subjectName: string
  year: number
  kind: PaperFile["kind"]
  path: string
  size: number
  savedAt: number
  sourceUrl: string
}

export const downloadsStore = createPersistentStore<Record<string, DownloadRecord>>("aym-downloads", {})
export const viewedOnlineStore = createPersistentStore<Record<string, true>>("aym-viewed-online", {})

export function formatBytes(bytes: number) {
  if (!bytes) return "0 KB"
  const units = ["B", "KB", "MB", "GB"]
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  return `${(bytes / 1024 ** i).toFixed(i >= 2 ? 1 : 0)} ${units[i]}`
}

function filePathFor(file: PaperFile) {
  return `${DOWNLOAD_FOLDER}/${file.id}.pdf`
}

async function localFileSize(path: string): Promise<number | null> {
  try {
    const info = await Filesystem.stat({ path, directory: Directory.Documents })
    return info.size
  } catch {
    return null
  }
}

function forgetDownload(id: string) {
  downloadsStore.set((prev) => {
    const next = { ...prev }
    delete next[id]
    return next
  })
}

export async function verifyDownloads() {
  const records = Object.values(downloadsStore.get())
  for (const record of records) {
    const size = await localFileSize(record.path)
    if (size === null) forgetDownload(record.id)
    else if (size !== record.size) downloadsStore.set((prev) => ({ ...prev, [record.id]: { ...record, size } }))
  }
}

async function ensureStoragePermission() {
  if (!isNativeApp()) return
  const status = await Filesystem.checkPermissions()
  if (status.publicStorage === "granted") return
  const requested = await Filesystem.requestPermissions()
  if (requested.publicStorage !== "granted") {
    throw new Error("Storage permission is needed to save papers to your phone.")
  }
}

export async function openOnline(file: PaperFile) {
  await Browser.open({ url: file.url, toolbarColor: "#0b1633" })
  if (!viewedOnlineStore.get()[file.id]) {
    viewedOnlineStore.set((prev) => ({ ...prev, [file.id]: true }))
    addXp(5)
  }
}

async function openLocal(record: DownloadRecord) {
  if (isNativeApp()) {
    const { uri } = await Filesystem.getUri({ path: record.path, directory: Directory.Documents })
    await FileOpener.open({ filePath: uri, contentType: "application/pdf" })
    return
  }
  const result = await Filesystem.readFile({ path: record.path, directory: Directory.Documents })
  const blob =
    result.data instanceof Blob
      ? result.data
      : new Blob([Uint8Array.from(atob(result.data), (c) => c.charCodeAt(0))], { type: "application/pdf" })
  window.open(URL.createObjectURL(blob), "_blank", "noopener")
}

export async function openPaper(file: PaperFile): Promise<"offline" | "online"> {
  const record = downloadsStore.get()[file.id]
  if (record && (await localFileSize(record.path)) !== null) {
    await openLocal(record)
    return "offline"
  }
  if (record) forgetDownload(file.id)
  await openOnline(file)
  return "online"
}

export async function openDownload(record: DownloadRecord) {
  if ((await localFileSize(record.path)) === null) {
    forgetDownload(record.id)
    throw new Error("This file was removed from your phone. Download it again from the papers list.")
  }
  await openLocal(record)
}

export async function downloadPaper(file: PaperFile, onProgress: (fraction: number | null) => void) {
  if (!file.isDirectPdf) throw new Error("This paper is only available on the DBE website.")
  if (!isNativeApp()) {
    throw new Error("Saving to your phone works in the Ace Your Matric Android app. Browsers block direct DBE downloads.")
  }

  await ensureStoragePermission()
  const path = filePathFor(file)

  const listener = await Filesystem.addListener("progress", (status) => {
    if (status.url !== file.url) return
    onProgress(status.contentLength > 0 ? status.bytes / status.contentLength : null)
  })

  try {
    await Filesystem.downloadFile({
      url: file.url,
      path,
      directory: Directory.Documents,
      progress: true,
      recursive: true,
    })
  } finally {
    await listener.remove()
  }

  const size = (await localFileSize(path)) ?? 0
  if (size === 0) throw new Error("The download didn't finish. Check your data or Wi-Fi and try again.")

  const record: DownloadRecord = {
    id: file.id,
    title: file.title,
    subjectName: file.subjectName,
    year: file.year,
    kind: file.kind,
    path,
    size,
    savedAt: Date.now(),
    sourceUrl: file.url,
  }
  downloadsStore.set((prev) => ({ ...prev, [file.id]: record }))
  onProgress(1)
  addXp(10)
  return record
}

export async function deleteDownload(record: DownloadRecord) {
  try {
    await Filesystem.deleteFile({ path: record.path, directory: Directory.Documents })
  } catch {
    // Already gone from storage — still remove the record below.
  }
  forgetDownload(record.id)
}

import data from "./data/papers.json"

export const YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016] as const

export const DBE_FALLBACK_URL = "https://www.education.gov.za/Curriculum/NSC-Exams/NSC-Past-Exam-Papers"

export type FileKind = "paper" | "memo"

export interface PaperEntry {
  year: number
  paper: number
  url: string
  memoUrl: string | null
}

export interface Subject {
  id: string
  name: string
  papers: PaperEntry[]
}

export interface PaperFile {
  id: string
  kind: FileKind
  subjectId: string
  subjectName: string
  year: number
  paper: number
  title: string
  url: string
  isDirectPdf: boolean
}

export interface YearGroup {
  year: number
  items: { paper: PaperFile; memo: PaperFile }[]
  missing: boolean
}

const yearPages = data.yearPages as Record<string, string>

export const SUBJECTS: Subject[] = data.subjects as Subject[]

export function yearPageUrl(year: number) {
  return yearPages[String(year)] ?? DBE_FALLBACK_URL
}

function makeFile(subject: Subject, entry: PaperEntry, kind: FileKind): PaperFile {
  const rawUrl = kind === "paper" ? entry.url : entry.memoUrl
  return {
    id: `${subject.id}-${entry.year}-p${entry.paper}-${kind}`,
    kind,
    subjectId: subject.id,
    subjectName: subject.name,
    year: entry.year,
    paper: entry.paper,
    title: `${subject.name} P${entry.paper} - ${entry.year} - ${kind === "paper" ? "Question Paper" : "Memo"}`,
    url: rawUrl ?? yearPageUrl(entry.year),
    isDirectPdf: Boolean(rawUrl),
  }
}

export function getYearGroups(subject: Subject): YearGroup[] {
  return YEARS.map((year) => {
    const entries = subject.papers.filter((p) => p.year === year).sort((a, b) => a.paper - b.paper)
    return {
      year,
      missing: entries.length === 0,
      items: entries.map((entry) => ({
        paper: makeFile(subject, entry, "paper"),
        memo: makeFile(subject, entry, "memo"),
      })),
    }
  })
}

export function matchesQuery(file: PaperFile, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = `${file.subjectName} p${file.paper} paper ${file.paper} ${file.year} question paper memo`.toLowerCase()
  return q.split(/\s+/).every((part) => haystack.includes(part))
}

"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { PaperList } from "@/components/paper-list"
import { QuestionList } from "@/components/question-list"
import { QUESTIONS } from "@/lib/data/questions"
import { SUBJECTS } from "@/lib/papers"
import { cn } from "@/lib/utils"

export function HomeView() {
  const [subjectId, setSubjectId] = useState(SUBJECTS[0].id)
  const [query, setQuery] = useState("")
  const subject = SUBJECTS.find((s) => s.id === subjectId) ?? SUBJECTS[0]

  const questions = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = QUESTIONS[subject.id] ?? []
    return q ? list.filter((item) => item.question.toLowerCase().includes(q)) : list
  }, [subject.id, query])

  return (
    <main className="flex flex-col gap-6">
      <AppHeader />

      <nav aria-label="Subjects" className="-mx-4">
        <ul className="scrollbar-none flex snap-x gap-2 overflow-x-auto px-4 pb-1">
          {SUBJECTS.map((s) => (
            <li key={s.id} className="snap-start">
              <button
                type="button"
                aria-pressed={s.id === subjectId}
                onClick={() => setSubjectId(s.id)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors",
                  s.id === subjectId ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent",
                )}
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>
        <p className="px-4 pt-1 text-[11px] text-muted-foreground">{`${SUBJECTS.length} subjects · swipe for more`}</p>
      </nav>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <label htmlFor="search" className="sr-only">
          Search questions or papers
        </label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions or papers (e.g. 2019 P2)"
          className="h-12 w-full rounded-2xl border border-input bg-card pr-4 pl-11 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />
      </div>

      <QuestionList key={subject.id} questions={questions} />
      <PaperList subject={subject} query={query} />
    </main>
  )
}

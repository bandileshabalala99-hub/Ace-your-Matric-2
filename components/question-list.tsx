"use client"

import { useState } from "react"
import { Lightbulb, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ELI5_HEADER, type Question } from "@/lib/data/questions"
import { addXp } from "@/lib/progress"
import { cn } from "@/lib/utils"

export function QuestionList({ questions }: { questions: Question[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [explainedIds, setExplainedIds] = useState<Set<string>>(new Set())

  if (questions.length === 0) return null

  function explain(id: string) {
    if (!explainedIds.has(id)) {
      setExplainedIds((prev) => new Set(prev).add(id))
      addXp(2)
    }
  }

  return (
    <section aria-labelledby="questions-heading" className="flex flex-col gap-3">
      <h2 id="questions-heading" className="text-lg font-bold">
        Questions
      </h2>
      <ul className="flex flex-col gap-2">
        {questions.map((q) => {
          const open = openId === q.id
          const explained = explainedIds.has(q.id)
          return (
            <li key={q.id} className={cn("rounded-2xl bg-card transition-colors", open && "ring-1 ring-primary/40")}>
              <button
                type="button"
                className="w-full px-4 py-3.5 text-left text-sm font-medium"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : q.id)}
              >
                {q.question}
              </button>
              {open && (
                <div className="flex flex-col gap-3 px-4 pb-4">
                  {!explained ? (
                    <Button className="h-12 rounded-xl text-base font-bold" onClick={() => explain(q.id)}>
                      <Rocket className="size-5" aria-hidden="true" />
                      {"Explain Like I'm 5"}
                    </Button>
                  ) : (
                    <Eli5Card question={q} />
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Eli5Card({ question }: { question: Question }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4" aria-live="polite">
      <p className="text-sm font-bold text-primary">{ELI5_HEADER}</p>
      <ol className="flex flex-col gap-2 text-sm leading-relaxed">
        {question.steps.map((step, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <div className="flex gap-2.5 rounded-lg bg-background/60 p-3 text-sm leading-relaxed">
        <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <p>
          <span className="font-bold">Mzansi example: </span>
          {question.example}
        </p>
      </div>
    </div>
  )
}

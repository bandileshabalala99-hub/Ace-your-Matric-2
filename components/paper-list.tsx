"use client"

import { useMemo } from "react"
import { Browser } from "@capacitor/browser"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PaperCard } from "@/components/paper-card"
import { getYearGroups, matchesQuery, yearPageUrl, type Subject } from "@/lib/papers"

export function PaperList({ subject, query }: { subject: Subject; query: string }) {
  const groups = useMemo(() => {
    const all = getYearGroups(subject)
    if (!query.trim()) return all
    return all
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => matchesQuery(item.paper, query)),
      }))
      .filter((group) => group.items.length > 0)
  }, [subject, query])

  return (
    <section aria-labelledby="papers-heading" className="flex flex-col gap-3">
      <div>
        <h2 id="papers-heading" className="text-lg font-bold">
          {subject.name} Past Papers
        </h2>
        <p className="text-xs text-muted-foreground">Official DBE NSC papers · 2016–2024 · newest first</p>
      </div>

      {groups.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No papers match &ldquo;{query}&rdquo;. Try a year like 2019 or &ldquo;P2&rdquo;.
        </p>
      )}

      {groups.map((group) => (
        <div key={group.year} className="flex flex-col gap-3">
          <h3 className="sticky top-0 z-10 -mx-4 bg-background/90 px-4 py-1.5 text-sm font-bold text-primary backdrop-blur">
            {group.year} NSC November
          </h3>
          {group.missing ? (
            <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-border bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">
                {subject.name} {group.year} isn&apos;t in the DBE direct list. Find it on the official DBE page.
              </p>
              <Button
                variant="secondary"
                className="h-11 rounded-xl"
                onClick={() => Browser.open({ url: yearPageUrl(group.year), toolbarColor: "#0b1633" })}
              >
                <ExternalLink aria-hidden="true" />
                Open DBE {group.year} papers
              </Button>
            </div>
          ) : (
            group.items.map((item) => <PaperCard key={item.paper.id} paper={item.paper} memo={item.memo} />)
          )}
        </div>
      ))}
    </section>
  )
}

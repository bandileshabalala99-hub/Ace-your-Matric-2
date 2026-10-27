"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Download, House } from "lucide-react"
import { downloadsStore } from "@/lib/downloads"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()
  const count = Object.keys(downloadsStore.useValue()).length

  const items = [
    { href: "/", label: "Papers", icon: House, active: pathname === "/" },
    { href: "/downloads/", label: "My Downloads", icon: Download, active: pathname.startsWith("/downloads") },
  ]

  return (
    <nav aria-label="Main" className="border-t border-border bg-background/95 backdrop-blur">
      <ul className="mx-auto flex max-w-md">
        {items.map((item) => (
          <li key={item.href} className="flex-1">
            <Link
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 text-xs font-semibold transition-colors",
                item.active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="relative">
                <item.icon className="size-5" aria-hidden="true" />
                {item.href.startsWith("/downloads") && count > 0 && (
                  <span className="absolute -top-1.5 -right-3 rounded-full bg-success px-1.5 text-[10px] leading-4 font-bold text-success-foreground">
                    {count}
                  </span>
                )}
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

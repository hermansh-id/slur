import Link from "next/link"
import { ModeToggle } from "@/components/theme/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Indonesia Case Tracker
        </Link>
        <div className="flex items-center">
          <nav className="flex gap-4 sm:gap-6 mr-4">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/corruption" className="text-sm font-medium hover:text-primary transition-colors">
              Corruption
            </Link>
            <Link href="/actors" className="text-sm font-medium hover:text-primary transition-colors">
              Actors
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
} 
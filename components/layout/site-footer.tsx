import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 mt-10 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Indonesia Case Tracker. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
} 
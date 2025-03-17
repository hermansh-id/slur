import { ReactNode } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

interface SiteLayoutProps {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 w-full mx-auto max-w-screen-2xl">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
} 
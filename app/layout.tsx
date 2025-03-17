import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { SiteLayout } from "@/components/layout/site-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Indonesia Case Tracker",
  description: "Tracking and exposing various cases across Indonesia for transparency and accountability.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteLayout>
            {children}
          </SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}


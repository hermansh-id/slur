import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CasesList } from "@/components/cases-list"
import { CorruptionRankingChart } from "@/components/corruption-ranking-chart"

export default function HomePage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Indonesia Case Tracker
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Tracking major cases across Indonesia - from corruption to terrorism, human trafficking, and more.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="#cases">Browse All Cases</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/corruption">Corruption Section</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/actors">Actor Network</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="corruption-highlight" className="container py-12">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Corruption Highlight</h2>
              <p className="text-muted-foreground">Top corruption cases by financial impact</p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link href="/corruption">View All Corruption Cases</Link>
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <CorruptionRankingChart />
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="cases" className="container py-12">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">All Cases</h2>
              <p className="text-muted-foreground">Browse cases by type and impact</p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link href="/actors">View Actor Network</Link>
            </Button>
          </div>
          <CasesList />
        </div>
      </section>
    </>
  )
}


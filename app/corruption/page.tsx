import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CorruptionCasesList } from "@/components/corruption-cases-list"
import { CorruptionRankingChart } from "@/components/corruption-ranking-chart"
import { CorruptionImpact } from "@/components/corruption-impact"

export default function CorruptionPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Corruption in Indonesia</h1>
        <p className="text-xl text-muted-foreground">
          Tracking major corruption cases and their impact on society
        </p>
      </div>

      <div className="grid gap-8">
        <section id="chart">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Corruption Rankings</CardTitle>
                <CardDescription>Top corruption cases by financial impact</CardDescription>
              </div>
              <Link href="/actors" className="text-sm text-primary hover:underline">
                View Actor Network →
              </Link>
            </CardHeader>
            <CardContent>
              <CorruptionRankingChart />
            </CardContent>
          </Card>
        </section>

        <section id="impact">
          <CorruptionImpact />
        </section>

        <section id="cases">
          <Card>
            <CardHeader>
              <CardTitle>Corruption Cases</CardTitle>
              <CardDescription>Detailed list of major corruption cases in Indonesia</CardDescription>
            </CardHeader>
            <CardContent>
              <CorruptionCasesList />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
} 
"use client"

import { useState } from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { corruptionCases } from "@/data/corruption-cases"

export function CorruptionRankingChart() {
  const [sortBy, setSortBy] = useState<"amount" | "date">("amount")

  const chartData = [...corruptionCases]
    .sort((a, b) =>
      sortBy === "amount"
        ? b.amountInBillions - a.amountInBillions
        : new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    .slice(0, 5)
    .map((c, index) => ({
      name: c.name.length > 25 ? c.name.substring(0, 25) + "..." : c.name,
      amount: c.amountInBillions,
      status: c.status,
      fullName: c.name,
      id: c.id,
      rank: index + 1,
    }))

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Corruption Rankings</CardTitle>
            <CardDescription>Top 5 corruption cases by financial impact</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant={sortBy === "amount" ? "default" : "outline"} size="sm" onClick={() => setSortBy("amount")}>
              By Amount
            </Button>
            <Button variant={sortBy === "date" ? "default" : "outline"} size="sm" onClick={() => setSortBy("date")}>
              By Date
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-3/4">
            <ChartContainer
              config={{
                amount: {
                  label: "Amount (Billions Rp)",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barSize={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(value) => `${value.toLocaleString('en-US')}`} width={80} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => {
                          const item = chartData.find((item) => item.name === label)
                          return item?.fullName || label
                        }}
                        formatter={(value, name) => [`${value.toLocaleString('en-US')} Billion Rp`, "Amount"]}
                      />
                    }
                  />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.status === "Ongoing" ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                        fillOpacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="w-full md:w-1/4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Top 5 Ranking</h3>
              {chartData.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-md border ${
                    item.status === "Ongoing" ? "border-l-4 border-l-destructive" : "border-l-4 border-l-primary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold">
                      {item.rank}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{item.fullName}</p>
                      <p className="text-xs text-muted-foreground">Rp {item.amount.toLocaleString('en-US')} B</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span className="text-sm">Ongoing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm">Closed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, DollarSign, Calendar, Users, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { corruptionCases } from "@/data/corruption-cases"

export function CorruptionCasesList() {
  const [sortBy, setSortBy] = useState<"amount" | "date">("amount")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const sortedCases = [...corruptionCases].sort((a, b) => {
    if (sortBy === "amount") {
      return sortOrder === "desc" ? b.amountInBillions - a.amountInBillions : a.amountInBillions - b.amountInBillions
    } else {
      return sortOrder === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  })

  const toggleSort = (field: "amount" | "date") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Top Corruption Cases</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toggleSort("amount")} className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            Amount
            {sortBy === "amount" && <ArrowUpDown className="h-4 w-4 ml-1" />}
          </Button>
          <Button variant="outline" size="sm" onClick={() => toggleSort("date")} className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Date
            {sortBy === "date" && <ArrowUpDown className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedCases.map((corruptionCase, index) => (
          <Link href={`/case/${corruptionCase.id}`} key={corruptionCase.id}>
            <Card
              className={`h-full transition-all hover:shadow-md ${
                corruptionCase.status === "Ongoing" ? "border-l-4 border-l-destructive" : "border-l-4 border-l-primary"
              }`}
            >
              <CardHeader className="relative pb-2">
                <div className="absolute top-3 right-3">
                  <Badge variant={corruptionCase.status === "Ongoing" ? "destructive" : "default"}>
                    {corruptionCase.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{corruptionCase.name}</CardTitle>
                </div>
                <CardDescription>{corruptionCase.institution}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span className="font-medium">Rp {corruptionCase.amountInBillions.toLocaleString('en-US')} Billion</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(corruptionCase.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{corruptionCase.keyFigures.join(", ")}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-between">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, AlertTriangle, Calendar, Users, ChevronRight, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cases, CaseType } from "@/data/cases"
import { corruptionCases } from "@/data/corruption-cases"

// Combine corruption cases with general cases
const allCases = [
  ...cases,
  ...corruptionCases.map(c => ({
    ...c,
    type: 'corruption' as CaseType,
    impactScore: c.amountInBillions > 1000 ? 95 : c.amountInBillions > 500 ? 85 : 75 // Assign impact score based on amount
  }))
]

// Case type icons and colors
const caseTypeConfig = {
  corruption: { color: "bg-red-500", icon: <AlertTriangle className="h-4 w-4" /> },
  terrorism: { color: "bg-orange-500", icon: <AlertTriangle className="h-4 w-4" /> },
  human_trafficking: { color: "bg-yellow-500", icon: <Users className="h-4 w-4" /> },
  drug_trafficking: { color: "bg-purple-500", icon: <AlertTriangle className="h-4 w-4" /> },
  environmental: { color: "bg-green-500", icon: <AlertTriangle className="h-4 w-4" /> },
  fraud: { color: "bg-blue-500", icon: <AlertTriangle className="h-4 w-4" /> }
}

// Format case type for display
const formatCaseType = (type: CaseType): string => {
  return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export function CasesList() {
  const [sortBy, setSortBy] = useState<"impact" | "date">("impact")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedTypes, setSelectedTypes] = useState<CaseType[]>(Object.keys(caseTypeConfig) as CaseType[])

  const filteredCases = allCases.filter(c => selectedTypes.includes(c.type))

  const sortedCases = [...filteredCases].sort((a, b) => {
    if (sortBy === "impact") {
      return sortOrder === "desc" ? b.impactScore - a.impactScore : a.impactScore - b.impactScore
    } else {
      return sortOrder === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  })

  const toggleSort = (field: "impact" | "date") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  const toggleCaseType = (type: CaseType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-lg font-medium">Major Cases in Indonesia</h3>
        <div className="flex gap-2 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter Types
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(Object.keys(caseTypeConfig) as CaseType[]).map(type => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleCaseType(type)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${caseTypeConfig[type].color}`}></div>
                    {formatCaseType(type)}
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => toggleSort("impact")} 
            className={`flex items-center gap-1 ${sortBy === "impact" ? "border-primary" : ""}`}
          >
            <AlertTriangle className="h-4 w-4" />
            Impact
            {sortBy === "impact" && <ArrowUpDown className="h-4 w-4 ml-1" />}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => toggleSort("date")} 
            className={`flex items-center gap-1 ${sortBy === "date" ? "border-primary" : ""}`}
          >
            <Calendar className="h-4 w-4" />
            Date
            {sortBy === "date" && <ArrowUpDown className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedCases.map((caseItem, index) => (
          <Link 
            href={caseItem.type === 'corruption' ? `/corruption/${caseItem.id}` : `/case/${caseItem.id}`} 
            key={`${caseItem.type}-${caseItem.id}`}
          >
            <Card
              className={`h-full transition-all hover:shadow-md border-l-4 ${
                caseItem.status === "Ongoing" ? "border-l-destructive" : "border-l-primary"
              }`}
            >
              <CardHeader className="relative pb-2">
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge variant="outline" className={`${caseTypeConfig[caseItem.type].color} text-white`}>
                    {formatCaseType(caseItem.type)}
                  </Badge>
                  <Badge variant={caseItem.status === "Ongoing" ? "destructive" : "default"}>
                    {caseItem.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{caseItem.name}</CardTitle>
                </div>
                <CardDescription>{caseItem.institution}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span className="font-medium">Impact Score: {caseItem.impactScore}/100</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(caseItem.date).toLocaleDateString('en-US')}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{caseItem.keyFigures.join(", ")}</span>
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
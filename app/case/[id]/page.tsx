import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, AlertTriangle, Calendar, Building, Users, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cases, CaseType } from "@/data/cases"
import { RelatedNews } from "@/components/related-news"
import { KeyFigures } from "@/components/key-figures"
import { SocialShare } from "@/components/social-share"
import { ReportCorruption } from "@/components/report-corruption"
import { EducationalResources } from "@/components/educational-resources"
import { CommunityDiscussion } from "@/components/community-discussion"

// Case type icons and colors
const caseTypeConfig = {
  corruption: { color: "bg-red-500", textColor: "text-red-500" },
  terrorism: { color: "bg-orange-500", textColor: "text-orange-500" },
  human_trafficking: { color: "bg-yellow-500", textColor: "text-yellow-500" },
  drug_trafficking: { color: "bg-purple-500", textColor: "text-purple-500" },
  environmental: { color: "bg-green-500", textColor: "text-green-500" },
  fraud: { color: "bg-blue-500", textColor: "text-blue-500" }
}

// Format case type for display
const formatCaseType = (type: CaseType): string => {
  return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  // Ensure params.id exists
  if (!params || !params.id) {
    notFound()
  }

  const caseItem = cases.find((c) => c.id === params.id)

  if (!caseItem) {
    notFound()
  }

  const pageUrl = `https://indonesia-case-tracker.vercel.app/case/${params.id}`

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="font-bold text-xl">
            Indonesia Case Tracker
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/corruption" className="text-sm font-medium">
              Corruption
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-10">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Cases
            </Link>
          </Button>
          <div
            className={`p-6 rounded-lg border-l-4 ${caseItem.status === "Ongoing" ? "border-l-destructive bg-destructive/5" : "border-l-primary bg-primary/5"} mb-6`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className={`${caseTypeConfig[caseItem.type].color} text-white`}>
                    {formatCaseType(caseItem.type)}
                  </Badge>
                  <h1 className="text-3xl font-bold">{caseItem.name}</h1>
                </div>
                <p className="text-muted-foreground">{caseItem.institution}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <Badge
                  variant={caseItem.status === "Ongoing" ? "destructive" : "default"}
                  className="text-base px-3 py-1"
                >
                  {caseItem.status}
                </Badge>
                <SocialShare
                  title={`Case: ${caseItem.name}`}
                  url={pageUrl}
                  description={`Learn about the ${caseItem.name} case with impact score of ${caseItem.impactScore}/100`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Summary</CardTitle>
                    <CardDescription>Key information about this case</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Impact Score</p>
                          <p className="font-medium">{caseItem.impactScore}/100</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">{new Date(caseItem.date).toLocaleDateString('en-US')}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Institution</p>
                          <p className="font-medium">{caseItem.institution}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={`h-5 w-5 mr-2 rounded-full ${caseTypeConfig[caseItem.type].color}`}></div>
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className={`font-medium ${caseTypeConfig[caseItem.type].textColor}`}>
                            {formatCaseType(caseItem.type)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-muted-foreground">{caseItem.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <KeyFigures figures={caseItem.keyFiguresDetails || []} />

                <div className="flex justify-center">
                  <ReportCorruption />
                </div>
              </TabsContent>
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Background</h3>
                      <p className="text-muted-foreground">{caseItem.background}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Investigation Process</h3>
                      <p className="text-muted-foreground">{caseItem.investigation}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Legal Proceedings</h3>
                      <p className="text-muted-foreground">{caseItem.legalProceedings}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="timeline" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="relative border-l border-muted">
                      {caseItem.timeline &&
                        caseItem.timeline.map((event, index) => (
                          <li key={index} className="mb-10 ml-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -left-3 ring-8 ring-background">
                              <FileText className="w-3 h-3" />
                            </span>
                            <h3 className="flex items-center mb-1 text-lg font-semibold">
                              {event.title}
                              {index === 0 && (
                                <Badge variant="secondary" className="ml-3">
                                  Latest
                                </Badge>
                              )}
                            </h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                              {event.date}
                            </time>
                            <p className="mb-4 text-base font-normal text-muted-foreground">{event.description}</p>
                          </li>
                        ))}
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="discussion" className="space-y-6">
                <CommunityDiscussion />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <RelatedNews news={caseItem.relatedNews || []} />
            <EducationalResources />
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6 mt-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Indonesia Case Tracker. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


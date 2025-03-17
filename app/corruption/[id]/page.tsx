import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, DollarSign, Calendar, Building, AlertTriangle, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { corruptionCases } from "@/data/corruption-cases"
import { RelatedNews } from "@/components/related-news"
import { KeyFigures } from "@/components/key-figures"
import { SocialShare } from "@/components/social-share"
import { ReportCorruption } from "@/components/report-corruption"
import { CorruptionImpact } from "@/components/corruption-impact"
import { EducationalResources } from "@/components/educational-resources"
import { CommunityDiscussion } from "@/components/community-discussion"

export default function CorruptionCaseDetailPage({ params }: { params: { id: string } }) {
  // Ensure params.id exists
  if (!params || !params.id) {
    notFound()
  }

  const corruptionCase = corruptionCases.find((c) => c.id === params.id)

  if (!corruptionCase) {
    notFound()
  }

  const pageUrl = `https://indonesia-case-tracker.vercel.app/corruption/${params.id}`

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
            <Link href="/corruption" className="text-sm font-medium text-primary">
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
            <Link href="/corruption" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Corruption Cases
            </Link>
          </Button>
          <div
            className={`p-6 rounded-lg border-l-4 ${corruptionCase.status === "Ongoing" ? "border-l-destructive bg-destructive/5" : "border-l-primary bg-primary/5"} mb-6`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-red-500 text-white">
                    Corruption
                  </Badge>
                  <h1 className="text-3xl font-bold">{corruptionCase.name}</h1>
                </div>
                <p className="text-muted-foreground">{corruptionCase.institution}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <Badge
                  variant={corruptionCase.status === "Ongoing" ? "destructive" : "default"}
                  className="text-base px-3 py-1"
                >
                  {corruptionCase.status}
                </Badge>
                <SocialShare
                  title={`Corruption Case: ${corruptionCase.name}`}
                  url={pageUrl}
                  description={`Learn about the ${corruptionCase.name} corruption case involving Rp ${corruptionCase.amountInBillions.toLocaleString('en-US')} Billion`}
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
                <TabsTrigger value="impact">Impact</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Summary</CardTitle>
                    <CardDescription>Key information about this corruption case</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Amount</p>
                          <p className="font-medium">Rp {corruptionCase.amountInBillions.toLocaleString('en-US')} Billion</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">{new Date(corruptionCase.date).toLocaleDateString('en-US')}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Institution</p>
                          <p className="font-medium">{corruptionCase.institution}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <p
                            className={`font-medium ${corruptionCase.status === "Ongoing" ? "text-destructive" : "text-primary"}`}
                          >
                            {corruptionCase.status}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-muted-foreground">{corruptionCase.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <KeyFigures figures={corruptionCase.keyFiguresDetails || []} />

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
                      <p className="text-muted-foreground">{corruptionCase.background}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Investigation Process</h3>
                      <p className="text-muted-foreground">{corruptionCase.investigation}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Legal Proceedings</h3>
                      <p className="text-muted-foreground">{corruptionCase.legalProceedings}</p>
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
                      {corruptionCase.timeline &&
                        corruptionCase.timeline.map((event, index) => (
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
              <TabsContent value="impact" className="space-y-6">
                <CorruptionImpact />
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <CommunityDiscussion />
            </div>
          </div>

          <div className="space-y-6">
            <RelatedNews news={corruptionCase.relatedNews || []} />
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
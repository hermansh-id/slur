import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, FileText, Video, LinkIcon } from "lucide-react"
import Link from "next/link"

export function EducationalResources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Educational Resources
        </CardTitle>
        <CardDescription>Learn more about corruption, its impact, and how to fight it</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Understanding Corruption</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pl-6">
                <div>
                  <Link href="#" className="text-sm font-medium hover:underline flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    <span>What is Corruption?</span>
                  </Link>
                  <p className="text-xs text-muted-foreground">An introduction to different forms of corruption</p>
                </div>
                <div>
                  <Link href="#" className="text-sm font-medium hover:underline flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    <span>The Cost of Corruption in Indonesia</span>
                  </Link>
                  <p className="text-xs text-muted-foreground">Research on economic and social impacts</p>
                </div>
                <div>
                  <Link href="#" className="text-sm font-medium hover:underline flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    <span>Corruption Perception Index</span>
                  </Link>
                  <p className="text-xs text-muted-foreground">Indonesia's ranking in global corruption indices</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>Video Resources</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pl-6">
                <div>
                  <Link href="#" className="text-sm font-medium hover:underline flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    <span>How Corruption Works in Indonesia</span>
                  </Link>
                  <p className="text-xs text-muted-foreground">Explainer video by KPK (10 min)</p>
                </div>
                <div>
                  <Link href="#" className="text-sm font-medium hover:underline flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    <span>Citizen's Guide to Reporting Corruption</span>
                  </Link>
                  <p className="text-xs text-muted-foreground">Step-by-step tutorial (7 min)</p>
                </div>
                <div>
                  <Link href="#" className="text-sm font-medium hover:underline flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    <span>Success Stories: When Citizens Fight Back</span>
                  </Link>
                  <p className="text-xs text-muted-foreground">Documentary on grassroots anti-corruption (25 min)</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>How to Take Action</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pl-6">
                <div>
                  <Link href="#" className="text-sm font-medium hover:underline flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    <span>Reporting Corruption Safely</span>
                  </Link>
                  <p className="text-xs text-muted-foreground">Guide to whistleblower protections</p>
                </div>
                <div>
                  <Link href="#" className="text-sm font-medium hover:underline flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    <span>Community Organizing Against Corruption</span>
                  </Link>
                  <p className="text-xs text-muted-foreground">Toolkit for local activism</p>
                </div>
                <div>
                  <Link href="#" className="text-sm font-medium hover:underline flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    <span>Digital Tools for Transparency</span>
                  </Link>
                  <p className="text-xs text-muted-foreground">Apps and websites for monitoring public spending</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

// Add missing import
import { Shield } from "lucide-react"


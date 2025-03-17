"use client"

import { ExternalLink, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface NewsItem {
  title: string
  source: string
  date: string
  url: string
  summary?: string
}

interface NewsSummaryModalProps {
  newsItem: NewsItem | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function NewsSummaryModal({ newsItem, isOpen, onOpenChange }: NewsSummaryModalProps) {
  // Simulated database of pre-generated summaries
  const summaries: Record<string, string> = {
    "KPK Names New Suspect in e-KTP Corruption Case":
      "The Corruption Eradication Commission (KPK) has named a new high-profile suspect in the ongoing e-KTP corruption case. The suspect, a former ministry official, is alleged to have received bribes worth billions of rupiah. This development marks a significant expansion of the investigation that has already implicated several prominent politicians.",

    "Former Minister Questioned in e-KTP Case":
      "A former cabinet minister has been questioned by the KPK regarding their involvement in the e-KTP corruption scandal. The questioning lasted over 9 hours and focused on the minister's role in approving project budgets. While not yet named a suspect, sources indicate that the former minister is under intense scrutiny.",

    "Court Rejects Appeal from e-KTP Corruption Convict":
      "The Supreme Court has rejected an appeal from one of the main convicts in the e-KTP corruption case, upholding their 15-year prison sentence. The court found that the evidence presented during the original trial was sufficient to maintain the conviction. This decision effectively ends the legal options for the convict.",

    "10 Years After Century Bank Scandal: Lessons Learned":
      "A decade after Indonesia's Century Bank scandal, financial experts reflect on the lessons learned and reforms implemented. While regulatory frameworks have been strengthened, critics argue that political interference in banking oversight remains a concern. The article examines how the scandal has shaped Indonesia's approach to banking crises.",

    "Former Bank Century Owner Seeks Parole":
      "Robert Tantular, the former owner of Bank Century, has applied for parole after serving two-thirds of his prison sentence. His request cites good behavior and health concerns. The potential release has sparked debate about punishment adequacy for white-collar crimes that cause massive financial damage to the state.",

    "KPK Criticized for Slow Handling of Pelindo II Case":
      "Anti-corruption activists have criticized the KPK for the slow progress in the Pelindo II corruption case. Five years passed between naming RJ Lino as a suspect and filing formal charges. The delay has raised questions about political interference and the KPK's independence in handling high-profile cases.",

    "Expert Witness Challenges State Loss Calculation in Pelindo II Case":
      "An expert witness in the Pelindo II corruption trial has challenged the prosecution's calculation of state losses. The witness argued that the procurement of QCCs actually saved money compared to market rates at the time. This testimony could significantly impact the case against former Pelindo II CEO RJ Lino.",

    "More Suspects Named in Ongoing COVID Aid Corruption Investigation":
      "The KPK has named three additional suspects in the COVID-19 social aid corruption case. The new suspects include two ministry officials and a supplier who allegedly participated in the bribery scheme. This development suggests the corruption network was more extensive than initially thought.",
  }

  // Get the summary for the current news item
  const summary = newsItem ? summaries[newsItem.title] || "No summary available for this article." : ""

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="pr-10">{newsItem?.title}</DialogTitle>
          <DialogDescription className="flex justify-between items-center">
            <span>
              {newsItem?.source} • {newsItem?.date}
            </span>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2 font-medium text-foreground">AI-Generated Summary:</p>
            <p>{summary}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button asChild variant="outline">
            <a href={newsItem?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Read Original Article
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


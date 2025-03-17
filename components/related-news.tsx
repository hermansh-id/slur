"use client"

import { useState } from "react"
import { ExternalLink, Newspaper, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsSummaryModal } from "./news-summary-modal"

interface NewsItem {
  title: string
  source: string
  date: string
  url: string
}

interface RelatedNewsProps {
  news: NewsItem[]
}

export function RelatedNews({ news }: RelatedNewsProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
    setIsModalOpen(true)
  }

  // Sort news by date (newest first)
  const sortedNews = [...news].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Related News
          </CardTitle>
          <CardDescription>Latest news about this case</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sorted by date (newest first)</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {sortedNews.map((item, index) => {
              // Determine the size of the news item (for puzzle-like layout)
              const isLarge = index === 0 || index % 3 === 0

              return (
                <div
                  key={index}
                  onClick={() => handleNewsClick(item)}
                  className={`
                    border rounded-lg hover:bg-muted transition-colors cursor-pointer
                    ${isLarge ? "p-4" : "p-3"}
                  `}
                  style={{
                    gridColumn: isLarge ? "span 1" : "span 1",
                  }}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className={`${isLarge ? "font-medium" : "text-sm font-medium"}`}>{item.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>{item.source}</span>
                        <span className="mx-2">•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <NewsSummaryModal newsItem={selectedNews} isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}


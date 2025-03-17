import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-6 text-center max-w-md py-20">
          <AlertTriangle className="h-16 w-16 text-muted-foreground" />
          <h1 className="text-3xl font-bold">Case Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn&apos;t find the corruption case you&apos;re looking for. It may have been removed or the URL might be
            incorrect.
          </p>
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}


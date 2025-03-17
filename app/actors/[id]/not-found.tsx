import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ActorNotFound() {
  return (
    <div className="container py-12 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Actor Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        We couldn't find the actor you're looking for.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/actors">
            Back to Actor Network
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  )
} 
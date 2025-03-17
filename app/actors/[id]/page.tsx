import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { actors, getActorById, getCasesForActor, getConnectedActors } from "@/data/actors"

export const generateMetadata = ({ params }: { params: { id: string } }): Metadata => {
  const actor = getActorById(params.id)
  
  if (!actor) {
    return {
      title: "Actor Not Found | Indonesia Case Tracker",
    }
  }
  
  return {
    title: `${actor.name} | Indonesia Case Tracker`,
    description: `View details about ${actor.name}, ${actor.role}, and their involvement in various cases.`,
  }
}

export async function generateStaticParams() {
  return actors.map((actor) => ({
    id: actor.id,
  }))
}

export default function ActorDetailPage({ params }: { params: { id: string } }) {
  const actor = getActorById(params.id)
  
  if (!actor) {
    notFound()
  }
  
  const cases = getCasesForActor(actor.id)
  const connectedActors = getConnectedActors(actor.id)
  
  // Case type colors
  const caseTypeColors = {
    corruption: "#ef4444", // red-500
    terrorism: "#f97316", // orange-500
    human_trafficking: "#eab308", // yellow-500
    drug_trafficking: "#a855f7", // purple-500
    environmental: "#22c55e", // green-500
    fraud: "#3b82f6", // blue-500
  }
  
  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/actors">
            ← Back to Actor Network
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{actor.name}</h1>
            <p className="text-xl text-muted-foreground">{actor.role}</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="text-muted-foreground">{actor.description}</p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Involved Cases</h2>
            {cases.length === 0 ? (
              <p className="text-muted-foreground">No cases found for this actor.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {cases.map((caseItem: any) => (
                  <Card key={caseItem.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge 
                          style={{ backgroundColor: caseTypeColors[caseItem.type as keyof typeof caseTypeColors] }}
                          className="text-white"
                        >
                          {caseItem.type.charAt(0).toUpperCase() + caseItem.type.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(caseItem.date).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-lg mt-2">{caseItem.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{caseItem.summary}</p>
                      <Button size="sm" asChild>
                        <Link 
                          href={caseItem.type === 'corruption' 
                            ? `/corruption/${caseItem.id}` 
                            : `/case/${caseItem.id}`
                          }
                        >
                          View Case Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Actors</CardTitle>
            </CardHeader>
            <CardContent>
              {connectedActors.length === 0 ? (
                <p className="text-muted-foreground">No connected actors found.</p>
              ) : (
                <div className="space-y-4">
                  {connectedActors.map(connectedActor => (
                    <div key={connectedActor.id} className="border rounded-md p-3">
                      <Link href={`/actors/${connectedActor.id}`} className="hover:underline">
                        <h3 className="font-medium">{connectedActor.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{connectedActor.role}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Network Visualization</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild>
                <Link href="/actors">
                  View in Network Graph
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
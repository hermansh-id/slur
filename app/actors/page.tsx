import { Metadata } from "next"
import { ActorNetworkGraph } from "@/components/actor-network-graph"

export const metadata: Metadata = {
  title: "Actor Network | Indonesia Case Tracker",
  description: "Explore the network of actors involved in various cases in Indonesia",
}

export default function ActorsPage() {
  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Actor Network</h1>
        <p className="text-muted-foreground">
          Explore the network of actors involved in various cases. Click on an actor to see their details and connections.
        </p>
      </div>
      
      <ActorNetworkGraph />
    </div>
  )
} 
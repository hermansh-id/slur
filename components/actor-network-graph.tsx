"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { actors, Actor, getCasesForActor, getConnectedActors } from "@/data/actors"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Define types for our graph data
interface NodeObject {
  id: string
  name: string
  val: number
  color: string
  actor: Actor
  x?: number
  y?: number
  [key: string]: any
}

interface LinkObject {
  source: string | NodeObject
  target: string | NodeObject
  value: number
  [key: string]: any
}

interface GraphData {
  nodes: NodeObject[]
  links: LinkObject[]
}

// Define case type colors
type CaseTypeColors = {
  corruption: string
  terrorism: string
  human_trafficking: string
  drug_trafficking: string
  environmental: string
  fraud: string
  [key: string]: string
}

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] flex items-center justify-center">Loading network graph...</div>
})

// Function to get CSS variable color
const getCssVar = (variable: string): string => {
  if (typeof window !== 'undefined') {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
    return value.startsWith('#') ? value : `hsl(${value})`
  }
  return '#000000' // Fallback
}

// Case type colors using CSS variables
const getCaseTypeColor = (type: string): string => {
  switch (type) {
    case 'corruption': return getCssVar('--corruption')
    case 'terrorism': return getCssVar('--terrorism')
    case 'human_trafficking': return getCssVar('--human-trafficking')
    case 'drug_trafficking': return getCssVar('--drug-trafficking')
    case 'environmental': return getCssVar('--environmental')
    case 'fraud': return getCssVar('--fraud')
    default: return getCssVar('--muted')
  }
}

export function ActorNetworkGraph() {
  const router = useRouter()
  const { theme } = useTheme()
  const graphRef = useRef<any>(null)
  const [graphData, setGraphData] = useState<any>({ nodes: [], links: [] })
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null)
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set())
  const [highlightLinks, setHighlightLinks] = useState<Set<any>>(new Set())
  const [hoverNode, setHoverNode] = useState<string | null>(null)
  const [caseTypeColors, setCaseTypeColors] = useState<CaseTypeColors>({
    corruption: "#ef4444",
    terrorism: "#f97316",
    human_trafficking: "#eab308",
    drug_trafficking: "#a855f7",
    environmental: "#22c55e",
    fraud: "#3b82f6",
  })

  // Determine colors based on theme
  const backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff'
  const nodeDefaultColor = theme === 'dark' ? '#4a4a4a' : '#e2e8f0'
  const linkDefaultColor = theme === 'dark' ? '#333333' : '#cccccc'
  const linkHighlightColor = theme === 'dark' ? '#ffffff' : '#000000'

  // Update case type colors when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCaseTypeColors({
        corruption: getCssVar('--corruption'),
        terrorism: getCssVar('--terrorism'),
        human_trafficking: getCssVar('--human-trafficking'),
        drug_trafficking: getCssVar('--drug-trafficking'),
        environmental: getCssVar('--environmental'),
        fraud: getCssVar('--fraud'),
      })
    }
  }, [theme])

  // Prepare graph data
  useEffect(() => {
    // Create nodes from actors
    const nodes = actors.map(actor => {
      const cases = getCasesForActor(actor.id)
      // Determine node color based on most frequent case type
      const caseTypes = cases.map(c => c?.type || 'corruption')
      const mostFrequentType = caseTypes.length > 0 
        ? caseTypes.sort((a, b) => 
            caseTypes.filter(v => v === a).length - caseTypes.filter(v => v === b).length
          ).pop() || 'corruption'
        : 'corruption'
      
      return {
        id: actor.id,
        name: actor.name,
        val: 1 + (actor.connections.length / 2), // Size based on connections
        color: caseTypeColors[mostFrequentType as keyof CaseTypeColors] || "#64748b",
        actor: actor
      }
    })

    // Create links from connections
    const links: any[] = []
    actors.forEach(actor => {
      actor.connections.forEach(targetId => {
        // Only add link if both source and target exist
        if (nodes.some(n => n.id === targetId)) {
          links.push({
            source: actor.id,
            target: targetId,
            value: 1
          })
        }
      })
    })

    setGraphData({ nodes, links })
  }, [caseTypeColors])

  const handleNodeClick = useCallback((node: any) => {
    if (node) {
      setSelectedActor(node.actor)
    }
  }, [])

  const handleNodeHover = useCallback((node: any, prevNode: any) => {
    if (!node) {
      setHoverNode(null)
      setHighlightNodes(new Set())
      setHighlightLinks(new Set())
      return
    }

    setHoverNode(node.id)
    
    // Highlight connected nodes and links
    const connectedNodeIds = new Set<string>([node.id])
    const connectedLinks = new Set<any>()
    
    graphData.links.forEach((link: any) => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source
      const targetId = typeof link.target === 'object' ? link.target.id : link.target
      
      if (sourceId === node.id || targetId === node.id) {
        connectedNodeIds.add(sourceId)
        connectedNodeIds.add(targetId)
        connectedLinks.add(link)
      }
    })
    
    setHighlightNodes(connectedNodeIds)
    setHighlightLinks(connectedLinks)
  }, [graphData])

  const handleViewActorDetails = (actorId: string) => {
    router.push(`/actors/${actorId}`)
  }

  const getNodeColor = useCallback((node: any) => {
    return highlightNodes.has(node.id) ? node.color : nodeDefaultColor
  }, [highlightNodes, nodeDefaultColor])

  const getLinkColor = useCallback((link: any) => {
    return highlightLinks.has(link) ? linkHighlightColor : linkDefaultColor
  }, [highlightLinks, linkHighlightColor, linkDefaultColor])

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="h-[600px] w-full">
            {graphData.nodes.length > 0 && (
              <ForceGraph2D
                ref={graphRef}
                graphData={graphData}
                nodeLabel="name"
                nodeColor={getNodeColor}
                nodeRelSize={6}
                linkColor={getLinkColor}
                linkWidth={(link: any) => highlightLinks.has(link) ? 2 : 1}
                linkDirectionalParticles={4}
                linkDirectionalParticleWidth={(link: any) => highlightLinks.has(link) ? 2 : 0}
                onNodeClick={handleNodeClick}
                onNodeHover={handleNodeHover}
                cooldownTicks={100}
                d3AlphaDecay={0.02}
                d3VelocityDecay={0.3}
                backgroundColor={backgroundColor}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2 justify-center">
        <div className="text-sm font-medium mr-2">Case Types:</div>
        {Object.entries(caseTypeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-sm">{type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedActor} onOpenChange={(open) => !open && setSelectedActor(null)}>
        <DialogContent className="max-w-2xl">
          {selectedActor && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedActor.name}</DialogTitle>
                <DialogDescription>{selectedActor.role}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">{selectedActor.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Involved Cases</h3>
                  <div className="space-y-2">
                    {getCasesForActor(selectedActor.id).map((caseItem: any) => (
                      <div key={caseItem.id} className="border rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="outline" 
                                style={{ backgroundColor: caseTypeColors[caseItem.type as keyof CaseTypeColors] }}
                                className="text-white"
                              >
                                {caseItem.type.charAt(0).toUpperCase() + caseItem.type.slice(1)}
                              </Badge>
                              <h4 className="font-medium">{caseItem.name}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{caseItem.institution}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                          >
                            <Link 
                              href={caseItem.type === 'corruption' 
                                ? `/corruption/${caseItem.id}` 
                                : `/case/${caseItem.id}`
                              }
                            >
                              View Case
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Connected Actors</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {getConnectedActors(selectedActor.id).map(actor => (
                      <div key={actor.id} className="border rounded-md p-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{actor.name}</h4>
                            <p className="text-xs text-muted-foreground">{actor.role}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setSelectedActor(actor)
                              // Find and highlight the node in the graph
                              const node = graphData.nodes.find((n: any) => n.id === actor.id)
                              if (node && graphRef.current && node.x !== undefined && node.y !== undefined) {
                                graphRef.current.centerAt(node.x, node.y, 1000)
                                graphRef.current.zoom(2, 1000)
                              }
                            }}
                          >
                            Focus
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={() => handleViewActorDetails(selectedActor.id)}>
                  View Full Profile
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 
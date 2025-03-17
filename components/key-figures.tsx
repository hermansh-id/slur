import { Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface KeyFigure {
  name: string
  role: string
  description: string
  image?: string
}

interface KeyFiguresProps {
  figures: KeyFigure[]
}

export function KeyFigures({ figures }: KeyFiguresProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Key Figures
        </CardTitle>
        <CardDescription>People involved in this corruption case</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {figures.map((figure, index) => (
            <div key={index} className="flex gap-4">
              <Avatar className="h-12 w-12">
                {figure.image ? (
                  <AvatarImage src={figure.image} alt={figure.name} />
                ) : (
                  <AvatarFallback>{figure.name.substring(0, 2)}</AvatarFallback>
                )}
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-medium">{figure.name}</h3>
                <p className="text-sm text-muted-foreground">{figure.role}</p>
                <p className="text-sm">{figure.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


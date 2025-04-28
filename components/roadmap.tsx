import { Card, CardContent } from "@/components/ui/card"
import type { Gap } from "@/lib/calculate-gaps"

interface RoadmapProps {
  gaps: Gap[]
}

export function Roadmap({ gaps }: RoadmapProps) {
  // Filter gaps with high and medium severity
  const priorityGaps = gaps.filter((gap) => gap.severity === "High" || gap.severity === "Medium")

  // Group initiatives by timeframe
  const shortTerm = priorityGaps.filter((gap) => gap.severity === "High")
  const mediumTerm = priorityGaps.filter((gap) => gap.severity === "Medium")

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Short-term Initiatives (0-3 months)</h3>
        {shortTerm.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shortTerm.map((gap, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">{gap.dimension}</h4>
                  <p className="text-sm text-muted-foreground">{gap.action}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No short-term initiatives identified.</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Medium-term Initiatives (3-6 months)</h3>
        {mediumTerm.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mediumTerm.map((gap, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">{gap.dimension}</h4>
                  <p className="text-sm text-muted-foreground">{gap.action}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No medium-term initiatives identified.</p>
        )}
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Note:</strong> This roadmap is a high-level suggestion based on the assessment results. A detailed
          implementation plan should be developed in collaboration with key stakeholders.
        </p>
      </div>
    </div>
  )
}

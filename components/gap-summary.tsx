import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Gap } from "@/lib/calculate-gaps"

interface GapSummaryProps {
  gaps: Gap[]
  showActions?: boolean
}

export function GapSummary({ gaps, showActions = false }: GapSummaryProps) {
  // Calculate overall score
  const overallScore =
    gaps.length > 0 ? (gaps.reduce((sum, gap) => sum + gap.score, 0) / gaps.length).toFixed(1) : "0.0"

  // Count high severity gaps
  const highSeverityCount = gaps.filter((gap) => gap.severity === "High").length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Overall Score:</span>
              <span className="text-2xl font-bold">{overallScore}/3</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Dimensions with Low Scores:</span>
              <span className="text-2xl font-bold">{highSeverityCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dimension</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Gap Severity</TableHead>
            <TableHead>Key Issues Identified</TableHead>
            {showActions && <TableHead>Suggested Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {gaps.map((gap, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{gap.dimension}</TableCell>
              <TableCell>{gap.score.toFixed(1)}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    gap.severity === "High"
                      ? "bg-red-100 text-red-800"
                      : gap.severity === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {gap.severity}
                </span>
              </TableCell>
              <TableCell>{gap.issues}</TableCell>
              {showActions && <TableCell>{gap.action}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

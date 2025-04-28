"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SpiderChart } from "@/components/spider-chart"
import { GapSummary } from "@/components/gap-summary"
import { HeatMap } from "@/components/heat-map"
import { Roadmap } from "@/components/roadmap"
import { questions } from "@/lib/questions"
import { calculateGaps } from "@/lib/calculate-gaps"

// Mock data for demonstration
const mockAnswers = {
  0: 2, // Risk-based training approach
  1: 3, // Policy and procedure coverage
  2: 2, // Role-specific training
  3: 1, // Effectiveness of training
  4: 2, // Maintenance and update routines
  5: 3, // Clear roles and responsibilities
  6: 1, // Governance and routines
  7: 1, // Traceability and measurability
  8: 2, // Documentation
}

const mockTopics = [
  { name: "Internal Policies", mentions: 12 },
  { name: "AML", mentions: 10 },
  { name: "KYC", mentions: 7 },
  { name: "Sanctions", mentions: 5 },
  { name: "CTF", mentions: 2 },
]

const mockNeeds = [
  { name: "More Training Hours", mentions: 8 },
  { name: "Role-specific Content", mentions: 7 },
  { name: "Better Documentation", mentions: 6 },
  { name: "Clearer Governance", mentions: 5 },
  { name: "Regular Updates", mentions: 3 },
]

export default function ExportPage() {
  const router = useRouter()
  const [isExporting, setIsExporting] = useState(false)
  const [selectedSections, setSelectedSections] = useState({
    spiderChart: true,
    topicHeatMap: true,
    needHeatMap: true,
    gapSummary: true,
    roadmap: true,
  })

  const gaps = calculateGaps(mockAnswers, questions)

  const handleExport = async (type: "pdf" | "excel") => {
    setIsExporting(true)

    // Simulate export
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert(`In a production environment, this would export a ${type.toUpperCase()} file with the selected sections.`)

    setIsExporting(false)
  }

  const toggleSection = (section: keyof typeof selectedSections) => {
    setSelectedSections({
      ...selectedSections,
      [section]: !selectedSections[section],
    })
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Export Assessment Results</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>Select sections to include in the export</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="spiderChart"
                    checked={selectedSections.spiderChart}
                    onCheckedChange={() => toggleSection("spiderChart")}
                  />
                  <Label htmlFor="spiderChart">Spider Chart</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="topicHeatMap"
                    checked={selectedSections.topicHeatMap}
                    onCheckedChange={() => toggleSection("topicHeatMap")}
                  />
                  <Label htmlFor="topicHeatMap">Topic Heat Map</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="needHeatMap"
                    checked={selectedSections.needHeatMap}
                    onCheckedChange={() => toggleSection("needHeatMap")}
                  />
                  <Label htmlFor="needHeatMap">Need Heat Map</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gapSummary"
                    checked={selectedSections.gapSummary}
                    onCheckedChange={() => toggleSection("gapSummary")}
                  />
                  <Label htmlFor="gapSummary">Gap Summary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="roadmap"
                    checked={selectedSections.roadmap}
                    onCheckedChange={() => toggleSection("roadmap")}
                  />
                  <Label htmlFor="roadmap">Initiative Roadmap</Label>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full" onClick={() => handleExport("pdf")} disabled={isExporting}>
                    {isExporting ? "Exporting..." : "Export as PDF"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleExport("excel")}
                    disabled={isExporting}
                  >
                    Export as Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Preview of selected sections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {selectedSections.spiderChart && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Spider Chart</h3>
                    <div className="border p-4 rounded-md">
                      <SpiderChart answers={mockAnswers} questions={questions} />
                    </div>
                  </div>
                )}

                {selectedSections.topicHeatMap && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Topic Heat Map</h3>
                    <div className="border p-4 rounded-md">
                      <HeatMap data={mockTopics} />
                    </div>
                  </div>
                )}

                {selectedSections.needHeatMap && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Need Heat Map</h3>
                    <div className="border p-4 rounded-md">
                      <HeatMap data={mockNeeds} />
                    </div>
                  </div>
                )}

                {selectedSections.gapSummary && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Gap Summary</h3>
                    <div className="border p-4 rounded-md">
                      <GapSummary gaps={gaps} showActions={true} />
                    </div>
                  </div>
                )}

                {selectedSections.roadmap && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Initiative Roadmap</h3>
                    <div className="border p-4 rounded-md">
                      <Roadmap gaps={gaps} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => router.push("/admin/assessment/1/results")}>
            Back to Results
          </Button>
        </div>
      </div>
    </main>
  )
}

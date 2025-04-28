"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function ResultsPage() {
  const router = useRouter()
  const [isExporting, setIsExporting] = useState(false)

  const gaps = calculateGaps(mockAnswers, questions)

  const handleExport = async (type: "pdf" | "excel") => {
    setIsExporting(true)

    // Simulate export
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert(`In a production environment, this would export a ${type.toUpperCase()} file with the assessment results.`)

    setIsExporting(false)
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Assessment Results</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport("pdf")} disabled={isExporting}>
              Export as PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport("excel")} disabled={isExporting}>
              Export as Excel
            </Button>
          </div>
        </div>

        <Tabs defaultValue="spider" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="spider">Spider Chart</TabsTrigger>
            <TabsTrigger value="topics">Topic Heat Map</TabsTrigger>
            <TabsTrigger value="needs">Need Heat Map</TabsTrigger>
            <TabsTrigger value="roadmap">Initiative Roadmap</TabsTrigger>
          </TabsList>
          <TabsContent value="spider">
            <Card>
              <CardHeader>
                <CardTitle>Spider Chart</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full max-w-xl">
                  <SpiderChart answers={mockAnswers} questions={questions} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="topics">
            <Card>
              <CardHeader>
                <CardTitle>Topic Heat Map</CardTitle>
              </CardHeader>
              <CardContent>
                <HeatMap data={mockTopics} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="needs">
            <Card>
              <CardHeader>
                <CardTitle>Need Heat Map</CardTitle>
              </CardHeader>
              <CardContent>
                <HeatMap data={mockNeeds} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="roadmap">
            <Card>
              <CardHeader>
                <CardTitle>Initiative Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <Roadmap gaps={gaps} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Gap Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <GapSummary gaps={gaps} showActions={true} />
          </CardContent>
        </Card>

        <div className="flex justify-end mt-8">
          <Button onClick={() => router.push("/admin/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    </main>
  )
}

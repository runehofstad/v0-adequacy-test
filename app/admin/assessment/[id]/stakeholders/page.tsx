"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

// Mock data for demonstration
const mockStakeholders = [
  { id: 1, name: "John Smith", role: "Compliance Officer", department: "Compliance", interviewed: true },
  { id: 2, name: "Sarah Johnson", role: "Training Manager", department: "HR", interviewed: true },
  { id: 3, name: "Michael Brown", role: "Risk Officer", department: "Risk Management", interviewed: false },
  { id: 4, name: "Emily Davis", role: "Branch Manager", department: "Operations", interviewed: false },
  { id: 5, name: "Robert Wilson", role: "AML Specialist", department: "Compliance", interviewed: false },
]

export default function StakeholdersPage() {
  const router = useRouter()
  const [stakeholders, setStakeholders] = useState(mockStakeholders)
  const [activeTab, setActiveTab] = useState("list")
  const [selectedStakeholder, setSelectedStakeholder] = useState<number | null>(null)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInterviewComplete = (id: number) => {
    setStakeholders(stakeholders.map((s) => (s.id === id ? { ...s, interviewed: true } : s)))
  }

  const handleSelectStakeholder = (id: number) => {
    setSelectedStakeholder(id)
    setActiveTab("interview")
    // In a real app, you would fetch notes for this stakeholder
    setNotes("")
  }

  const handleSaveNotes = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mark stakeholder as interviewed
    if (selectedStakeholder) {
      handleInterviewComplete(selectedStakeholder)
    }

    setIsSubmitting(false)
    setActiveTab("list")
    setSelectedStakeholder(null)
  }

  const handleProceed = () => {
    router.push("/admin/assessment/1/questionnaire")
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Stakeholder Management</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Stakeholder List</TabsTrigger>
            <TabsTrigger value="interview" disabled={selectedStakeholder === null}>
              Interview Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>Stakeholders</CardTitle>
                <CardDescription>Manage stakeholders for this assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stakeholders.map((stakeholder) => (
                      <TableRow key={stakeholder.id}>
                        <TableCell className="font-medium">{stakeholder.name}</TableCell>
                        <TableCell>{stakeholder.role}</TableCell>
                        <TableCell>{stakeholder.department}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              stakeholder.interviewed ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {stakeholder.interviewed ? "Interviewed" : "Pending"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleSelectStakeholder(stakeholder.id)}>
                            {stakeholder.interviewed ? "View Notes" : "Record Interview"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interview">
            <Card>
              <CardHeader>
                <CardTitle>Interview Notes: {stakeholders.find((s) => s.id === selectedStakeholder)?.name}</CardTitle>
                <CardDescription>Record notes and observations from the stakeholder interview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interviewDate">Interview Date</Label>
                    <Input id="interviewDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interviewMethod">Interview Method</Label>
                    <Select defaultValue="video">
                      <SelectTrigger id="interviewMethod">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inperson">In Person</SelectItem>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="email">Email Exchange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interviewNotes">Interview Notes</Label>
                  <Textarea
                    id="interviewNotes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Record key points, observations, and quotes from the interview..."
                    rows={10}
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("list")}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveNotes} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Notes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
            Save as Draft
          </Button>
          <Button onClick={handleProceed} disabled={stakeholders.filter((s) => s.interviewed).length === 0}>
            Proceed to Questionnaire
          </Button>
        </div>
      </div>
    </main>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function NewAssessmentPage() {
  const router = useRouter()
  const [clientName, setClientName] = useState("")
  const [stakeholderCount, setStakeholderCount] = useState(3)
  const [stakeholders, setStakeholders] = useState<string[]>(Array(3).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStakeholderChange = (index: number, value: string) => {
    const newStakeholders = [...stakeholders]
    newStakeholders[index] = value
    setStakeholders(newStakeholders)
  }

  const handleStakeholderCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number.parseInt(e.target.value)
    if (count >= 1 && count <= 10) {
      setStakeholderCount(count)

      // Adjust stakeholders array size
      if (count > stakeholders.length) {
        setStakeholders([...stakeholders, ...Array(count - stakeholders.length).fill("")])
      } else {
        setStakeholders(stakeholders.slice(0, count))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would send this data to your backend
    console.log("Creating new assessment:", { clientName, stakeholders })

    setIsSubmitting(false)
    router.push("/admin/assessment/1/questionnaire") // In a real app, this would be the new assessment ID
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Create New Assessment</h1>

        <Card>
          <CardHeader>
            <CardTitle>Session Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., Bank XYZ"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stakeholderCount">Number of Stakeholders (1-10)</Label>
                <Input
                  id="stakeholderCount"
                  type="number"
                  min={1}
                  max={10}
                  value={stakeholderCount}
                  onChange={handleStakeholderCountChange}
                  required
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Stakeholder Names</h3>
                {stakeholders.map((stakeholder, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`stakeholder-${index}`}>Stakeholder {index + 1}</Label>
                    <Input
                      id={`stakeholder-${index}`}
                      value={stakeholder}
                      onChange={(e) => handleStakeholderChange(index, e.target.value)}
                      placeholder={`e.g., John Doe`}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save and Proceed"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SpiderChart } from "@/components/spider-chart"
import { GapSummary } from "@/components/gap-summary"
import { questions } from "@/lib/questions"
import { calculateGaps } from "@/lib/calculate-gaps"

export default function ResultsPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const storedAnswers = localStorage.getItem("testAnswers")
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers))
    } else {
      // If no answers found, redirect to test page
      router.push("/test")
    }
  }, [router])

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would send this data to your backend
    console.log("Booking session with:", { name, email, answers })

    setIsSubmitting(false)

    // Store user info in localStorage for potential use on thank you page
    localStorage.setItem("userName", name)
    localStorage.setItem("userEmail", email)

    // Redirect to thank you page
    router.push("/thank-you")
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("In a production environment, this would download a PDF with your results.")
  }

  // Calculate overall score
  const overallScore =
    Object.values(answers).length > 0
      ? (Object.values(answers).reduce((sum, val) => sum + val, 0) / questions.length).toFixed(1)
      : "0.0"

  // Calculate gaps
  const gaps = calculateGaps(answers, questions)

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">Your Adequacy Test Results</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Spider Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <SpiderChart answers={answers} questions={questions} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="font-medium">Overall Score:</span>
                  <span className="text-2xl font-bold">{overallScore}/3</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="font-medium">Dimensions with Low Scores:</span>
                  <span className="text-2xl font-bold">{gaps.filter((g) => g.severity === "High").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <GapSummary gaps={gaps} />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Book a Session for Full Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center p-4">
                <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                <p className="text-muted-foreground">Our team will get in touch with you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleBookSession} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Book a Session"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="outline" onClick={handleDownloadPDF}>
            Download Results (PDF)
          </Button>
        </div>
      </div>
    </main>
  )
}

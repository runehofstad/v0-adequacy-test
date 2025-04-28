"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { questions } from "@/lib/questions"

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

  const handleNext = () => {
    if (selectedValue !== null) {
      setAnswers({ ...answers, [currentQuestion]: selectedValue })

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedValue(null)
      } else {
        // Save answers to localStorage for results page
        localStorage.setItem("testAnswers", JSON.stringify({ ...answers, [currentQuestion]: selectedValue }))
        router.push("/results")
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedValue(answers[currentQuestion - 1] || null)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h2>

            <RadioGroup
              value={selectedValue?.toString()}
              onValueChange={(value) => setSelectedValue(Number.parseInt(value))}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="partly" />
                <Label htmlFor="partly">Only Partly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={selectedValue === null}>
            {currentQuestion < questions.length - 1 ? "Next" : "View Results"}
          </Button>
        </div>
      </div>
    </main>
  )
}

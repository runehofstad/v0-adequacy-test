"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { questions } from "@/lib/questions"
import { subQuestions } from "@/lib/sub-questions"

export default function QuestionnairePage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [subAnswers, setSubAnswers] = useState<Record<string, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleMainAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleSubAnswer = (questionId: string, value: number) => {
    setSubAnswers({ ...subAnswers, [questionId]: value })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would send this data to your backend
    console.log("Submitting questionnaire:", { answers, subAnswers })

    setIsSubmitting(false)
    router.push("/admin/assessment/1/topics") // In a real app, this would be the current assessment ID
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Full Adequacy Questionnaire</h1>

        <div className="space-y-6 mb-8">
          {questions.map((question, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">
                      {index + 1}. {question.question}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="font-medium">High-level Score</h3>
                          <RadioGroup
                            value={answers[index]?.toString()}
                            onValueChange={(value) => handleMainAnswer(index, Number.parseInt(value))}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id={`q${index}-no`} />
                              <Label htmlFor={`q${index}-no`}>Not Adequate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="2" id={`q${index}-partly`} />
                              <Label htmlFor={`q${index}-partly`}>Partially Adequate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="3" id={`q${index}-yes`} />
                              <Label htmlFor={`q${index}-yes`}>Fully Adequate</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-medium">Sub-questions</h3>
                          <div className="space-y-4 pl-4 border-l-2 border-muted">
                            {subQuestions[index].map((subQ, subIndex) => (
                              <div key={subIndex} className="space-y-2">
                                <p className="text-sm">{subQ.question}</p>
                                <RadioGroup
                                  value={subAnswers[`${index}-${subIndex}`]?.toString()}
                                  onValueChange={(value) =>
                                    handleSubAnswer(`${index}-${subIndex}`, Number.parseInt(value))
                                  }
                                  className="flex space-x-4"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="1" id={`sub-${index}-${subIndex}-no`} />
                                    <Label htmlFor={`sub-${index}-${subIndex}-no`}>No</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="2" id={`sub-${index}-${subIndex}-partly`} />
                                    <Label htmlFor={`sub-${index}-${subIndex}-partly`}>Only Partly</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="3" id={`sub-${index}-${subIndex}-yes`} />
                                    <Label htmlFor={`sub-${index}-${subIndex}-yes`}>Yes</Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
            Save as Draft
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Proceed to Topic/Need Identification"}
          </Button>
        </div>
      </div>
    </main>
  )
}

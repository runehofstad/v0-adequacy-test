"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ThankYouPage() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Get user name from localStorage if available
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Takk for din interesse!</CardTitle>
          <CardDescription>
            {userName ? `Hei ${userName}, vi` : "Vi"} har mottatt din forespørsel om en full vurdering.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Vårt team vil kontakte deg innen 1-2 virkedager for å planlegge din fulle vurdering.
          </p>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Hva skjer nå?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                  1
                </span>
                <span>En konsulent fra Vidda Solutions vil kontakte deg</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                  2
                </span>
                <span>Vi vil planlegge intervjuer med 3-10 interessenter fra din organisasjon</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                  3
                </span>
                <span>Vi vil gjennomføre en full vurdering og presentere resultatene</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline">Tilbake til hjemmesiden</Button>
          </Link>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Åpne kalender
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

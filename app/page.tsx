import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Check Your Training Program&apos;s Adequacy</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Assess your AML training program against regulatory standards and identify compliance gaps. This quick
          assessment will help you understand where your organization stands and what areas need improvement.
        </p>
        <Link href="/test">
          <Button size="lg" className="text-lg px-8 py-6">
            Start Test Now
          </Button>
        </Link>
      </div>
    </main>
  )
}

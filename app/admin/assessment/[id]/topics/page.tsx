"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Edit } from "lucide-react"

type Entry = {
  id: number
  type: "Topic" | "Need"
  name: string
  mentions: number
}

export default function TopicsPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<Entry[]>([
    { id: 1, type: "Topic", name: "AML", mentions: 10 },
    { id: 2, type: "Topic", name: "Internal Policies", mentions: 12 },
    { id: 3, type: "Need", name: "More Training Hours", mentions: 8 },
  ])
  const [entryType, setEntryType] = useState<"Topic" | "Need">("Topic")
  const [entryName, setEntryName] = useState("")
  const [entryMentions, setEntryMentions] = useState(1)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddEntry = () => {
    if (entryName.trim() === "") return

    if (editingId !== null) {
      // Update existing entry
      setEntries(
        entries.map((entry) =>
          entry.id === editingId ? { ...entry, type: entryType, name: entryName, mentions: entryMentions } : entry,
        ),
      )
      setEditingId(null)
    } else {
      // Add new entry
      const newId = Math.max(0, ...entries.map((e) => e.id)) + 1
      setEntries([
        ...entries,
        {
          id: newId,
          type: entryType,
          name: entryName,
          mentions: entryMentions,
        },
      ])
    }

    // Reset form
    setEntryName("")
    setEntryMentions(1)
  }

  const handleEditEntry = (entry: Entry) => {
    setEntryType(entry.type)
    setEntryName(entry.name)
    setEntryMentions(entry.mentions)
    setEditingId(entry.id)
  }

  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setEntryName("")
      setEntryMentions(1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would send this data to your backend
    console.log("Submitting topics and needs:", entries)

    setIsSubmitting(false)
    router.push("/admin/assessment/1/results") // In a real app, this would be the current assessment ID
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Topic and Need Identification</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add Topics and Needs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="entryType">Type</Label>
                <Select value={entryType} onValueChange={(value) => setEntryType(value as "Topic" | "Need")}>
                  <SelectTrigger id="entryType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Topic">Topic</SelectItem>
                    <SelectItem value="Need">Need</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="entryName">Name</Label>
                <Input
                  id="entryName"
                  value={entryName}
                  onChange={(e) => setEntryName(e.target.value)}
                  placeholder="e.g., AML, More Training Hours"
                />
              </div>
              <div>
                <Label htmlFor="entryMentions">Mentions</Label>
                <Input
                  id="entryMentions"
                  type="number"
                  min={1}
                  value={entryMentions}
                  onChange={(e) => setEntryMentions(Number.parseInt(e.target.value))}
                />
              </div>
            </div>
            <Button onClick={handleAddEntry} className="w-full">
              {editingId !== null ? "Update Entry" : "Add Entry"}
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Mentions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.type}</TableCell>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.mentions}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditEntry(entry)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {entries.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      No entries added yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
            Save as Draft
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || entries.length === 0}>
            {isSubmitting ? "Generating..." : "Generate Results"}
          </Button>
        </div>
      </div>
    </main>
  )
}

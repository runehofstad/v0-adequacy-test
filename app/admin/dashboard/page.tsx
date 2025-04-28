"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from "lucide-react"

// Mock data for demonstration
const mockSessions = [
  { id: 1, name: "Bank XYZ Assessment", client: "Bank XYZ", created: "2023-04-15", status: "Completed" },
  { id: 2, name: "Financial Corp Review", client: "Financial Corp", created: "2023-05-20", status: "In Progress" },
  { id: 3, name: "Global Bank Audit", client: "Global Bank", created: "2023-06-10", status: "Draft" },
]

export default function AdminDashboardPage() {
  const [sessions, setSessions] = useState(mockSessions)

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this assessment?")) {
      setSessions(sessions.filter((session) => session.id !== id))
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link href="/admin/assessment/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Assessment
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.name}</TableCell>
                    <TableCell>{session.client}</TableCell>
                    <TableCell>{session.created}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          session.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : session.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {session.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/assessment/${session.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link href={`/admin/assessment/${session.id}/edit`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(session.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

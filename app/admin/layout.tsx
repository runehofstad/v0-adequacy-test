import type React from "react"
import { AdminNav } from "@/components/admin-nav"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="w-full md:w-64 border-r p-4 hidden md:block">
        <div className="flex h-14 items-center border-b mb-4 px-4">
          <h1 className="text-lg font-bold">Vidda Admin</h1>
        </div>
        <AdminNav />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

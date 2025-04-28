"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, ClipboardList, Cog, Home, LayoutDashboard, LogOut, Users } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Assessments",
    href: "/admin/assessment/new",
    icon: ClipboardList,
  },
  {
    title: "Results",
    href: "/admin/assessment/1/results",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Cog,
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-primary/10",
            pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
      <div className="py-4">
        <div className="h-px w-full bg-border" />
      </div>
      <Link
        href="/"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10"
      >
        <Home className="h-4 w-4" />
        Public Site
      </Link>
      <Link
        href="/admin"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-destructive/10"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Link>
    </nav>
  )
}

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut, Calendar, BookOpen } from "lucide-react"
import { removeToken } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export function Navbar() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    removeToken()
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    })
    router.push("/login")
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto">
        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">🎾 TennisBook</span>
        </Link>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
            >
              <Calendar className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/my-bookings"
              className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
            >
              <BookOpen className="h-4 w-4" />
              <span>My Bookings</span>
            </Link>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=100&h=100&fit=crop" alt="User avatar" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

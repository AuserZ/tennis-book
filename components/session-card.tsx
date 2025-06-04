"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, Users } from "lucide-react"

interface SessionCardProps {
  session: {
    id: string
    coach: string
    time: string
    type: "private" | "public"
    availableSlots: number
    maxSlots: number
    price: number
  }
  onBook: (session: any) => void
}

export function SessionCard({ session, onBook }: SessionCardProps) {
  const isFullyBooked = session.availableSlots === 0

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{session.coach}</CardTitle>
          <Badge variant={session.type === "private" ? "default" : "secondary"}>
            {session.type === "private" ? <User className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
            {session.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{session.time}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">${session.price}</span>
            <span className="text-muted-foreground"> per person</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {session.availableSlots} of {session.maxSlots} slots available
          </div>
        </div>

        <Button onClick={() => onBook(session)} disabled={isFullyBooked} className="w-full">
          {isFullyBooked ? "Fully Booked" : "Book Now"}
        </Button>
      </CardContent>
    </Card>
  )
}

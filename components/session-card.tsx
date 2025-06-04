"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, Users, MapPin, Info } from "lucide-react"

interface SessionCardProps {
  session: {
    id: string
    coach: string
    time: string
    type: "private" | "public"
    availableSlots: number
    maxSlots: number
    price: number
    coachImage?: string
    description?: string
    location?: string
    facility?: string
  }
  onBook: (session: any) => void
  onViewDetails: (session: any) => void
}

export function SessionCard({ session, onBook, onViewDetails }: SessionCardProps) {
  const isFullyBooked = session.availableSlots === 0

  return (
    <Card className="w-full hover:shadow-lg transition-shadow group border-[#E5E7EB] bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={session.coachImage || "/placeholder.svg?height=60&width=60"}
              alt={`Coach ${session.coach}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#E5E7EB]"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-[#1F2937]">{session.coach}</CardTitle>
            <p className="text-sm text-[#4B5563] mt-1">{session.description}</p>
          </div>
          <Badge
            variant={session.type === "private" ? "default" : "secondary"}
            className={
              session.type === "private" ? "bg-[#3B82F6] text-white" : "bg-[#F9FAFB] text-[#1F2937] border-[#E5E7EB]"
            }
          >
            {session.type === "private" ? <User className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
            {session.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-[#4B5563]">
          <Clock className="w-4 h-4" />
          <span>{session.time}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-[#4B5563]">
          <MapPin className="w-4 h-4" />
          <div>
            <div className="font-medium text-[#1F2937]">{session.location}</div>
            <div className="text-xs">{session.facility}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium text-lg text-[#10B981]">${session.price}</span>
            <span className="text-[#4B5563]"> per person</span>
          </div>
          <div className="text-sm">
            <span className={`font-medium ${session.availableSlots > 0 ? "text-[#F59E0B]" : "text-[#4B5563]"}`}>
              {session.availableSlots}
            </span>
            <span className="text-[#4B5563]"> of {session.maxSlots} slots available</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(session)}
            className="flex-1 border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#1F2937]"
          >
            <Info className="w-4 h-4 mr-2" />
            Details
          </Button>
          <Button
            onClick={() => onBook(session)}
            disabled={isFullyBooked}
            size="sm"
            className={`flex-1 transition-colors ${
              isFullyBooked
                ? "bg-[#4B5563] text-white cursor-not-allowed"
                : "bg-[#10B981] hover:bg-[#10B981]/90 text-white"
            }`}
          >
            {isFullyBooked ? "Fully Booked" : "Book Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

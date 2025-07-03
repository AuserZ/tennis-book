"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Session } from "@/lib/types/api"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MapPin, Info } from "lucide-react"
import { formatTime } from "@/lib/utils"

interface SessionCardProps {
  session: Session
  onBook: (session: Session) => void
  onViewDetails: (session: Session) => void
}

export function SessionCard({ session, onBook, onViewDetails }: SessionCardProps) {
  const availableSlots = session.maxParticipants - session.currentParticipants

  const getAvailabilityText = () => {
    if (availableSlots === 0 || (session.type == 'Private' && session.currentParticipants > 0)) {
      return { text: 'Full booked', colorClass: 'text-destructive' }
    } else if (availableSlots <= 2 && session.type != 'Private') {
      return { text: `${availableSlots} slots left!`, colorClass: 'text-[#F59E0B]' }
    } else {
      return { text: `${availableSlots} of ${session.maxParticipants} slots available`, colorClass: 'text-[#10B981]' }
    }
  }

  const availabilityInfo = getAvailabilityText()

  return (
    <Card className="overflow-hidden border-[#E5E7EB] bg-white">
      {/* Tennis Field Image */}
      <div className="relative w-full h-56">
        <img
          src={
            // session.tennisField.photoUrl || Temp since url is 404 
            "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
          }
          alt={`${session.tennisField.name} tennis court`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h4 className="text-white font-semibold text-lg">{session.tennisField.name}</h4>
          <p className="text-white/90 text-sm">{session.tennisField.location}</p>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Top Section: Avatar, Coach Info, Badge */}
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              {/* Placeholder Avatar Image - Replace with actual coach image when available */}
              <AvatarImage src="/placeholder-avatar.png" alt={`${session.coach.name} Avatar`} />
              <AvatarFallback>{session.coach.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-[#1F2937]">{session.coach.name}</h3>
              {/* Placeholder for Coach Bio/Experience */}
              <p className="text-sm text-[#4B5563]">Former professional player with 10+ years coaching experience</p>
            </div>
          </div>
          {/* Colored Badge */}
          <Badge
            className={
              session.type.toLowerCase() === 'public'
                ? 'bg-green-100 text-green-800 border-green-200'
                : 'bg-blue-100 text-blue-800 border-blue-200'
            }
          >
            {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
          </Badge>
        </div>

        {/* Details Section: Time, Location, Availability, Description */}
        <div className="space-y-3">
          {/* Time */}
          <div className="flex items-center text-sm text-[#4B5563]">
            <Clock className="w-4 h-4 mr-2 text-[#1F2937]" />
            <span>
              {formatTime(session.startTime)} - {formatTime(session.endTime)}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-[#4B5563]">
            <MapPin className="w-4 h-4 mr-2 text-[#1F2937]" />
            <span>{session.tennisField.location}</span>
          </div>

          {/* Slot Availability (color-coded) */}
          <div>
            <span className={`text-sm font-medium ${availabilityInfo.colorClass}`}>
              {availabilityInfo.text}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#4B5563] line-clamp-2">{session.description}</p>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
        <div className="flex flex-col items-end min-w-[120px] w-full md:w-auto mb-2 md:mb-0">
          <div className="text-3xl font-extrabold text-green-600 leading-tight">Rp. {session.pricePerPerson}
            <span className="text-xs text-gray-500">/ person</span></div>
        </div>
        <div className="flex gap-2 w-full md:w-auto md:flex-1 md:justify-end">
          <Button
            variant="outline"
            className="flex-1 border-[#E5E7EB] text-[#1F2937] hover:bg-[#F9FAFB] hover:text-[#1F2937]"
            onClick={() => onViewDetails(session)}
          >
            <Info className="w-4 h-4 mr-2" /> View Details
          </Button>
          <Button
            className={`flex-1 ${availableSlots === 0 ? 'bg-destructive text-destructive-foreground' : 'bg-[#10B981] hover:bg-[#10B981]/90 text-white'}`}
            onClick={() => onBook(session)}
            disabled={availableSlots === 0}
          >
            {availableSlots === 0 ? 'Full' : 'Book Now'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

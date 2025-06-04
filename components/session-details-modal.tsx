"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, User, Users, Star, Award, Calendar } from "lucide-react"

interface SessionDetailsModalProps {
  session: {
    id: string
    coach: string
    coachImage?: string
    time: string
    type: "private" | "public"
    availableSlots: number
    maxSlots: number
    price: number
    description?: string
    location?: string
    facility?: string
    address?: string
    amenities?: string[]
    coachBio?: string
    rating?: number
    totalReviews?: number
    courtImage?: string
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onBook: (session: any) => void
}

export function SessionDetailsModal({ session, open, onOpenChange, onBook }: SessionDetailsModalProps) {
  if (!session) return null

  const isFullyBooked = session.availableSlots === 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border-tennis-borderGray">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#1F2937]">Session Details</DialogTitle>
          <DialogDescription className="text-[#4B5563]">
            Complete information about this tennis session
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Court Image */}
          <div className="relative">
            <img
              src={session.courtImage || "/placeholder.svg?height=200&width=500"}
              alt={`${session.location} court view`}
              className="w-full h-48 object-cover rounded-lg border border-[#E5E7EB]"
            />
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {session.location}
            </div>
          </div>

          {/* Coach Information */}
          <div className="flex items-start space-x-4">
            <img
              src={session.coachImage || "/placeholder.svg?height=80&width=80"}
              alt={`Coach ${session.coach}`}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#10B981]"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-semibold text-[#1F2937]">{session.coach}</h3>
                <Badge
                  variant={session.type === "private" ? "default" : "secondary"}
                  className={
                    session.type === "private"
                      ? "bg-[#3B82F6] text-white"
                      : "bg-[#F9FAFB] text-[#1F2937] border-[#E5E7EB]"
                  }
                >
                  {session.type === "private" ? <User className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                  {session.type}
                </Badge>
              </div>
              <p className="text-[#4B5563] mb-2">{session.description}</p>
              {session.rating && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="font-medium text-[#1F2937]">{session.rating}</span>
                  </div>
                  <span className="text-sm text-[#4B5563]">({session.totalReviews} reviews)</span>
                </div>
              )}
            </div>
          </div>

          {/* Coach Bio */}
          {session.coachBio && (
            <div>
              <h4 className="font-semibold text-[#1F2937] mb-2 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                About the Coach
              </h4>
              <p className="text-[#4B5563] text-sm">{session.coachBio}</p>
            </div>
          )}

          <Separator className="bg-[#E5E7EB]" />

          {/* Session Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-[#1F2937]">Session Information</h4>

              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-[#4B5563]" />
                <span className="text-[#4B5563]">Time:</span>
                <span className="font-medium text-[#1F2937]">{session.time}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-[#4B5563]" />
                <span className="text-[#4B5563]">Duration:</span>
                <span className="font-medium text-[#1F2937]">60 minutes</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Users className="w-4 h-4 text-[#4B5563]" />
                <span className="text-[#4B5563]">Available Slots:</span>
                <span className={`font-medium ${session.availableSlots > 0 ? "text-[#F59E0B]" : "text-[#4B5563]"}`}>
                  {session.availableSlots} of {session.maxSlots}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <span className="text-[#4B5563]">Price:</span>
                <span className="font-bold text-lg text-[#10B981]">${session.price}</span>
                <span className="text-[#4B5563]">per person</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-[#1F2937]">Location Details</h4>

              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-[#4B5563] mt-0.5" />
                  <div>
                    <div className="font-medium text-[#1F2937]">{session.facility}</div>
                    <div className="text-[#4B5563]">{session.address}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          {session.amenities && session.amenities.length > 0 && (
            <div>
              <h4 className="font-semibold text-[#1F2937] mb-3">Court Amenities</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {session.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm bg-[#F9FAFB] p-2 rounded-lg">
                    <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                    <span className="text-[#1F2937]">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator className="bg-[#E5E7EB]" />

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#1F2937]"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                onBook(session)
                onOpenChange(false)
              }}
              disabled={isFullyBooked}
              className={`flex-1 transition-colors ${
                isFullyBooked
                  ? "bg-[#4B5563] text-white cursor-not-allowed"
                  : "bg-[#10B981] hover:bg-[#10B981]/90 text-white"
              }`}
            >
              {isFullyBooked ? "Fully Booked" : "Book This Session"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

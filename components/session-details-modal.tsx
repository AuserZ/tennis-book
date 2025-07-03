"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Session } from "@/lib/types/api"
import { format } from "date-fns"
import { formatTime } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface SessionDetailsModalProps {
  session: Session | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onBook: (session: Session) => void
}

export function SessionDetailsModal({ session, open, onOpenChange, onBook }: SessionDetailsModalProps) {
  if (!session) return null

  const availableSlots = session.maxParticipants - session.currentParticipants

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0" showClose={false}>
        {/* Tennis Field Photo with Close Button */}
        <div className="relative w-full h-84">
          <img
            src={
              // session.tennisField.photoUrl || Temp since url is 404 
              "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop"
            }
            alt={`${session.tennisField.name} tennis court`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h4 className="text-white font-semibold text-lg">{session.tennisField.name}</h4>
            <p className="text-white/90 text-sm">{session.tennisField.location}</p>
          </div>
          <div className="absolute bottom-4 right-4">
            <Badge variant={session.type === 'private' ? 'default' : 'secondary'} className="text-sm">
              {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
            </Badge>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 rounded-full p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Session Details Content */}
        <div className="p-6 space-y-6">
          <DialogHeader>
            <DialogTitle>Session Details</DialogTitle>
          </DialogHeader>

          {/* Coach Info */}
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{session.coach.name}</h3>
              <p className="text-sm text-gray-500">{session.coach.phoneNumber}</p>
              <p className="mt-2 text-sm">{session.coach.bio}</p>
            </div>
          </div>

          {/* Session Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Time & Date</h4>
              <p className="text-sm">
                {format(new Date(session.date), "EEEE, MMMM d, yyyy")}
              </p>
              <p className="text-sm">
                {formatTime(session.startTime)} - {formatTime(session.endTime)}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Location</h4>
              <p className="text-sm">{session.tennisField.location}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Availability</h4>
              <p className="text-sm">
                {availableSlots} of {session.maxParticipants} slots available
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm">{session.description}</p>
          </div>

          {/* Action Buttons and Price */}
          <div className="flex items-center justify-between gap-4 mt-10">
            <div className="text-3xl font-extrabold text-green-600 leading-tight">Rp. {session.pricePerPerson} <span className="text-base font-normal text-gray-500">/ person</span></div>
            <div className="flex gap-2">
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onBook(session)
                  onOpenChange(false)
                }}
                disabled={availableSlots === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

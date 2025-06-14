"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Session, bookingsApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface BookingDialogProps {
  session: Session | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingDialog({ session, open, onOpenChange }: BookingDialogProps) {
  const [participants, setParticipants] = useState(1)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  const bookingMutation = useMutation({
    mutationFn: (data: { sessionId: number; participants: number }) =>
      bookingsApi.create(data.sessionId, data.participants),
    onSuccess: (response) => {
      toast({
        title: "Booking successful",
        description: "Please proceed to payment.",
      })
      queryClient.invalidateQueries({ queryKey: ["sessions"] })
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] })
      onOpenChange(false)
      router.push(`/payment?bookingId=${response.id}&sessionId=${session?.id}`)
    },
    onError: (error: any) => {
      toast({
        title: "Booking failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    },
  })

  if (!session) return null

  const availableSlots = session.maxParticipants - session.currentParticipants
  const maxParticipants = Math.min(availableSlots, 4) // Limit to 4 participants per booking

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (session) {
      bookingMutation.mutate({
        sessionId: session.id,
        participants,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Session</DialogTitle>
          <DialogDescription>Confirm your booking details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Coach</Label>
            <div className="text-sm font-medium">{session.coach.name}</div>
          </div>

          <div className="space-y-2">
            <Label>Available Slots</Label>
            <div className="text-sm font-medium">
              {availableSlots} of {session.maxParticipants} slots available
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">Number of Participants</Label>
            <Input
              id="participants"
              type="number"
              min={1}
              max={maxParticipants}
              value={participants}
              onChange={(e) => setParticipants(Number(e.target.value))}
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Maximum {maxParticipants} participants per booking
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Price per person:</span>
              <span>${session.pricePerPerson}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Participants:</span>
              <span>{participants}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${session.pricePerPerson * participants}</span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={bookingMutation.isPending}>
              {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

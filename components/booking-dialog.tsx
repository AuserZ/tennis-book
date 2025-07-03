"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
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
import { Session, SessionAvailibilityRequest } from "@/lib/types/api"
import { bookingsApi } from "@/lib/api/bookings"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

interface BookingDialogProps {
  session: Session;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingDialog({ session, isOpen, onOpenChange }: BookingDialogProps) {
  const [participants, setParticipants] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const availableSlots = session.maxParticipants - session.currentParticipants;
  const maxParticipants = Math.min(availableSlots, 4);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await bookingsApi.create(
        session.id,
        participants
      );

      console.log("Booking response:", response);

      if (response.status === 201) {
        toast({
          title: "Session Available",
          description: "Please proceed to payment.",
        });
        onOpenChange(false);
        router.push(`/payment?bookingid=${response.bookingId}`);
      }
    } catch (error) {
      toast({
        title: "Not Available",
        description: error instanceof Error ? error.message : "This session is not available",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Session</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Coach</Label>
            <p className="text-sm text-gray-500">{session.coach.name}</p>
          </div>

          <div className="space-y-2">
            <Label>Date & Time</Label>
            <p className="text-sm text-gray-500">
              {format(new Date(session.date), "PPP")} at{" "}
              {format(new Date(`${session.date}T${session.startTime}`), "h:mm a")}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <p className="text-sm text-gray-500">{session.tennisField.name}</p>
          </div>

          <div className="space-y-2">
            <Label>Price per Person</Label>
            <p className="text-sm text-gray-500">Rp. {session.pricePerPerson}</p>
          </div>

          <div className="space-y-2">
            <Label>Available Slots</Label>
            <p className="text-sm text-gray-500">{availableSlots} slots remaining</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">Number of Participants</Label>
            <Input
              type="number"
              min={1}
              max={maxParticipants}
              value={participants}
              onChange={(e) => setParticipants(Number(e.target.value))}
            />
            {participants < 1 && <p className="text-sm text-red-500">At least 1 participant is required</p>}
            {participants > maxParticipants && <p className="text-sm text-red-500">Maximum {maxParticipants} participants allowed</p>}
          </div>

          <div className="space-y-2">
            <Label>Total Price</Label>
            <p className="text-lg font-semibold">
              Rp. {session.pricePerPerson * participants}
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#10B981] hover:bg-[#10B981]/90 text-white"
            >
              {isLoading ? "Checking Availability..." : "Proceed to Payment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

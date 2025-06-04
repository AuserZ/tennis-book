"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { bookingSchema, type BookingFormData } from "@/lib/validations"
import { bookingsApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface BookingDialogProps {
  session: {
    id: string
    coach: string
    time: string
    type: "private" | "public"
    price: number
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingDialog({ session, open, onOpenChange }: BookingDialogProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      participants: session?.type === "private" ? 1 : 1,
    },
  })

  const participants = watch("participants")

  const bookingMutation = useMutation({
    mutationFn: (data: BookingFormData) => bookingsApi.createBooking(session!.id, data.participants),
    onSuccess: () => {
      toast({
        title: "Booking confirmed!",
        description: "Your tennis session has been booked successfully.",
      })
      queryClient.invalidateQueries({ queryKey: ["sessions"] })
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] })
      onOpenChange(false)
      reset()
    },
    onError: (error: any) => {
      toast({
        title: "Booking failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      })
    },
  })

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data)
  }

  if (!session) return null

  const total = session.price * participants

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Tennis Session</DialogTitle>
          <DialogDescription>Confirm your booking details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Coach</Label>
            <div className="text-sm font-medium">{session.coach}</div>
          </div>

          <div className="space-y-2">
            <Label>Time</Label>
            <div className="text-sm font-medium">{session.time}</div>
          </div>

          <div className="space-y-2">
            <Label>Session Type</Label>
            <div className="text-sm font-medium capitalize">{session.type}</div>
          </div>

          {session.type === "public" && (
            <div className="space-y-2">
              <Label htmlFor="participants">Number of Participants</Label>
              <Input
                id="participants"
                type="number"
                min="1"
                max="6"
                {...register("participants", { valueAsNumber: true })}
              />
              {errors.participants && <p className="text-sm text-destructive">{errors.participants.message}</p>}
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Price per person:</span>
              <span>${session.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Participants:</span>
              <span>{participants}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${total}</span>
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

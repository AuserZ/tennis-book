"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookingCardSkeleton } from "@/components/loading-skeleton"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, User, Users, X } from "lucide-react"
import { bookingsApi } from "@/lib/api"


export default function MyBookingsPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Mock query - replace with actual API call
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: () => bookingsApi.getMyBookings(),
  })

  const cancelMutation = useMutation({
    mutationFn: (bookingId: string) => bookingsApi.cancel(Number(bookingId)),
    onSuccess: () => {
      toast({
        title: "Booking cancelled",
        description: "Your booking has been cancelled successfully.",
      })
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] })
      queryClient.invalidateQueries({ queryKey: ["sessions"] })
    },
    onError: (error: any) => {
      toast({
        title: "Cancellation failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      })
    },
  })

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      cancelMutation.mutate(bookingId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage your tennis session bookings.</p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <BookingCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings?.data?.map((booking) => (
              <Card key={booking.id} className="w-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{booking.coach}</CardTitle>
                    <Badge variant={booking.status === "confirmed" ? "default" : "destructive"}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{booking.date}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{booking.time}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {booking.type === "private" ? <User className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                    <span className="capitalize">{booking.type} session</span>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Participants: </span>
                    <span>{booking.participants}</span>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Total: </span>
                    <span>${booking.totalPrice}</span>
                  </div>

                  {booking.status === "confirmed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={cancelMutation.isPending}
                      className="w-full mt-4"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {cancelMutation.isPending ? "Cancelling..." : "Cancel Booking"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )) || []}
          </div>
        )}

        {!isLoading && (!bookings?.data || bookings.data.length === 0) && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">You don't have any bookings yet.</p>
              <p className="text-gray-400 mt-2">Book your first tennis session to get started!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

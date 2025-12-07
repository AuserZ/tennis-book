"use client"

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookingCardSkeleton } from "@/components/loading-skeleton"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, User, Users, X } from "lucide-react"
import { bookingsApi } from "@/lib/api/bookings"
import { useRouter } from "next/navigation";

export default function MyBookingsPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient();
  const router = useRouter();

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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-1">My Bookings</h1>
      <p className="text-gray-500 mb-6 text-base">Manage your tennis court reservations</p>
      <div className="space-y-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <BookingCardSkeleton key={i} />)
        ) : (
          (bookings ?? []).map((booking: any) => {
            // Status badge color
            let statusColor = 'bg-gray-200 text-gray-700';
            if (booking.status?.toLowerCase() === 'confirmed') statusColor = 'bg-green-600 text-white';
            if (booking.status?.toLowerCase() === 'pending') statusColor = 'bg-yellow-400 text-white';
            if (booking.status?.toLowerCase() === 'cancelled') statusColor = 'bg-red-500 text-white';
            return (
              <div
                key={booking.id}
                className="flex bg-white shadow-md rounded-2xl overflow-hidden transition-transform hover:scale-[1.015] hover:shadow-lg min-h-[160px]"
              >
                {/* Left: Full Image with Badge */}
                <div className="relative w-1/4 min-w-[180px] max-w-[260px] flex-shrink-0 flex-grow-0">
                  <img
                    src={booking.photoUrl || 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&h=300&fit=crop'}
                    alt={(booking.place || 'court') + ' court'}
                    className="w-full h-full object-cover min-h-[160px]"
                  />
                  <span className={`absolute top-4 left-4 px-4 py-1 rounded-full font-semibold text-sm shadow ${statusColor}`}
                  >
                    {booking.status?.toUpperCase() || 'STATUS'}
                  </span>
                </div>
                {/* Right: Details, Price, Button */}
                <div className="flex-1 flex flex-row items-center px-8 py-6 gap-6">
                  {/* Details */}
                  <div className="flex-1 flex flex-col gap-2 justify-center">
                    <div className="font-bold text-xl text-gray-900 mb-1">{booking.place || 'Court Name'}</div>
                    <div className="flex items-center text-gray-700 text-base gap-4 mb-1">
                      <span className="flex items-center gap-1 text-sm"><User className="w-4 h-4 mr-1" /> Coach: <span className="font-medium ml-1">{booking.coach?.name || '-'}</span></span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm gap-6">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4 mr-1" /> {booking.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4 mr-1" /> {booking.time}</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4 mr-1" /> {booking.participants ?? 1} participant{(booking.participants ?? 1) > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  {/* Price & Button */}
                  <div className="flex flex-col items-end justify-between min-w-[160px] py-2">
                    <div className="text-right mb-4">
                      <div className="text-2xl font-bold text-green-600">Rp {Number(booking.totalPrice).toLocaleString('id-ID')}</div>
                      <div className="text-xs text-gray-400">Total Amount</div>
                    </div>
                    <Button variant="outline" onClick={() => router.push(`/payment?bookingid=${booking.id}`)} className="w-32 border-green-600 text-green-700 hover:bg-green-50">
                      Pay Now
                    </Button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}

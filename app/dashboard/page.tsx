"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { SessionCard } from "@/components/session-card"
import { BookingDialog } from "@/components/booking-dialog"
import { SessionCardSkeleton } from "@/components/loading-skeleton"
import { sessionsApi } from "@/lib/api/sessions"
import { AuthGuard } from "@/components/auth-guard"

// Mock data for demonstration
const mockSessions = [
  {
    id: "1",
    coach: "Sarah Johnson",
    time: "09:00 - 10:00",
    type: "private" as const,
    availableSlots: 1,
    maxSlots: 1,
    price: 80,
  },
  {
    id: "2",
    coach: "Mike Chen",
    time: "10:30 - 11:30",
    type: "public" as const,
    availableSlots: 4,
    maxSlots: 6,
    price: 25,
  },
  {
    id: "3",
    coach: "Emma Davis",
    time: "14:00 - 15:00",
    type: "private" as const,
    availableSlots: 1,
    maxSlots: 1,
    price: 75,
  },
  {
    id: "4",
    coach: "Alex Rodriguez",
    time: "16:00 - 17:00",
    type: "public" as const,
    availableSlots: 2,
    maxSlots: 6,
    price: 30,
  },
]

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)

  const dateString = format(selectedDate, "yyyy-MM-dd")

  // Mock query - replace with actual API call
  const { data: sessions, isLoading } = useQuery({
    queryKey: ["sessions", dateString],
    queryFn: () => sessionsApi.getSessions(dateString),
  })

  const handleBookSession = (session: any) => {
    setSelectedSession(session)
    setBookingDialogOpen(true)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Book a Tennis Session</h1>
            <p className="text-gray-600">
              Select a date and choose from available sessions with our professional coaches.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                  <CardDescription>Choose a date to view available sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sessions */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  Available Sessions for {format(selectedDate, "MMMM d, yyyy")}
                </h2>
              </div>

              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SessionCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {sessions?.data?.map((session) => (
                    <SessionCard key={session.id} session={session} onBook={handleBookSession} />
                  )) || []}
                </div>
              )}

              {!isLoading && (!sessions?.data || sessions.data.length === 0) && (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-gray-500 text-lg">No sessions available for this date.</p>
                    <p className="text-gray-400 mt-2">Try selecting a different date.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <BookingDialog session={selectedSession} open={bookingDialogOpen} onOpenChange={setBookingDialogOpen} />
      </div>
    </AuthGuard>
  )
}

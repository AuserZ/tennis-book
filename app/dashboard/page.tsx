"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { format, parseISO, isValid } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { SessionCard } from "@/components/session-card"
import { BookingDialog } from "@/components/booking-dialog"
import { SessionDetailsModal } from "@/components/session-details-modal"
import { SessionCardSkeleton } from "@/components/loading-skeleton"
import { sessionsApi, Session } from "@/lib/api"
import { AuthGuard } from "@/components/auth-guard"
import { Calendar } from "@/components/ui/calendar"

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dateParam = searchParams.get('sessionDate')

  // Parse date from URL, default to today if invalid or not present
  const initialDate = dateParam ? parseISO(dateParam) : new Date()
  const [selectedDate, setSelectedDate] = useState<Date>(isValid(initialDate) ? initialDate : new Date())
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [detailsSession, setDetailsSession] = useState<Session | null>(null)

  // Fetch sessions based on selected date
  const { data: sessions, isLoading } = useQuery<Session[]> ({
    queryKey: ["sessions", format(selectedDate, 'yyyy-MM-dd')], // Include date in query key
    queryFn: () => sessionsApi.getByDate(format(selectedDate, 'yyyy-MM-dd')), // Call new API function
    enabled: isValid(selectedDate), // Only fetch if date is valid
    refetchOnWindowFocus: false, // Disable refetching on window focus
    gcTime: 1000 * 60 * 5, // Keep data in cache for 5 minutes
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
  })

  const handleBookSession = (session: Session) => {
    setSelectedSession(session)
    setBookingDialogOpen(true)
  }

  const handleViewDetails = (session: Session) => {
    setDetailsSession(session)
    setDetailsModalOpen(true)
  }

  const handleDateSelect = async (date: Date | undefined) => {
    if (date && isValid(date)) {
      const dateString = format(date, 'yyyy-MM-dd')
      // First update the URL
      await router.push(`/dashboard?sessionDate=${dateString}`, { scroll: false })
      // Then update the state
      setSelectedDate(date)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-[#10B981]/10 via-[#3B82F6]/10 to-[#10B981]/10 p-8">
            <div className="absolute inset-0 bg-[url('/tennis-pattern.png')] opacity-5"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-[#10B981] flex items-center justify-center">
                  <span className="text-2xl">🎾</span>
                </div>
                <h1 className="text-4xl font-bold text-[#1F2937]">Welcome to TennisBook!</h1>
              </div>
              <p className="text-xl text-[#4B5563] max-w-2xl">
                Find and book your perfect tennis session. Browse available sessions below or use the calendar to select a specific date.
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-[#4B5563]">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#10B981]"></div>
                  <span>Professional Coaches</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#3B82F6]"></div>
                  <span>Premium Courts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#10B981]"></div>
                  <span>Flexible Scheduling</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Calendar Section */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sessions Section */}
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold mb-6">
                Available Sessions for {format(selectedDate, "MMMM d, yyyy")}
              </h2>

              {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SessionCardSkeleton key={i} />
                  ))}
                </div>
              ) : sessions && sessions.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {sessions?.map((session: Session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      onBook={() => handleBookSession(session)}
                      onViewDetails={() => handleViewDetails(session)}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-gray-500 text-lg">No sessions scheduled for this date.</p>
                    <p className="text-gray-400 mt-2">Try selecting a different date to find available sessions!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>

        {/* Booking Dialog */}
        <BookingDialog
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
          session={selectedSession}
        />

        {/* Session Details Modal */}
        <SessionDetailsModal
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          session={detailsSession}
          onBook={handleBookSession}
        />
      </div>
    </AuthGuard>
  )
}

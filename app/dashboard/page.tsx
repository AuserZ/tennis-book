"use client"

import { Suspense, useState } from "react"
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

function DashboardContent() {
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
              <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Welcome to TennisBook</h1>
              <p className="text-[#4B5563]">Book your tennis sessions with professional coaches</p>
            </div>
          </div>

          {/* Calendar and Sessions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <Card className="border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1F2937]">Select Date</CardTitle>
                  <CardDescription className="text-[#4B5563]">
                    Choose a date to view available sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md border-[#E5E7EB]"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sessions List */}
            <div className="lg:col-span-2">
              <Card className="border-[#E5E7EB]">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1F2937]">
                    Available Sessions
                  </CardTitle>
                  <CardDescription className="text-[#4B5563]">
                    {format(selectedDate, "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <SessionCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : sessions && sessions.length > 0 ? (
                    <div className="space-y-4">
                      {sessions.map((session) => (
                        <SessionCard
                          key={session.id}
                          session={session}
                          onBook={() => handleBookSession(session)}
                          onViewDetails={() => handleViewDetails(session)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-[#4B5563]">No sessions available for this date</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Booking Dialog */}
        {selectedSession && (
          <BookingDialog
            session={selectedSession}
            open={bookingDialogOpen}
            onOpenChange={setBookingDialogOpen}
          />
        )}

        {/* Session Details Modal */}
        {detailsSession && (
          <SessionDetailsModal
            session={detailsSession}
            open={detailsModalOpen}
            onOpenChange={setDetailsModalOpen}
            onBook={() => handleBookSession(detailsSession)}
          />
        )}
      </div>
    </AuthGuard>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="p-6 text-center text-gray-500">Loading dashboard...</div>
          </div>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}

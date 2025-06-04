"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { SessionCard } from "@/components/session-card"
import { BookingDialog } from "@/components/booking-dialog"
import { SessionDetailsModal } from "@/components/session-details-modal"
import { SessionCardSkeleton } from "@/components/loading-skeleton"
import { sessionsApi } from "@/lib/api/sessions"
import { AuthGuard } from "@/components/auth-guard"

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [detailsSession, setDetailsSession] = useState<any>(null)

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

  const handleViewDetails = (session: any) => {
    setDetailsSession(session)
    setDetailsModalOpen(true)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F9FAFB]">
        <Navbar />

        {/* Dashboard Hero */}
        <div className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-4">Find Your Perfect Tennis Session</h1>
                <p className="text-xl opacity-90 mb-6">
                  Book with professional coaches and take your game to the next level
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
                    <span>Professional Coaches</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
                    <span>Premium Courts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
                    <span>All Skill Levels</span>
                  </div>
                </div>
              </div>
              <div className="lg:text-right">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Tennis player in action on court"
                  className="rounded-2xl shadow-2xl w-full max-w-md ml-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 border-[#E5E7EB] bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-[#1F2937]">
                    <Calendar className="w-5 h-5" />
                    <span>Select Date</span>
                  </CardTitle>
                  <CardDescription className="text-[#4B5563]">Choose a date to view available sessions</CardDescription>
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
                <h2 className="text-2xl font-semibold mb-2 text-[#1F2937]">
                  Available Sessions for {format(selectedDate, "MMMM d, yyyy")}
                </h2>
                <p className="text-[#4B5563]">Choose from our professional coaches and premium courts below</p>
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
                    <SessionCard
                      key={session.id}
                      session={session}
                      onBook={handleBookSession}
                      onViewDetails={handleViewDetails}
                    />
                  )) || []}
                </div>
              )}

              {!isLoading && (!sessions?.data || sessions.data.length === 0) && (
                <Card className="border-[#E5E7EB] bg-white">
                  <CardContent className="text-center py-12">
                    <img
                      src="/placeholder.svg?height=200&width=300"
                      alt="No sessions available"
                      className="mx-auto mb-4 opacity-50 rounded-lg"
                    />
                    <p className="text-[#4B5563] text-lg">No sessions available for this date.</p>
                    <p className="text-[#4B5563] mt-2">Try selecting a different date.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <BookingDialog session={selectedSession} open={bookingDialogOpen} onOpenChange={setBookingDialogOpen} />
        <SessionDetailsModal
          session={detailsSession}
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          onBook={handleBookSession}
        />
      </div>
    </AuthGuard>
  )
}

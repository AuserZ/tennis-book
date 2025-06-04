// Mock API responses - replace with real API calls when backend is ready
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock data
const mockSessions = [
  {
    id: "1",
    coach: "Sarah Johnson",
    coachImage: "/placeholder.svg?height=100&width=100",
    time: "09:00 - 10:00",
    type: "private" as const,
    availableSlots: 1,
    maxSlots: 1,
    price: 80,
    description: "Former professional player with 10+ years coaching experience",
    location: "Court 1 - Clay Court",
    facility: "Main Tennis Complex",
    address: "123 Tennis Drive, Sports Center",
    amenities: ["Professional Clay Surface", "Ball Machine Available", "Video Analysis"],
    coachBio:
      "Sarah is a former WTA tour player who reached a career-high ranking of #127. She specializes in advanced technique refinement and mental game coaching.",
    rating: 4.9,
    totalReviews: 156,
    courtImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    coach: "Mike Chen",
    coachImage: "/placeholder.svg?height=100&width=100",
    time: "10:30 - 11:30",
    type: "public" as const,
    availableSlots: 4,
    maxSlots: 6,
    price: 25,
    description: "Specializes in beginner and intermediate level coaching",
    location: "Court 5 - Hard Court",
    facility: "East Wing Complex",
    address: "123 Tennis Drive, Sports Center",
    amenities: ["Championship Hard Court", "Lighting System", "Spectator Seating"],
    coachBio:
      "Mike has been coaching for 8 years and specializes in youth development and beginner programs. He's known for his patient teaching style.",
    rating: 4.8,
    totalReviews: 203,
    courtImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    coach: "Emma Davis",
    coachImage: "/placeholder.svg?height=100&width=100",
    time: "14:00 - 15:00",
    type: "private" as const,
    availableSlots: 1,
    maxSlots: 1,
    price: 75,
    description: "Expert in advanced techniques and competitive play",
    location: "Court 9 - Indoor Court",
    facility: "Climate-Controlled Indoor Complex",
    address: "123 Tennis Drive, Sports Center",
    amenities: ["Climate Control", "Premium Flooring", "Sound System"],
    coachBio:
      "Emma is a certified PTR professional with 12 years of experience. She focuses on technical precision and competitive strategy.",
    rating: 4.9,
    totalReviews: 178,
    courtImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    coach: "Alex Rodriguez",
    coachImage: "/placeholder.svg?height=100&width=100",
    time: "16:00 - 17:00",
    type: "public" as const,
    availableSlots: 2,
    maxSlots: 6,
    price: 30,
    description: "Youth coach with focus on fundamentals and fun",
    location: "Court 3 - Clay Court",
    facility: "Main Tennis Complex",
    address: "123 Tennis Drive, Sports Center",
    amenities: ["European Clay", "Practice Wall", "Equipment Storage"],
    coachBio:
      "Alex specializes in fitness conditioning and strategic play. He's worked with several junior national champions.",
    rating: 4.7,
    totalReviews: 134,
    courtImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    coach: "Lisa Wang",
    coachImage: "/placeholder.svg?height=100&width=100",
    time: "18:00 - 19:00",
    type: "private" as const,
    availableSlots: 1,
    maxSlots: 1,
    price: 85,
    description: "Former ATP tour player, specializes in serve and volley",
    location: "Court 7 - Hard Court",
    facility: "East Wing Complex",
    address: "123 Tennis Drive, Sports Center",
    amenities: ["Tournament Standard", "Hawk-Eye System", "Premium Lighting"],
    coachBio:
      "Lisa is a former ATP tour player with extensive experience in professional tennis. She excels in serve technique and net play.",
    rating: 5.0,
    totalReviews: 89,
    courtImage: "/placeholder.svg?height=200&width=300",
  },
]

const mockBookings = [
  {
    id: "1",
    sessionId: "1",
    coach: "Sarah Johnson",
    date: "2024-01-15",
    time: "09:00 - 10:00",
    type: "private",
    participants: 1,
    status: "confirmed",
    totalPrice: 80,
  },
  {
    id: "2",
    sessionId: "2",
    coach: "Mike Chen",
    date: "2024-01-18",
    time: "10:30 - 11:30",
    type: "public",
    participants: 2,
    status: "confirmed",
    totalPrice: 50,
  },
  {
    id: "3",
    sessionId: "3",
    coach: "Emma Davis",
    date: "2024-01-20",
    time: "14:00 - 15:00",
    type: "private",
    participants: 1,
    status: "confirmed",
    totalPrice: 75,
  },
]

// Store bookings in memory for demo purposes
const currentBookings = [...mockBookings]

// Auth API - Mock responses
export const authApi = {
  login: async (email: string, password: string) => {
    await delay(1000) // Simulate network delay

    // Always return success for demo
    return {
      data: {
        token: "mock-jwt-token-" + Date.now(),
        user: {
          id: "user-1",
          name: "John Doe",
          email: email,
        },
      },
    }
  },

  register: async (name: string, email: string, password: string) => {
    await delay(1000)

    // Always return success for demo
    return {
      data: {
        message: "User registered successfully",
        user: {
          id: "user-" + Date.now(),
          name: name,
          email: email,
        },
      },
    }
  },
}

// Sessions API - Mock responses
export const sessionsApi = {
  getSessions: async (date: string) => {
    await delay(800)

    // Return mock sessions for any date
    return {
      data: mockSessions,
    }
  },

  getSessionDetails: async (sessionId: string) => {
    await delay(500)

    const session = mockSessions.find((s) => s.id === sessionId)
    if (!session) {
      throw new Error("Session not found")
    }

    return {
      data: session,
    }
  },
}

// Bookings API - Mock responses
export const bookingsApi = {
  createBooking: async (sessionId: string, participants: number) => {
    await delay(1000)

    // Find the session being booked
    const session = mockSessions.find((s) => s.id === sessionId)
    if (!session) {
      throw new Error("Session not found")
    }

    // Create new booking
    const newBooking = {
      id: "booking-" + Date.now(),
      sessionId: sessionId,
      coach: session.coach,
      date: new Date().toISOString().split("T")[0], // Today's date
      time: session.time,
      type: session.type,
      participants: participants,
      status: "confirmed",
      totalPrice: session.price * participants,
    }

    // Add to current bookings
    currentBookings.push(newBooking)

    // Update session availability
    const sessionIndex = mockSessions.findIndex((s) => s.id === sessionId)
    if (sessionIndex !== -1) {
      mockSessions[sessionIndex].availableSlots = Math.max(0, mockSessions[sessionIndex].availableSlots - participants)
    }

    return {
      data: {
        booking: newBooking,
        message: "Booking created successfully",
      },
    }
  },

  getMyBookings: async () => {
    await delay(800)

    return {
      data: currentBookings,
    }
  },

  cancelBooking: async (bookingId: string) => {
    await delay(800)

    // Find and remove booking
    const bookingIndex = currentBookings.findIndex((b) => b.id === bookingId)
    if (bookingIndex !== -1) {
      const booking = currentBookings[bookingIndex]

      // Update booking status instead of removing
      currentBookings[bookingIndex] = {
        ...booking,
        status: "cancelled",
      }

      // Restore session availability
      const sessionIndex = mockSessions.findIndex((s) => s.id === booking.sessionId)
      if (sessionIndex !== -1) {
        mockSessions[sessionIndex].availableSlots += booking.participants
      }
    }

    return {
      data: {
        message: "Booking cancelled successfully",
      },
    }
  },
}

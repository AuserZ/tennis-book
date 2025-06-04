// Mock API responses - replace with real API calls when backend is ready
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock data
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
  {
    id: "5",
    coach: "Lisa Wang",
    time: "18:00 - 19:00",
    type: "private" as const,
    availableSlots: 1,
    maxSlots: 1,
    price: 85,
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

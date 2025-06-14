// API Types
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Coach {
  id: number;
  name: string;
  phoneNumber: string;
  bio: string;
}

export interface TennisField{
  id: number,
  name: string;
  location: string;
  photoUrl: string;
}

export interface Session {
  id: number;
  coach: Coach;
  date: string;
  startTime: string;
  endTime: string;
  tennisField: TennisField;
  maxParticipants: number;
  currentParticipants: number;
  pricePerPerson: number;
  description: string;
  type: string;
  status: string;
}

export interface Booking {
  id: number;
  sessionId: number;
  coach: Coach;
  date: string;
  time: string;
  status: string;
  totalPrice: number;
}

export interface Payment {
  id: number;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: string;
}

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tennis-book-service.onrender.com/api';

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API call failed');
  }

  return response.json();
};

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (name: string, email: string, password: string) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },
};

// Coach API
export const coachesApi = {
  getAll: async () => {
    return apiCall('/coaches');
  },

  getById: async (id: number) => {
    return apiCall(`/coaches/${id}`);
  },

  create: async (coach: Omit<Coach, 'id'>) => {
    return apiCall('/coaches', {
      method: 'POST',
      body: JSON.stringify(coach),
    });
  },
};

// Sessions API
export const sessionsApi = {
  getAll: async () => {
    return apiCall('/sessions');
  },

  getById: async (id: number) => {
    return apiCall(`/sessions/${id}`);
  },

  getByDate: async (date: string) => {
    return apiCall(`/sessions/sessionDate?date=${date}`);
  },

  create: async (session: Omit<Session, 'id' | 'coach' | 'currentParticipants' | 'status'>) => {
    return apiCall('/sessions', {
      method: 'POST',
      body: JSON.stringify(session),
    });
  },
};

// Bookings API
export const bookingsApi = {
  create: async (sessionId: number, participants: number) => {
    return apiCall('/bookings', {
      method: 'POST',
      body: JSON.stringify({ sessionId, participants }),
    });
  },

  getMyBookings: async () => {
    return apiCall('/bookings/my');
  },

  cancel: async (bookingId: number) => {
    return apiCall(`/bookings/${bookingId}`, {
      method: 'DELETE',
    });
  },
};

// Payments API
export const paymentsApi = {
  create: async (bookingId: number, paymentMethod: string) => {
    return apiCall('/payments', {
      method: 'POST',
      body: JSON.stringify({ bookingId, paymentMethod }),
    });
  },
};

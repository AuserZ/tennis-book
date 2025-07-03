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

export interface TennisField {
  id: number;
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

export interface SessionAvailibilityRequest {
  sessionId: number;
  participants: number;
}

export interface SessionAvailibilityResponse {
  sessionId: number;
  participant: number;
  available: boolean;
}

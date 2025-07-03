import { apiCall } from './base';

export const bookingsApi = {
  create: async (sessionId: number, participants: number) => {
    return apiCall('/bookings/new-bookings', {
      method: 'POST',
      body: JSON.stringify({ sessionId, participants }),
    });
  },

  getByID: async (bookingId: number) =>{
    return apiCall(`/bookings/${bookingId}`)
  },

  getMyBookings: async () => {
    return apiCall('/bookings/my-bookings', { method: 'POST' });
  },

  cancel: async (bookingId: number) => {
    return apiCall(`/bookings/${bookingId}`, {
      method: 'DELETE',
    });
  },
}; 
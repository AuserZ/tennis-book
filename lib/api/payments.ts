import { apiCall } from './base';

export const paymentsApi = {
  createDokuPayment: async (bookingId: number) => {
    return apiCall('/payments/new', {
      method: 'POST',
      body: JSON.stringify({ bookingId }),
    });
  },
}; 
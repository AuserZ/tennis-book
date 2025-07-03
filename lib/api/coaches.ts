import { apiCall } from './base';
import type { Coach } from '../types/api';

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
// lib/api/sessions.ts

import { apiCall } from './base';
import type { Session, SessionAvailibilityRequest } from '../types/api';

export const sessionsApi = {
  // getAll: async () => {
  //   return apiCall('/sessions');
  // },

  // getById: async (id: number) => {
  //   return apiCall(`/sessions/${id}`);
  // },

  getPublicSession: async (type: string, date: string) => {
    return apiCall(`/sessions/get-session-by-type`, {
      method:'POST',
      body: JSON.stringify({
        sessionType: type,
        sessionDate: date
      })
    });
  },

  // getPublicSession: async (date: string) => {
  //   return apiCall(`/sessions/`);
  // },

  // checkAvailability: async (request: SessionAvailibilityRequest) => {
  //   return apiCall(`/sessions/availability`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       sessionId: request.sessionId,
  //       participants: request.participants
  //     }),
  //   });
  // },
};

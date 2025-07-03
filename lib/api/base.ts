// API Base URL
// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tennis-book-service.onrender.com/api';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://api.tennisbook.mz-akbar.online/api';

// Helper function for API calls
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
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
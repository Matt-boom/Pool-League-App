export const API_CONFIG = {
  MOCK_API: import.meta.env.VITE_USE_MOCK_API === 'true',
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
};
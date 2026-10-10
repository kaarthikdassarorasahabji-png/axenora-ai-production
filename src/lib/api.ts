const configuredApiUrl = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL || 'http://localhost:5000'
  : typeof window === 'undefined' ? 'https://www.axenoraai.in' : window.location.origin;

export const API_BASE_URL = configuredApiUrl.replace(/\/+$/, '').replace(/\/api$/, '');

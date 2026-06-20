const configuredApiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin);

export const API_BASE_URL = configuredApiUrl.replace(/\/+$/, '').replace(/\/api$/, '');

// API base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Contact API
export const contactAPI = {
  submit: async (contactData: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    message: string;
    service?: string;
  }) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};

// Newsletter API
export const newsletterAPI = {
  subscribe: async (email: string, name?: string) => {
    return apiRequest('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
  },
  unsubscribe: async (email: string) => {
    return apiRequest('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// Booking API
export const bookingAPI = {
  create: async (bookingData: {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) => {
    return apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },
  getAll: async () => {
    return apiRequest('/bookings');
  },
  getById: async (id: string) => {
    return apiRequest(`/bookings/${id}`);
  },
  cancel: async (id: string) => {
    return apiRequest(`/bookings/${id}`, {
      method: 'DELETE',
    });
  },
};

// Auth API
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    company?: string;
  }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  login: async (email: string, password: string) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },
};

// Payment API
export const paymentAPI = {
  createPaymentIntent: async (paymentData: {
    amount: number;
    currency?: string;
    service: string;
    plan?: string;
  }) => {
    return apiRequest('/payments/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
  getPayments: async () => {
    return apiRequest('/payments');
  },
};

// Analytics API
export const analyticsAPI = {
  track: async (eventData: {
    event: string;
    page?: string;
    sessionId?: string;
    metadata?: any;
  }) => {
    return apiRequest('/analytics/track', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },
};

// Generate session ID for analytics
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem('sessionId');
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
  }
  
  return sessionId;
};

// Track page view
export const trackPageView = (page: string) => {
  analyticsAPI.track({
    event: 'page_view',
    page,
    sessionId: getSessionId(),
  }).catch(console.error);
};

// Track button click
export const trackButtonClick = (buttonName: string, metadata?: any) => {
  analyticsAPI.track({
    event: 'button_click',
    sessionId: getSessionId(),
    metadata: { buttonName, ...metadata },
  }).catch(console.error);
};

export default {
  contactAPI,
  newsletterAPI,
  bookingAPI,
  authAPI,
  paymentAPI,
  analyticsAPI,
  trackPageView,
  trackButtonClick,
};

import { supabase } from '@/lib/supabase';
import { API_BASE_URL as API_CONFIG } from '@/lib/api';

// API base URL configuration
const API_BASE_URL = `${API_CONFIG}/api`;

// Helper function for API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  // Get token from Supabase session
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  
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

// Auth API (using Supabase Auth)
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    company?: string;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          phone: userData.phone,
          company: userData.company
        }
      }
    });

    if (error) throw new Error(error.message);

    // Create profile
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        name: userData.name,
        phone: userData.phone,
        company: userData.company,
        role: 'user'
      });
    }

    return data;
  },
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw new Error(error.message);
    return data;
  },
  logout: async () => {
    await supabase.auth.signOut();
  },
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;

    if (!user) return null;

    // Get profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return {
      user,
      profile
    };
  },
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }
};

// Payment API (Razorpay)
export const paymentAPI = {
  createOrder: async (orderData: {
    amount: number;
    currency?: string;
    service: string;
    plan?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
  }) => {
    return apiRequest('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },
  verifyPayment: async (verifyData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    return apiRequest('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(verifyData),
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

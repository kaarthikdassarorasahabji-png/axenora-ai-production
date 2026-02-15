/**
 * Subdomain detection utility
 */

export const getSubdomain = () => {
  const hostname = window.location.hostname;
  
  // Handle localhost for development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Check for search params like ?subdomain=admin for testing
    const params = new URLSearchParams(window.location.search);
    return params.get('subdomain') || '';
  }

  // Handle production: dashboard.axenoraai.in -> dashboard
  const parts = hostname.split('.');
  
  // If we have dashboard.axenoraai.in, parts will be ['dashboard', 'axenoraai', 'in']
  // If we have axenoraai.in, parts will be ['axenoraai', 'in']
  if (parts.length >= 3) {
    return parts[0].toLowerCase();
  }
  
  return '';
};

export const SUBDOMAINS = {
  ADMIN: 'admin',
  DASHBOARD: 'dashboard',
  LOGIN: 'login'
};

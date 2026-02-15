import { supabase } from '../config/supabase.js';

// Protect routes - verify Supabase JWT token
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    // console.log(`[Auth Debug] ${req.method} ${req.originalUrl} - Auth Header:`, authHeader ? 'Present' : 'Missing');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('[Auth Debug] Invalid header format');
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
        console.error('[Auth Debug] Supabase Verify Error:', error.message);
    }

    if (error || !user) {
      console.log('[Auth Debug] No user found or error');
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid token'
      });
    }
    
    console.log('[Auth Debug] User verified:', user.id);

    // Get user profile with role (use maybeSingle to avoid errors on missing profile)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!profile) {
      // Try to create profile silently (trigger should handle this, but as backup)
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            name: user.email?.split('@')[0] || 'User',
            email: user.email,
            role: 'user', 
        }, { onConflict: 'id' })
        .select()
        .single();
        
      if (!insertError && newProfile) {
         req.user = { ...user, ...newProfile };
      } else {
         // Fallback if insert fails (e.g., trigger already created it)
         req.user = { ...user, role: 'user', email: user.email };
      }
    } else {
        req.user = { ...user, ...profile };
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};

// Admin middleware
export const admin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.'
    });
  }
};

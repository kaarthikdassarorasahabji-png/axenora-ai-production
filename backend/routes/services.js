import express from 'express';
import { supabase } from '../config/supabase.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/services
// @desc    Get all active services with tiers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { data: services, error } = await supabase
      .from('services')
      .select(`
        *,
        tiers:service_tiers(*)
      `)
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;

    // Sort tiers within each service
    const servicesWithSortedTiers = services.map(service => ({
      ...service,
      tiers: service.tiers?.sort((a, b) => a.sort_order - b.sort_order) || []
    }));

    res.json({
      success: true,
      count: servicesWithSortedTiers.length,
      data: servicesWithSortedTiers
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services'
    });
  }
});

// @route   GET /api/services/:id
// @desc    Get single service with tiers
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { data: service, error } = await supabase
      .from('services')
      .select(`
        *,
        tiers:service_tiers(*)
      `)
      .eq('id', req.params.id)
      .single();

    if (error || !service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Sort tiers
    service.tiers = service.tiers?.sort((a, b) => a.sort_order - b.sort_order) || [];

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service'
    });
  }
});

export default router;

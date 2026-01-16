import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true
  },
  page: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sessionId: String,
  ipAddress: String,
  userAgent: String,
  referrer: String,
  metadata: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster queries
analyticsSchema.index({ event: 1, timestamp: -1 });
analyticsSchema.index({ sessionId: 1 });

export default mongoose.model('Analytics', analyticsSchema);

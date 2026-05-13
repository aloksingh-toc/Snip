import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  clickedAt: { type: Date, default: Date.now },
  ip: String,
  userAgent: String,
}, { _id: false });

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  expiresAt: { type: Date, default: null },
  clicks: [clickSchema],
}, { timestamps: true });

urlSchema.virtual('clickCount').get(function () {
  return this.clicks.length;
});

urlSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Url', urlSchema);

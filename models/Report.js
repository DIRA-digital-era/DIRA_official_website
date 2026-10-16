const mongoose = require('mongoose');

const REPORT_TYPES = [
  'Annual Report',
  'Event Audit',
  'Technical Whitepaper',
  'Community Brief',
  'Institutional Report',
  'Research Publication'
];

const reportSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    type: { type: String, required: true, enum: REPORT_TYPES },
    year: { type: String, required: true, trim: true, maxlength: 10 },
    summary: { type: String, required: true, trim: true, maxlength: 500 },
    documentUrl: { type: String, required: true },
    storage: { type: String, enum: ['local', 'cloudinary'] },
    cloudinaryPublicId: { type: String },
    documentName: { type: String, required: true },
    documentSize: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { collection: 'dira_reports' }
);

reportSchema.methods.toClientJSON = function toClientJSON() {
  return {
    id: this._id.toString(),
    slug: this.slug,
    title: this.title,
    type: this.type,
    year: this.year,
    summary: this.summary,
    documentUrl: this.documentUrl,
    storage: this.storage || (this.documentUrl.startsWith('/reports/') ? 'local' : 'cloudinary'),
    documentName: this.documentName,
    documentSize: this.documentSize,
    createdAt: this.createdAt
  };
};

module.exports = { Report: mongoose.model('Report', reportSchema), REPORT_TYPES };

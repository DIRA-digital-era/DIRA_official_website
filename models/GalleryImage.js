const mongoose = require('mongoose');

const GALLERY_CATEGORIES = [
  'events',
  'training',
  'production',
  'platforms'
];

const CATEGORY_LABELS = {
  events: 'Events & Tech Fest',
  training: 'Training & Team',
  production: 'Studio & Media',
  platforms: 'Platforms & Systems'
};

const ASPECT_RATIOS = ['landscape', 'portrait', 'square', 'tall'];

const galleryImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    category: { type: String, required: true, enum: GALLERY_CATEGORIES },
    categoryLabel: { type: String, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    src: { type: String, required: true },
    cloudinaryPublicId: { type: String, default: null },
    aspect: { type: String, enum: ASPECT_RATIOS, default: 'landscape' },
    createdAt: { type: Date, default: Date.now }
  },
  { collection: 'dira_gallery_images' }
);

galleryImageSchema.index({ category: 1, createdAt: -1 });

galleryImageSchema.pre('save', function (next) {
  if (!this.categoryLabel && CATEGORY_LABELS[this.category]) {
    this.categoryLabel = CATEGORY_LABELS[this.category];
  }
  next();
});

galleryImageSchema.methods.toClientJSON = function toClientJSON() {
  return {
    id: this._id.toString(),
    title: this.title,
    category: this.category,
    categoryLabel: this.categoryLabel || CATEGORY_LABELS[this.category] || this.category,
    description: this.description,
    src: this.src,
    cloudinaryPublicId: this.cloudinaryPublicId,
    aspect: this.aspect,
    createdAt: this.createdAt
  };
};

module.exports = {
  GalleryImage: mongoose.model('GalleryImage', galleryImageSchema),
  GALLERY_CATEGORIES,
  CATEGORY_LABELS,
  ASPECT_RATIOS
};

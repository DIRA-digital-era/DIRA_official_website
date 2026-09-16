const mongoose = require('mongoose');

const CATEGORIES = [
  'Systems Architecture',
  'Business Automation',
  'Digital Strategy',
  'Talent & Capacity'
];

const articleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    category: { type: String, required: true, enum: CATEGORIES },
    date: { type: String, required: true, trim: true },
    readTime: { type: String, default: '4 min read' },
    author: { type: String, default: 'DIRA Team', trim: true },
    image: { type: String, default: './images/photos/IMG_9933.jpg' },
    excerpt: { type: String, required: true, trim: true, maxlength: 300 },
    content: { type: String, required: true },
    tags: { type: [String], default: [] }
  },
  { timestamps: true, collection: 'dira_articles' }
);

articleSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

articleSchema.methods.toClientJSON = function toClientJSON() {
  return {
    id: this._id.toString(),
    slug: this.slug,
    title: this.title,
    category: this.category,
    date: this.date,
    readTime: this.readTime,
    author: this.author,
    image: this.image,
    excerpt: this.excerpt,
    content: this.content,
    tags: this.tags,
    createdAt: this.createdAt
  };
};

module.exports = { Article: mongoose.model('Article', articleSchema), CATEGORIES };

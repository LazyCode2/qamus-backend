import mongoose from 'mongoose'

const wordSchema = new mongoose.Schema(
  {
    arabic: { type: String, required: true, trim: true },
    latin: { type: String, required: true, trim: true },
    pronunciation: { type: String, required: true, trim: true },
  },
  { _id: false }
)

const grammarSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['noun', 'verb', 'adjective', 'phrase', 'particle'],
      lowercase: true,
    },
  },
  { _id: false }
)

const verseSchema = new mongoose.Schema(
  {
    arabic: { type: String, trim: true, default: null },
    english: { type: String, trim: true, default: null },
    reference: { type: String, trim: true, default: null },
  },
  { _id: false }
)

const linksSchema = new mongoose.Schema(
  {
    reference: { type: String, trim: true, default: '' },
    source: { type: String, trim: true, default: '' },
    learn_more: { type: String, trim: true, default: '' },
  },
  { _id: false }
)

const entrySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    word: { type: wordSchema, required: true },
    grammar: { type: grammarSchema, required: true },
    overview: { type: String, required: true, trim: true },
    verse: { type: verseSchema, default: () => ({}) },
    links: { type: linksSchema, default: () => ({}) },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  }
)

entrySchema.index({ tags: 1 })
entrySchema.index({ 'word.latin': 'text', overview: 'text' })

export default mongoose.model('Entry', entrySchema)
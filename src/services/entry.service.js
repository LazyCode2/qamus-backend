import Entry from '../models/entry.model.js'

export const findAll = async ({ page = 1, limit = 20, tag, q } = {}) => {
  const filter = {}

  if (tag) filter.tags = tag
  if (q) filter.$text = { $search: q }

  const skip = (page - 1) * limit
  const [data, total] = await Promise.all([
    Entry.find(filter).sort({ slug: 1 }).skip(skip).limit(limit).lean(),
    Entry.countDocuments(filter),
  ])

  return {
    data,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  }
}

export const findBySlug = async (slug) => {
  return Entry.findOne({ slug: slug.toLowerCase() }).lean()
}

export const create = async (payload) => {
  const entry = new Entry(payload)
  return entry.save()
}

export const update = async (slug, payload) => {
  return Entry.findOneAndUpdate(
    { slug: slug.toLowerCase() },
    { $set: payload },
    { new: true, runValidators: true, lean: true }
  )
}

export const remove = async (slug) => {
  return Entry.findOneAndDelete({ slug: slug.toLowerCase() }).lean()
}
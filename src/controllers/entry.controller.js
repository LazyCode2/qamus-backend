import * as service from '../services/entry.service.js'

const ok = (res, data, status = 200) => res.status(status).json(data)
const err = (res, message, status = 400) => res.status(status).json({ error: message })

export const getAll = async (req, res) => {
  try {
    const { page, limit, tag, q } = req.query
    const result = await service.findAll({ page, limit, tag, q })
    ok(res, result)
  } catch (e) {
    err(res, e.message, 500)
  }
}

export const getOne = async (req, res) => {
  try {
    const entry = await service.findBySlug(req.params.slug)
    if (!entry) return err(res, 'Entry not found', 404)
    ok(res, entry)
  } catch (e) {
    err(res, e.message, 500)
  }
}

export const createOne = async (req, res) => {
  try {
    const entry = await service.create(req.body)
    ok(res, entry, 201)
  } catch (e) {
    if (e.code === 11000) return err(res, 'Slug already exists', 409)
    if (e.name === 'ValidationError') return err(res, e.message, 422)
    err(res, e.message, 500)
  }
}

export const updateOne = async (req, res) => {
  try {
    const entry = await service.update(req.params.slug, req.body)
    if (!entry) return err(res, 'Entry not found', 404)
    ok(res, entry)
  } catch (e) {
    if (e.name === 'ValidationError') return err(res, e.message, 422)
    err(res, e.message, 500)
  }
}

export const deleteOne = async (req, res) => {
  try {
    const entry = await service.remove(req.params.slug)
    if (!entry) return err(res, 'Entry not found', 404)
    ok(res, { deleted: true, slug: entry.slug })
  } catch (e) {
    err(res, e.message, 500)
  }
}
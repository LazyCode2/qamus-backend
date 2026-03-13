import { Router } from 'express'
import * as ctrl from '../controllers/entry.controller.js'
import adminAuth from '../middleware/auth.js';

const router = Router()

router.get('/', ctrl.getAll)
router.get('/:slug', ctrl.getOne)

router.post('/', adminAuth, ctrl.createOne)
router.patch('/:slug', adminAuth, ctrl.updateOne)
router.delete('/:slug', adminAuth, ctrl.deleteOne)

export default router
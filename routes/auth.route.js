import express from 'express'

import { signup, signin } from '../controllers/auth.controller.js'

import { verifySignupMw } from '../middleware/index.js'

const router = express.Router()

router.post(
  '/signup',
  [verifySignupMw.checkDuplicate, verifySignupMw.checkRoleExisted],
  signup
)

router.post('/signin', signin)

export default router

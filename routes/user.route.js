import express from 'express'

import {
  allAccess,
  userBoard,
  adminBoard,
} from '../controllers/user.controller.js'

import { authMw } from '../middleware/index.js'

const router = express.Router()

router.get('/all', allAccess)

router.get('/user', [authMw.verifyToken], userBoard)

router.get('/admin', [authMw.verifyToken, authMw.isAdmin], adminBoard)

export default router

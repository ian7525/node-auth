const express = require('express')

const { auth } = require('../middleware')

const controller = require('../controllers/user.controller')

const router = express.Router()

router.get('/all', controller.allAccess)
router.get('/user', [auth.verifyToken], controller.userBoard)
router.get(
  '/mod',
  [auth.verifyToken, auth.isModerator],
  controller.moderatorBoard
)
router.get('/admin', [auth.verifyToken, auth.isAdmin], controller.adminBoard)

module.exports = router

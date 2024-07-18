const express = require('express')

const { verifySignup } = require('../middleware')

const controller = require('../controllers/auth.controller')

const router = express.Router()

router.post(
  '/signup',
  [verifySignup.checkDuplicate, verifySignup.checkRoleExisted],
  controller.signup
)
router.post('/signup', controller.signin)

module.exports = router

const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.user

const verifyToken = async (req, res, next) => {
  let token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.status(403).json({ message: 'No token provided!' })
  }

  jwt.verify(token, config.secret, (err, decode) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' })
    }
    req.userId = decode.id
    next()
  })
}

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId)
  const roles = await user.getRoles()
  for (let role of roles) {
    if (role.name === 'admin') {
      next()
      return
    }
  }

  return res.status(403).json({ message: 'Require Admin Role!' })
}

const isModerator = async (req, res, next) => {
  const user = await User.findByPk(req.userId)
  const roles = await user.getRoles()
  for (let role of roles) {
    if (role.name === 'moderator') {
      next()
      return
    }
  }

  return res.status(403).json({ message: 'Require Moderator Role!' })
}

const isModeratorOrAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId)
  const roles = await user.getRoles()
  for (let role of roles) {
    if (role.name === 'moderator') {
      next()
      return
    }

    if (role.name === 'admin') {
      next()
      return
    }
  }

  return res.status(403).json({ message: 'Require Moderator or Admin Role!' })
}

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
}

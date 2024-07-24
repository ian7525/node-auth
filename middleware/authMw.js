import jwt from 'jsonwebtoken'
import AuthConfig from '../config/auth.config.js'
import db from '../models/index.js'

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.status(403).json({ message: 'No token provided!' })
  }

  jwt.verify(token, AuthConfig.secret, (err, decode) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' })
    }
    req.userId = decode.id
    next()
  })
}

const isAdmin = async (req, res, next) => {
  const user = await db.user.findByPk(req.userId)
  const roles = await user.getRoles()
  for (let role of roles) {
    if (role.name === 'admin') {
      next()
      return
    }
  }

  return res.status(403).json({ message: 'Require Admin Role!' })
}

export default {
  verifyToken,
  isAdmin,
}

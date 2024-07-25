import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import authConfig from '../config/auth.config.js'
import emailUtils from '../utils/emailUtils.js'
import { getDb } from '../models/index.js'

export const signup = async (req, res) => {
  const { userName: username, email, password, roles = [] } = req.body

  try {
    const db = getDb()
    const { user: User, role: Role } = db
    const savedUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password),
    })

    if (roles.length > 0) {
      const dbRoles = await Role.findAll({
        where: {
          name: {
            [db.Sequelize.Op.or]: roles,
          },
        },
      })
      await savedUser.setRoles(dbRoles)
    } else {
      await savedUser.setRoles([1])
    }

    const emailUtil = emailUtils()
    const response = await emailUtil.registerEmail(email)
    if (response.isSuccess) {
      res.status(201).json({ message: 'User is registered successfully!' })
    } else {
      res.status(500).json({ message: 'User is registered failed!' })
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export const signin = async (req, res) => {
  const { userName: username, password } = req.body

  try {
    const db = getDb()
    const { user: User } = db
    const user = await User.findOne({ where: { username } })
    if (!user) {
      return res.status(404).json({ message: 'User not found!' })
    }

    const isPwdValid = bcrypt.compareSync(password, user.password)

    if (!isPwdValid) {
      return res.status(401).json({ message: 'Invalid login!' })
    }

    const { secret } = authConfig()
    const accessToken = jwt.sign({ id: user.id }, secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 1 day
    })

    const authorities = []
    const userRoles = await user.getRoles()
    for (let userRole of userRoles) {
      authorities.push(`ROLE_${userRole.name.toUpperCase()}`)
    }

    res.status(200).json({
      id: user.id,
      userName: user.username,
      email: user.email,
      roles: authorities,
      accessToken,
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const config = require('../config/auth.config')
const db = require('../models')
const User = db.user
const Role = db.role

const Op = db.Sequelize.Op

const signup = async (req, res) => {
  const { userName: username, email, password, roles = [] } = req.body

  try {
    //Save user
    const savedUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password),
    })

    if (roles.length > 0) {
      const dbRoles = await Role.findAll({
        where: {
          name: {
            [Op.or]: roles,
          },
        },
      })
      await savedUser.setRoles(dbRoles)
    } else {
      await savedUser.setRoles([1])
    }
    res.status(201).json({ message: 'User is registered successfully!' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const signin = async (req, res) => {
  const { userName: username, password } = req.body

  try {
    const user = await User.findOne({ where: { username } })
    if (!user) {
      return res.status(404).json({ message: 'User not found!' })
    }

    const isPwdValid = bcrypt.compareSync(password, user.password)

    if (!isPwdValid) {
      return res.status(401).json({ message: 'Invalid login!' })
    }

    const accessToken = jwt.sign({ id: user.id }, config.secret, {
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

module.exports = {
  signup,
  signin,
}

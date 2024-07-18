const { Op } = require('sequelize')

const db = require('../models')
const ROLES = db.ROLES
const User = db.user

const checkDuplicate = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ username: req.body.userName }, { email: req.body.email }],
    },
  })

  if (user) {
    res.status(400).json({ message: 'Failed! The user is already in use.' })
    return
  }

  next()
}

const checkRoleExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let role of req.body.roles) {
      if (!ROLES.includes(role)) {
        res.status(400).json({ message: `Failed! Role doesn't exist: ${role}` })
        return
      }
    }
  }
  next()
}

module.exports = {
  checkDuplicate,
  checkRoleExisted,
}

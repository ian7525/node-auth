import db from '../models/index.js'

const checkDuplicate = async (req, res, next) => {
  const { user: User, Sequelize } = db
  const user = await User.findOne({
    where: {
      [Sequelize.Op.or]: [
        { username: req.body.userName },
        { email: req.body.email },
      ],
    },
  })

  if (user) {
    res.status(400).json({ message: 'Failed! The user is already in use.' })
    return
  }

  next()
}

const checkRoleExisted = (req, res, next) => {
  const { roles } = req.body

  if (roles) {
    for (let role of roles) {
      if (!db.ROLES.includes(role)) {
        res.status(400).json({ message: `Failed! Role doesn't exist: ${role}` })
        return
      }
    }
  }
  next()
}

export default {
  checkDuplicate,
  checkRoleExisted,
}

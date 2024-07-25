import { getDb } from '../models/index.js'

const checkDuplicate = async (req, res, next) => {
  try {
    const db = getDb()
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
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const checkRoleExisted = (req, res, next) => {
  try {
    const { roles } = req.body
    const db = getDb()

    if (roles) {
      for (let role of roles) {
        if (!db.ROLES.includes(role)) {
          res
            .status(400)
            .json({ message: `Failed! Role doesn't exist: ${role}` })
          return
        }
      }
    }
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default {
  checkDuplicate,
  checkRoleExisted,
}

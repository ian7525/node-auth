import Sequelize from 'sequelize'

import UserModel from '../models/user.model.js'
import RoleModel from '../models/role.model.js'

let db = null

const dbInit = (config) => {
  if (!config) {
    throw new Error('Config is required')
  }

  const { database, user, password, host, dialect, pool } = config
  const { max, min, acquire, idle } = pool

  const sequelize = new Sequelize(database, user, password, {
    host,
    dialect,
    pool: {
      max,
      min,
      acquire,
      idle,
    },
  })

  db = {
    Sequelize,
    sequelize,
    user: UserModel(sequelize, Sequelize.DataTypes),
    role: RoleModel(sequelize, Sequelize.DataTypes),
    roles: ['user', 'admin'],
  }

  db.role.belongsToMany(db.user, {
    through: 'user_roles',
  })

  db.user.belongsToMany(db.role, {
    through: 'user_roles',
  })

  db.sequelize.sync()

  return db
}

function getDb() {
  if (!db) {
    throw new Error('Db is not initialized')
  }
  return db
}

export { dbInit, getDb }

import Sequelize from 'sequelize'

import UserModel from '../models/user.model.js'
import RoleModel from '../models/role.model.js'

import DDD from '../config/db.config.js'

const { database, user, password, host, dialect, pool } = DDD
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

const db = {
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

export default db

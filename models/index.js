const config = require('../config/db.config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})

const db = {
  Sequelize,
  sequelize,
  user: require('../models/user.model')(sequelize, Sequelize),
  role: require('../models/role.model')(sequelize, Sequelize),
  ROLES: ['user', 'admin', 'moderator'],
}

db.role.belongsToMany(db.user, {
  through: 'user_roles',
})

db.user.belongsToMany(db.role, {
  through: 'user_roles',
})

module.exports = db

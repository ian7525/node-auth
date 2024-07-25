export default () => ({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PWD || '',
  database: process.env.DB_DATABASE || 'postgres',
  dialect: process.env.DB_DIALECT || 'postgres',
  pool: {
    max: +process.env.DB_POOL_MAX || 5,
    min: +process.env.DB_POOL_MIN || 0,
    acquire: +process.env.DB_POOL_ACQUIRE || 30000,
    idle: +process.env.DB_POOL_IDLE || 10000,
  },
})

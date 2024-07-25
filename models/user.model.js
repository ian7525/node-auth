const UserModel = (sequelize, dataTypes) => {
  const User = sequelize.define('users', {
    username: {
      type: dataTypes.STRING,
    },
    email: {
      type: dataTypes.STRING,
    },
    password: {
      type: dataTypes.STRING,
    },
    isactive: {
      type: dataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  return User
}

export default UserModel

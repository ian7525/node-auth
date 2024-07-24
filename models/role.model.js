const RoleModel = (sequelize, dataTypes) => {
  const Role = sequelize.define('role', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: dataTypes.STRING,
    },
  })

  return Role
}

export default RoleModel

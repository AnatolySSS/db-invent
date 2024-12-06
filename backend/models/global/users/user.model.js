export default (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    object_sid: {
      type: Sequelize.STRING(50),
      unique: true,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    is_auth: {
      type: Sequelize.BOOLEAN,
    },
    role: {
      type: Sequelize.STRING,
    },
    last_logon: {
      type: Sequelize.DATE,
    },
  });

  return User;
};

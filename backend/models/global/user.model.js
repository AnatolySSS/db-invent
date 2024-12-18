export default (sequelize, Sequelize) =>
  sequelize.define("user", {
    user_id: {
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
    access_type: {
      type: Sequelize.STRING,
    },
    last_logon: {
      type: Sequelize.DATE,
    },
  });

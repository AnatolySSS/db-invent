export default (sequelize, Sequelize) => {
  const valuesUser = sequelize.define("valuesUser", {
    role: {
      type: Sequelize.STRING,
    },
    division: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: `users_values`
  });

  return valuesUser;
};
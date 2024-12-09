export default (sequelize, Sequelize) => {
  const valuesUser = sequelize.define(
    "valuesUser",
    {
      role: {
        type: Sequelize.STRING,
      },
      city_name: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: `users_values`,
    }
  );

  return valuesUser;
};

export default (sequelize, Sequelize) => {
  const City = sequelize.define("cities", {
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
  });

  return City;
};

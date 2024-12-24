export default (sequelize, Sequelize) =>
  sequelize.define("division", {
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
  });

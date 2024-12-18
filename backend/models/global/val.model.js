export default (sequelize, Sequelize) =>
  sequelize.define(
    "val",
    {
      role: {
        type: Sequelize.STRING(20),
      },
      it_type: {
        type: Sequelize.STRING(100),
      },
      furniture_type: {
        type: Sequelize.STRING(100),
      },
      unmarked_type: {
        type: Sequelize.STRING(100),
      },
      assets_type: {
        type: Sequelize.STRING(100),
      },
      workplace_type: {
        type: Sequelize.STRING(50),
      },
      serviceable: {
        type: Sequelize.STRING(50),
      },
      office: {
        type: Sequelize.STRING(50),
      },
      locations_0: {
        type: Sequelize.STRING(50),
      },
      locations_1: {
        type: Sequelize.STRING(50),
      },
      locations_2: {
        type: Sequelize.STRING(50),
      },
      locations_3: {
        type: Sequelize.STRING(50),
      },
      measurement: {
        type: Sequelize.STRING(50),
      },
    },
    {
      timestamps: false, // Отключение createdAt и updatedAt
    }
  );

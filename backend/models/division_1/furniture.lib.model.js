export default (sequelize, Sequelize) => {
  const libDataFurniture = sequelize.define(
    `libDataFurniture`,
    {
      inventary_number: {
        type: Sequelize.STRING,
      },
      qr_code: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.TEXT,
      },
      owner: {
        type: Sequelize.TEXT,
      },
      purchase_price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      location: {
        type: Sequelize.TEXT,
      },
      note: {
        type: Sequelize.TEXT,
      },
    },
    {
      tableName: `furniture_lib`,
    }
  );

  return libDataFurniture;
};

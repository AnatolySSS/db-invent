export default (sequelize, Sequelize) => {
  const libDataUnmarked = sequelize.define(
    `libDataUnmarked`,
    {
      qr_code: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.TEXT,
      },
      purchase_price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      count: {
        type: Sequelize.INTEGER,
      },
      note: {
        type: Sequelize.TEXT,
      },
    },
    {
      tableName: `unmarked_lib`,
    }
  );

  return libDataUnmarked;
};

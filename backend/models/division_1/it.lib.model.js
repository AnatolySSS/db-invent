export default (sequelize, Sequelize) => {
  const libDataIt = sequelize.define(
    `libDataIt`,
    {
      inventary_number: {
        type: Sequelize.STRING,
      },
      qr_code: {
        type: Sequelize.STRING,
      },
      serial: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.TEXT,
      },
      release_date: {
        type: Sequelize.DATE,
      },
      owner: {
        type: Sequelize.TEXT,
      },
      location: {
        type: Sequelize.TEXT,
      },
      purchase_price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      note: {
        type: Sequelize.TEXT,
      },
    },
    {
      tableName: `it_lib`,
    }
  );

  return libDataIt;
};

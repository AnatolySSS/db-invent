export default (sequelize, Sequelize) => {
  const libDataAssets = sequelize.define(`libDataAssets`, {
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
    purchase_date: {
      type: Sequelize.DATE,
    },
    owner: {
      type: Sequelize.TEXT,
    },
    purchase_price: {
      type: Sequelize.INTEGER,
    },
    note: {
      type: Sequelize.TEXT,
    },
  }, {
    tableName: `assets_lib`
  });

  return libDataAssets;
};
export default (sequelize, Sequelize) => {
  const libDataUnmarked = sequelize.define(`libDataUnmarked`, {
    type: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.TEXT,
    },
    location: {
      type: Sequelize.TEXT,
    },
    count: {
      type: Sequelize.INTEGER,
    },
    purchase_price: {
      type: Sequelize.INTEGER,
    },
    measurement: {
      type: Sequelize.STRING,
    },
    note: {
      type: Sequelize.TEXT,
    },
  }, {
    tableName: `unmarked_lib`
  });

  return libDataUnmarked;
};
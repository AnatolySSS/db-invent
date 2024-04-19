export default (sequelize, Sequelize) => {
  const libDataUnmarked = sequelize.define(`libDataUnmarked`, {
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
      type: Sequelize.INTEGER,
    },
    measurement: {
      type: Sequelize.STRING,
    },
    count: {
      type: Sequelize.INTEGER,
    },
    location: {
      type: Sequelize.TEXT,
    },
    note: {
      type: Sequelize.TEXT,
    },
  }, {
    tableName: `unmarked_lib`
  });

  return libDataUnmarked;
};
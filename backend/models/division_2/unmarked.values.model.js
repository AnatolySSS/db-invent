export default (sequelize, Sequelize) => {
  const valuesDataUnmarked = sequelize.define(`valuesDataUnmarked`, {
    type: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.TEXT,
    },
  }, {
    tableName: `unmarked_values`
  });

  return valuesDataUnmarked;
};
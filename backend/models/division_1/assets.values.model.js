export default (sequelize, Sequelize) => {
  const valuesDataAssets = sequelize.define(`valuesDataAssets`, {
    type: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: `assets_values`
  });

  return valuesDataAssets;
};
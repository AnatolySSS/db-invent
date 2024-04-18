export default (sequelize, Sequelize) => {
  const valuesDataFurniture = sequelize.define(`valuesDataFurniture`, {
    type: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: `furniture_values`
  });

  return valuesDataFurniture;
};
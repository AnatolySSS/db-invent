export default (sequelize, Sequelize) => {
  const valuesDataFurniture = sequelize.define(`valuesDataFurniture`, {
    type: {
      type: Sequelize.STRING,
    },
    serviceable: {
      type: Sequelize.TEXT,
    },
    location: {
      type: Sequelize.TEXT,
    },
  }, {
    tableName: `furniture_values`
  });

  return valuesDataFurniture;
};
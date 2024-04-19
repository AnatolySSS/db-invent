export default (sequelize, Sequelize) => {
  const valuesDataIt = sequelize.define(`valuesDataIt`, {
    type: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.TEXT,
    },
  }, {
    tableName: `it_values`
  });

  return valuesDataIt;
};
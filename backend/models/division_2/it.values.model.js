export default (sequelize, Sequelize) => {
  const valuesDataIt = sequelize.define(`valuesDataIt`, {
    type: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: `it_values`
  });

  return valuesDataIt;
};
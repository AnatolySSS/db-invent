export default (sequelize, Sequelize) => {
  const valuesDataIt = sequelize.define(`valuesDataIt`, {
    type: {
      type: Sequelize.STRING,
    },
    workplace_type: {
      type: Sequelize.TEXT,
    },
    serviceable: {
      type: Sequelize.TEXT,
    },
    location: {
      type: Sequelize.TEXT,
    },
  }, {
    tableName: `it_values`
  });

  return valuesDataIt;
};
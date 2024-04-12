export default (sequelize, Sequelize) => {
  const columnsDataIt = sequelize.define(`columnsDataIt`, {
    field: {
      type: Sequelize.STRING,
    },
    header: {
      type: Sequelize.STRING,
    },
    width: {
      type: Sequelize.STRING,
    },
    showFilterMenu: {
      type: Sequelize.BOOLEAN,
    },
    editingType: {
      type: Sequelize.STRING,
    },
    dbFieldType: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: `it_meta`
  });

  return columnsDataIt;
};
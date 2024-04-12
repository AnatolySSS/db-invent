export default (sequelize, Sequelize) => {
  const columnsDataFurniture = sequelize.define(`columnsDataFurniture`, {
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
    tableName: `furniture_meta`
  });

  return columnsDataFurniture;
};
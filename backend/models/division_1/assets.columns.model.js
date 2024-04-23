export default (sequelize, Sequelize) => {
  const columnsDataAssets = sequelize.define(`columnsDataAssets`, {
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
    tableName: `assets_meta`
  });

  return columnsDataAssets;
};
export default (sequelize, Sequelize) => {
  const columnsDataUnmarked = sequelize.define(`columnsDataUnmarked`, {
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
    tableName: `unmarked_meta`
  });

  return columnsDataUnmarked;
};
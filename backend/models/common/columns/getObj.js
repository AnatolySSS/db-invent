export const getObj = (Sequelize) => {
  return {
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
    dataType: {
      type: Sequelize.STRING,
    },
  };
};

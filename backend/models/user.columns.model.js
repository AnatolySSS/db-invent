export default (sequelize, Sequelize) => {
  const columnsUser = sequelize.define(
    `columnsUser`,
    {
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
    },
    {
      tableName: `users_columns`,
    }
  );

  return columnsUser;
};

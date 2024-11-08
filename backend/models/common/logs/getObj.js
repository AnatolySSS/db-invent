export const getObj = (Sequelize) => {
  return {
    itemId: {
      type: Sequelize.INTEGER,
    },
    changedDateTime: {
      type: Sequelize.DATE,
    },
    changedEmployeeName: {
      type: Sequelize.TEXT,
    },
    changedFiled: {
      type: Sequelize.STRING,
    },
    oldValue: {
      type: Sequelize.TEXT,
    },
    newValue: {
      type: Sequelize.TEXT,
    },
  };
};

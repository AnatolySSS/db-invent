export const getObj = (Sequelize) => {
  return {
    itemId: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.TEXT,
    },
    date: {
      type: Sequelize.DATE,
    },
    note: {
      type: Sequelize.STRING,
    },
  };
};

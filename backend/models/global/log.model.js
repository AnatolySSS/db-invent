export default (sequelize, Sequelize) =>
  sequelize.define(`log`, {
    itemId: {
      type: Sequelize.INTEGER,
    },
    changedDateTime: {
      type: Sequelize.DATE,
    },
    changedUserId: {
      type: Sequelize.STRING(50),
    },
    changedFiled: {
      type: Sequelize.STRING(50),
    },
    oldValue: {
      type: Sequelize.TEXT,
    },
    newValue: {
      type: Sequelize.TEXT,
    },
  });

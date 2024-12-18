export default (sequelize, Sequelize) =>
  sequelize.define(`trans`, {
    itemId: {
      type: Sequelize.INTEGER,
    },
    employee_id: {
      type: Sequelize.STRING(50),
    },
    date: {
      type: Sequelize.DATE,
    },
    note: {
      type: Sequelize.STRING,
    },
  });

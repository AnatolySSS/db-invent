export default (sequelize, Sequelize, tableName, currentYear) => {
  const currentYearInventary = sequelize.define(`currentYearInventary${currentYear}${tableName}`, {
    qr_code: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.TEXT,
    },
    scan_date: {
      type: Sequelize.DATE,
    },
    location: {
      type: Sequelize.STRING,
    },
    user: {
      type: Sequelize.STRING,
    },
    invent_note: {
      type: Sequelize.TEXT,
    },
    checked: {
      type: Sequelize.BOOLEAN,
    },
  }, {
    tableName: `inv_${currentYear}_${tableName}`
  });

  return currentYearInventary;
};
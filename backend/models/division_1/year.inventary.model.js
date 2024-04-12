export default (sequelize, Sequelize, tableName, year) => {
  const yearInventary = sequelize.define(`yearInventary${year}${tableName}`, {
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
    tableName: `inv_${year}_${tableName}`
  });

  return yearInventary;
};
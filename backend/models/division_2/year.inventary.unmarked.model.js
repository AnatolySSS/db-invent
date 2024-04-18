export default (sequelize, Sequelize, year) => {
  const yearInventaryUnmarked = sequelize.define(`yearInventary${year}Unmarked`, {
    qr_code: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.TEXT,
    },
    location: {
      type: Sequelize.TEXT,
    },
    purchase_price: {
      type: Sequelize.INTEGER,
    },
    count: {
      type: Sequelize.INTEGER,
    },
    note: {
      type: Sequelize.TEXT,
    },
    scan_date: {
      type: Sequelize.DATE,
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
    tableName: `inv_${year}_unmarked`
  });

  return yearInventaryUnmarked;
};
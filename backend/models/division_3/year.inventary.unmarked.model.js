export default (sequelize, Sequelize, year) => {
  const yearInventaryUnmarked = sequelize.define(`yearInventary${year}Unmarked`, {
    type: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.TEXT,
    },
    location: {
      type: Sequelize.TEXT,
    },
    count: {
      type: Sequelize.INTEGER,
    },
    purchase_price: {
      type: Sequelize.INTEGER,
    },
    measurement: {
      type: Sequelize.STRING,
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
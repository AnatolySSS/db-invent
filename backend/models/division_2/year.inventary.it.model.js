export default (sequelize, Sequelize, year) => {
  const yearInventaryIt = sequelize.define(
    `yearInventary${year}It`,
    {
      inventary_number: {
        type: Sequelize.STRING,
      },
      qr_code: {
        type: Sequelize.STRING,
      },
      serial: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.TEXT,
      },
      release_date: {
        type: Sequelize.DATE,
      },
      owner: {
        type: Sequelize.TEXT,
      },
      purchase_price: {
        type: Sequelize.DECIMAL(10, 2),
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
    },
    {
      tableName: `inv_${year}_it`,
    }
  );

  return yearInventaryIt;
};

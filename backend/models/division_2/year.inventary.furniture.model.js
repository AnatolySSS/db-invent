export default (sequelize, Sequelize, year) => {
  const yearInventaryFurniture = sequelize.define(
    `yearInventary${year}Furniture`,
    {
      inventary_number: {
        type: Sequelize.STRING,
      },
      qr_code: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.TEXT,
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
      tableName: `inv_${year}_furniture`,
    }
  );

  return yearInventaryFurniture;
};

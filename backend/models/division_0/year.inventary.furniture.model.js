export default (sequelize, Sequelize, year) => {
  const yearInventaryFurniture = sequelize.define(`yearInventary${year}Furniture`, {
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
    purchase_date: {
      type: Sequelize.DATE,
    },
    release_date: {
      type: Sequelize.DATE,
    },
    last_setup_date: {
      type: Sequelize.DATE,
    },
    owner: {
      type: Sequelize.TEXT,
    },
    serviceable: {
      type: Sequelize.TEXT,
    },
    note: {
      type: Sequelize.TEXT,
    },
    is_workplace: {
      type: Sequelize.BOOLEAN,
    },
    location: {
      type: Sequelize.TEXT,
    },
    was_deleted: {
      type: Sequelize.BOOLEAN,
    },
    deleted_date: {
      type: Sequelize.DATE,
    },
    deleted_grounds: {
      type: Sequelize.TEXT,
    },
    purchase_price: {
      type: Sequelize.INTEGER,
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
    tableName: `inv_${year}_furniture`
  });

  return yearInventaryFurniture;
};
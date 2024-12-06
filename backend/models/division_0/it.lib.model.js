export default (sequelize, Sequelize) => {
  const libDataIt = sequelize.define(
    `libDataIt`,
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
      purchase_date: {
        type: Sequelize.DATE,
      },
      release_date: {
        type: Sequelize.DATE,
      },
      incoming_date: {
        type: Sequelize.DATE,
      },
      last_setup_date: {
        type: Sequelize.DATE,
      },
      ad_name: {
        type: Sequelize.TEXT,
      },
      owner: {
        type: Sequelize.TEXT,
      },
      set_with: {
        type: Sequelize.TEXT,
      },
      workplace_type: {
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
        type: Sequelize.DECIMAL(10, 2),
      },
    },
    {
      tableName: `it_lib`,
    }
  );

  return libDataIt;
};

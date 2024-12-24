export default (sequelize, Sequelize) =>
  sequelize.define(`inv`, {
    qr_code: {
      type: Sequelize.STRING(10),
    },
    inventary_number: {
      type: Sequelize.STRING(30),
    },
    serial: {
      type: Sequelize.STRING(30),
    },

    name: {
      type: Sequelize.TEXT,
    },
    type: {
      type: Sequelize.STRING(30),
    },

    count: {
      type: Sequelize.INTEGER,
    },
    measurement: {
      type: Sequelize.STRING(30),
    },

    employee_id: {
      type: Sequelize.STRING(50),
    },
    financially_responsible_person_id: {
      type: Sequelize.STRING(50),
    },

    release_date: {
      type: Sequelize.DATEONLY,
    },
    purchase_date: {
      type: Sequelize.DATEONLY,
    },
    incoming_date: {
      type: Sequelize.DATEONLY,
    },
    employee_setup_date: {
      type: Sequelize.DATEONLY,
    },

    ad_name: {
      type: Sequelize.STRING(50),
    },
    set_with: {
      type: Sequelize.TEXT,
    },
    workplace_type: {
      type: Sequelize.STRING(50),
    },
    serviceable: {
      type: Sequelize.STRING(50),
    },
    is_workplace: {
      type: Sequelize.BOOLEAN,
    },
    location: {
      type: Sequelize.STRING(50),
    },
    office: {
      type: Sequelize.STRING(50),
    },

    was_deleted: {
      type: Sequelize.BOOLEAN,
    },
    deleted_date: {
      type: Sequelize.DATEONLY,
    },
    deleted_grounds: {
      type: Sequelize.TEXT,
    },

    purchase_price: {
      type: Sequelize.DECIMAL(10, 2),
    },
    note: {
      type: Sequelize.TEXT,
    },
    class_type: {
      type: Sequelize.STRING(50),
    },
    division_id: {
      type: Sequelize.INTEGER,
    },

    scan_date: {
      type: Sequelize.DATE,
    },
    inv_user_id: {
      type: Sequelize.STRING(50),
    },
    invent_note: {
      type: Sequelize.TEXT,
    },
    checked: {
      type: Sequelize.BOOLEAN,
    },

    year: {
      type: Sequelize.STRING(5),
    },
  });

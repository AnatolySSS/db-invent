export const Columns = {
  employee(sequelize, Sequelize) {
    return sequelize.define(`employee_col`, employeeCols(Sequelize));
  },
  user(sequelize, Sequelize) {
    return sequelize.define(`user_col`, employeeCols(Sequelize));
  },
  it(sequelize, Sequelize) {
    return sequelize.define(`it_col`, libCols(Sequelize));
  },
  furniture(sequelize, Sequelize) {
    return sequelize.define(`furniture_col`, libCols(Sequelize));
  },
  unmarked(sequelize, Sequelize) {
    return sequelize.define(`unmarked_col`, libCols(Sequelize));
  },
  assets(sequelize, Sequelize) {
    return sequelize.define(`assets_col`, libCols(Sequelize));
  },
};

const employeeCols = (Sequelize) => {
  return {
    field: {
      type: Sequelize.STRING(50),
    },
    header: {
      type: Sequelize.STRING(50),
    },
    width: {
      type: Sequelize.STRING(20),
    },
    showFilterMenu: {
      type: Sequelize.BOOLEAN,
    },
    editingType: {
      type: Sequelize.STRING(20),
    },
    dbFieldType: {
      type: Sequelize.STRING(20),
    },
    dataType: {
      type: Sequelize.STRING(20),
    },
  };
};

const libCols = (Sequelize) => {
  return {
    field: {
      type: Sequelize.STRING(50),
    },
    header: {
      type: Sequelize.STRING(50),
    },
    division_0: {
      type: Sequelize.BOOLEAN,
    },
    division_1: {
      type: Sequelize.BOOLEAN,
    },
    division_2: {
      type: Sequelize.BOOLEAN,
    },
    division_3: {
      type: Sequelize.BOOLEAN,
    },
    width: {
      type: Sequelize.STRING(20),
    },
    showFilterMenu: {
      type: Sequelize.BOOLEAN,
    },
    editingType: {
      type: Sequelize.STRING(20),
    },
    dbFieldType: {
      type: Sequelize.STRING(20),
    },
    dataType: {
      type: Sequelize.STRING(20),
    },
  };
};

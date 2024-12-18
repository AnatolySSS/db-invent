import db from "../../models/_index.js";

const { employee } = db.GLOBAL;

let employees = await employee.findAll({
  attributes: {
    exclude: ["createdAt"],
  },
});

employees = JSON.parse(JSON.stringify(employees));

export const changeUserSidToName = async (lib) => {
  // console.log(lib);

  for (const item of lib) {
    for (const key in item) {
      if (Array.isArray(item[key])) {
        changeUserSidToName(item[key]);
      } else {
        for (const employee of employees) {
          if (item[key] === employee.employee_id) {
            item[key] = employee.full_name;
          }
        }
      }
    }
  }
  return lib;
};

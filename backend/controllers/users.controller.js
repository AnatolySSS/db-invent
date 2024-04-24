import bcrypt from "bcryptjs"
import generator from "generate-password";
import db from "../models/_index.js";
import { getValues } from "./functions/getValues.js";

export const UsersController = {
  async getUsers(request, responce) {
    try {
      let { userDivision } = request.body;

      console.log(userDivision);

      const { user, userValues, userColumns } = db.GLOBAL;
      let data = {};
      
      data.lib = await user.findAll({
        where: { division: userDivision },
        attributes: { exclude: ["createdAt", "is_auth", "last_logon", "password", "division"] },
      });
      data.columns = await userColumns.findAll();
      data.values = await userValues.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      });
      data.name = "Пользователи";

      data.lib = JSON.parse(JSON.stringify(data.lib));
      data.columns = JSON.parse(JSON.stringify(data.columns));
      data.values = JSON.parse(JSON.stringify(data.values));

      data.values = getValues(data.values);

      //Изменение null на "null"
      data.lib = data.lib.map((libObg) => {
        for (const libKey in libObg) {
          data.columns.forEach(columnObg => {
            if (columnObg.dbFieldType == "boolean" && columnObg.field == libKey) {
              libObg[libKey] = libObg[libKey] === null ? libObg[libKey] === "null" : libObg[libKey];
            }
          });
        }
        return libObg;
      });

      responce.json(data);
    } catch (error) {
      console.log("__________UsersController__getData___________");
      console.log(error);
      responce.json(error);
    }
  },

  async addUser(request, responce) {
    try {
      let { rowData, userDivision } = request.body;
      const { user } = db.GLOBAL;

      rowData.division = userDivision;
      rowData.is_auth = false;

      let passwordGen = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
      });

      rowData.password = await bcrypt.hash(passwordGen, 10);
      delete rowData.id;

      await user.create(rowData);

      responce.json();
    } catch (error) {
      console.log("__________UsersController__addData___________");
      console.log(error);
      responce.json(error);
    }
  },

  async updateUser(request, responce) {
    try {
      let { rowData } = request.body;
      const { user } = db.GLOBAL;

      let _id = rowData.id;
      delete rowData.id;
      await user.update(rowData, { where: { id: _id } });
      responce.json({});
    } catch (error) {
      console.log("__________UsersController__updateData___________");
      console.log(error);
      responce.json(error);
    }
  },

  async deleteUser(request, responce) {
    try {
      let { rowId } = request.body;
      const { user } = db.GLOBAL;

      await user.destroy({ where: { id: rowId } });
      responce.json({ message: `User ${rowId} has been deleted` });
    } catch (error) {
      console.log("__________UsersController__deleteUser___________");
      console.log(error);
      responce.json(error);
    }
  },
};
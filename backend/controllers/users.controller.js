import { Sequelize } from "sequelize";
import bcrypt from "bcryptjs";
import generator from "generate-password";
import nodemailer from "nodemailer";
import db from "../models/_index.js";
import { getValues } from "./functions/getValues.js";

export const UsersController = {
  async getUsers(request, responce) {
    try {
      let { userAuth } = request.body;
      const { user, vals, userCols, employee, division } = db.GLOBAL;
      let data = {};

      const whereObj = userAuth.access_type === "limited" ? { division_id: userAuth.division_id } : {};

      data.lib = await employee.findAll({
        attributes: {
          include: [
            [Sequelize.col("user.role"), "role"],
            [Sequelize.col("user.access_type"), "access_type"],
            [Sequelize.col("user.updatedAt"), "updatedAt"],
            [Sequelize.col("division.name"), "city_name"],
            ["employee_id", "user_id"],
          ],
          exclude: ["createdAt", "dn", "employee_id"],
        },
        where: whereObj,
        include: [
          {
            model: user,
            attributes: [],
            required: true,
          },
          {
            model: division,
            attributes: [],
          },
        ],
        raw: true,
      });

      data.columns = await userCols.findAll({ raw: true });
      data.values = await vals.findAll({
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        raw: true,
      });

      data.values = getValues(data.values);

      //Изменение null на "null"
      data.lib = data.lib.map((libObg) => {
        for (const libKey in libObg) {
          data.columns.forEach((columnObg) => {
            if (columnObg.dbFieldType == "boolean" && columnObg.field == libKey) {
              libObg[libKey] = libObg[libKey] === null ? (libObg[libKey] = "null") : libObg[libKey];
            }
          });
        }
        return libObg;
      });

      responce.json(data);
    } catch (error) {
      console.log("__________UsersController__getUsers___________");
      console.log(error);
      responce.json(error);
    }
  },

  async addUser(request, responce) {
    try {
      let { userData } = request.body;
      const { user } = db.GLOBAL;
      console.log(userData);

      userData.is_auth = false;

      let passwordGen = generator.generate({
        length: 10,
        numbers: true,
      });

      userData.password = await bcrypt.hash(passwordGen, 10);

      await user.create(userData);

      // let testEmailAccount = await nodemailer.createTestAccount();

      // let transporter = nodemailer.createTransport({
      //     host: 'smtp.ethereal.email',
      //     port: 587,
      //     secure: false,
      //     auth: {
      //         user: testEmailAccount.user,
      //         pass: testEmailAccount.pass,
      //     },
      // });

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "anatoly.shilyaev@gmail.com",
          pass: "sqot kogx iijd fuyr",
        },
      });

      let result = await transporter.sendMail({
        from: '"Inventory" <anatoly.shilyaev@gmail.com>',
        to: `anatoly_shilyaev@mail.ru`,
        subject: "Инвентаризация (логин & пароль)",
        html: `Учетные данные для входа в систему инвентаризации:<br><br>
                <strong>Логин:</strong> ${userData.login}<br>
                <strong>Пароль:</strong> ${passwordGen}`,
      });

      responce.json();
    } catch (error) {
      console.log("__________UsersController__addUser___________");
      console.log(error);
      responce.json(error);
    }
  },

  async updateUser(request, responce) {
    try {
      let { userData } = request.body;
      const { user } = db.GLOBAL;

      await user.update(userData, { where: { user_id: userData.user_id } });
      responce.json({});
    } catch (error) {
      console.log("__________UsersController__updateUser___________");
      console.log(error);
      responce.json(error);
    }
  },

  async deleteUser(request, responce) {
    try {
      let { userId } = request.body;
      const { user } = db.GLOBAL;

      await user.destroy({ where: { user_id: userId } });
      responce.json({ message: `User ${userId} has been deleted` });
    } catch (error) {
      console.log("__________UsersController__deleteUser___________");
      console.log(error);
      responce.json(error);
    }
  },
};

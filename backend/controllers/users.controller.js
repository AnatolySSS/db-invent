import { Sequelize } from "sequelize";
import bcrypt from "bcryptjs";
import generator from "generate-password";
import nodemailer from "nodemailer";
import db from "../models/_index.js";
import { getValues } from "./functions/getValues.js";

export const UsersController = {
  async getUsers(request, responce) {
    try {
      let { userDivision } = request.body;

      const { user, userValues, userColumns, employer, city } = db.GLOBAL;
      let data = {};

      data.lib = await employer.findAll({
        attributes: {
          include: [
            [Sequelize.col("user.role"), "role"],
            [Sequelize.col("user.updatedAt"), "updatedAt"],
            [Sequelize.col("city.name"), "city_name"],
          ],
          exclude: ["createdAt", "dn"],
        },
        where: { division: userDivision },
        include: [
          {
            model: user,
            attributes: [],
            required: true,
          },
          {
            model: city,
            attributes: [],
          },
        ],
        raw: true,
      });

      console.log(data.lib);

      data.columns = await userColumns.findAll();
      data.values = await userValues.findAll({
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      });
      data.name = "Пользователи";

      data.columns = JSON.parse(JSON.stringify(data.columns));
      data.values = JSON.parse(JSON.stringify(data.values));

      data.values = getValues(data.values);

      //Изменение null на "null"
      data.lib = data.lib.map((libObg) => {
        for (const libKey in libObg) {
          data.columns.forEach((columnObg) => {
            if (
              columnObg.dbFieldType == "boolean" &&
              columnObg.field == libKey
            ) {
              libObg[libKey] =
                libObg[libKey] === null
                  ? libObg[libKey] === "null"
                  : libObg[libKey];
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
      let { userData } = request.body;
      const { user } = db.GLOBAL;

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

      // let transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //       user: 'anatoly.shilyaev@gmail.com',
      //       pass: 'sqot kogx iijd fuyr',
      //   },
      // });

      // let result = await transporter.sendMail({
      //     from: '"Inventory" <anatoly.shilyaev@gmail.com>',
      //     to: `${rowData.login}@finombudsman.ru`,
      //     subject: 'Инвентаризация (логин & пароль)',
      //     html:`Учетные данные для входа в систему инвентаризации:<br><br>
      //           <strong>Логин:</strong> ${rowData.login}<br>
      //           <strong>Пароль:</strong> ${passwordGen}`,
      // });

      responce.json();
    } catch (error) {
      console.log("__________UsersController__addData___________");
      console.log(error);
      responce.json(error);
    }
  },

  async updateUser(request, responce) {
    try {
      let { userData } = request.body;
      const { user } = db.GLOBAL;

      await user.update(
        { role: userData.role },
        { where: { object_sid: userData.object_sid } }
      );
      responce.json({});
    } catch (error) {
      console.log("__________UsersController__updateData___________");
      console.log(error);
      responce.json(error);
    }
  },

  async deleteUser(request, responce) {
    try {
      let { userId } = request.body;
      const { user } = db.GLOBAL;
      console.log(userId);

      await user.destroy({ where: { object_sid: userId } });
      responce.json({ message: `User ${userId} has been deleted` });
    } catch (error) {
      console.log("__________UsersController__deleteUser___________");
      console.log(error);
      responce.json(error);
    }
  },
};

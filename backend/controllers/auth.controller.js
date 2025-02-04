import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../models/_index.js";
import authConfig from "../config/auth.config.js";
import { getValues } from "./functions/getValues.js";

export const AuthController = {
  async login(request, responce) {
    try {
      let { login, password } = request.body;
      const { user, employee } = db.GLOBAL;

      const currentUser = await employee.findOne({
        attributes: {
          include: [
            [Sequelize.col("user.password"), "password"],
            [Sequelize.col("user.role"), "role"],
          ],
          exclude: ["createdAt", "updatedAt"],
        },
        where: { login: login },
        include: [
          {
            model: user,
            attributes: [],
            required: true,
          },
        ],
        raw: true,
      });

      if (!currentUser) {
        return responce.json({
          resultCode: 2,
          message: "Пользователя с данным логином не имеется в БД",
        });
      }

      let passwordIsValid = bcrypt.compareSync(password, currentUser.password);

      if (!passwordIsValid) {
        return responce.json({
          resultCode: 1,
          accessToken: null,
          message: "Неверно указан пароль",
        });
      }

      await user.update({ is_auth: 1, last_logon: new Date() }, { where: { user_id: currentUser.employee_id } });

      const accessToken = jwt.sign({ login: currentUser.login, role: currentUser.role }, authConfig.secret);

      responce.json({
        resultCode: 0,
        accessToken: accessToken,
        message: "Аутентификация прошла успешно",
      });
    } catch (error) {
      console.log("__________AuthController__login___________");
      console.log(error);
      responce.json(error);
    }
  },

  async logout(request, responce) {
    try {
      let { login } = request.body;
      const { user, employee } = db.GLOBAL;
      const currentUser = await employee.findOne({
        attributes: ["employee_id"],
        where: { login: login },
        include: [
          {
            model: user,
            attributes: [],
          },
        ],
        raw: true,
      });

      await user.update({ is_auth: 0 }, { where: { user_id: currentUser.employee_id } });

      responce.json({
        resultCode: 0,
        accessToken: null,
        message: "Сессия завершена",
      });
    } catch (error) {
      console.log("__________AuthController__logout___________");
      console.log(error);
      responce.json(error);
    }
  },

  async auth(request, responce) {
    try {
      let { login } = request.body;
      const { user, employee, vals } = db.GLOBAL;

      let city_names = await vals.findAll({
        attributes: ["id", "city_name"],
        raw: true,
      });

      city_names = city_names.filter((val) => val.city_name);

      const currentUser = await employee.findOne({
        attributes: {
          include: [
            [Sequelize.col("user.last_logon"), "last_logon"],
            [Sequelize.col("user.is_auth"), "is_auth"],
            [Sequelize.col("user.role"), "role"],
            [Sequelize.col("user.access_type"), "access_type"],
            [Sequelize.col("user.data_type"), "data_type"],
            [Sequelize.col("val.city_name"), "city_name"],
          ],
          exclude: ["createdAt", "updatedAt"],
        },
        where: { login: login },
        include: [
          {
            model: user,
            attributes: [],
          },
          {
            model: vals,
            attributes: [],
          },
        ],
        raw: true,
      });

      currentUser.data_type = currentUser.data_type?.split(",");
      currentUser.access_type = currentUser.access_type?.split(",");

      //Изменяем наименования городов на id
      currentUser.access_type = currentUser.access_type.map((type) => {
        const city = city_names.find((item) => item.city_name === type);
        return city ? city.id : type;
      });

      console.log(currentUser);

      if (!currentUser) return;

      if (currentUser.is_auth == 1) {
        currentUser.is_auth = true;
        responce.json({
          resultCode: 0,
          message: "Авторизация прошла успешно",
          currentUser,
        });
      } else {
        user.is_auth = false;
        responce.json({
          resultCode: 1,
          message: "Пользователь не авторизован",
          currentUser,
        });
      }
    } catch (error) {
      console.log("__________AuthController__auth___________");
      console.log(error);
      responce.json(error);
    }
  },
};

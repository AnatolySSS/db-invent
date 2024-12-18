import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../models/_index.js";
const User = db.GLOBAL.user;
const Employer = db.GLOBAL.employer;
import authConfig from "../config/auth.config.js";

export const AuthController = {
  async login(request, responce) {
    try {
      let { login, password } = request.body;

      const user = await Employer.findOne({
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
            model: User,
            attributes: [],
          },
        ],
        raw: true,
      });

      if (!user) {
        return responce.json({
          resultCode: 2,
          message: "Пользователя с данным логином не имеется в БД",
        });
      }

      let passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return responce.json({
          resultCode: 1,
          accessToken: null,
          message: "Неверно указан пароль",
        });
      }

      await User.update(
        { is_auth: 1, last_logon: new Date() },
        { where: { object_sid: user.object_sid } }
      );

      const accessToken = jwt.sign(
        { login: user.login, role: user.role },
        authConfig.secret
      );

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
      const user = await Employer.findOne({
        attributes: ["object_sid"],
        where: { login: login },
        include: [
          {
            model: User,
            attributes: [],
          },
        ],
        raw: true,
      });

      await User.update(
        { is_auth: 0 },
        { where: { object_sid: user.object_sid } }
      );

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

      const user = await Employer.findOne({
        attributes: {
          include: [
            [Sequelize.col("user.last_logon"), "last_logon"],
            [Sequelize.col("user.is_auth"), "is_auth"],
            [Sequelize.col("user.role"), "role"],
          ],
          exclude: ["createdAt", "updatedAt"],
        },
        where: { login: login },
        include: [
          {
            model: User,
            attributes: [],
          },
        ],
        raw: true,
      });

      if (!user) return;

      if (user.is_auth == 1) {
        user.is_auth = true;
        responce.json({
          resultCode: 0,
          message: "Авторизация прошла успешно",
          user,
        });
      } else {
        user.is_auth = false;
        responce.json({
          resultCode: 1,
          message: "Пользователь не авторизован",
          user,
        });
      }
    } catch (error) {
      console.log("__________AuthController__auth___________");
      console.log(error);
      responce.json(error);
    }
  },
};

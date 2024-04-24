import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import db from "../models/_index.js";
const User = db.GLOBAL.user
import authConfig from "../config/auth.config.js";

export const AuthController = {
  async login(request, responce) {
    try {
      let { login, password } = request.body;
      const user = await User.findOne({ where: { login: login }, raw: true });

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

      await User.update({ is_auth: 1, last_logon: new Date() }, { where: { login: login } });

      const accessToken = jwt.sign(
        { login: user.login, role: user.role },
        authConfig.secret
      );

      user.last_logon = new Date();

      responce.json({
        resultCode: 0,
        accessToken: accessToken,
        message: "Аутентификация прошла успешно",
        user,
      });
    } catch (error) {
      responce.json(error);
    }

  },

  async logout(request, responce) {
    try {
      let { login } = request.body;
      await User.update({ is_auth: 0 }, { where: {login: login} });
      responce.json({
        resultCode: 0,
        accessToken: null,
        message: "Сессия завершена",
      });
    } catch (error) {
      responce.json(error);
    }
  },

  async auth(request, responce) {
    try {
      let { login } = request.body;
      const user = await User.findOne({ where: { login: login }, raw: true });

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
      responce.json(error);
    }
  },
};

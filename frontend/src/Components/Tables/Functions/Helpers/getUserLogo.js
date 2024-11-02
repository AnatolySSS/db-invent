export const getUserLogo = (isAuth, login) => {
    try {
      return require(`../../../../img/${isAuth ? login : ""}.png`);
    } catch (error) {
      return "";
    }
  };
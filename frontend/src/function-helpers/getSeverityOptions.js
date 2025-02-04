export const getSeverityOptions = (value) => {
  // const options = {
  //   primary: ["Оборудование", "Москва"],
  //   success: ["Мебель", "Саратов"],
  //   info: ["Основные средства", "Санкт-Петербург"],
  //   warning: ["Прочее", "Нижний Новгород"],
  // };
  const options = {
    "bg-red-500": ["Москва"],
    "bg-indigo-500": ["Саратов"],
    "bg-blue-500": ["Санкт-Петербург"],
    "bg-purple-600": ["Нижний Новгород"],
    primary: ["Оборудование"],
    success: ["Мебель"],
    info: ["Основные средства"],
    warning: ["Прочее"],
  };
  for (const key in options) {
    if (options[key].includes(value)) {
      return key;
    }
  }
  return "primary";
};

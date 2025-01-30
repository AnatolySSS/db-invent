export const getSeverityOptions = (value) => {
  const options = { primary: ["Оборудование"], success: ["Мебель"], info: ["Основные средства"], warning: ["Прочее"] };
  for (const key in options) {
    if (options[key].includes(value)) {
      return key;
    }
  }
  return "primary";
};

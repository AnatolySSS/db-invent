import changeDateType from "../../../function-helpers/changeDateType";

//Изменение формата даты со строки на объект Date (необходимо для правильной фильтрации)
export const changeDateFormat = (data) => {
  data.lib = data.lib.map((v) => {
    Object.keys(v).forEach((element) => {
      if (element != "createdAt" && element != "updatedAt") {
        if (element.includes("date")) {
          if (v[element] !== null) {
            v[element] = new Date(v[element]);
            v[element] = new Date(v[element]).toLocaleString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              timeZone: "Europe/Moscow",
            });
            v[element] = changeDateType(v[element]);
            v[element] = Date.parse(v[element] + "T00:00:00");
            v[element] = new Date(v[element]);
          }
        }
      } else {
        if (v[element] != null) {
          v[element] = new Date(v[element]);
        }
      }
    });
    return v;
  });
  return data;
};

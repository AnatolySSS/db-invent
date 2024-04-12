export const formatDate = (date, dateType) => {
    date 
      ? dateType == "updatedAt"
        ? (date = new Date(date).toLocaleString("ru-RU", {
          second: "2-digit",
          minute: "2-digit",
          hour: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "Europe/Moscow",
        }))
        : (date = new Date(date).toLocaleString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "Europe/Moscow",
        }))
      : (date = null);
    return date;
  };
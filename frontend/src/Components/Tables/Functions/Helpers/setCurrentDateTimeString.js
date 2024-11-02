//Получение текущего даты и времени в формате sql (местное время)
//https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
export const setCurrentDateTimeString = () =>
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

export const createId = (data) => {
  //Получение массива id
  let id_array = data.map((obj) => obj.id);
  let missing = new Array();
  //цикл для получение массива пропущенных значений
  for (let i = 1; i <= Math.max(...id_array); i++) {
    if (id_array.indexOf(i) == -1) {
      missing.push(i);
    }
  }
  //добавление к массиву пропущенных значений следующего за последним значения
  missing.push(Math.max(...id_array) + 1);
  return missing[0];
};
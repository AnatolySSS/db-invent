export const createQRCode = (division, group, type, data, values) => {
  let divisionNumber = division - 1;
  let groupNumber;

  switch (group) {
    case "it":
      groupNumber = 0;
      break;
    case "furniture":
      groupNumber = 1;
      break;
    case "assets":
      groupNumber = 2;
      break;
    case "unmarked":
      groupNumber = 3;
      break;

    default:
      break;
  }

  let currentQRCodes = data.filter((item) => item.type === type).map((item) => item.qr_code); // Получение массива всех qr-кодов для текущего типа оборудования

  let typeNumber = String(values.type.indexOf(type)).padStart(2, "0"); // Формирование номера для типа оборудования
  let serialNumber = data.filter((item) => item.type === type).length; // получение номера для единицы оборудования (получаем длину массива оборудования данного типа)
  let serialNumberStr = String(serialNumber).padStart(5, "0"); // Приведение номера оборудования с типу 000ХХ
  let newQRCode = `${divisionNumber}${groupNumber}${typeNumber}${serialNumberStr}`; // Формирование полного значения qr_code
  let coincidence = currentQRCodes.includes(newQRCode); // Проверка на наличие сформированного qr_code среди имеющихся единиц оборудования

  //Если найдено савпадение qr_code с одним из уже имеющихся, итерация порядкового номера оборудования на 1 до тех пор, пока значение не будет уникальным
  while (coincidence) {
    serialNumber++;
    serialNumberStr = String(serialNumber).padStart(5, "0");
    newQRCode = `${divisionNumber}${groupNumber}${typeNumber}${serialNumberStr}`;
    coincidence = currentQRCodes.includes(newQRCode);
  }

  return newQRCode;
};

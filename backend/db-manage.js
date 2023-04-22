//Создание таблицы
export const createTable = (data) => {
  let query = ``
  let columnNames = ``;
  for (const key of Object.keys(data[0])) {
    if (key !== "id") {
        if (key == "is_capital_good") {
            columnNames = `${columnNames}${key} int, `;
        } else {
            columnNames = `${columnNames}${key} varchar(45), `;
        }
    }
  }
  columnNames = columnNames.slice(0, -2);
  query = `CREATE TABLE if not exists it_lib (id INT AUTO_INCREMENT PRIMARY KEY, ${columnNames});`;
  return query;
};

//Заполнение таблицу данными
export const insertData = (data) => {
  let query = ``;
  let columnNames = ``;
  let questionMarks = ``;
  for (let j = 0; j < Object.values(data).length; j++) {
    columnNames = `${columnNames}${Object.keys(data)[j]}, `;
    questionMarks = `${questionMarks}?, `;
  }
  //Обрезание последних запятой и пробела в тексте запроса (поля)
  columnNames = columnNames.slice(0, -2);
  //Обрезание последних запятой и пробела в тексте запроса (знаки вопросов)
  questionMarks = questionMarks.slice(0, -2);
  //Формирование текста sql-запроса
  query = `INSERT INTO it_lib (${columnNames}) VALUES(${questionMarks})`;
  return query
};

//Изменение данных в таблице
export const updateData = (rowData, rowId) => {
  let query = ``;
  let columnNames = ``;
  for (let j = 0; j < Object.values(rowData).length; j++) {
    if (Object.keys(rowData)[j] !== "id") {
        if (Object.keys(rowData)[j] == "is_capital_good") {
            columnNames = `${columnNames}${Object.keys(rowData)[j]} = ${Object.values(rowData)[j]}, `
        } else {
            columnNames = `${columnNames}${Object.keys(rowData)[j]} = '${Object.values(rowData)[j]}', `
        }
    }
  }
  //Обрезание последних запятой и пробела в тексте запроса (поля)
  columnNames = columnNames.slice(0, -2);
  //Формирование текста sql-запроса
  query = `UPDATE it_lib SET ${columnNames} WHERE id = ${rowId};`;
  return query;
};
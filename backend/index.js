const express = require("express");
const mysql = require("mysql");
const { networkInterfaces } = require('os');
const app = express();
const jsonParser = express.json();

let dataIt = {
  values: [
    {
      id: "1000",
      inventary_number: "f230fh0g3",
      internal_number: "Bamboo Watch",
      is_capital_good: "Product Description",
      type: "bamboo-watch.jpg",
      release_date: 65,
      name: "Accessories",
      quantity: 24,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "1001",
      inventary_number: "nvklal433",
      internal_number: "Black Watch",
      is_capital_good: "Product Description",
      type: "black-watch.jpg",
      release_date: 72,
      name: "Accessories",
      quantity: 61,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "1002",
      inventary_number: "zz21cz3c1",
      internal_number: "Blue Band",
      is_capital_good: "Product Description",
      type: "blue-band.jpg",
      release_date: 79,
      name: "Fitness",
      quantity: 2,
      serviceable: "НЕ ОЧЕНЬ",
      is_capital_good: false,
    },
    {
      id: "1003",
      inventary_number: "244wgerg2",
      internal_number: "Blue T-Shirt",
      is_capital_good: "Product Description",
      type: "blue-t-shirt.jpg",
      release_date: 29,
      name: "Clothing",
      quantity: 25,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "1004",
      inventary_number: "h456wer53",
      internal_number: "Bracelet",
      is_capital_good: "Product Description",
      type: "bracelet.jpg",
      release_date: 15,
      name: "Accessories",
      quantity: 73,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "1005",
      inventary_number: "av2231fwg",
      internal_number: "Brown Purse",
      is_capital_good: "Product Description",
      type: "brown-purse.jpg",
      release_date: 120,
      name: "Accessories",
      quantity: 0,
      serviceable: "СОВСЕМ ПЛОХ",
      is_capital_good: false,
    },
    {
      id: "1006",
      inventary_number: "bib36pfvm",
      internal_number: "Chakra Bracelet",
      is_capital_good: "Product Description",
      type: "chakra-bracelet.jpg",
      release_date: 32,
      name: "Accessories",
      quantity: 5,
      serviceable: "НЕ ОЧЕНЬ",
      is_capital_good: true,
    },
    {
      id: "1007",
      inventary_number: "mbvjkgip5",
      internal_number: "Galaxy Earrings",
      is_capital_good: "Product Description",
      type: "galaxy-earrings.jpg",
      release_date: 34,
      name: "Accessories",
      quantity: 23,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "1008",
      inventary_number: "vbb124btr",
      internal_number: "Game Controller",
      is_capital_good: "Product Description",
      type: "game-controller.jpg",
      release_date: 99,
      name: "Electronics",
      quantity: 2,
      serviceable: "НЕ ОЧЕНЬ",
      is_capital_good: false,
    },
    {
      id: "1009",
      inventary_number: "cm230f032",
      internal_number: "Gaming Set",
      is_capital_good: "Product Description",
      type: "gaming-set.jpg",
      release_date: 299,
      name: "Electronics",
      quantity: 63,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "1010",
      inventary_number: "plb34234v",
      internal_number: "Gold Phone Case",
      is_capital_good: "Product Description",
      type: "gold-phone-case.jpg",
      release_date: 24,
      name: "Accessories",
      quantity: 0,
      serviceable: "СОВСЕМ ПЛОХ",
      is_capital_good: false,
    },
    {
      id: "1011",
      inventary_number: "4920nnc2d",
      internal_number: "Green Earbuds",
      is_capital_good: "Product Description",
      type: "green-earbuds.jpg",
      release_date: 89,
      name: "Electronics",
      quantity: 23,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "1012",
      inventary_number: "250vm23cc",
      internal_number: "Green T-Shirt",
      is_capital_good: "Product Description",
      type: "green-t-shirt.jpg",
      release_date: 49,
      name: "Clothing",
      quantity: 74,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "1013",
      inventary_number: "fldsmn31b",
      internal_number: "Grey T-Shirt",
      is_capital_good: "Product Description",
      type: "grey-t-shirt.jpg",
      release_date: 48,
      name: "Clothing",
      quantity: 0,
      serviceable: "СОВСЕМ ПЛОХ",
      is_capital_good: true,
    },
    {
      id: "1014",
      inventary_number: "waas1x2as",
      internal_number: "Headphones",
      is_capital_good: "Product Description",
      type: "headphones.jpg",
      release_date: 175,
      name: "Electronics",
      quantity: 8,
      serviceable: "НЕ ОЧЕНЬ",
      is_capital_good: true,
    },
    {
      id: "1015",
      inventary_number: "vb34btbg5",
      internal_number: "Light Green T-Shirt",
      is_capital_good: "Product Description",
      type: "light-green-t-shirt.jpg",
      release_date: 49,
      name: "Clothing",
      quantity: 34,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "1016",
      inventary_number: "k8l6j58jl",
      internal_number: "Lime Band",
      is_capital_good: "Product Description",
      type: "lime-band.jpg",
      release_date: 79,
      name: "Fitness",
      quantity: 12,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "1017",
      inventary_number: "v435nn85n",
      internal_number: "Mini Speakers",
      is_capital_good: "Product Description",
      type: "mini-speakers.jpg",
      release_date: 85,
      name: "Clothing",
      quantity: 42,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "1018",
      inventary_number: "09zx9c0zc",
      internal_number: "Painted Phone Case",
      is_capital_good: "Product Description",
      type: "painted-phone-case.jpg",
      release_date: 56,
      name: "Accessories",
      quantity: 41,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "1019",
      inventary_number: "mnb5mb2m5",
      internal_number: "Pink Band",
      is_capital_good: "Product Description",
      type: "pink-band.jpg",
      release_date: 79,
      name: "Fitness",
      quantity: 63,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "1020",
      inventary_number: "r23fwf2w3",
      internal_number: "Pink Purse",
      is_capital_good: "Product Description",
      type: "pink-purse.jpg",
      release_date: 110,
      name: "Accessories",
      quantity: 0,
      serviceable: "СОВСЕМ ПЛОХ",
      is_capital_good: false,
    },
    {
      id: "1021",
      inventary_number: "pxpzczo23",
      internal_number: "Purple Band",
      is_capital_good: "Product Description",
      type: "purple-band.jpg",
      release_date: 79,
      name: "Fitness",
      quantity: 6,
      serviceable: "НЕ ОЧЕНЬ",
      is_capital_good: true,
    },
    {
      id: "1022",
      inventary_number: "2c42cb5cb",
      internal_number: "Purple Gemstone Necklace",
      is_capital_good: "Product Description",
      type: "purple-gemstone-necklace.jpg",
      release_date: 45,
      name: "Accessories",
      quantity: 62,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "1023",
      inventary_number: "5k43kkk23",
      internal_number: "Purple T-Shirt",
      is_capital_good: "Product Description",
      type: "purple-t-shirt.jpg",
      release_date: 49,
      name: "Clothing",
      quantity: 2,
      serviceable: "НЕ ОЧЕНЬ",
      is_capital_good: false,
    },
    {
      id: "1024",
      inventary_number: "lm2tny2k4",
      internal_number: "Shoes",
      is_capital_good: "Product Description",
      type: "shoes.jpg",
      release_date: 64,
      name: "Clothing",
      quantity: 0,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "1025",
      inventary_number: "nbm5mv45n",
      internal_number: "Sneakers",
      is_capital_good: "Product Description",
      type: "sneakers.jpg",
      release_date: 78,
      name: "Clothing",
      quantity: 52,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "1026",
      inventary_number: "zx23zc42c",
      internal_number: "Teal T-Shirt",
      is_capital_good: "Product Description",
      type: "teal-t-shirt.jpg",
      release_date: 49,
      name: "Clothing",
      quantity: 3,
      serviceable: "НЕ ОЧЕНЬ",
      is_capital_good: true,
    },
    {
      id: "1027",
      inventary_number: "acvx872gc",
      internal_number: "Yellow Earbuds",
      is_capital_good: "Product Description",
      type: "yellow-earbuds.jpg",
      release_date: 89,
      name: "Electronics",
      quantity: 35,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "1028",
      inventary_number: "tx125ck42",
      internal_number: "Yoga Mat",
      is_capital_good: "Product Description",
      type: "yoga-mat.jpg",
      release_date: 20,
      name: "Fitness",
      quantity: 15,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "1029",
      inventary_number: "gwuby345v",
      internal_number: "Yoga Set",
      is_capital_good: "Product Description",
      type: "yoga-set.jpg",
      release_date: 20,
      name: "Fitness",
      quantity: 25,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
  ],
  columns: [
    { field: "id", header: "ID", width: "12rem", showFilterMenu: true },
    {
      field: "inventary_number",
      header: "Инвентарный номер",
      width: "18rem",
      showFilterMenu: true,
    },
    {
      field: "internal_number",
      header: "Внутренний номер",
      width: "18rem",
      showFilterMenu: true,
    },
    { field: "type", header: "Тип", width: "12rem", showFilterMenu: true },
    {
      field: "name",
      header: "Наименование",
      width: "18rem",
      showFilterMenu: true,
    },
    {
      field: "release_date ",
      header: "Дата выпуска",
      width: "12rem",
      showFilterMenu: true,
    },
    {
      field: "date_of_purchase ",
      header: "Дата приобретения",
      width: "12rem",
      showFilterMenu: true,
    },
    {
      field: "last_check_date ",
      header: "Дата последней проверки",
      width: "12rem",
      showFilterMenu: true,
    },
    {
      field: "serviceable",
      header: "Состояние исправности",
      width: "12rem",
      showFilterMenu: false,
    },
    {
      field: "is_capital_good",
      header: "Основное средство",
      width: "4rem",
      showFilterMenu: false,
    },
  ],
  name: "IT оборудование",
};

let dataFurniture = {
  values: [
    {
      id: "2000",
      inventary_number: "f230fh0g3",
      internal_number: "Bamboo Watch",
      is_capital_good: "Product Description",
      type: "bamboo-watch.jpg",
      release_date: 65,
      name: "Accessories",
      quantity: 24,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "2001",
      inventary_number: "nvklal433",
      internal_number: "Black Watch",
      is_capital_good: "Product Description",
      type: "black-watch.jpg",
      release_date: 72,
      name: "Accessories",
      quantity: 61,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "2002",
      inventary_number: "zz21cz3c1",
      internal_number: "Blue Band",
      is_capital_good: "Product Description",
      type: "blue-band.jpg",
      release_date: 79,
      name: "Fitness",
      quantity: 2,
      serviceable: "НЕ ОЧЕНЬ",
      is_capital_good: false,
    },
    {
      id: "2003",
      inventary_number: "244wgerg2",
      internal_number: "Blue T-Shirt",
      is_capital_good: "Product Description",
      type: "blue-t-shirt.jpg",
      release_date: 29,
      name: "Clothing",
      quantity: 25,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "2004",
      inventary_number: "h456wer53",
      internal_number: "Bracelet",
      is_capital_good: "Product Description",
      type: "bracelet.jpg",
      release_date: 15,
      name: "Accessories",
      quantity: 73,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "2005",
      inventary_number: "av2231fwg",
      internal_number: "Brown Purse",
      is_capital_good: "Product Description",
      type: "brown-purse.jpg",
      release_date: 120,
      name: "Accessories",
      quantity: 0,
      serviceable: "СОВСЕМ ПЛОХ",
      is_capital_good: false,
    },
    {
      id: "2006",
      inventary_number: "bib36pfvm",
      internal_number: "Chakra Bracelet",
      is_capital_good: "Product Description",
      type: "chakra-bracelet.jpg",
      release_date: 32,
      name: "Accessories",
      quantity: 5,
      serviceable: "НЕ ОЧЕНЬ",
      is_capital_good: true,
    },
    {
      id: "2007",
      inventary_number: "mbvjkgip5",
      internal_number: "Galaxy Earrings",
      is_capital_good: "Product Description",
      type: "galaxy-earrings.jpg",
      release_date: 34,
      name: "Accessories",
      quantity: 23,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "2008",
      inventary_number: "vbb124btr",
      internal_number: "Game Controller",
      is_capital_good: "Product Description",
      type: "game-controller.jpg",
      release_date: 99,
      name: "Electronics",
      quantity: 2,
      serviceable: "НЕ ОЧЕНЬ",
      is_capital_good: false,
    },
    {
      id: "2009",
      inventary_number: "cm230f032",
      internal_number: "Gaming Set",
      is_capital_good: "Product Description",
      type: "gaming-set.jpg",
      release_date: 299,
      name: "Electronics",
      quantity: 63,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
    {
      id: "2010",
      inventary_number: "plb34234v",
      internal_number: "Gold Phone Case",
      is_capital_good: "Product Description",
      type: "gold-phone-case.jpg",
      release_date: 24,
      name: "Accessories",
      quantity: 0,
      serviceable: "СОВСЕМ ПЛОХ",
      is_capital_good: false,
    },
    {
      id: "2011",
      inventary_number: "4920nnc2d",
      internal_number: "Green Earbuds",
      is_capital_good: "Product Description",
      type: "green-earbuds.jpg",
      release_date: 89,
      name: "Electronics",
      quantity: 23,
      serviceable: "ИСПРАВЕН",
      is_capital_good: false,
    },
    {
      id: "2012",
      inventary_number: "250vm23cc",
      internal_number: "Green T-Shirt",
      is_capital_good: "Product Description",
      type: "green-t-shirt.jpg",
      release_date: 49,
      name: "Clothing",
      quantity: 74,
      serviceable: "ИСПРАВЕН",
      is_capital_good: true,
    },
  ],
  columns: [
    { field: "id", header: "ID", width: "12rem", showFilterMenu: true },
    {
      field: "inventary_number",
      header: "Инвентарный номер",
      width: "18rem",
      showFilterMenu: true,
    },
    {
      field: "internal_number",
      header: "Внутренний номер",
      width: "18rem",
      showFilterMenu: true,
    },
    { field: "type", header: "Тип", width: "12rem", showFilterMenu: true },
    {
      field: "name",
      header: "Наименование",
      width: "18rem",
      showFilterMenu: true,
    },
    {
      field: "release_date ",
      header: "Дата выпуска",
      width: "12rem",
      showFilterMenu: true,
    },
    {
      field: "date_of_purchase ",
      header: "Дата приобретения",
      width: "12rem",
      showFilterMenu: true,
    },
    {
      field: "last_check_date ",
      header: "Дата последней проверки",
      width: "12rem",
      showFilterMenu: true,
    },
    {
      field: "serviceable",
      header: "Состояние исправности",
      width: "12rem",
      showFilterMenu: false,
    },
    {
      field: "is_capital_good",
      header: "Основное средство",
      width: "4rem",
      showFilterMenu: false,
    },
  ],
  name: "Мебель",
};

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

let currentIP = results["en0"] || results["eth0"]
currentIP = currentIP.toString()

let connection
//В зависимости от IP адреса необходимо подключаться к различным портам и с разными настройками базы данных
switch (currentIP) {
  case "192.168.0.19":
    console.log("Это localhost");
    PORT = 3001;
    //Подключение к базе данных timeweb 
    connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "test_db",
    })
    break;

  case "10.205.24.14": // поправить
    console.log("Это sodfu");
    PORT = 3001;
    //Подключение к базе данных timeweb 
    connection = mysql.createConnection({
        host : process.env.DB_SODFU_HOST,
        port : process.env.DB_SODFU_PORT,
        user : process.env.DB_SODFU_USER,
        database : process.env.DB_SODFU_NAME,
        password : process.env.DB_SODFU_PASSWORD,
    })
    break;

  default:
    PORT = 3001;
    //Подключение к базе данных timeweb 
    connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "test_db",
    });
    break;
}

connection.connect(function(error) {
  if (error) {
      return console.error("Ошибка " + error.message)
  } else {
      console.log("Подключение прошло успешно");
  }
})

app.get("/data", (request, responce) => {
  //bd request
  let it_lib_data = {}

  connection.query("SELECT * FROM it_lib", (err, rows, fields) => {
    if (err) throw err;

    it_lib_data.values = Object.values(JSON.parse(JSON.stringify(rows)))
    it_lib_data.columns = dataIt.columns
    console.log(it_lib_data);
    responce.json(it_lib_data);
    // console.log("Fields: ", fields);
  });

  // connection.query(`SELECT * FROM it_params`, (err, result) => {
  //   if (err) throw err;

  //   console.log("Result: ", result);
  // });

});

app.post("/updateData", jsonParser, (request, responce) => {
  //bd update
  dataIt.values = dataIt.values.map((row) => {
    if (row.id === request.body.rowId) {
      return { ...request.body.rowData };
    } else {
      return row;
    }
  });

  responce.json(dataIt);
});

app.get("/furniture", (request, responce) => {
  //bd request
  responce.json(dataFurniture);
});

app.post("/updateFurniture", jsonParser, (request, responce) => {
  //bd update
  console.log(request.body);
  dataFurniture.values = dataFurniture.values.map((row) => {
    if (row.id === request.body.rowId) {
      return { ...request.body.rowData };
    } else {
      return row;
    }
  });
  responce.json(dataFurniture);
});

app.post("/uploadItData", jsonParser, (request, responce) => {
  let data = request.body.data;
  console.log(Object.keys(data[0]));
  //bd update

  //Удаление таблицы it_lib
  const queryDeleteTableMotivations = `DROP TABLE if exists it_lib`;
  connection.query(queryDeleteTableMotivations, function (error, result) {
    if (error) throw error;
    console.log("Table deleted");
  });

  //Создание таблицы it_lib
  let queryCreateTableStr = ``;
  console.log(data);
  for (const key of Object.keys(data[0])) {
    console.log(key);
    if (key !== 'id') {
      queryCreateTableStr = `${queryCreateTableStr}${key} TEXT, `;
      console.log(key);
    }
  }
  queryCreateTableStr = queryCreateTableStr.slice(0, -2);

  const queryCreateTable = `CREATE TABLE if not exists it_lib (id INT AUTO_INCREMENT PRIMARY KEY, ${queryCreateTableStr});`;
  connection.query(queryCreateTable, function (error, result) {
    if (error) throw error;
    console.log("Table created");
  });

  //Изменяем кодировку it_lib
  let queryChangeCoding = "";
  for (const key of Object.keys(data[0])) {
    queryChangeCoding = `ALTER TABLE it_lib CHANGE ${key} ${key} TEXT CHARACTER set utf8mb4 COLLATE utf8mb4_unicode_ci;`;
    connection.query(queryChangeCoding, function (error, result) {
      if (error) throw error;
      console.log(`Column ${key} coding change`);
    });
  }

  //Заполнение таблицы it_lib данными из файла excel
  let queryInsertIntoMotivation = ``
  let queryInsertIntoMotivationStr
  let queryInsertIntoMotivationStrQuestionMark
  for (let i = 0; i < data.length; i++) {
      queryInsertIntoMotivationStr = ``
      queryInsertIntoMotivationStrQuestionMark = ``
      for (let j = 0; j < Object.values(data[i]).length; j++) {
          queryInsertIntoMotivationStr = `${queryInsertIntoMotivationStr}${Object.keys(data[i])[j]}, `
          queryInsertIntoMotivationStrQuestionMark = `${queryInsertIntoMotivationStrQuestionMark}?, `
      }
      //Обрезание последних запятой и пробела в тексте запроса (поля)
      queryInsertIntoMotivationStr = queryInsertIntoMotivationStr.slice(0, -2)
      //Обрезание последних запятой и пробела в тексте запроса (знаки вопросов)
      queryInsertIntoMotivationStrQuestionMark = queryInsertIntoMotivationStrQuestionMark.slice(0, -2)
      //Формирование текста sql-запроса
      queryInsertIntoMotivation = `INSERT INTO it_lib (${queryInsertIntoMotivationStr}) VALUES(${queryInsertIntoMotivationStrQuestionMark})`;
      //Занесение данных  в таблицу
      connection.query(queryInsertIntoMotivation, Object.values(data[i]), (error, result) => {
          if (error) throw error
          console.log(i);
      })
      
  }

  responce.json(dataIt);
});

app.listen(PORT, () => {
  console.log(`Server is starting on PORT ${PORT}`);
});

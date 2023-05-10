import express, { json } from "express";
import setConnection from "./db-connection.js";
import path from 'path';
import {fileURLToPath} from 'url';
const app = express();
const jsonParser = json();
import { createTable, insertData, updateData } from "./db-manage.js";
import changeDateType from "./changeDateType.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let dirname = __dirname.replace("backend", "sodfu-inventory")

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(express.static(path.join(dirname, 'build')));

// let dataIt = {
//   values: [
//     {
//       id: "1000",
//       inventary_number: "f230fh0g3",
//       internal_number: "Bamboo Watch",
//       is_capital_good: "Product Description",
//       type: "bamboo-watch.jpg",
//       release_date: 65,
//       name: "Accessories",
//       quantity: 24,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "1001",
//       inventary_number: "nvklal433",
//       internal_number: "Black Watch",
//       is_capital_good: "Product Description",
//       type: "black-watch.jpg",
//       release_date: 72,
//       name: "Accessories",
//       quantity: 61,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "1002",
//       inventary_number: "zz21cz3c1",
//       internal_number: "Blue Band",
//       is_capital_good: "Product Description",
//       type: "blue-band.jpg",
//       release_date: 79,
//       name: "Fitness",
//       quantity: 2,
//       serviceable: "НЕ ОЧЕНЬ",
//       is_capital_good: false,
//     },
//     {
//       id: "1003",
//       inventary_number: "244wgerg2",
//       internal_number: "Blue T-Shirt",
//       is_capital_good: "Product Description",
//       type: "blue-t-shirt.jpg",
//       release_date: 29,
//       name: "Clothing",
//       quantity: 25,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "1004",
//       inventary_number: "h456wer53",
//       internal_number: "Bracelet",
//       is_capital_good: "Product Description",
//       type: "bracelet.jpg",
//       release_date: 15,
//       name: "Accessories",
//       quantity: 73,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "1005",
//       inventary_number: "av2231fwg",
//       internal_number: "Brown Purse",
//       is_capital_good: "Product Description",
//       type: "brown-purse.jpg",
//       release_date: 120,
//       name: "Accessories",
//       quantity: 0,
//       serviceable: "СОВСЕМ ПЛОХ",
//       is_capital_good: false,
//     },
//     {
//       id: "1006",
//       inventary_number: "bib36pfvm",
//       internal_number: "Chakra Bracelet",
//       is_capital_good: "Product Description",
//       type: "chakra-bracelet.jpg",
//       release_date: 32,
//       name: "Accessories",
//       quantity: 5,
//       serviceable: "НЕ ОЧЕНЬ",
//       is_capital_good: true,
//     },
//     {
//       id: "1007",
//       inventary_number: "mbvjkgip5",
//       internal_number: "Galaxy Earrings",
//       is_capital_good: "Product Description",
//       type: "galaxy-earrings.jpg",
//       release_date: 34,
//       name: "Accessories",
//       quantity: 23,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "1008",
//       inventary_number: "vbb124btr",
//       internal_number: "Game Controller",
//       is_capital_good: "Product Description",
//       type: "game-controller.jpg",
//       release_date: 99,
//       name: "Electronics",
//       quantity: 2,
//       serviceable: "НЕ ОЧЕНЬ",
//       is_capital_good: false,
//     },
//     {
//       id: "1009",
//       inventary_number: "cm230f032",
//       internal_number: "Gaming Set",
//       is_capital_good: "Product Description",
//       type: "gaming-set.jpg",
//       release_date: 299,
//       name: "Electronics",
//       quantity: 63,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "1010",
//       inventary_number: "plb34234v",
//       internal_number: "Gold Phone Case",
//       is_capital_good: "Product Description",
//       type: "gold-phone-case.jpg",
//       release_date: 24,
//       name: "Accessories",
//       quantity: 0,
//       serviceable: "СОВСЕМ ПЛОХ",
//       is_capital_good: false,
//     },
//     {
//       id: "1011",
//       inventary_number: "4920nnc2d",
//       internal_number: "Green Earbuds",
//       is_capital_good: "Product Description",
//       type: "green-earbuds.jpg",
//       release_date: 89,
//       name: "Electronics",
//       quantity: 23,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "1012",
//       inventary_number: "250vm23cc",
//       internal_number: "Green T-Shirt",
//       is_capital_good: "Product Description",
//       type: "green-t-shirt.jpg",
//       release_date: 49,
//       name: "Clothing",
//       quantity: 74,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "1013",
//       inventary_number: "fldsmn31b",
//       internal_number: "Grey T-Shirt",
//       is_capital_good: "Product Description",
//       type: "grey-t-shirt.jpg",
//       release_date: 48,
//       name: "Clothing",
//       quantity: 0,
//       serviceable: "СОВСЕМ ПЛОХ",
//       is_capital_good: true,
//     },
//     {
//       id: "1014",
//       inventary_number: "waas1x2as",
//       internal_number: "Headphones",
//       is_capital_good: "Product Description",
//       type: "headphones.jpg",
//       release_date: 175,
//       name: "Electronics",
//       quantity: 8,
//       serviceable: "НЕ ОЧЕНЬ",
//       is_capital_good: true,
//     },
//     {
//       id: "1015",
//       inventary_number: "vb34btbg5",
//       internal_number: "Light Green T-Shirt",
//       is_capital_good: "Product Description",
//       type: "light-green-t-shirt.jpg",
//       release_date: 49,
//       name: "Clothing",
//       quantity: 34,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "1016",
//       inventary_number: "k8l6j58jl",
//       internal_number: "Lime Band",
//       is_capital_good: "Product Description",
//       type: "lime-band.jpg",
//       release_date: 79,
//       name: "Fitness",
//       quantity: 12,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "1017",
//       inventary_number: "v435nn85n",
//       internal_number: "Mini Speakers",
//       is_capital_good: "Product Description",
//       type: "mini-speakers.jpg",
//       release_date: 85,
//       name: "Clothing",
//       quantity: 42,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "1018",
//       inventary_number: "09zx9c0zc",
//       internal_number: "Painted Phone Case",
//       is_capital_good: "Product Description",
//       type: "painted-phone-case.jpg",
//       release_date: 56,
//       name: "Accessories",
//       quantity: 41,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "1019",
//       inventary_number: "mnb5mb2m5",
//       internal_number: "Pink Band",
//       is_capital_good: "Product Description",
//       type: "pink-band.jpg",
//       release_date: 79,
//       name: "Fitness",
//       quantity: 63,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "1020",
//       inventary_number: "r23fwf2w3",
//       internal_number: "Pink Purse",
//       is_capital_good: "Product Description",
//       type: "pink-purse.jpg",
//       release_date: 110,
//       name: "Accessories",
//       quantity: 0,
//       serviceable: "СОВСЕМ ПЛОХ",
//       is_capital_good: false,
//     },
//     {
//       id: "1021",
//       inventary_number: "pxpzczo23",
//       internal_number: "Purple Band",
//       is_capital_good: "Product Description",
//       type: "purple-band.jpg",
//       release_date: 79,
//       name: "Fitness",
//       quantity: 6,
//       serviceable: "НЕ ОЧЕНЬ",
//       is_capital_good: true,
//     },
//     {
//       id: "1022",
//       inventary_number: "2c42cb5cb",
//       internal_number: "Purple Gemstone Necklace",
//       is_capital_good: "Product Description",
//       type: "purple-gemstone-necklace.jpg",
//       release_date: 45,
//       name: "Accessories",
//       quantity: 62,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "1023",
//       inventary_number: "5k43kkk23",
//       internal_number: "Purple T-Shirt",
//       is_capital_good: "Product Description",
//       type: "purple-t-shirt.jpg",
//       release_date: 49,
//       name: "Clothing",
//       quantity: 2,
//       serviceable: "НЕ ОЧЕНЬ",
//       is_capital_good: false,
//     },
//     {
//       id: "1024",
//       inventary_number: "lm2tny2k4",
//       internal_number: "Shoes",
//       is_capital_good: "Product Description",
//       type: "shoes.jpg",
//       release_date: 64,
//       name: "Clothing",
//       quantity: 0,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "1025",
//       inventary_number: "nbm5mv45n",
//       internal_number: "Sneakers",
//       is_capital_good: "Product Description",
//       type: "sneakers.jpg",
//       release_date: 78,
//       name: "Clothing",
//       quantity: 52,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "1026",
//       inventary_number: "zx23zc42c",
//       internal_number: "Teal T-Shirt",
//       is_capital_good: "Product Description",
//       type: "teal-t-shirt.jpg",
//       release_date: 49,
//       name: "Clothing",
//       quantity: 3,
//       serviceable: "НЕ ОЧЕНЬ",
//       is_capital_good: true,
//     },
//     {
//       id: "1027",
//       inventary_number: "acvx872gc",
//       internal_number: "Yellow Earbuds",
//       is_capital_good: "Product Description",
//       type: "yellow-earbuds.jpg",
//       release_date: 89,
//       name: "Electronics",
//       quantity: 35,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "1028",
//       inventary_number: "tx125ck42",
//       internal_number: "Yoga Mat",
//       is_capital_good: "Product Description",
//       type: "yoga-mat.jpg",
//       release_date: 20,
//       name: "Fitness",
//       quantity: 15,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "1029",
//       inventary_number: "gwuby345v",
//       internal_number: "Yoga Set",
//       is_capital_good: "Product Description",
//       type: "yoga-set.jpg",
//       release_date: 20,
//       name: "Fitness",
//       quantity: 25,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//   ],
//   columns: [
//     { field: "id", header: "ID", width: "12rem", showFilterMenu: true },
//     {
//       field: "inventary_number",
//       header: "Инвентарный номер",
//       width: "18rem",
//       showFilterMenu: true,
//     },
//     {
//       field: "internal_number",
//       header: "Внутренний номер",
//       width: "18rem",
//       showFilterMenu: true,
//     },
//     { field: "type", header: "Тип", width: "12rem", showFilterMenu: true },
//     {
//       field: "name",
//       header: "Наименование",
//       width: "18rem",
//       showFilterMenu: true,
//     },
//     {
//       field: "release_date ",
//       header: "Дата выпуска",
//       width: "12rem",
//       showFilterMenu: true,
//     },
//     {
//       field: "date_of_purchase ",
//       header: "Дата приобретения",
//       width: "12rem",
//       showFilterMenu: true,
//     },
//     {
//       field: "last_check_date",
//       header: "Дата последней проверки",
//       width: "12rem",
//       showFilterMenu: true,
//     },
//     {
//       field: "serviceable",
//       header: "Состояние исправности",
//       width: "12rem",
//       showFilterMenu: false,
//     },
//     {
//       field: "is_capital_good",
//       header: "Основное средство",
//       width: "4rem",
//       showFilterMenu: false,
//     },
//   ],
//   name: "IT оборудование",
// };

// let dataFurniture = {
//   values: [
//     {
//       id: "2000",
//       inventary_number: "f230fh0g3",
//       internal_number: "Bamboo Watch",
//       is_capital_good: "Product Description",
//       type: "bamboo-watch.jpg",
//       release_date: 65,
//       name: "Accessories",
//       quantity: 24,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "2001",
//       inventary_number: "nvklal433",
//       internal_number: "Black Watch",
//       is_capital_good: "Product Description",
//       type: "black-watch.jpg",
//       release_date: 72,
//       name: "Accessories",
//       quantity: 61,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "2002",
//       inventary_number: "zz21cz3c1",
//       internal_number: "Blue Band",
//       is_capital_good: "Product Description",
//       type: "blue-band.jpg",
//       release_date: 79,
//       name: "Fitness",
//       quantity: 2,
//       serviceable: "НЕ ОЧЕНЬ",
//       is_capital_good: false,
//     },
//     {
//       id: "2003",
//       inventary_number: "244wgerg2",
//       internal_number: "Blue T-Shirt",
//       is_capital_good: "Product Description",
//       type: "blue-t-shirt.jpg",
//       release_date: 29,
//       name: "Clothing",
//       quantity: 25,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "2004",
//       inventary_number: "h456wer53",
//       internal_number: "Bracelet",
//       is_capital_good: "Product Description",
//       type: "bracelet.jpg",
//       release_date: 15,
//       name: "Accessories",
//       quantity: 73,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "2005",
//       inventary_number: "av2231fwg",
//       internal_number: "Brown Purse",
//       is_capital_good: "Product Description",
//       type: "brown-purse.jpg",
//       release_date: 120,
//       name: "Accessories",
//       quantity: 0,
//       serviceable: "СОВСЕМ ПЛОХ",
//       is_capital_good: false,
//     },
//     {
//       id: "2006",
//       inventary_number: "bib36pfvm",
//       internal_number: "Chakra Bracelet",
//       is_capital_good: "Product Description",
//       type: "chakra-bracelet.jpg",
//       release_date: 32,
//       name: "Accessories",
//       quantity: 5,
//       serviceable: "НЕ ОЧЕНЬ",
//       is_capital_good: true,
//     },
//     {
//       id: "2007",
//       inventary_number: "mbvjkgip5",
//       internal_number: "Galaxy Earrings",
//       is_capital_good: "Product Description",
//       type: "galaxy-earrings.jpg",
//       release_date: 34,
//       name: "Accessories",
//       quantity: 23,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "2008",
//       inventary_number: "vbb124btr",
//       internal_number: "Game Controller",
//       is_capital_good: "Product Description",
//       type: "game-controller.jpg",
//       release_date: 99,
//       name: "Electronics",
//       quantity: 2,
//       serviceable: "НЕ ОЧЕНЬ",
//       is_capital_good: false,
//     },
//     {
//       id: "2009",
//       inventary_number: "cm230f032",
//       internal_number: "Gaming Set",
//       is_capital_good: "Product Description",
//       type: "gaming-set.jpg",
//       release_date: 299,
//       name: "Electronics",
//       quantity: 63,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//     {
//       id: "2010",
//       inventary_number: "plb34234v",
//       internal_number: "Gold Phone Case",
//       is_capital_good: "Product Description",
//       type: "gold-phone-case.jpg",
//       release_date: 24,
//       name: "Accessories",
//       quantity: 0,
//       serviceable: "СОВСЕМ ПЛОХ",
//       is_capital_good: false,
//     },
//     {
//       id: "2011",
//       inventary_number: "4920nnc2d",
//       internal_number: "Green Earbuds",
//       is_capital_good: "Product Description",
//       type: "green-earbuds.jpg",
//       release_date: 89,
//       name: "Electronics",
//       quantity: 23,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: false,
//     },
//     {
//       id: "2012",
//       inventary_number: "250vm23cc",
//       internal_number: "Green T-Shirt",
//       is_capital_good: "Product Description",
//       type: "green-t-shirt.jpg",
//       release_date: 49,
//       name: "Clothing",
//       quantity: 74,
//       serviceable: "ИСПРАВЕН",
//       is_capital_good: true,
//     },
//   ],
//   columns: [
//     { field: "id", header: "ID", width: "12rem", showFilterMenu: true },
//     {
//       field: "inventary_number",
//       header: "Инвентарный номер",
//       width: "18rem",
//       showFilterMenu: true,
//     },
//     {
//       field: "internal_number",
//       header: "Внутренний номер",
//       width: "18rem",
//       showFilterMenu: true,
//     },
//     { field: "type", header: "Тип", width: "12rem", showFilterMenu: true },
//     {
//       field: "name",
//       header: "Наименование",
//       width: "18rem",
//       showFilterMenu: true,
//     },
//     {
//       field: "release_date ",
//       header: "Дата выпуска",
//       width: "12rem",
//       showFilterMenu: true,
//     },
//     {
//       field: "date_of_purchase ",
//       header: "Дата приобретения",
//       width: "12rem",
//       showFilterMenu: true,
//     },
//     {
//       field: "last_check_date ",
//       header: "Дата последней проверки",
//       width: "12rem",
//       showFilterMenu: true,
//     },
//     {
//       field: "serviceable",
//       header: "Состояние исправности",
//       width: "12rem",
//       showFilterMenu: false,
//     },
//     {
//       field: "is_capital_good",
//       header: "Основное средство",
//       width: "4rem",
//       showFilterMenu: false,
//     },
//   ],
//   name: "Мебель",
// };

//подключение в базе данных
const {PORT, connection} = setConnection()

app.post("/getData", jsonParser, (request, responce) => {
  
  let { type } = request.body;
  let tableLibName, tableMetaName, tableValuesName
  let data = {};

  switch (type) {
    case "it":
      tableLibName = "it_lib";
      tableMetaName = "it_meta";
      tableValuesName = "it_values";
      data.name = "IT оборудование"
      break;
    case "furniture":
      tableLibName = "furniture_lib";
      tableMetaName = "furniture_meta";
      tableValuesName = "furniture_values";
      data.name = "Мебель"
      break;
    default:
      break;
  }

  connection.query(`SELECT * FROM ${tableLibName}`, (err, rows, fields) => {
    if (err) throw err;

    data.lib = Object.values(JSON.parse(JSON.stringify(rows)));
    //Преобразование TINYINT в BOOLEAN
    data.lib = data.lib.map((v) => {
      switch (v.is_workplace) {
        case 1:
          v.is_workplace = true;
          break;
        case 0:
          v.is_workplace = false;
          break;
        case null:
          v.is_workplace = "null";
          break;
        default:
          break;
      }
      switch (v.was_deleted) {
        case 1:
          v.was_deleted = true;
          break;
        case 0:
          v.was_deleted = false;
          break;
        case null:
          v.was_deleted = "null";
          break;
        default:
          break;
      }

      Object.keys(v).forEach((element) => {
        if (element.includes("date")) {
          if (v[element] !== null) {
            v[element] = new Date(v[element]).toLocaleString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              timeZone: "Europe/Moscow",
            });
            v[element] = changeDateType(v[element]);
            v[element] = new Date(v[element]);
          }
        }
      });
      return v;
    });
    connection.query(`SELECT * FROM ${tableMetaName}`, (err, rows, fields) => {
      data.columns = Object.values(JSON.parse(JSON.stringify(rows)));
      data.columns = data.columns.map((v) => {
        if (v.showFilterMenu == 1) {
          v.showFilterMenu = true;
        } else {
          v.showFilterMenu = false;
        }
        return v;
      });
      connection.query(`SELECT type, serviceable, location FROM ${tableValuesName}`, (err, rows, fields) => {
        data.values = Object.values(JSON.parse(JSON.stringify(rows)));
        data.values = data.values.map((v) => {
          if (v.showFilterMenu == 1) {
            v.showFilterMenu = true;
          } else {
            v.showFilterMenu = false;
          }
          return v;
        });
        responce.json(data);
      })
    })
  });
});

app.post("/addData", jsonParser, (request, responce) => {
  let { type, rowData } = request.body;
  let tableName

  switch (type) {
    case "it":
      tableName = "it_lib";
      break;
    case "furniture":
      tableName = "furniture_lib";
      break;
    default:
      break;
  }

  for (const key in rowData) {
    switch (rowData[key]) {
      case 'true':
        rowData[key] = true
        break;
        case 'false':
          rowData[key] = false
          break;
      default:
        break;
    }
  }

  connection.query(
    insertData(tableName, rowData),
    Object.values(rowData),
    (error, result) => {
      if (error) throw error;
      console.log(`Add item to ${tableName} Table`);
      responce.json({});
    }
  );
});

app.post("/updateData", jsonParser, (request, responce) => {
  let { type, rowData, rowId } = request.body;
  let tableName

  switch (type) {
    case "it":
      tableName = "it_lib";
      break;
    case "furniture":
      tableName = "furniture_lib";
      break;
    default:
      break;
  }

  connection.query(updateData(tableName, rowData, rowId), function (error, result) {
    if (error) throw error;
    console.log(`Table ${tableName} updated`);
    responce.json({});
  });
});

app.post("/uploadData", jsonParser, (request, responce) => {
  let { type, data } = request.body;
  let tables = {}
  tables.data = []
  tables.name = []

  tables.data.push(data.meta)
  tables.data.push(data.lib)
  tables.data.push(data.values)

  switch (type) {
    case "it":
      tables.name.push("it_meta")
      tables.name.push("it_lib")
      tables.name.push("it_values")
      break;
    case "furniture":
      tables.name.push("furniture_meta")
      tables.name.push("furniture_lib")
      tables.name.push("furniture_values")
      break;
    default:
      break;
  }

  for (let i = 0; i < tables.data.length; i++) {
    //Удаление таблицы
    const queryDeleteTable = `DROP TABLE if exists ${tables.name[i]}`;
    connection.query(queryDeleteTable, (error, result) => {
      if (error) throw error;
      console.log("Table deleted");
    });

    //Создание таблицы
    connection.query(
      createTable(tables.name[i], tables.data[i], data.meta),
      (error, result) => {
        if (error) throw error;
        console.log("Table created");
      }
    );

    //Заполнение таблицы данными из файла excel
    for (let j = 0; j < tables.data[i].length; j++) {
      connection.query(
        insertData(tables.name[i], tables.data[i][j]),
        Object.values(tables.data[i][j]),
        (error, result) => {
          if (error) throw error;
        }
      )
    }
  }
  responce.json(data);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is starting on PORT ${PORT}`);
});

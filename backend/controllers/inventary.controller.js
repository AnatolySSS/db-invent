import db from "../models/_index.js";

export const InventaryController = {
  async hasCurrentYearInventary(request, responce) {
    try {
      let { userDivision } = request.body;

      const currentYear = new Date().getFullYear();

      const [resultsIt] = await db.DIVISIONS[
        `D${userDivision}`
      ].sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_it'`);
      const [resultsFurniture] = await db.DIVISIONS[
        `D${userDivision}`
      ].sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_furniture'`);
      const [resultsUnmarked] = await db.DIVISIONS[
        `D${userDivision}`
      ].sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_unmarked'`);
      const [resultsAssets] = await db.DIVISIONS[
        `D${userDivision}`
      ].sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_assets'`);

      let resultCodeIt, resultCodeFurniture, resultCodeUnmarked, resultCodeAssets;

      resultsIt.length == 0 ? resultCodeIt = false : resultCodeIt = true;
      resultsFurniture.length == 0 ? resultCodeFurniture = false : resultCodeFurniture = true;
      resultsUnmarked.length == 0 ? resultCodeUnmarked = false : resultCodeUnmarked = true;
      resultsAssets.length == 0 ? resultCodeAssets = false : resultCodeAssets = true;

      responce.json({
        resultCodeIt,
        resultCodeFurniture,
        resultCodeUnmarked,
        resultCodeAssets,
      });
      
    } catch (error) {
      responce.json(error);
    }
  },

  async requestCurrentInventory(request, responce) {
    try {
      let { tableName, userDivision } = request.body;
      
      const currentYear = new Date().getFullYear();
      const [hasCurrentInventory] = await db.DIVISIONS[
        `D${userDivision}`
      ].sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_${tableName}'`);
      
      responce.json({
        hasCurrentInventory: hasCurrentInventory.length != 0 ? true : false,
      });
      
    } catch (error) {
      console.log('_____________________InventoryController_requestCurrentInventory____________________');
      console.log(error);
      responce.json(error);
    }
  },

  async beginInventory(request, responce) {
    try {
      let { tableName, userDivision } = request.body;

      const currentYear = new Date().getFullYear();
      const [results] = await db.DIVISIONS[`D${userDivision}`].sequelize.query(
        `SHOW TABLES LIKE 'inv_${currentYear}_${tableName}'`
      );

      if (results.length == 0) {
        let data, inventData, dataTable, inventTable;

        switch (tableName) {
          case "it":
            dataTable = db.DIVISIONS[`D${userDivision}`].itLib;
            inventTable =
              db.DIVISIONS[`D${userDivision}`].currentYearInventaryIt;
            break;
          case "furniture":
            dataTable = db.DIVISIONS[`D${userDivision}`].furnitureLib;
            inventTable =
              db.DIVISIONS[`D${userDivision}`].currentYearInventaryFurniture;
            break;
          case "unmarked":
            dataTable = db.DIVISIONS[`D${userDivision}`].unmarkedLib;
            inventTable =
              db.DIVISIONS[`D${userDivision}`].currentYearInventaryUnmarked;
            break;
          case "assets":
            dataTable = db.DIVISIONS[`D${userDivision}`].assetsLib;
            inventTable =
              db.DIVISIONS[`D${userDivision}`].currentYearInventaryAssets;
            break;
          default:
            break;
        }
        
        data = await dataTable.findAll();
        data = JSON.parse(JSON.stringify(data));

        await inventTable.sync();
        for (const obj of data) {
          delete obj.id;
          obj.checked = false;
          await inventTable.create(obj);
        }

        responce.json({
          tableName: tableName,
          message: `Таблица ${tableName} за ${currentYear} год создана`,
          inventData,
        });
      } else {
        responce.json({
          tableName: tableName,
          message: `Таблица ${tableName} за ${currentYear} год уже создана`,
        });
      }

    } catch (error) {
      console.log('_____________________InventoryController_beginInventory____________________');
      console.log(error);
      responce.json(error);
    }
  },

  async findQRCode(request, responce) {
    try {
      let { user, tableName, roomNumber, qrCode } = request.body;

      const {
        itLib,
        furnitureLib,
        unmarkedLib,
        assetsLib,
        currentYearInventaryIt,
        currentYearInventaryFurniture,
        currentYearInventaryUnmarked,
        currentYearInventaryAssets,
      } = db.DIVISIONS[`D${user.division}`];

      const currentYear = new Date().getFullYear();
      let itemName
      switch (tableName) {
        case "it":
          await currentYearInventaryIt.update({ 
              checked: true,
              user: user.full_name,
              scan_date: new Date(),
            },
            { where: { qr_code: qrCode, }});

          if (roomNumber != 0) {
            await currentYearInventaryIt.update({ location: roomNumber }, { where: { qr_code: qrCode }});
            await itLib.update({ location: roomNumber }, { where: { qr_code: qrCode }});
          }

          itemName = await currentYearInventaryIt.findOne({ where: { qr_code: qrCode }})
          break;
        case "furniture":
          await currentYearInventaryFurniture.update({
              checked: true,
              user: user.full_name,
              scan_date: new Date(),
            },
            { where: { qr_code: qrCode }});

          if (roomNumber != 0) {
            await currentYearInventaryFurniture.update({ location: roomNumber }, { where: { qr_code: qrCode }});
            await furnitureLib.update({ location: roomNumber }, { where: { qr_code: qrCode }});
          }

          itemName = await currentYearInventaryFurniture.findOne({ where: { qr_code: qrCode } })
          
          break;
        case "unmarked":
          await currentYearInventaryUnmarked.update({
              checked: true,
              user: user.full_name,
              scan_date: new Date(),
            },
            { where: { qr_code: qrCode, }});

          if (roomNumber != 0) {
            await currentYearInventaryUnmarked.update({ location: roomNumber }, { where: { qr_code: qrCode }});
            await unmarkedLib.update({ location: roomNumber }, { where: { qr_code: qrCode }});
          }

          itemName = await currentYearInventaryUnmarked.findOne({ where: { qr_code: qrCode } })
          
          break;
        case "assets":
          await currentYearInventaryAssets.update({
              checked: true,
              user: user.full_name,
              scan_date: new Date(),
            },
            { where: { qr_code: qrCode, }});

          if (roomNumber != 0) {
            await currentYearInventaryAssets.update({ location: roomNumber }, { where: { qr_code: qrCode }});
            await assetsLib.update({ location: roomNumber }, { where: { qr_code: qrCode }});
          }

          itemName = await currentYearInventaryAssets.findOne({ where: { qr_code: qrCode } })
          
          break;
        default:
          break;
      }
      responce.json({
        tableName: tableName,
        message: `${itemName.name} инвентаризован в таблице ${tableName} за ${currentYear} год`,
        name: itemName.name
      });
    } catch (error) {
      
    }
  },

  async inventUnmarked(request, responce) {
    try {
      let { id, count, user } = request.body;

      const {
        unmarkedLib,
        currentYearInventaryUnmarked,
      } = db.DIVISIONS[`D${user.division}`];

      const currentYear = new Date().getFullYear();
      let itemName;

      await currentYearInventaryUnmarked.update({
        checked: true,
        user: user.full_name,
        scan_date: new Date(),
        count: count,
      },
      { where: { id: id, }});

      await unmarkedLib.update({ count: count }, { where: { id: id }});

      itemName = await currentYearInventaryUnmarked.findOne({ where: { id: id }, raw : true, })

      responce.json({
        message: `${itemName.name} инвентаризован в таблице Unmarked за ${currentYear} год`,
        name: itemName.name
      });
    } catch (error) {
      console.log("__________InventaryController__inventUnmarked___________");
      console.log(error);
      responce.json({
        message: `Объекты не найдены`,
        name: "Имя не известно",
      });
    }
  },

  async checkQRCode(request, responce) {
    try {
      let { qrCode, userDivision } = request.body;

      const {
        itLib,
        furnitureLib,
        assetsLib,
      } = db.DIVISIONS[`D${userDivision}`];

      let object;
      object = await itLib.findOne({ where: { qr_code: qrCode } })
      if (!object) {
        object = await furnitureLib.findOne({ where: { qr_code: qrCode } })
      }
      if (!object) {
        object = await assetsLib.findOne({ where: { qr_code: qrCode } })
      }
      responce.json({
        message: `Объект ${object.dataValues.name} найден`,
        object: object.dataValues,
      });
      
    } catch (error) {
      
    }
  },

  async checkRemainsWithLocations(request, responce) {
    try {

      let { currentTable, userDivision, location } = request.body;

      if (location == "Без локации") {
        location = null;
      }

      const {
        currentYearInventaryIt,
        currentYearInventaryFurniture,
        currentYearInventaryUnmarked,
        currentYearInventaryAssets
      } = db.DIVISIONS[`D${userDivision}`];

      let inv_data;

      switch (currentTable) {
        case "it":
          inv_data = await currentYearInventaryIt.findAll({
            where: { location: location },
            raw: true,
          });
          break;

        case "furniture":
          inv_data = await currentYearInventaryFurniture.findAll({
            where: { location: location },
            raw: true,
          });
          break;

        case "unmarked":
          inv_data = await currentYearInventaryUnmarked.findAll({
            where: { location: location },
            raw: true,
          });
          break;

        case "assets":
          inv_data = await currentYearInventaryAssets.findAll({
            where: { location: location },
            raw: true,
          });
          break;

        default:
          break;
      }

      responce.json({
        message: `Объекты найдены`,
        inv_data,
      });
      
    } catch (error) {
      
    }
  },

  async checkRemainsWithoutLocations(request, responce) {
    try {

      let { currentTable, userDivision } = request.body;

      const {
        currentYearInventaryIt,
        currentYearInventaryFurniture,
        currentYearInventaryUnmarked,
        currentYearInventaryAssets
      } = db.DIVISIONS[`D${userDivision}`];

      let inv_data, name;

      switch (currentTable) {
        case "it":
          inv_data = await currentYearInventaryIt.findAll({
            raw: true,
          });
          name = "Оборудование";
          break;

        case "furniture":
          inv_data = await currentYearInventaryFurniture.findAll({
            raw: true,
          });
          name = "Мебель";
          break;

        case "unmarked":
          inv_data = await currentYearInventaryUnmarked.findAll({
            raw: true,
          });
          name = "Прочее";
          break;

        case "assets":
          inv_data = await currentYearInventaryAssets.findAll({
            raw: true,
          });
          name = "Основные средства";
          break;

        default:
          break;
      }

      responce.json({
        message: `Объекты найдены`,
        name,
        inv_data,
      });
      
    } catch (error) {
      
    }
  },

  async checkStatus(request, responce) {
    try {
      let { userDivision } = request.body;

      const {
        itValues,
        furnitureValues,
        unmarkedValues,
        assetsValues,
        currentYearInventaryIt,
        currentYearInventaryFurniture,
        currentYearInventaryUnmarked,
        currentYearInventaryAssets
      } = db.DIVISIONS[`D${userDivision}`];

      let it_inv_data,
        furniture_inv_data,
        unmarked_inv_data,
        assets_inv_data,
        checked_it = 0,
        checked_furniture = 0,
        checked_unmarked = 0,
        checked_assets = 0;

      let locations = {};
      locations = await itValues.findAll({attributes: ['location'], raw : true, });

      currentYearInventaryIt ? it_inv_data = await currentYearInventaryIt.findAll({ raw : true }) : it_inv_data = [];
      currentYearInventaryFurniture ? furniture_inv_data = await currentYearInventaryFurniture.findAll({ raw : true }): furniture_inv_data = [];
      currentYearInventaryUnmarked ? unmarked_inv_data = await currentYearInventaryUnmarked.findAll({ raw : true }) : unmarked_inv_data = [];
      currentYearInventaryAssets ? assets_inv_data = await currentYearInventaryAssets.findAll({ raw : true }) : assets_inv_data = [];

      //Формирование массива объектов инвентаризации по кабинетам
      locations.forEach((location) => {
        location.it = it_inv_data.filter(it => it.location == location.location)
        location.furniture = furniture_inv_data.filter(furniture => furniture.location == location.location)
        location.unmarked = unmarked_inv_data.filter(unmarked => unmarked.location == location.location)
        location.assets = assets_inv_data.filter(assets => assets.location == location.location)
      });
      
      //Получение количества инвентаризированных объектов
      locations.forEach((location) => {
        location.checked_it = location.it.filter(it => it.checked == true).length
        location.checked_furniture = location.furniture.filter(furniture => furniture.checked == true).length
        location.checked_unmarked = location.unmarked.filter(unmarked => unmarked.checked == true).length
        location.checked_assets = location.assets.filter(assets => assets.checked == true).length
        checked_it = checked_it + location.checked_it
        checked_furniture = checked_furniture + location.checked_furniture
        checked_unmarked = checked_unmarked + location.checked_unmarked
        checked_assets = checked_assets + location.checked_assets
      });

      responce.json({
        message: `Объекты найдены`,
        locations,
        checked_it,
        checked_furniture,
        checked_unmarked,
        checked_assets,
        it_count: it_inv_data.length,
        furniture_count: furniture_inv_data.length,
        unmarked_count: unmarked_inv_data.length,
        assets_count: assets_inv_data.length,
      });
      
    } catch (error) {
      console.log(error);
      responce.json({
        message: `Объекты не найдены`,
        locations: [],
      });
    }
  },

  async checkStatusLocations(request, responce) {
    try {
      let { currentTable, userDivision } = request.body;

      const {
        itValues,
        furnitureValues,
        unmarkedValues,
        assetsValues,
        currentYearInventaryIt,
        currentYearInventaryFurniture,
        currentYearInventaryUnmarked,
        currentYearInventaryAssets
      } = db.DIVISIONS[`D${userDivision}`];

      let inv_data,
      locations = [],
      name,
      checked = 0;

      switch (currentTable) {
        case "it":
          locations = await itValues.findAll({attributes: ['location'], raw : true, });
          inv_data = await currentYearInventaryIt.findAll({ raw : true });
          name = "Оборудование";
          break;

        case "furniture":
          locations = await furnitureValues.findAll({attributes: ['location'], raw : true, });
          inv_data = await currentYearInventaryFurniture.findAll({ raw : true });
          name = "Мебель";
          break;

        case "unmarked":
          locations = await unmarkedValues.findAll({attributes: ['location'], raw : true, });
          inv_data = await currentYearInventaryUnmarked.findAll({ raw : true });
          name = "Прочее";
          break;

        case "assets":
          locations = await assetsValues.findAll({attributes: ['location'], raw : true, });
          inv_data = await currentYearInventaryAssets.findAll({ raw : true });
          name = "Основные средства";
          break;

        default:
          break;
      }
      locations = locations.filter(location => location.location != null)
      locations.push({ location: 'Без локации' })

      //Формирование массива объектов инвентаризации по кабинетам
      locations.forEach((location) => {
        location.inv_data = inv_data.filter(v => v.location == location.location);
        if (location.location == "Без локации") {
          location.inv_data = inv_data.filter(v => v.location == null);
        }
      });
      locations = locations.filter(location => location.inv_data.length != 0);
      //Получение количества инвентаризированных объектов
      locations.forEach((location) => {
        location.checked = location.inv_data.filter(v => v.checked == true).length
        checked = checked + location.checked
      });

      responce.json({
        message: `Объекты найдены`,
        locations,
        checked,
        name,
        count: inv_data.length,
      });
      
    } catch (error) {
      console.log(error);
      responce.json({
        message: `Объекты не найдены`,
        locations: [],
      });
    }
  },

  async checkStatusType(request, responce) {
    try {
      let { userDivision } = request.body;

      const {
        currentYearInventaryIt,
        currentYearInventaryFurniture,
        currentYearInventaryUnmarked,
        currentYearInventaryAssets
      } = db.DIVISIONS[`D${userDivision}`];

      const currentYear = new Date().getFullYear();

      const [resultsIt] = await db.DIVISIONS[
        `D${userDivision}`
      ].sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_it'`);
      const [resultsFurniture] = await db.DIVISIONS[
        `D${userDivision}`
      ].sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_furniture'`);
      const [resultsUnmarked] = await db.DIVISIONS[
        `D${userDivision}`
      ].sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_unmarked'`);
      const [resultsAssets] = await db.DIVISIONS[
        `D${userDivision}`
      ].sequelize.query(`SHOW TABLES LIKE 'inv_${currentYear}_assets'`);

      let resultCodeIt, resultCodeFurniture, resultCodeUnmarked, resultCodeAssets;

      resultsIt.length == 0 ? resultCodeIt = false : resultCodeIt = true;
      resultsFurniture.length == 0 ? resultCodeFurniture = false : resultCodeFurniture = true;
      resultsUnmarked.length == 0 ? resultCodeUnmarked = false : resultCodeUnmarked = true;
      resultsAssets.length == 0 ? resultCodeAssets = false : resultCodeAssets = true;

      let it_inv_data,
        furniture_inv_data,
        unmarked_inv_data,
        assets_inv_data,
        checked_it = 0,
        checked_furniture = 0,
        checked_unmarked = 0,
        checked_assets = 0;

      resultCodeIt ? it_inv_data = await currentYearInventaryIt.findAll({ raw : true }) : it_inv_data = [];
      resultCodeFurniture ? furniture_inv_data = await currentYearInventaryFurniture.findAll({ raw : true }): furniture_inv_data = [];
      resultCodeUnmarked ? unmarked_inv_data = await currentYearInventaryUnmarked.findAll({ raw : true }) : unmarked_inv_data = [];
      resultCodeAssets ? assets_inv_data = await currentYearInventaryAssets.findAll({ raw : true }) : assets_inv_data = [];

      checked_it = it_inv_data.filter(v => v.checked == true).length
      checked_furniture = furniture_inv_data.filter(v => v.checked == true).length
      checked_unmarked = unmarked_inv_data.filter(v => v.checked == true).length
      checked_assets = assets_inv_data.filter(v => v.checked == true).length

      responce.json({
        message: `Объекты найдены`,
        checked_it,
        checked_furniture,
        checked_unmarked,
        checked_assets,
        it_count: it_inv_data.length,
        furniture_count: furniture_inv_data.length,
        unmarked_count: unmarked_inv_data.length,
        assets_count: assets_inv_data.length,
      });
      
    } catch (error) {
      console.log("__________InventaryController__checkStatusType___________");
      console.log(error);
      responce.json({
        message: `Объекты не найдены`,
        locations: [],
      });
    }
  },

  async getLocations(request, responce) {
    try {
      let { currentTable, userDivision } = request.body;
      const { itValues, furnitureValues, unmarkedValues, assetsValues } = db.DIVISIONS[`D${userDivision}`];
      let locations = [];

      switch (currentTable) {
        case "it":
          locations = await itValues.findAll({attributes: ['location'], raw : true, });
          break;

        case "furniture":
          locations = await furnitureValues.findAll({attributes: ['location'], raw : true, });
          break;

        case "unmarked":
          locations = await unmarkedValues.findAll({attributes: ['location'], raw : true, });
          break;

        case "assets":
          locations = await assetsValues.findAll({attributes: ['location'], raw : true, });
          break;

        default:
          break;
      }

      locations = locations.map(location => location.location).filter(location => location != null);

      responce.json({
        message: `Объекты найдены`,
        locations,
      });
      
    } catch (error) {
      console.log("__________InventaryController__getLocations___________");
      console.log(error);
      responce.json({
        message: `Объекты не найдены`,
        locations: [],
      });
    }
  },
};
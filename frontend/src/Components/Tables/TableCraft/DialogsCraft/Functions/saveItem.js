import { formatDate } from "../../../Functions/Helpers/formatDate";
import changeDateType from "../../../../../function-helpers/changeDateType";
import { createId } from "./createId";
import { setCurrentDateTimeString } from "../../../Functions/Helpers/setCurrentDateTimeString";

export const saveItem =
  (
    addData,
    updateData,
    data,
    item,
    setItemDialog,
    setItem,
    emptyItem,
    userAuth,
    setDisabled
  ) =>
  () => {
    setDisabled(true);
    let _item = { ...item };
    _item.changedDateTime = Date.now();

    Object.keys(_item).forEach((element) => {
      //Изменение пустой строки на null для избежания ошибки при сохранении в базе данных
      if (_item[element] === "") {
        _item[element] = null;
      }
      //Изменение формата времени с Date  на String для избежания изменения часового пояса
      if (element != "createdAt" && element != "updatedAt") {
        if (element.includes("date")) {
          if (_item[element] !== null) {
            _item[element] = formatDate(_item[element]);
            _item[element] = changeDateType(_item[element]);
          }
        }
      }
    });

    // _item.updatedAt = setCurrentDateTimeString();
    if (_item.id) {
      _item.userName = userAuth.fullName;
      updateData(_item, userAuth.division);
    } else {
      _item.id = createId(data);
      // _item.createdAt = setCurrentDateTimeString();
      addData(_item, userAuth.division);
    }
    setItemDialog(false);
    setItem(emptyItem);
  };

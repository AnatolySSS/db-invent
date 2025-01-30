import { formatDate } from "../../../Functions/Helpers/formatDate";
import changeDateType from "../../../../../function-helpers/changeDateType";
import { createId } from "./createId";
import { createQRCode } from "../../../../../function-helpers/createQRCode";

export const saveItem = (type, addData, updateData, data, item, setItemDialog, setItem, emptyItem, userAuth, setDisabled, values) => {
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

  if (_item.id) {
    _item.changedUserId = userAuth.employee_id;
    updateData(_item, userAuth);
  } else {
    // _item.id = createId(data);
    let qrCode = createQRCode(userAuth.division_id, type, _item.type, data, values);
    _item.changedUserId = userAuth.employee_id;
    _item.division_id = userAuth.division_id;
    _item.class_type = type;
    _item.qr_code = qrCode;

    addData(_item, userAuth);
  }
  setItemDialog(false);
  setItem(emptyItem);
};

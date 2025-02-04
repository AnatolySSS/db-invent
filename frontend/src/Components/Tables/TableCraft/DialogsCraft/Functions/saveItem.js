import { formatDate } from "../../../Functions/Helpers/formatDate";
import changeDateType from "../../../../../function-helpers/changeDateType";
import { createId } from "./createId";
import { createQRCode } from "../../../../../function-helpers/createQRCode";

export const saveItem = async (
  type,
  addData,
  updateData,
  data,
  item,
  setItemDialog,
  setItem,
  emptyItem,
  userAuth,
  setDisabled,
  values,
  toast
) => {
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

  setItemDialog(false);
  setItem(emptyItem);

  if (_item.id) {
    _item.changedUserId = userAuth.employee_id;
    await updateData(_item, userAuth);

    toast.current.show({
      severity: "success",
      summary: "Обновлено",
      detail: `${item.name} успешно обновлен`,
      life: 3000,
    });
  } else {
    // _item.id = createId(data);
    let qrCode = createQRCode(userAuth.division_id, type, _item.type, data, values);
    _item.changedUserId = userAuth.employee_id;
    _item.division_id = userAuth.division_id;
    _item.class_type = type;
    _item.qr_code = qrCode;

    await addData(_item, userAuth);

    toast.current.show({
      severity: "success",
      summary: "Создано",
      detail: `${item.name} успешно создан`,
      life: 3000,
    });
  }
};

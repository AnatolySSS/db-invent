import { formatDate } from "../../../Functions/Helpers/formatDate";
import changeDateType from "../../../../../function-helpers/changeDateType";

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
    setDisabled,
    adUsers
  ) =>
  () => {
    adUsers.forEach((asUser) => {
      if (asUser.cn === item.full_name) {
        item.login = asUser.mailNickname;
      }
    });

    setDisabled(true);
    let _item = { ...item };

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
      updateData(_item, userAuth.division);
    } else {
      addData(_item, userAuth.division);
    }
    setItemDialog(false);
    setItem(emptyItem);
  };

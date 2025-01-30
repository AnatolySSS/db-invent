import changeDateType from "../../../../../function-helpers/changeDateType";
import { formatDate } from "../../../Functions/Helpers/formatDate";

export const handleTransferItem = (transferedItem, transferItem, selectedItems, userAuth, setTransferDialog) => {
  Object.keys(transferedItem).forEach((element) => {
    //Изменение пустой строки на null для избежания ошибки при сохранении в базе данных
    if (transferedItem[element] === "") {
      transferedItem[element] = null;
    }
    //Изменение формата времени с Date  на String для избежания изменения часового пояса
    if (element != "createdAt" && element != "updatedAt") {
      if (element.includes("date")) {
        if (transferedItem[element] !== null) {
          transferedItem[element] = formatDate(transferedItem[element]);
          transferedItem[element] = changeDateType(transferedItem[element]);
        }
      }
    }
  });

  transferItem(selectedItems, transferedItem, userAuth);
  setTransferDialog(false);
};

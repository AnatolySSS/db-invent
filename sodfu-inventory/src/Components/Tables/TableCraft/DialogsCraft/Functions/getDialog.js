import { DialogCraftFurniture } from "../Furniture/DialogCraftFurniture";
import { DialogCraftIt } from "../It/DialogCraftIt";
import { DialogCraftUnmarked } from "../Unmarked/DialogCraftUnmarked";

export const getDialog = (
  name,
  data,
  setItemDialog,
  ItemDialog,
  hideNew,
  item,
  setItem,
  values,
  addData,
  updateData,
  emptyItem,
  userAuth
) => {
  switch (name) {
    case "Мебель":
      return (
        <DialogCraftFurniture
          data={data}
          setItemDialog={setItemDialog}
          ItemDialog={ItemDialog}
          hideNew={hideNew}
          item={item}
          setItem={setItem}
          values={values}
          addData={addData}
          updateData={updateData}
          emptyItem={emptyItem}
          userAuth={userAuth}
        />
      );
    case "Оборудование":
      return (
        <DialogCraftIt
          data={data}
          setItemDialog={setItemDialog}
          ItemDialog={ItemDialog}
          hideNew={hideNew}
          item={item}
          setItem={setItem}
          values={values}
          addData={addData}
          updateData={updateData}
          emptyItem={emptyItem}
          userAuth={userAuth}
        />
      );
    case "Прочее":
      return (
        <DialogCraftUnmarked
          data={data}
          setItemDialog={setItemDialog}
          ItemDialog={ItemDialog}
          hideNew={hideNew}
          item={item}
          setItem={setItem}
          values={values}
          addData={addData}
          updateData={updateData}
          emptyItem={emptyItem}
          userAuth={userAuth}
        />
      );
    default:
      break;
  }
};

import { DialogCraftFurniture } from "../Furniture/DialogCraftFurniture";
import { DialogCraftIt } from "../It/DialogCraftIt";
import { DialogCraftUnmarked } from "../Unmarked/DialogCraftUnmarked";
import { DialogCraftAssets } from "../Assets/DialogCraftAssets";

export const getDialog = (
  name,
  data,
  columns,
  setItemDialog,
  ItemDialog,
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
          columns={columns}
          setItemDialog={setItemDialog}
          ItemDialog={ItemDialog}
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
          columns={columns}
          setItemDialog={setItemDialog}
          ItemDialog={ItemDialog}
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
          columns={columns}
          setItemDialog={setItemDialog}
          ItemDialog={ItemDialog}
          item={item}
          setItem={setItem}
          values={values}
          addData={addData}
          updateData={updateData}
          emptyItem={emptyItem}
          userAuth={userAuth}
        />
      );
    case "Основные средства":
      return (
        <DialogCraftAssets
          data={data}
          columns={columns}
          setItemDialog={setItemDialog}
          ItemDialog={ItemDialog}
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

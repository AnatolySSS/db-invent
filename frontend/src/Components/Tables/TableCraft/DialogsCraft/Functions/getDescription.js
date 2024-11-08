import { DescriptionIt } from "../Descriptions/DescriptionIt";
import { DialogCraftUnmarked } from "../Unmarked/DialogCraftUnmarked";
import { DialogCraftAssets } from "../Assets/DialogCraftAssets";

export const getDescription = (
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
  console.log("imhere");
  switch (name) {
    case "Оборудование":
      return (
        <DescriptionIt
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
    // case "Мебель":
    //   return (
    //     <DescriptionFurniture
    //       data={data}
    //       columns={columns}
    //       setItemDialog={setItemDialog}
    //       ItemDialog={ItemDialog}
    //       item={item}
    //       setItem={setItem}
    //       values={values}
    //       addData={addData}
    //       updateData={updateData}
    //       emptyItem={emptyItem}
    //       userAuth={userAuth}
    //     />
    //   );
    // case "Прочее":
    //   return (
    //     <DescriptionUnmarked
    //       data={data}
    //       columns={columns}
    //       setItemDialog={setItemDialog}
    //       ItemDialog={ItemDialog}
    //       item={item}
    //       setItem={setItem}
    //       values={values}
    //       addData={addData}
    //       updateData={updateData}
    //       emptyItem={emptyItem}
    //       userAuth={userAuth}
    //     />
    //   );
    // case "Основные средства":
    //   return (
    //     <DescriptionAssets
    //       data={data}
    //       columns={columns}
    //       setItemDialog={setItemDialog}
    //       ItemDialog={ItemDialog}
    //       item={item}
    //       setItem={setItem}
    //       values={values}
    //       addData={addData}
    //       updateData={updateData}
    //       emptyItem={emptyItem}
    //       userAuth={userAuth}
    //     />
    //   );
    default:
      break;
  }
};

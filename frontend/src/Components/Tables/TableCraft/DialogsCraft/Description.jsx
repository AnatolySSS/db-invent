import { DescriptionIt } from "./Descriptions/DescriptionIt";
import { DescriptionFurniture } from "./Descriptions/DescriptionFurniture";
import { DescriptionUnmarked } from "./Descriptions/DescriptionUnmarked";
import { DescriptionAssets } from "./Descriptions/DescriptionAssets";

export const Description = (props) => {
  const {
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
    userAuth,
    disabled,
  } = props;

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
          disabled={disabled}
        />
      );
    case "Мебель":
      return (
        <DescriptionFurniture
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
          disabled={disabled}
        />
      );
    case "Прочее":
      return (
        <DescriptionUnmarked
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
          disabled={disabled}
        />
      );
    case "Основные средства":
      return (
        <DescriptionAssets
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
          disabled={disabled}
        />
      );
    default:
      break;
  }
};
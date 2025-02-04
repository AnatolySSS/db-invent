import { DescriptionIt } from "./Descriptions/DescriptionIt";
import { DescriptionFurniture } from "./Descriptions/DescriptionFurniture";
import { DescriptionUnmarked } from "./Descriptions/DescriptionUnmarked";
import { DescriptionAssets } from "./Descriptions/DescriptionAssets";

export const Description = (props) => {
  const {
    type,
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
    employees,
    dialogType,
    formButtonRef,
    setDisabled,
    toast,
  } = props;

  switch (name) {
    case "Оборудование":
      return (
        <DescriptionIt
          type={type}
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
          employees={employees}
          dialogType={dialogType}
          formButtonRef={formButtonRef}
          setDisabled={setDisabled}
          toast={toast}
        />
      );
    case "Мебель":
      return (
        <DescriptionFurniture
          type={type}
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
          employees={employees}
          dialogType={dialogType}
          formButtonRef={formButtonRef}
          setDisabled={setDisabled}
          toast={toast}
        />
      );
    case "Прочее":
      return (
        <DescriptionUnmarked
          type={type}
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
          employees={employees}
          dialogType={dialogType}
          formButtonRef={formButtonRef}
          setDisabled={setDisabled}
          toast={toast}
        />
      );
    case "Основные средства":
      return (
        <DescriptionAssets
          type={type}
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
          employees={employees}
          dialogType={dialogType}
          formButtonRef={formButtonRef}
          setDisabled={setDisabled}
          toast={toast}
        />
      );
    default:
      break;
  }
};

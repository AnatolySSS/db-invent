import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatDate } from "../../../Functions/Helpers/formatDate";

export const TablelHistoryCraft = (props) => {
  const { item } = props;

  return (
    item.logs !== undefined && (
      <DataTable
        scrollable
        scrollHeight="300px"
        value={item.logs}
        style={{ width: "100%" }}
      >
        <Column
          field="changedFiled"
          header="Измененное значение"
          headerStyle={{
            fontWeight: "bold",
            // backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
          }}
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
        ></Column>
        <Column
          field="changedDateTime"
          header="Дата изменения"
          headerStyle={{
            fontWeight: "bold",
            // backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
          }}
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          body={(rowData) => formatDate(rowData.changedDateTime, "updatedAt")}
        ></Column>
        <Column
          field="changedEmployeeName"
          header="ФИО Сотрудника"
          headerStyle={{
            fontWeight: "bold",
            // backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
          }}
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
        ></Column>
        <Column
          field="newValue"
          header="Новое значение"
          headerStyle={{
            fontWeight: "bold",
            // backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
          }}
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
        ></Column>
        <Column
          field="oldValue"
          header="Старое значение"
          headerStyle={{
            fontWeight: "bold",
            // backgroundColor: theme === "dark" ? "#161616" : "#f5f5f5",
          }}
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
        ></Column>
      </DataTable>
    )
  );
};

import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { formatDate } from "../../../Functions/Helpers/formatDate";
import styles from "./TableHistoryCraft.module.css";
import { getColumnFilterElement } from "../../../Functions/Filters/getColumnFilterElement";

export const TablelHistoryCraft = (props) => {
  const { logs, columns } = props;

  //Столбцы, изменения в которых не отслеживаются
  const nonCheckedColumns = ["id", "createdAt", "updatedAt"];

  //Т.к. значения changedFiled соответствуют наименованиям столбцов в таблице,
  //список возможных значений для данного столбца формируется из наименований столбцов основной таблицы,
  //за исключением служебных столбцов, перечисленных в массиве nonCheckedColumns
  let checkedColumns = columns.filter((col) => !nonCheckedColumns.includes(col.field));
  let columnsNames = [...new Set(logs.map((logs) => logs.changedFiled))];

  logs.forEach((log) => {
    log.changedDateTime = new Date(log.changedDateTime);
  });

  const filters = {
    changedEmployeeName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    changedDateTime: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    changedFiled: { value: null, matchMode: FilterMatchMode.IN },
    newValue: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    oldValue: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  };

  return (
    logs !== undefined && (
      <DataTable
        dataKey="id"
        className={styles.tableHeader}
        filters={filters}
        filterDisplay="menu"
        resizableColumns
        stripedRows
        columnResizeMode="expand"
        removableSort
        scrollable
        scrollHeight="calc(90vh - 0.4rem - 1.5rem - 0.5rem - 1.5rem - 2px - 1rem - 2.5rem - 1rem - 1rem)"
        // paginator
        // rows={10}
        // rowsPerPageOptions={[5, 10, 25, 50]}
        value={logs}
        style={{ height: "100%", width: "100%" }}
      >
        <Column
          field="changedEmployeeName"
          header="ФИО Сотрудника"
          headerStyle={{
            fontWeight: "bold",
          }}
          filter
          filterField="changedEmployeeName"
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          sortable
        ></Column>
        <Column
          field="changedDateTime"
          header="Дата и время изменения"
          headerStyle={{
            fontWeight: "bold",
          }}
          filter
          filterField="changedDateTime"
          filterElement={getColumnFilterElement({ editingType: "date" })}
          dataType="date"
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          body={(rowData) => formatDate(rowData.changedDateTime, "updatedAt")}
          sortable
        ></Column>
        <Column
          field="changedFiled"
          header="Измененное значение"
          headerStyle={{
            fontWeight: "bold",
          }}
          filter
          filterField="changedFiled"
          filterElement={getColumnFilterElement(
            { editingType: "dropdown", field: "changedFiled" },
            { changedFiled: columnsNames }
          )}
          showFilterMatchModes={false}
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          sortable
        ></Column>
        <Column
          field="newValue"
          header="Новое значение"
          headerStyle={{
            fontWeight: "bold",
          }}
          filter
          filterField="newValue"
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          sortable
        ></Column>
        <Column
          field="oldValue"
          header="Старое значение"
          headerStyle={{
            fontWeight: "bold",
          }}
          filter
          filterField="oldValue"
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          sortable
        ></Column>
      </DataTable>
    )
  );
};

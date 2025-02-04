import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatDate } from "../../../Functions/Helpers/formatDate";
import styles from "./TableHistoryCraft.module.css";

export const TableHistoryCraftOld = (props) => {
  const { logs } = props;

  //Получение массива уникальных записей изменений (объектов, модержащих ФИО измнившего и дату/время)
  let uniqLogs = [
    ...new Set(
      logs.map((log) =>
        JSON.stringify({
          changedDateTime: log.changedDateTime,
          changedEmployeeName: log.changedEmployeeName,
          changeLog: [],
        })
      )
    ),
  ].map((log) => JSON.parse(log));

  //Добавление к каждому объекту изменений списка конкретных изменений
  uniqLogs.forEach((uniqlog) => {
    uniqlog.changedDateTime = new Date(uniqlog.changedDateTime);
    logs.forEach((log) => {
      log.changedDateTime = new Date(log.changedDateTime);
      if (
        uniqlog.changedDateTime.toString() === log.changedDateTime.toString() &&
        uniqlog.changedEmployeeName === log.changedEmployeeName
      ) {
        uniqlog.changeLog.push({
          id: log.id,
          changedFiled: log.changedFiled,
          oldValue: log.oldValue,
          newValue: log.newValue,
        });
      }
    });
  });

  const [expandedRows, setExpandedRows] = useState(null);

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-2">
        <DataTable value={data.changeLog} style={{ width: "85vw" }}>
          <Column
            field="changedFiled"
            header="Измененное значение"
            headerStyle={{
              fontWeight: "bold",
            }}
            style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          ></Column>
          <Column
            field="newValue"
            header="Новое значение"
            headerStyle={{
              fontWeight: "bold",
            }}
            style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          ></Column>
          <Column
            field="oldValue"
            header="Старое значение"
            headerStyle={{
              fontWeight: "bold",
            }}
            style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          ></Column>
        </DataTable>
      </div>
    );
  };

  return (
    uniqLogs !== undefined && (
      <DataTable
        className={styles.tableHeader}
        stripedRows
        removableSort
        scrollable
        scrollHeight="calc(90vh - 0.4rem - 1.5rem - 0.5rem - 1.5rem - 2px - 1rem - 2.5rem - 1rem - 1rem)"
        value={uniqLogs}
        style={{ height: "100%", width: "100%" }}
        expandedRows={expandedRows}
        onRowToggle={(e) => {
          setExpandedRows(e.data);
        }}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        <Column expander={true} style={{ width: "5rem" }} />
        <Column
          field="changedEmployeeName"
          header="ФИО Сотрудника"
          headerStyle={{
            fontWeight: "bold",
          }}
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          sortable
        ></Column>
        <Column
          field="changedDateTime"
          header="Дата и время изменения"
          headerStyle={{
            fontWeight: "bold",
          }}
          style={{ minWidth: "10rem", textWrap: "wrap", fontSize: 14 }}
          body={(rowData) => formatDate(rowData.changedDateTime, "updatedAt")}
          sortable
        ></Column>
      </DataTable>
    )
  );
};

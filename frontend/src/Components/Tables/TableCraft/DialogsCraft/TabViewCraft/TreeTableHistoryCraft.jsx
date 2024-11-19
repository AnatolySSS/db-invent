import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { formatDate } from "../../../Functions/Helpers/formatDate";

export const TreeTablelHistoryCraft = (props) => {
  const { logs } = props;

  //Получение массива уникальных записей изменений (объектов, модержащих ФИО измнившего и дату/время)
  let uniqLogs = [
    ...new Set(
      logs.map((log) =>
        JSON.stringify({
          changedDateTime: log.changedDateTime,
          changedEmployeeName: log.changedEmployeeName,
          children: [],
        })
      )
    ),
  ].map((log) => JSON.parse(log));

  //Добавление к каждому объекту изменений списка конкретных изменений
  uniqLogs.forEach((uniqlog, index) => {
    uniqlog.changedDateTime = new Date(uniqlog.changedDateTime);
    uniqlog.key = index.toString();
    uniqlog.data = {
      changedEmployeeName: uniqlog.changedEmployeeName,
      changedDateTime: formatDate(uniqlog.changedDateTime, "updatedAt"),
      changedFiled: "",
      newValue: "",
      oldValue: "",
    };
    let childrenIndex = 0;
    logs.forEach((log) => {
      log.changedDateTime = new Date(log.changedDateTime);
      if (
        uniqlog.changedDateTime.toString() === log.changedDateTime.toString() &&
        uniqlog.changedEmployeeName === log.changedEmployeeName
      ) {
        uniqlog.children.push({
          key: `${uniqlog.key}-${childrenIndex++}`,
          data: {
            changedEmployeeName: log.changedEmployeeName,
            changedDateTime: formatDate(log.changedDateTime, "updatedAt"),
            changedFiled: log.changedFiled,
            oldValue: log.oldValue,
            newValue: log.newValue,
          },
        });
      }
    });
    delete uniqlog.changedDateTime;
    delete uniqlog.changedEmployeeName;
  });

  return (
    uniqLogs !== undefined && (
      <TreeTable
        value={uniqLogs}
        tableStyle={{ minWidth: "50rem" }}
        resizableColumns
        columnResizeMode="expand"
        removableSort
        scrollable
        scrollHeight="calc(90vh - 0.4rem - 1.5rem - 0.5rem - 1.5rem - 2px - 1rem - 11.5rem - 1rem - 1rem)"
      >
        <Column
          field="changedEmployeeName"
          header="ФИО Сотрудника"
          style={{ minWidth: "12rem", textWrap: "wrap", fontSize: 14 }}
          expander
          filter
        ></Column>
        <Column
          field="changedDateTime"
          header="Дата и время изменения"
          style={{ minWidth: "12rem", textWrap: "wrap", fontSize: 14 }}
          filter
        ></Column>
        <Column
          field="changedFiled"
          header="Измененное значение"
          style={{ minWidth: "12rem", textWrap: "wrap", fontSize: 14 }}
          filter
        ></Column>
        <Column
          field="newValue"
          header="Новое значение"
          style={{ minWidth: "12rem", textWrap: "wrap", fontSize: 14 }}
          filter
        ></Column>
        <Column
          field="oldValue"
          header="Старое значение"
          style={{ minWidth: "12rem", textWrap: "wrap", fontSize: 14 }}
          filter
        ></Column>
      </TreeTable>
    )
  );
};

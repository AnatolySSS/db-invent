import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
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
            changedEmployeeName: "",
            changedDateTime: "",
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
      <div className="card">
        <Tooltip
          target=".p-filter-column:nth-child(1) .p-column-filter"
          content="Фильтр по ФИО сотрудника"
          position="top"
        />
        <Tooltip
          target=".p-filter-column:nth-child(2) .p-column-filter"
          content="Фильтр по дате изменения"
          position="top"
        />
        <Tooltip
          target=".p-filter-column:nth-child(3) .p-column-filter"
          content="Фильтр по типу измененного значения"
          position="top"
        />
        <Tooltip
          target=".p-filter-column:nth-child(4) .p-column-filter"
          content="Фильтр по новому значению"
          position="top"
        />
        <Tooltip
          target=".p-filter-column:nth-child(5) .p-column-filter"
          content="Фильтр по старому значению"
          position="top"
        />
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
            filterPlaceholder="Фильтр ..."
            tooltip="Enter your username"
            tooltipOptions={{ position: "top" }}
          ></Column>
          <Column
            field="changedDateTime"
            header="Дата и время изменения"
            style={{ minWidth: "12rem", textWrap: "wrap", fontSize: 14 }}
            filter
            filterPlaceholder="Фильтр ..."
          ></Column>
          <Column
            field="changedFiled"
            header="Измененное значение"
            style={{ minWidth: "12rem", textWrap: "wrap", fontSize: 14 }}
            filter
            filterPlaceholder="Фильтр ..."
          ></Column>
          <Column
            field="newValue"
            header="Новое значение"
            style={{ minWidth: "12rem", textWrap: "wrap", fontSize: 14 }}
            filter
            filterPlaceholder="Фильтр ..."
          ></Column>
          <Column
            field="oldValue"
            header="Старое значение"
            style={{ minWidth: "12rem", textWrap: "wrap", fontSize: 14 }}
            filter
            filterPlaceholder="Фильтр ..."
          ></Column>
        </TreeTable>
      </div>
    )
  );
};

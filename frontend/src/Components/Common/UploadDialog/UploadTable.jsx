import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { getTableHeight } from "../../Tables/Functions/Helpers/getTableHeight";
import styles from "./UploadDialog.module.css";

export const UploadTable = (props) => {
  const { data, columns, getItemDialogFooter } = props;

  //   const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  return (
    <DataTable
      className={styles.tableHeader}
      stripedRows
      removableSort
      value={data}
      scrollable
      scrollHeight="calc(90vh - 0.4rem - 1.5rem - 0.5rem - 1.5rem - 2px - 1rem - 2.5rem - 1rem - 2rem)"
      style={{ height: "100%", width: "100%" }}
      paginator
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Показаны с {first} по {last} из {totalRecords} объектов"
      rows={10}
      rowsPerPageOptions={[10, 25, 50, 100]}
      //   paginatorRight={getItemDialogFooter()}
    >
      {columns.map((col, i) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          sortable
          filter
          filterField={col.field}
          dataType={col.dataType}
          //   filterElement={getColumnFilterElement(col, values)}
          showFilterMatchModes={col.showFilterMenu}
          style={{ minWidth: col.width, textWrap: "wrap" }}
          //   body={getColumnBody(col)}
        />
      ))}
    </DataTable>
  );
};

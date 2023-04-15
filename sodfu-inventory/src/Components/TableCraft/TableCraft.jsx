import React, { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../../service/ProductService";

const TableCraft = (props) => {
  const [products, setProducts] = useState([]);
  const columns = [
    { field: "id", header: "ID" },
    { field: "inventary_number", header: "Инвентарный номер" },
    { field: "internal_number", header: "Внутренний номер" },
    { field: "is_capital_good", header: "Основное средство" },
    { field: "type", header: "Тип" },
    { field: "name", header: "Наименование" },
    { field: "release_date ", header: "Дата выпуска" },
    { field: "date_of_purchase ", header: "Дата приобретения" },
    { field: "last_check_date ", header: "Дата последней проверки" },
    { field: "serviceable ", header: "Состояние исправности" },
  ];

  useEffect(() => {
    ProductService.getProducts().then((data) => setProducts(data));
  }, []);
  return (
    <div className="card mt-2">
      <DataTable
        value={products}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        stripedRows
        removableSort
      >
        {columns.map((col, i) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            sortable
          />
        ))}
      </DataTable>
    </div>
  );
};

export default TableCraft;

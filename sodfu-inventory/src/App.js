import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "./App.css";
import SidebarCraft from "./Components/SidebarCraft/SidebarCraft";
import TableCraft from "./Components/TableCraft/TableCraft";

const App = () => {
  return (
    <div className="grid">
      <div className="col-1">
        <SidebarCraft />
      </div>
      <div className="col">
        <TableCraft />
      </div>
    </div>
  );
}

export default App;

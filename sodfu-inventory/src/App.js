import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "./App.css";
import SidebarCraft from "./Components/SidebarCraft/SidebarCraft";
import TableCraftContainer from "./Components/TableCraft/TableCraftContainer";

const App = (props) => {
  return (
    <div className="grid">
      <div className="col-1">
        <SidebarCraft />
      </div>
      <div className="col">
        <TableCraftContainer {...props}/>
      </div>
    </div>
  );
}

export default App;

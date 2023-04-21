import React from "react";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarCraftContainer from "./Components/SidebarCraft/SidebarCraftContainer";
import TableCraftItContainer from "./Components/TableCraft/TableCraftItContainer";
import TableCraftFurnitureContainer from "./Components/TableCraft/TableCraftFurnitureContainer";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <SidebarCraftContainer />
          </div>
          <div className="max-w-screen">
            <Routes>
              <Route path="/it" element={<TableCraftItContainer />} />
              <Route path="/furniture" element={<TableCraftFurnitureContainer />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

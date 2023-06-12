import React from "react";
import { connect } from "react-redux";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "./redux/reducers/app-reducer";
import { requestYears } from "./redux/reducers/panel-menu-reducer";
import SidebarCraftContainer from "./Components/SidebarCraft/SidebarCraftContainer";
import TableCraftItContainer from "./Components/TableCraft/TableCraftItContainer";
import TableCraftFurnitureContainer from "./Components/TableCraft/TableCraftFurnitureContainer";
import UploadCraftContainer from "./Components/UploadCraft/UploadCraftContainer";
import LoginCraftContainer from "./Components/LoginCraft/LoginCraftContainer";
import YearInventoryContainer from "./Components/YearInventory/YearInventoryContainer";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
    this.props.requestYears()
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <div> */}
            <SidebarCraftContainer />
          {/* </div> */}
          <div className="max-w-screen h-screen">
            <Routes>
              <Route path="/" element={<LoginCraftContainer />} />
              <Route path="/login" element={<LoginCraftContainer />} />
              <Route path="/it" element={<TableCraftItContainer />} />
              <Route path="/furniture" element={<TableCraftFurnitureContainer />} />
              <Route path="/upload" element={<UploadCraftContainer />} />
              { this.props.yearsIt.map((year, index) => {
                let id = 1000 + index
                return (
                  <Route key={id} path={`/it/:year`} element={<YearInventoryContainer tableName="it"/>} />
                )
              })}
              { this.props.yearsFurniture.map((year, index) => {
                let id = 2000 + index
                return (
                  <Route key={id} path={`/furniture/:year`} element={<YearInventoryContainer tableName="furniture"/>} />
                )
              })}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
    yearsIt: state.panelMenu.yearsIt,
    yearsFurniture: state.panelMenu.yearsFurniture,
  };
};

const mapDispatchToProps = {
  initializeApp,
  requestYears,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

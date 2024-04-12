import React from "react";
import { connect } from "react-redux";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "./redux/reducers/app-reducer";
import { requestYears } from "./redux/reducers/panel-menu-reducer";
import SidebarCraftContainer from "./Components/SidebarCraft/SidebarCraftContainer";
import TableCraftItContainer from "./Components/Tables/TableCraft/TableCraftItContainer";
import TableCraftFurnitureContainer from "./Components/Tables/TableCraft/TableCraftFurnitureContainer";
import UploadCraftContainer from "./Components/UploadCraft/UploadCraftContainer";
import LoginCraftContainer from "./Components/LoginCraft/LoginCraftContainer";
import YearInventoryContainer from "./Components/Tables/YearInventory/YearInventoryContainer";
import ChartCraftContainer from "./Components/Charts/ChartCraftContainer";
import TableCraftUnmarkedContainer from "./Components/Tables/TableCraft/TableCraftUnmarkedContainer";

class App extends React.Component {
  async componentDidMount() {
    await this.props.initializeApp();
    await this.props.requestYears(this.props.userDivision);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <SidebarCraftContainer />
          <div className="w-screen h-screen">
            <Routes>
              <Route path="/" element={<LoginCraftContainer />} />
              <Route path="/login" element={<LoginCraftContainer />} />
              <Route path="/it" element={<TableCraftItContainer />} />
              <Route path="/furniture" element={<TableCraftFurnitureContainer />} />
              <Route path="/unmarked" element={<TableCraftUnmarkedContainer />} />
              <Route path="/upload" element={<UploadCraftContainer />} />
              <Route path="/charts" element={<ChartCraftContainer />} />
              { this.props.yearsIt.map((year, index) => {
                let id = 1000 + index;
                return (
                  <Route key={id} path={`/it/:year`} element={<YearInventoryContainer tableName="it"/>} />
                )
              })}
              { this.props.yearsFurniture.map((year, index) => {
                let id = 2000 + index;
                return (
                  <Route key={id} path={`/furniture/:year`} element={<YearInventoryContainer tableName="furniture"/>} />
                )
              })}
              { this.props.yearsUnmarked.map((year, index) => {
                let id = 3000 + index;
                return (
                  <Route key={id} path={`/unmarked/:year`} element={<YearInventoryContainer tableName="unmarked"/>} />
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
    yearsUnmarked: state.panelMenu.yearsUnmarked,
    userDivision: state.auth.division,
  };
};

const mapDispatchToProps = {
  initializeApp,
  requestYears,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

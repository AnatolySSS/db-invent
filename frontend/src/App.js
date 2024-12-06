import React from "react";
import { connect } from "react-redux";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "./redux/reducers/app-reducer";
import SidebarCraftContainer from "./Components/SidebarCraft/SidebarCraftContainer";
import TableCraftItContainer from "./Components/Tables/TableCraft/TableCraftItContainer";
import TableCraftFurnitureContainer from "./Components/Tables/TableCraft/TableCraftFurnitureContainer";
import TableCraftUnmarkedContainer from "./Components/Tables/TableCraft/TableCraftUnmarkedContainer";
import TableCraftAssetsContainer from "./Components/Tables/TableCraft/TableCraftAssetsContainer";
import UploadCraftContainer from "./Components/UploadCraft/UploadCraftContainer";
import LoginCraftContainer from "./Components/LoginCraft/LoginCraftContainer";
import YearInventoryContainer from "./Components/Tables/YearInventory/YearInventoryContainer";
import ChartCraftContainer from "./Components/Charts/ChartCraftContainer";
import UsersCraftContainer from "./Components/Tables/UsersCraft/UsersCraftContainer";
import EmployersCraftContainer from "./Components/Tables/UsersCraft/EmployersCraftContainer";
import { getTableHeight } from "./Components/Tables/Functions/Helpers/getTableHeight";

class App extends React.Component {
  async componentDidMount() {
    await this.props.initializeApp();
    window.onresize = function (event) {
      getTableHeight();
    };
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
              <Route
                path="/furniture"
                element={<TableCraftFurnitureContainer />}
              />
              <Route
                path="/unmarked"
                element={<TableCraftUnmarkedContainer />}
              />
              <Route path="/assets" element={<TableCraftAssetsContainer />} />
              <Route path="/upload" element={<UploadCraftContainer />} />
              <Route path="/charts" element={<ChartCraftContainer />} />
              <Route path="/users" element={<UsersCraftContainer />} />
              <Route path="/employers" element={<EmployersCraftContainer />} />
              <Route
                path={`/it/:year`}
                element={<YearInventoryContainer tableName="it" />}
              />
              <Route
                path={`/furniture/:year`}
                element={<YearInventoryContainer tableName="furniture" />}
              />
              <Route
                path={`/unmarked/:year`}
                element={<YearInventoryContainer tableName="unmarked" />}
              />
              <Route
                path={`/assets/:year`}
                element={<YearInventoryContainer tableName="assets" />}
              />
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
    userDivision: state.auth.division,
  };
};

const mapDispatchToProps = {
  initializeApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

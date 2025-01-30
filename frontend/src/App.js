import React from "react";
import { connect } from "react-redux";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toast } from "primereact/toast";
import { initializeApp } from "./redux/reducers/app-reducer";
import SidebarComponentContainer from "./Components/SidebarComponent/SidebarComponentContainer";
import TableCraftItContainer from "./Components/Tables/TableCraft/TableCraftItContainer";
import TableCraftFurnitureContainer from "./Components/Tables/TableCraft/TableCraftFurnitureContainer";
import TableCraftUnmarkedContainer from "./Components/Tables/TableCraft/TableCraftUnmarkedContainer";
import TableCraftAssetsContainer from "./Components/Tables/TableCraft/TableCraftAssetsContainer";
import UploadComponentContainer from "./Components/UploadComponent/UploadComponentContainer";
import LoginComponent from "./Components/LoginComponent/LoginComponentContainer";
import YearInventoryContainer from "./Components/Tables/YearInventory/YearInventoryContainer";
import ChartCraftContainer from "./Components/Charts/ChartCraftContainer";
import UsersContainer from "./Components/Tables/Users/UsersContainer";
import EmployeesContainer from "./Components/Tables/Employees/EmployeesContainer";
import { getTableHeight } from "./Components/Tables/Functions/Helpers/getTableHeight";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toast = React.createRef();

    this.showMultiple = (messages) => {
      const toasts = messages.map((message) => ({ severity: "info", summary: "Info", detail: message }));
      this.toast.current.show(toasts);
    };
  }

  async componentDidMount() {
    await this.props.initializeApp();
    window.onresize = function (event) {
      getTableHeight();
    };
  }

  //Выведение сообщения в случае обновления пользователей
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.downloadEmployeeStatus !== this.props.downloadEmployeeStatus) {
      this.showMultiple(this.props.downloadEmployeeMessage);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Toast ref={this.toast} />
          <SidebarComponentContainer />
          <div className="w-screen h-screen">
            <Routes>
              <Route path="/" element={<LoginComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/it" element={<TableCraftItContainer />} />
              <Route path="/furniture" element={<TableCraftFurnitureContainer />} />
              <Route path="/unmarked" element={<TableCraftUnmarkedContainer />} />
              <Route path="/assets" element={<TableCraftAssetsContainer />} />
              <Route path="/upload" element={<UploadComponentContainer />} />
              <Route path="/charts" element={<ChartCraftContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/employees" element={<EmployeesContainer />} />
              <Route path={`/it/:year`} element={<YearInventoryContainer type="it" />} />
              <Route path={`/furniture/:year`} element={<YearInventoryContainer type="furniture" />} />
              <Route path={`/unmarked/:year`} element={<YearInventoryContainer type="unmarked" />} />
              <Route path={`/assets/:year`} element={<YearInventoryContainer type="assets" />} />
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
    userDivision: state.auth.division_id,
    downloadEmployeeStatus: state.employees.downloadStatus,
    downloadEmployeeMessage: state.employees.message,
  };
};

const mapDispatchToProps = {
  initializeApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

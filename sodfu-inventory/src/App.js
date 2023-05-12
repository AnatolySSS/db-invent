import React from "react";
import { connect } from "react-redux";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "./redux/reducers/app-reducer";
import SidebarCraftContainer from "./Components/SidebarCraft/SidebarCraftContainer";
import TableCraftItContainer from "./Components/TableCraft/TableCraftItContainer";
import TableCraftFurnitureContainer from "./Components/TableCraft/TableCraftFurnitureContainer";
import UploadCraftContainer from "./Components/UploadCraft/UploadCraftContainer";
import LoginCraftContainer from "./Components/LoginCraft/LoginCraftContainer";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <SidebarCraftContainer />
          </div>
          <div className="max-w-screen h-screen">
            <Routes>
              <Route path="/login" element={<LoginCraftContainer />} />
              <Route path="/it" element={<TableCraftItContainer />} />
              <Route path="/furniture" element={<TableCraftFurnitureContainer />} />
              <Route path="/upload" element={<UploadCraftContainer />} />
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
  };
};

const mapDispatchToProps = {
  initializeApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

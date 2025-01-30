import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const data_types = {
  it: "Оборудование",
  furniture: "Мебель",
  assets: "Основные средства",
  unmarked: "Прочее",
};

const mapStateToPropsForNavigate = (state) => {
  return {
    data_type: state.auth.data_type,
  };
};

export const withDataTypeAccessNavigate = (Component) => {
  class NavigateComponent extends React.Component {
    render() {
      const authPermissions = this.props.data_type;
      const currentTable = data_types[this.props.type];
      const dataTypePermission = authPermissions?.includes(currentTable);

      if (!dataTypePermission) return <Navigate to={"/login"} />;
      return <Component {...this.props} />;
    }
  }

  return connect(mapStateToPropsForNavigate)(NavigateComponent);
};

import React from "react";
import { connect } from "react-redux";
import preloader from "../../../assets/logoInfinity_3.svg";

const Preloader = (props) => {
  return (
    <div>
      <img src={preloader} alt="" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Preloader);

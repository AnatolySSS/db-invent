import { connect } from "react-redux";
import ItDownloadCraft from "./ItDownloadCraft";
import { uploadItData } from "../../redux/reducers/it-download-reducer";
import { setVisible } from "../../redux/reducers/side-bar-reducer";

let mapStateToProps = (state) => {

  return {
    uploadedStatus: state.itDownload.uploadedStatus,
  };
};

let mapDispatchToProps =  {
  uploadItData,
  setVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItDownloadCraft)